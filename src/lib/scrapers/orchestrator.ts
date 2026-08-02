/**
 * LeadForge — Scraper Orchestrator
 * 
 * Unified interface that orchestrates scraping across all platforms,
 * runs the RAG enrichment pipeline, and stores results.
 */

import { scrapeInstagramProfiles, calculateEngagementRate, type InstagramProfile } from './instagram';
import { scrapeTwitterProfiles, calculateTwitterEngagementRate, type TwitterProfile } from './twitter';
import { searchLinkedInProfiles, type LinkedInProfile } from './linkedin';
import { generateEmbedding, enrichLeadWithAI, buildLeadContext } from '../openai';
import { createServerClient } from '../supabase';
import type { ScrapeJobQuery, Platform, Lead } from '../types';

interface ScrapeResult {
  leads: Partial<Lead>[];
  errors: string[];
}

/**
 * Main orchestrator: run a scrape job end-to-end.
 * 
 * Flow:
 * 1. Update job status to 'scraping'
 * 2. Scrape profiles from the target platform
 * 3. Extract and normalize lead data
 * 4. Run RAG enrichment (embeddings + AI scoring)
 * 5. Store leads in database
 * 6. Update job status to 'completed'
 */
export async function executeScrapeJob(jobId: string): Promise<void> {
  const supabase = createServerClient();

  // Fetch the job
  const { data: job, error: jobError } = await supabase
    .from('scrape_jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (jobError || !job) {
    console.error('Job not found:', jobId, jobError);
    return;
  }

  // Fetch user's ICP if specified
  let icpDescription = '';
  if (job.icp_profile_id) {
    const { data: icp } = await supabase
      .from('icp_profiles')
      .select('description')
      .eq('id', job.icp_profile_id)
      .single();
    icpDescription = icp?.description || '';
  }

  try {
    // Step 1: Update status to 'scraping'
    await updateJobStatus(supabase, jobId, 'scraping', 10);

    // Step 2: Scrape profiles
    const scrapeResult = await scrapeProfiles(job.platform, job.query);
    
    await updateJobStatus(supabase, jobId, 'enriching', 40, {
      leads_found: scrapeResult.leads.length,
    });

    // Step 3: Enrich with RAG (embeddings + AI scoring)
    const enrichedLeads = await enrichLeads(
      scrapeResult.leads,
      icpDescription,
      (progress) => {
        updateJobStatus(supabase, jobId, 'scoring', 40 + Math.round(progress * 50));
      }
    );

    // Step 4: Store leads in database
    const leadsToInsert = enrichedLeads.map(lead => ({
      ...lead,
      job_id: jobId,
      user_id: job.user_id,
    }));

    if (leadsToInsert.length > 0) {
      // Insert in batches of 50
      for (let i = 0; i < leadsToInsert.length; i += 50) {
        const batch = leadsToInsert.slice(i, i + 50);
        const { error: insertError } = await supabase
          .from('leads')
          .insert(batch);
        
        if (insertError) {
          console.error('Error inserting leads batch:', insertError);
        }
      }
    }

    // Step 5: Deduct credits from user
    const creditsUsed = enrichedLeads.length;
    await supabase.rpc('deduct_credits', {
      p_user_id: job.user_id,
      p_amount: creditsUsed,
    });

    // Step 6: Mark job as completed
    await updateJobStatus(supabase, jobId, 'completed', 100, {
      leads_found: scrapeResult.leads.length,
      leads_enriched: enrichedLeads.filter(l => l.icp_score !== null).length,
      leads_verified: enrichedLeads.filter(l => l.email_verified).length,
      credits_used: creditsUsed,
      completed_at: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Scrape job failed:', error);
    await updateJobStatus(supabase, jobId, 'failed', 0, {
      error_message: (error as Error).message,
    });
  }
}

/**
 * Scrape profiles from the specified platform.
 */
async function scrapeProfiles(
  platform: Platform,
  query: ScrapeJobQuery
): Promise<ScrapeResult> {
  const errors: string[] = [];
  let leads: Partial<Lead>[] = [];

  try {
    switch (platform) {
      case 'instagram': {
        const profiles = await scrapeInstagramProfiles({
          searchTerm: query.keywords?.join(' '),
          hashtag: query.hashtags?.[0],
          usernames: query.url_list?.map(u => u.replace('https://instagram.com/', '').replace('/', '')),
          limit: query.limit || 50,
        });
        leads = profiles.map(p => normalizeInstagramLead(p));
        break;
      }
      case 'twitter': {
        const profiles = await scrapeTwitterProfiles({
          searchTerm: query.keywords?.join(' '),
          hashtag: query.hashtags?.[0],
          usernames: query.url_list?.map(u => u.replace('https://x.com/', '').replace('/', '')),
          limit: query.limit || 50,
        });
        leads = profiles.map(p => normalizeTwitterLead(p));
        break;
      }
      case 'linkedin': {
        const profiles = await searchLinkedInProfiles({
          keywords: query.keywords?.join(' '),
          title: query.bio_keywords?.join(' '),
          location: query.location,
          limit: query.limit || 20,
        });
        leads = profiles.map(p => normalizeLinkedInLead(p));
        break;
      }
    }

    // Apply filters
    if (query.min_followers) {
      leads = leads.filter(l => (l.follower_count || 0) >= query.min_followers!);
    }
    if (query.max_followers) {
      leads = leads.filter(l => (l.follower_count || 0) <= query.max_followers!);
    }

  } catch (error) {
    errors.push(`Scraping ${platform} failed: ${(error as Error).message}`);
  }

  return { leads, errors };
}

/**
 * Enrich leads with RAG: generate embeddings, AI scores, and outreach messages.
 */
async function enrichLeads(
  leads: Partial<Lead>[],
  icpDescription: string,
  onProgress?: (progress: number) => void
): Promise<Partial<Lead>[]> {
  const enrichedLeads: Partial<Lead>[] = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];

    try {
      // Build rich text context for this lead
      const context = buildLeadContext({
        username: lead.username,
        full_name: lead.full_name,
        bio: lead.bio,
        company: lead.company,
        title: lead.title,
        location: lead.location,
        website: lead.website,
        follower_count: lead.follower_count,
        engagement_rate: lead.engagement_rate,
        recent_posts: lead.recent_posts,
        platform: lead.platform,
      });

      // Generate embedding for the lead
      const embedding = await generateEmbedding(context);

      // AI enrichment (ICP scoring, intent signals, outreach)
      let aiEnrichment = {
        icp_score: 0,
        ai_summary: 'Insufficient data for scoring.',
        intent_signals: [] as Array<{ type: string; signal: string; strength: string; source: string }>,
        pain_points: [] as string[],
        outreach_message: '',
      };

      if (icpDescription && context.length > 50) {
        aiEnrichment = await enrichLeadWithAI(context, icpDescription);
      }

      enrichedLeads.push({
        ...lead,
        embedding: embedding,
        icp_score: aiEnrichment.icp_score,
        ai_summary: aiEnrichment.ai_summary,
        intent_signals: aiEnrichment.intent_signals as Lead['intent_signals'],
        pain_points: aiEnrichment.pain_points,
        outreach_message: aiEnrichment.outreach_message,
      });

      // Rate limit: avoid overwhelming APIs
      if (i < leads.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }

    } catch (error) {
      console.error(`Error enriching lead ${lead.username}:`, error);
      enrichedLeads.push(lead); // Add without enrichment
    }

    // Report progress
    if (onProgress) {
      onProgress((i + 1) / leads.length);
    }
  }

  return enrichedLeads;
}

