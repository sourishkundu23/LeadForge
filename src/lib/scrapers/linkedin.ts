/**
 * LeadForge — LinkedIn Public Profile Scraper
 * 
 * Scrapes publicly available LinkedIn data using:
 * 1. Proxycurl API (compliant, reliable)
 * 2. Google dorking for profile discovery
 * 3. Apify LinkedIn scraper as fallback
 * 
 * Only accesses publicly viewable data — never bypasses login walls.
 */

export interface LinkedInProfile {
  username: string; // LinkedIn vanity URL slug
  full_name: string;
  headline: string;
  bio: string; // "About" section
  profile_pic_url: string;
  profile_url: string;
  
  // Professional
  company: string | null;
  title: string | null;
  industry: string | null;
  
  // Contact
  email: string | null;
  phone: string | null;
  website: string | null;
  
  // Metrics
  follower_count: number;
  connection_count: number;
  
  // Location
  location: string | null;
  country: string | null;
  
  // Experience
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    is_current: boolean;
  }>;
  
  // Recent Activity
  recent_posts: Array<{
    text: string;
    date: string;
    likes: number;
    comments: number;
  }>;
}

/**
 * Scrape LinkedIn profiles using Proxycurl API.
 * Proxycurl is the safest approach — it provides an API over public LinkedIn data.
 * Free tier: 10 credits/month. Paid: $0.01/credit.
 */
export async function scrapeLinkedInProfile(
  profileUrl: string
): Promise<LinkedInProfile | null> {
  const apiKey = process.env.PROXYCURL_API_KEY;

  if (!apiKey) {
    console.warn('PROXYCURL_API_KEY not set — using mock data');
    return getMockLinkedInProfiles(1)[0] || null;
  }

  try {
    const params = new URLSearchParams({
      url: profileUrl,
      use_cache: 'if-present',
      fallback_to_cache: 'on-error',
      skills: 'include',
    });

    const response = await fetch(
      `https://nubela.co/proxycurl/api/v2/linkedin?${params}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Proxycurl API error: ${response.status}`);
    }

    const data = await response.json();
    return parseProxycurlResult(data);
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    throw new Error(`Failed to scrape LinkedIn: ${(error as Error).message}`);
  }
}

/**
 * Search for LinkedIn profiles by query using Proxycurl's search API.
 */
export async function searchLinkedInProfiles(
  query: {
    keywords?: string;
    title?: string;
    company?: string;
    location?: string;
    industry?: string;
    limit?: number;
  }
): Promise<LinkedInProfile[]> {
  const apiKey = process.env.PROXYCURL_API_KEY;

  if (!apiKey) {
    console.warn('PROXYCURL_API_KEY not set — using mock data');
    return getMockLinkedInProfiles(query.limit || 10);
  }

  try {
    // First, use Person Search API to find profiles
    const searchParams: Record<string, string> = {};
    
    if (query.keywords) searchParams.keyword_first_name = query.keywords;
    if (query.title) searchParams.current_role_title = query.title;
    if (query.company) searchParams.current_company_name = query.company;
    if (query.location) searchParams.country = query.location;
    if (query.industry) searchParams.industry = query.industry;
    searchParams.page_size = String(Math.min(query.limit || 10, 100));

    const params = new URLSearchParams(searchParams);
    
    const response = await fetch(
      `https://nubela.co/proxycurl/api/search/person/?${params}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Proxycurl Search API error: ${response.status}`);
    }

    const data = await response.json();
    const profiles: LinkedInProfile[] = [];

    // Fetch full profiles for each search result
    if (data.results) {
      for (const result of data.results.slice(0, query.limit || 10)) {
        if (result.linkedin_profile_url) {
          const profile = await scrapeLinkedInProfile(result.linkedin_profile_url);
          if (profile) profiles.push(profile);
          
          // Respectful rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    return profiles;
  } catch (error) {
    console.error('LinkedIn search error:', error);
    throw new Error(`Failed to search LinkedIn: ${(error as Error).message}`);
  }
}

/**
 * Alternative: Find LinkedIn profiles using Google dorking.
 * Searches Google for "site:linkedin.com/in/ [query]"
 * This is completely free and legal.
 */
export async function findLinkedInProfilesViaGoogle(
  searchQuery: string,
  limit: number = 10
): Promise<string[]> {
  // Returns LinkedIn profile URLs found via Google search
  // In production, you'd use a SERP API (SerpApi, ValueSerp) or Apify Google Search
  
  const apifyToken = process.env.APIFY_API_TOKEN;
  if (!apifyToken) {
    console.warn('No APIFY_API_TOKEN — returning empty results for Google dorking');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${apifyToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queries: `site:linkedin.com/in/ ${searchQuery}`,
          maxPagesPerQuery: 1,
          resultsPerPage: limit,
        }),
      }
    );

    if (!response.ok) throw new Error(`Google search API error: ${response.status}`);

    const data = await response.json();
    const urls: string[] = [];
    
    for (const item of data) {
      if (item.organicResults) {
        for (const result of item.organicResults) {
          const url = result.url || result.link;
          if (url && url.includes('linkedin.com/in/')) {
            urls.push(url);
          }
        }
      }
    }

    return urls.slice(0, limit);
  } catch (error) {
    console.error('Google dorking error:', error);
    return [];
  }
}

