# LeadForge — AI Lead Intelligence & Multi-Platform Scraper

**LeadForge** is a high-precision, production-ready AI B2B lead generation platform. It scrapes profiles across **Instagram, LinkedIn, and Twitter (X)**, enriches data using **Google Gemini 2.0 Flash** & **text-embedding-004**, ranks leads against Ideal Customer Profiles (ICPs) using **Supabase `pgvector`**, and automatically generates hyper-personalized cold outreach messages.

---

## ⚡ Key Features

- **Multi-Platform Scraper**: Extract rich B2B profiles, verified emails, follower metrics, and recent posts from Instagram, LinkedIn, and Twitter.
- **Google Gemini RAG Intelligence Engine**:
  - **Vector Embeddings (`text-embedding-004`)**: Converts lead profiles and ICP descriptions into high-dimensional vector representations.
  - **LLM Scoring (`gemini-2.0-flash`)**: Ranks alignment from `0-100` and generates 2-3 sentence executive summaries on fit.
- **Intent Signal Detection**: Detects buying intent, hiring spikes, fundraising news, and pain points directly from social post activity.
- **Personalized Outreach Generation**: Drafts tailored, non-generic cold DMs and emails referencing specific details from the lead's content.
- **Supabase `pgvector` Database**: Instant cosine similarity search for finding top ICP matches.
- **CSV Export**: One-click export for cold email sequences in Instantly, Smartlead, or Lemlist.
- **Stripe Billing Ready**: Integrated Stripe Checkout and Webhooks for starter, growth, and agency plans.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript, Turbopack)
- **Database & Auth**: Supabase PostgreSQL with `pgvector` extension
- **AI Models**: Google Gemini 2.0 Flash (`@google/genai`) & OpenAI GPT-4o-mini fallback
- **Scraping Infrastructure**: Apify Actor API & Proxycurl API
- **Payments**: Stripe Billing API & Webhooks
- **Styling**: Tailwind CSS, Lucide Icons, Glassmorphism UI Design

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/sourishkundu23/LeadForge.git
cd LeadForge
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your API credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Providers (Google Gemini FREE tier)
GEMINI_API_KEY=AIzaSy...

# Scraping
APIFY_API_TOKEN=apify_api_...

# Payments (Stripe)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Setup Supabase Database
Run the SQL script inside `supabase/schema.sql` in your **Supabase SQL Editor**:
- Enables `pgvector` extension
- Creates `users`, `scrape_jobs`, `leads`, and `icp_profiles` tables
- Configures cosine similarity search functions

### 4. Launch Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Deployment to Vercel

1. Push code to GitHub repository `sourishkundu23/LeadForge`.
2. Import project into [Vercel](https://vercel.com).
3. Add environment variables from `.env.local` to Vercel project settings.
4. Click **Deploy**.

---

## 📄 License

MIT License © 2026 LeadForge
