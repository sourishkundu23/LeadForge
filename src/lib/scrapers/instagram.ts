/**
 * LeadForge — Instagram Public Profile Scraper
 * 
 * Scrapes publicly available Instagram data without login.
 * Uses multiple fallback strategies:
 * 1. Instagram's public JSON endpoint (?__a=1&__d=dis)
 * 2. HTML parsing of public profiles
 * 3. Apify Actor fallback for reliable extraction
 */

export interface InstagramProfile {
  username: string;
  full_name: string;
  bio: string;
  profile_pic_url: string;
  follower_count: number;
  following_count: number;
  post_count: number;
  is_business: boolean;
  is_verified: boolean;
  external_url: string | null;
  email: string | null;
  phone: string | null;
  category: string | null;
  location: string | null;
  recent_posts: Array<{
    text: string;
    date: string;
    likes: number;
    comments: number;
    url: string;
    type: 'image' | 'video' | 'carousel';
  }>;
}

/**
 * Extract email from bio text using regex patterns.
 */
export function extractEmailFromBio(bio: string): string | null {
  if (!bio) return null;
  
  // Standard email regex
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = bio.match(emailRegex);
  
  if (matches && matches.length > 0) {
    // Filter out common non-personal patterns
    const filtered = matches.filter(email => {
      const lower = email.toLowerCase();
      return !lower.includes('example.com') && 
             !lower.includes('email.com') &&
             !lower.includes('domain.com');
    });
    return filtered[0] || null;
  }
  
  // Check for obfuscated patterns like "name [at] domain [dot] com"
  const obfuscated = bio.match(
    /[a-zA-Z0-9._%+-]+\s*[\[\(]?\s*at\s*[\]\)]?\s*[a-zA-Z0-9.-]+\s*[\[\(]?\s*dot\s*[\]\)]?\s*[a-zA-Z]{2,}/gi
  );
  if (obfuscated) {
    const cleaned = obfuscated[0]
      .replace(/\s*[\[\(]?\s*at\s*[\]\)]?\s*/gi, '@')
      .replace(/\s*[\[\(]?\s*dot\s*[\]\)]?\s*/gi, '.')
      .trim();
    if (cleaned.match(emailRegex)) return cleaned;
  }
  
  return null;
}

/**
 * Extract phone number from bio text.
 */
export function extractPhoneFromBio(bio: string): string | null {
  if (!bio) return null;
  
  const phonePatterns = [
    /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g,
    /\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
  ];
  
  for (const pattern of phonePatterns) {
    const matches = bio.match(pattern);
    if (matches) {
      const phone = matches[0].replace(/[^\d+]/g, '');
      if (phone.length >= 10 && phone.length <= 15) {
        return phone;
      }
    }
  }
  
  return null;
}

/**
 * Scrape Instagram profiles using Apify's Instagram Scraper.
 * This is the most reliable method.
 */