/**
 * Normalize Instagram profile to Lead format.
 */
function normalizeInstagramLead(profile: InstagramProfile): Partial<Lead> {
  return {
    platform: 'instagram',
    username: profile.username,
    profile_url: `https://www.instagram.com/${profile.username}/`,
    full_name: profile.full_name,
    bio: profile.bio,
    avatar_url: profile.profile_pic_url,
    email: profile.email,
    phone: profile.phone,
    website: profile.external_url,
    location: profile.location,
    follower_count: profile.follower_count,
    following_count: profile.following_count,
    post_count: profile.post_count,
    engagement_rate: calculateEngagementRate(profile),
    recent_posts: profile.recent_posts.map(p => ({
      text: p.text,
      date: p.date,
      likes: p.likes,
      comments: p.comments,
      url: p.url,
    })),
    raw_data: profile as unknown as Record<string, unknown>,
  };
}

/**
 * Normalize Twitter profile to Lead format.
 */
function normalizeTwitterLead(profile: TwitterProfile): Partial<Lead> {
  return {
    platform: 'twitter',
    username: profile.username,
    profile_url: `https://x.com/${profile.username}`,
    full_name: profile.full_name,
    bio: profile.bio,
    avatar_url: profile.profile_pic_url,
    email: profile.email,
    website: profile.website,
    location: profile.location,
    follower_count: profile.follower_count,
    following_count: profile.following_count,
    post_count: profile.tweet_count,
    engagement_rate: calculateTwitterEngagementRate(profile),
    recent_posts: profile.recent_tweets.map(t => ({
      text: t.text,
      date: t.date,
      likes: t.likes,
      comments: t.replies,
    })),
    raw_data: profile as unknown as Record<string, unknown>,
  };
}

/**
 * Normalize LinkedIn profile to Lead format.
 */
function normalizeLinkedInLead(profile: LinkedInProfile): Partial<Lead> {
  return {
    platform: 'linkedin',
    username: profile.username,
    profile_url: profile.profile_url,
    full_name: profile.full_name,
    bio: `${profile.headline}\n\n${profile.bio}`.trim(),
    avatar_url: profile.profile_pic_url,
    company: profile.company,
    title: profile.title,
    industry: profile.industry,
    email: profile.email,
    phone: profile.phone,
    website: profile.website,
    location: profile.location,
    follower_count: profile.follower_count,
    following_count: profile.connection_count,
    engagement_rate: null,
    recent_posts: profile.recent_posts.map(p => ({
      text: p.text,
      date: p.date,
      likes: p.likes,
      comments: p.comments,
    })),
    raw_data: profile as unknown as Record<string, unknown>,
  };
}

/**
 * Helper: Update job status and progress in the database.
 */
async function updateJobStatus(
  supabase: ReturnType<typeof createServerClient>,
  jobId: string,
  status: string,
  progress: number,
  extra: Record<string, unknown> = {}
): Promise<void> {
  await supabase
    .from('scrape_jobs')
    .update({ status, progress, ...extra })
    .eq('id', jobId);
}