/**
 * Parse Proxycurl API response into our standard format.
 */
function parseProxycurlResult(data: Record<string, unknown>): LinkedInProfile {
  const experiences = Array.isArray(data.experiences)
    ? (data.experiences as Array<Record<string, unknown>>).map(exp => ({
        title: (exp.title as string) || '',
        company: (exp.company as string) || '',
        duration: (exp.duration as string) || '',
        description: (exp.description as string) || '',
        is_current: !exp.ends_at,
      }))
    : [];

  const currentExp = experiences.find(e => e.is_current);

  return {
    username: (data.public_identifier as string) || '',
    full_name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
    headline: (data.headline as string) || '',
    bio: (data.summary as string) || '',
    profile_pic_url: (data.profile_pic_url as string) || '',
    profile_url: `https://www.linkedin.com/in/${data.public_identifier || ''}`,
    company: currentExp?.company || (data.company as string) || null,
    title: currentExp?.title || (data.occupation as string) || null,
    industry: (data.industry as string) || null,
    email: (data.personal_emails as string[])?.[0] || null,
    phone: (data.personal_numbers as string[])?.[0] || null,
    website: (data.websites as Array<Record<string, string>>)?.[0]?.url || null,
    follower_count: (data.follower_count as number) || 0,
    connection_count: (data.connections as number) || 0,
    location: (data.city as string) || (data.state as string) || null,
    country: (data.country_full_name as string) || null,
    experience: experiences.slice(0, 5),
    recent_posts: [], // Proxycurl doesn't include posts by default
  };
}

/**
 * Mock LinkedIn profiles for development.
 */
function getMockLinkedInProfiles(limit: number): LinkedInProfile[] {
  const mocks: LinkedInProfile[] = [
    {
      username: 'john-doe-saas',
      full_name: 'John Doe',
      headline: 'Founder & CEO at CloudSync | Helping SMBs automate their workflows',
      bio: 'Serial entrepreneur with 15 years in B2B SaaS. Previously founded DataFlow (acquired by Salesforce in 2022). Passionate about making enterprise-grade tools accessible to small businesses. Angel investor in 12 startups.',
      profile_pic_url: '',
      profile_url: 'https://www.linkedin.com/in/john-doe-saas',
      company: 'CloudSync',
      title: 'Founder & CEO',
      industry: 'Computer Software',
      email: 'john@cloudsync.io',
      phone: null,
      website: 'https://cloudsync.io',
      follower_count: 34000,
      connection_count: 5000,
      location: 'San Francisco',
      country: 'United States',
      experience: [
        {
          title: 'Founder & CEO',
          company: 'CloudSync',
          duration: '2023 - Present',
          description: 'Building the next generation of workflow automation for SMBs.',
          is_current: true,
        },
        {
          title: 'Founder',
          company: 'DataFlow (Acquired by Salesforce)',
          duration: '2018 - 2022',
          description: 'Built a data pipeline platform serving 500+ enterprise clients.',
          is_current: false,
        },
      ],
      recent_posts: [
        {
          text: 'We\'re hiring! Looking for a Head of Sales to join CloudSync. If you know how to build outbound from 0 to 1, let\'s talk. Our current lead gen process is way too manual.',
          date: '2026-07-29T10:00:00Z',
          likes: 234,
          comments: 56,
        },
      ],
    },
    {
      username: 'priya-marketing-agency',
      full_name: 'Priya Sharma',
      headline: 'VP of Marketing @ GrowthForge | B2B Lead Gen Expert | Speaker',
      bio: 'I help B2B companies generate qualified leads at scale. Managed $10M+ in ad spend. Currently building GrowthForge\'s outbound engine from scratch.',
      profile_pic_url: '',
      profile_url: 'https://www.linkedin.com/in/priya-marketing-agency',
      company: 'GrowthForge',
      title: 'VP of Marketing',
      industry: 'Marketing & Advertising',
      email: 'priya@growthforge.com',
      phone: null,
      website: 'https://growthforge.com',
      follower_count: 18500,
      connection_count: 4200,
      location: 'New York',
      country: 'United States',
      experience: [
        {
          title: 'VP of Marketing',
          company: 'GrowthForge',
          duration: '2024 - Present',
          description: 'Leading a team of 12 to build scalable B2B lead generation systems.',
          is_current: true,
        },
      ],
      recent_posts: [],
    },
  ];

  return mocks.slice(0, limit);
}