export async function scrapeInstagramProfiles(
  query: {
    usernames?: string[];
    hashtag?: string;
    location?: string;
    searchTerm?: string;
    limit?: number;
  }
): Promise<InstagramProfile[]> {
  const apifyToken = process.env.APIFY_API_TOKEN;
  
  if (!apifyToken) {
    console.warn('APIFY_API_TOKEN not set — using mock data for development');
    return getMockInstagramProfiles(query.limit || 10);
  }

  try {
    // Use Apify Instagram Profile Scraper
    const input: Record<string, unknown> = {
      resultsLimit: query.limit || 50,
    };

    if (query.usernames) {
      input.directUrls = query.usernames.map(u => 
        `https://www.instagram.com/${u.replace('@', '')}/`
      );
    }
    if (query.hashtag) {
      input.hashtags = [query.hashtag.replace('#', '')];
    }
    if (query.searchTerm) {
      input.search = query.searchTerm;
    }

    // Start Apify Actor run
    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${apifyToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.map((item: Record<string, unknown>) => parseApifyInstagramResult(item));
  } catch (error) {
    console.error('Instagram scraping error:', error);
    throw new Error(`Failed to scrape Instagram: ${(error as Error).message}`);
  }
}

/**
 * Parse Apify Instagram scraper result into our standard format.
 */
function parseApifyInstagramResult(item: Record<string, unknown>): InstagramProfile {
  const bio = (item.biography as string) || '';
  
  return {
    username: (item.username as string) || '',
    full_name: (item.fullName as string) || (item.full_name as string) || '',
    bio,
    profile_pic_url: (item.profilePicUrl as string) || (item.profilePicUrlHD as string) || '',
    follower_count: (item.followersCount as number) || (item.followedByCount as number) || 0,
    following_count: (item.followingCount as number) || (item.followCount as number) || 0,
    post_count: (item.postsCount as number) || (item.mediaCount as number) || 0,
    is_business: (item.isBusinessAccount as boolean) || false,
    is_verified: (item.verified as boolean) || (item.isVerified as boolean) || false,
    external_url: (item.externalUrl as string) || (item.website as string) || null,
    email: extractEmailFromBio(bio) || (item.businessEmail as string) || null,
    phone: extractPhoneFromBio(bio) || (item.businessPhoneNumber as string) || null,
    category: (item.businessCategoryName as string) || (item.categoryName as string) || null,
    location: (item.cityName as string) || null,
    recent_posts: Array.isArray(item.latestPosts) 
      ? (item.latestPosts as Array<Record<string, unknown>>).slice(0, 10).map(post => ({
          text: (post.caption as string) || '',
          date: (post.timestamp as string) || new Date().toISOString(),
          likes: (post.likesCount as number) || 0,
          comments: (post.commentsCount as number) || 0,
          url: (post.url as string) || '',
          type: ((post.type as string) || 'image') as 'image' | 'video' | 'carousel',
        }))
      : [],
  };
}

/**
 * Calculate engagement rate for an Instagram profile.
 */
export function calculateEngagementRate(profile: InstagramProfile): number {
  if (profile.follower_count === 0 || profile.recent_posts.length === 0) {
    return 0;
  }
  
  const totalEngagement = profile.recent_posts.reduce(
    (sum, post) => sum + post.likes + post.comments, 
    0
  );
  const avgEngagement = totalEngagement / profile.recent_posts.length;
  
  return avgEngagement / profile.follower_count;
}

/**
 * Mock data for development without API keys.
 */
function getMockInstagramProfiles(limit: number): InstagramProfile[] {
  const mockProfiles: InstagramProfile[] = [
    {
      username: 'saas_founder_demo',
      full_name: 'Alex Chen',
      bio: '🚀 Building the future of B2B SaaS | CEO @TechStartup | Previously @Google | alex@techstartup.io | YC S24',
      profile_pic_url: '',
      follower_count: 12500,
      following_count: 890,
      post_count: 342,
      is_business: true,
      is_verified: false,
      external_url: 'https://techstartup.io',
      email: 'alex@techstartup.io',
      phone: null,
      category: 'Entrepreneur',
      location: 'San Francisco',
      recent_posts: [
        {
          text: 'Just closed our Series A! 🎉 $5M to revolutionize how SMBs handle their operations. Hiring across engineering, sales, and marketing. DM me!',
          date: '2026-07-28T10:00:00Z',
          likes: 847,
          comments: 123,
          url: '',
          type: 'image',
        },
        {
          text: 'The hardest part of scaling isn\'t the tech — it\'s finding the right leads. We spent 3 months manually prospecting before automating. Don\'t make our mistake.',
          date: '2026-07-25T14:00:00Z',
          likes: 534,
          comments: 67,
          url: '',
          type: 'image',
        },
      ],
    },
    {
      username: 'marketing_agency_lead',
      full_name: 'Sarah Johnson',
      bio: '📈 Growth Marketing Agency | Helped 200+ SaaS companies scale | Need leads? DM me | sarah@growthengine.co',
      profile_pic_url: '',
      follower_count: 8900,
      following_count: 1200,
      post_count: 567,
      is_business: true,
      is_verified: false,
      external_url: 'https://growthengine.co',
      email: 'sarah@growthengine.co',
      phone: null,
      category: 'Marketing Agency',
      location: 'New York',
      recent_posts: [
        {
          text: 'Client case study: How we generated 500 qualified leads in 30 days using LinkedIn + cold email automation. The secret? Deep personalization at scale.',
          date: '2026-07-30T09:00:00Z',
          likes: 423,
          comments: 89,
          url: '',
          type: 'carousel',
        },
      ],
    },
  ];

  return mockProfiles.slice(0, limit);
}
