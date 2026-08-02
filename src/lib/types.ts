// LeadForge — Core TypeScript Types

// ============================================
// Database Types
// ============================================

export type Platform = 'instagram' | 'linkedin' | 'twitter';

export type SearchType = 
  | 'keyword' 
  | 'hashtag' 
  | 'competitor_followers' 
  | 'location' 
  | 'lookalike' 
  | 'url_list';

export type JobStatus = 
  | 'pending' 
  | 'scraping' 
  | 'enriching' 
  | 'scoring' 
  | 'completed' 
  | 'failed' 
  | 'cancelled';

export type PlanType = 'free' | 'starter' | 'growth' | 'agency';

export type EmailVerificationStatus = 'valid' | 'invalid' | 'risky' | 'unknown';

// ============================================
// User
// ============================================

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  stripe_customer_id: string | null;
  plan: PlanType;
  credits_remaining: number;
  credits_monthly_limit: number;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// ICP Profile
// ============================================

export interface ICPProfile {
  id: string;
  user_id: string;
  name: string;
  description: string;
  industry: string | null;
  target_role: string | null;
  target_company_size: string | null;
  keywords: string[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// Scrape Job
// ============================================

export interface ScrapeJobQuery {
  keywords?: string[];
  hashtags?: string[];
  competitor_username?: string;
  location?: string;
  lookalike_usernames?: string[];
  url_list?: string[];
  min_followers?: number;
  max_followers?: number;
  min_engagement_rate?: number;
  bio_keywords?: string[];
  limit?: number;
}

export interface ScrapeJob {
  id: string;
  user_id: string;
  icp_profile_id: string | null;
  platform: Platform;
  search_type: SearchType;
  query: ScrapeJobQuery;
  status: JobStatus;
  progress: number;
  leads_found: number;
  leads_enriched: number;
  leads_verified: number;
  credits_used: number;
  error_message: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

// ============================================
// Lead
// ============================================

export interface IntentSignal {
  type: 'hiring' | 'fundraising' | 'scaling' | 'pain_point' | 'tech_adoption' | 'competitor_mention' | 'buying_intent';
  signal: string;
  strength: 'high' | 'medium' | 'low';
  source: string; // which post/tweet/bio this came from
}

export interface Lead {
  id: string;
  job_id: string;
  user_id: string;
  
  // Platform Identity
  platform: Platform;
  platform_id: string | null;
  username: string | null;
  profile_url: string | null;
  
  // Basic Info
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  website: string | null;
  
  // Professional Info
  company: string | null;
  title: string | null;
  industry: string | null;
  
  // Contact Info
  email: string | null;
  email_verified: boolean;
  email_verification_status: EmailVerificationStatus | null;
  phone: string | null;
  
  // Social Metrics
  follower_count: number;
  following_count: number;
  post_count: number;
  engagement_rate: number | null;
  
  // AI Intelligence
  icp_score: number | null;
  ai_summary: string | null;
  intent_signals: IntentSignal[];
  pain_points: string[];
  outreach_message: string | null;
  
  // Raw Data
  recent_posts: Array<{
    text: string;
    date: string;
    likes: number;
    comments: number;
    url?: string;
  }>;
  raw_data: Record<string, unknown>;

  // Vector Embedding for RAG
  embedding?: number[];
  
  // Status
  is_favorite: boolean;
  is_exported: boolean;
  
  created_at: string;
}

// ============================================
// API Request/Response Types
// ============================================

export interface CreateJobRequest {
  platform: Platform;
  search_type: SearchType;
  query: ScrapeJobQuery;
  icp_profile_id?: string;
  icp_description?: string; // natural language ICP if no saved profile
}

export interface CreateJobResponse {
  job: ScrapeJob;
  estimated_credits: number;
}

export interface LeadListResponse {
  leads: Lead[];
  total: number;
  page: number;
  per_page: number;
  filters: {
    min_score: number;
    has_email: boolean;
    platform: Platform | 'all';
  };
}

export interface ExportRequest {
  job_id?: string;
  lead_ids?: string[];
  format: 'csv' | 'json';
  include_fields?: string[];
}

// ============================================
// Plan Configuration
// ============================================

export const PLAN_CONFIG: Record<PlanType, {
  name: string;
  price: number;
  credits: number;
  features: string[];
}> = {
  free: {
    name: 'Free Trial',
    price: 0,
    credits: 50,
    features: [
      'Single platform',
      'Basic AI scoring',
      'CSV export',
    ],
  },
  starter: {
    name: 'Starter',
    price: 39,
    credits: 500,
    features: [
      'All 3 platforms',
      'AI ICP scoring',
      '"Why they fit" summaries',
      'CSV/JSON export',
      'Email extraction',
    ],
  },
  growth: {
    name: 'Growth',
    price: 79,
    credits: 2000,
    features: [
      'Everything in Starter',
      'Email verification',
      'AI outreach messages',
      'Saved ICP profiles',
      'Intent signal detection',
      'Priority scraping',
    ],
  },
  agency: {
    name: 'Agency',
    price: 149,
    credits: 10000,
    features: [
      'Everything in Growth',
      'API access',
      'Team seats (up to 5)',
      'Webhook integrations',
      'Dedicated support',
      'Custom ICP models',
    ],
  },
};
