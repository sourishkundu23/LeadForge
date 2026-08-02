/**
 * LeadForge — API: Create Scrape Job
 * POST /api/jobs
 * 
 * Creates a new scrape job and kicks off the scraping pipeline.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { generateEmbedding } from '@/lib/openai';
import { executeScrapeJob } from '@/lib/scrapers/orchestrator';
import type { CreateJobRequest } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body: CreateJobRequest = await request.json();

    // Validate required fields
    if (!body.platform || !body.search_type || !body.query) {
      return NextResponse.json(
        { error: 'Missing required fields: platform, search_type, query' },
        { status: 400 }
      );
    }

    // Get user from auth header or fallback to dev user
    const authHeader = request.headers.get('Authorization');
    let userId = '00000000-0000-0000-0000-000000000000';
    let userPlan = 'starter';
    let userCredits = 500;

    if (authHeader && authHeader !== 'Bearer dev-token') {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        userId = user.id;
        const { data: userData } = await supabase
          .from('users')
          .select('credits_remaining, plan')
          .eq('id', user.id)
          .single();
        if (userData) {
          userPlan = userData.plan || 'starter';
          userCredits = userData.credits_remaining ?? 500;
        }
      }
    }

    if (userCredits <= 0) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please upgrade your plan.' },
        { status: 402 }
      );
    }

    if (userPlan === 'free' && body.platform !== 'instagram') {
      return NextResponse.json(
        { error: 'Free plan only supports Instagram. Upgrade to access LinkedIn and Twitter.' },
        { status: 403 }
      );
    }

    // Handle ICP profile — create ad-hoc if description provided
    let icpProfileId = body.icp_profile_id || null;
    
    if (!icpProfileId && body.icp_description) {
      // Create a temporary ICP profile from the description
      const icpEmbedding = await generateEmbedding(body.icp_description);
      
      const { data: newIcp } = await supabase
        .from('icp_profiles')
        .insert({
          user_id: userId,
          name: 'Quick Search',
          description: body.icp_description,
          embedding: icpEmbedding,
        })
        .select('id')
        .single();
      
      icpProfileId = newIcp?.id || null;
    }

    // Create the scrape job
    const { data: job, error: insertError } = await supabase
      .from('scrape_jobs')
      .insert({
        user_id: userId,
        platform: body.platform,
        search_type: body.search_type,
        query: body.query,
        icp_profile_id: icpProfileId,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError || !job) {
      console.error('Error creating job:', insertError);
      return NextResponse.json(
        { error: 'Failed to create scrape job' },
        { status: 500 }
      );
    }

    // Kick off the scraping pipeline asynchronously
    // In production, this would be a background worker / Supabase Edge Function
    executeScrapeJob(job.id).catch(err => {
      console.error('Background scrape job failed:', err);
    });

    // Estimate credits
    const estimatedCredits = Math.min(
      body.query.limit || 50,
      userCredits
    );

    return NextResponse.json({
      job,
      estimated_credits: estimatedCredits,
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/jobs — List user's scrape jobs
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    let query = supabase
      .from('scrape_jobs')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: jobs, count, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      jobs: jobs || [],
      total: count || 0,
      page,
      per_page: limit,
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
