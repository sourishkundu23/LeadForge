/**
 * LeadForge — Twitter/X Public Profile Scraper
 * 
 * Scrapes publicly available Twitter/X data.
 * Uses Apify Twitter scraper for reliable extraction.
 */

export interface TwitterProfile {
  username: string;
  full_name: string;
  bio: string;
  profile_pic_url: string;
  follower_count: number;
  following_count: number;
  tweet_count: number;
  is_verified: boolean;
  location: string | null;
  website: string | null;
  email: string | null;
  joined_date: string | null;
  recent_tweets: Array<{
    text: string;
    date: string;
    likes: number;
    retweets: number;
    replies: number;
    url: string;
  }>;
}

/**
 * Extract email from bio or pinned tweet.
 */
function extractEmail(text: string): string | null {
  if (!text) return null;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex);
  if (matches) {
    const filtered = matches.filter(e => {
      const lower = e.toLowerCase();
      return !lower.includes('example.com') && !lower.includes('@x.com');
    });
    return filtered[0] || null;
  }
  return null;
}

/**
 * Scrape Twitter profiles using Apify Twitter Scraper.
 */
export async function scrapeTwitterProfiles(
  query: {
    usernames?: string[];
    searchTerm?: string;
    hashtag?: string;
    limit?: number;
  }
): Promise<TwitterProfile[]> {
  const apifyToken = process.env.APIFY_API_TOKEN;

  if (!apifyToken) {
    console.warn('APIFY_API_TOKEN not set — using mock data for development');
    return getMockTwitterProfiles(query.limit || 10);
  }

  try {
    const input: Record<string, unknown> = {
      maxItems: query.limit || 50,
      sort: 'Latest',
    };

    if (query.usernames) {
      // Scrape specific profiles
      input.startUrls = query.usernames.map(u => ({
        url: `https://x.com/${u.replace('@', '')}`,
      }));
      input.twitterHandles = query.usernames.map(u => u.replace('@', ''));
    }
    
    if (query.searchTerm || query.hashtag) {
      const term = query.searchTerm || `#${query.hashtag?.replace('#', '')}`;
      input.searchTerms = [term];
      input.searchMode = 'people'; // Search for people, not tweets
    }

    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~twitter-scraper/run-sync-get-dataset-items?token=${apifyToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.status}`);
    }

    const data = await response.json();
    return parseTwitterResults(data);
  } catch (error) {
    console.error('Twitter scraping error:', error);
    throw new Error(`Failed to scrape Twitter: ${(error as Error).message}`);
  }
}

/**
 * Parse Apify Twitter scraper results into our standard format.
 */
function parseTwitterResults(data: Record<string, unknown>[]): TwitterProfile[] {
  // Group tweets by author to build profiles
  const profileMap = new Map<string, TwitterProfile>();

  for (const item of data) {
    const author = item.author as Record<string, unknown> | undefined;
    const username = (author?.userName as string) || (item.userName as string) || '';
    
    if (!username) continue;

    if (!profileMap.has(username)) {
      const bio = (author?.description as string) || (item.description as string) || '';
      
      profileMap.set(username, {
        username,
        full_name: (author?.name as string) || (item.name as string) || '',
        bio,
        profile_pic_url: (author?.profilePicture as string) || '',
        follower_count: (author?.followers as number) || (item.followersCount as number) || 0,
        following_count: (author?.following as number) || (item.followingCount as number) || 0,
        tweet_count: (author?.statusesCount as number) || 0,
        is_verified: (author?.isVerified as boolean) || (item.isVerified as boolean) || false,
        location: (author?.location as string) || null,
        website: (author?.website as string) || null,
        email: extractEmail(bio),
        joined_date: (author?.createdAt as string) || null,
        recent_tweets: [],
      });
    }

    // Add tweet to the profile
    const profile = profileMap.get(username)!;
    if (item.text || item.fullText) {
      const tweetText = (item.fullText as string) || (item.text as string) || '';
      profile.recent_tweets.push({
        text: tweetText,
        date: (item.createdAt as string) || new Date().toISOString(),
        likes: (item.likeCount as number) || (item.favoriteCount as number) || 0,
        retweets: (item.retweetCount as number) || 0,
        replies: (item.replyCount as number) || 0,
        url: (item.url as string) || `https://x.com/${username}`,
      });

      // Also try to extract email from tweets
      if (!profile.email) {
        profile.email = extractEmail(tweetText);
      }
    }
  }

  // Limit recent tweets per profile
  for (const profile of profileMap.values()) {
    profile.recent_tweets = profile.recent_tweets.slice(0, 10);
  }

  return Array.from(profileMap.values());
}

/**
 * Calculate engagement rate for a Twitter profile.
 */
export function calculateTwitterEngagementRate(profile: TwitterProfile): number {
  if (profile.follower_count === 0 || profile.recent_tweets.length === 0) return 0;
  
  const totalEngagement = profile.recent_tweets.reduce(
    (sum, tweet) => sum + tweet.likes + tweet.retweets + tweet.replies,
    0
  );
  const avgEngagement = totalEngagement / profile.recent_tweets.length;
  
  return avgEngagement / profile.follower_count;
}

/**
 * Mock Twitter profiles for development.
 */
function getMockTwitterProfiles(limit: number): TwitterProfile[] {
  const mocks: TwitterProfile[] = [
    {
      username: 'startup_cto',
      full_name: 'Marcus Rivera',
      bio: 'CTO @InnovateTech | Building AI-powered sales tools | Ex-Stripe, Ex-Meta | Opinions are my own | marcus@innovatetech.com',
      profile_pic_url: '',
      follower_count: 15400,
      following_count: 1230,
      tweet_count: 4500,
      is_verified: true,
      location: 'Austin, TX',
      website: 'https://innovatetech.com',
      email: 'marcus@innovatetech.com',
      joined_date: '2019-03-15',
      recent_tweets: [
        {
          text: 'We just launched our new AI SDR tool and the response has been insane. 500 beta signups in 48 hours. The market is hungry for better outbound tools.',
          date: '2026-07-31T16:00:00Z',
          likes: 892,
          retweets: 134,
          replies: 67,
          url: 'https://x.com/startup_cto/status/123',
        },
        {
          text: 'Hot take: Most lead gen tools are broken because they focus on quantity over quality. We need fewer, better leads — not 10,000 unqualified contacts.',
          date: '2026-07-29T12:00:00Z',
          likes: 1243,
          retweets: 287,
          replies: 156,
          url: 'https://x.com/startup_cto/status/124',
        },
      ],
    },
    {
      username: 'growth_hacker_pro',
      full_name: 'Lisa Park',
      bio: '📊 Head of Growth @ScaleUp | I turn cold leads into warm deals | Speaker | Newsletter: growthweekly.co',
      profile_pic_url: '',
      follower_count: 23000,
      following_count: 890,
      tweet_count: 8900,
      is_verified: false,
      location: 'London, UK',
      website: 'https://growthweekly.co',
      email: null,
      joined_date: '2018-06-01',
      recent_tweets: [
        {
          text: 'Thread: How I generated $200K in pipeline using LinkedIn + Twitter lead scraping 🧵\n\n1/ First, stop using generic tools. You need platform-specific intelligence.',
          date: '2026-07-30T08:00:00Z',
          likes: 2100,
          retweets: 456,
          replies: 89,
          url: 'https://x.com/growth_hacker_pro/status/125',
        },
      ],
    },
  ];

  return mocks.slice(0, limit);
}
