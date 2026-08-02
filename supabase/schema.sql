-- LeadForge Database Schema
-- Run this in Supabase SQL Editor

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- USERS
-- ============================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'growth', 'agency')),
  credits_remaining INTEGER DEFAULT 50,
  credits_monthly_limit INTEGER DEFAULT 50,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ICP PROFILES (Ideal Customer Profiles)
-- ============================================
CREATE TABLE public.icp_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  industry TEXT,
  target_role TEXT,
  target_company_size TEXT,
  keywords TEXT[] DEFAULT '{}',
  embedding vector(1536),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- SCRAPE JOBS
-- ============================================
CREATE TABLE public.scrape_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  icp_profile_id UUID REFERENCES public.icp_profiles(id) ON DELETE SET NULL,
  
  -- Job Configuration
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'linkedin', 'twitter')),
  search_type TEXT NOT NULL CHECK (search_type IN (
    'keyword', 'hashtag', 'competitor_followers', 
    'location', 'lookalike', 'url_list'
  )),
  query JSONB NOT NULL DEFAULT '{}',
  -- e.g., { "keywords": ["saas founder"], "location": "San Francisco", "min_followers": 500 }
  
  -- Job Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'scraping', 'enriching', 'scoring', 'completed', 'failed', 'cancelled'
  )),
  progress INTEGER DEFAULT 0, -- 0-100
  
  -- Results
  leads_found INTEGER DEFAULT 0,
  leads_enriched INTEGER DEFAULT 0,
  leads_verified INTEGER DEFAULT 0,
  credits_used INTEGER DEFAULT 0,
  
  -- Errors
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- LEADS
-- ============================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.scrape_jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Platform Identity
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'linkedin', 'twitter')),
  platform_id TEXT, -- unique ID on the platform
  username TEXT,
  profile_url TEXT,
  
  -- Basic Info
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  location TEXT,
  website TEXT,
  
  -- Professional Info
  company TEXT,
  title TEXT,
  industry TEXT,
  
  -- Contact Info
  email TEXT,
  email_verified BOOLEAN DEFAULT false,
  email_verification_status TEXT, -- 'valid', 'invalid', 'risky', 'unknown'
  phone TEXT,
  
  -- Social Metrics
  follower_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  engagement_rate FLOAT,
  
  -- AI Intelligence (The Differentiator)
  icp_score INTEGER CHECK (icp_score >= 0 AND icp_score <= 100),
  ai_summary TEXT, -- "Why they're a fit" (2-3 sentences)
  intent_signals JSONB DEFAULT '[]',
  -- e.g., [{"type": "hiring", "signal": "Posted 3 AI engineer jobs this week", "strength": "high"}]
  pain_points JSONB DEFAULT '[]',
  -- e.g., ["Struggling with manual lead gen", "Looking for automation tools"]
  outreach_message TEXT, -- AI-generated personalized outreach
  
  -- Raw Data
  recent_posts JSONB DEFAULT '[]', -- last 5-10 posts/tweets
  raw_data JSONB DEFAULT '{}', -- full scraped payload
  
  -- Vector Embedding for RAG
  embedding vector(1536),
  
  -- Status
  is_favorite BOOLEAN DEFAULT false,
  is_exported BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

-- Vector similarity search index (HNSW for fast retrieval)
CREATE INDEX leads_embedding_idx ON public.leads 
  USING hnsw (embedding vector_cosine_ops);

CREATE INDEX icp_embedding_idx ON public.icp_profiles 
  USING hnsw (embedding vector_cosine_ops);

-- Performance indexes
CREATE INDEX leads_user_id_idx ON public.leads(user_id);
CREATE INDEX leads_job_id_idx ON public.leads(job_id);
CREATE INDEX leads_platform_idx ON public.leads(platform);
CREATE INDEX leads_icp_score_idx ON public.leads(icp_score DESC);
CREATE INDEX leads_email_verified_idx ON public.leads(email_verified) WHERE email IS NOT NULL;
CREATE INDEX scrape_jobs_user_id_idx ON public.scrape_jobs(user_id);
CREATE INDEX scrape_jobs_status_idx ON public.scrape_jobs(status);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to search leads by ICP similarity
CREATE OR REPLACE FUNCTION match_leads_to_icp(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 50,
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  username TEXT,
  platform TEXT,
  email TEXT,
  icp_score INTEGER,
  ai_summary TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id,
    l.full_name,
    l.username,
    l.platform,
    l.email,
    l.icp_score,
    l.ai_summary,
    1 - (l.embedding <=> query_embedding) AS similarity
  FROM public.leads l
  WHERE 
    1 - (l.embedding <=> query_embedding) > match_threshold
    AND (p_user_id IS NULL OR l.user_id = p_user_id)
  ORDER BY l.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER icp_profiles_updated_at
  BEFORE UPDATE ON public.icp_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER scrape_jobs_updated_at
  BEFORE UPDATE ON public.scrape_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icp_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrape_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own ICPs" ON public.icp_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own jobs" ON public.scrape_jobs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own leads" ON public.leads
  FOR ALL USING (auth.uid() = user_id);
