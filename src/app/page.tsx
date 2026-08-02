import Link from "next/link";
import { PLAN_CONFIG } from "@/lib/types";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-violet-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-t from-emerald-600/10 via-cyan-600/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              LeadForge
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25"
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ✦ Multi-Platform AI Extraction & RAG Intelligence Engine
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
              Turn Social Media Data Into
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              High-Intent Sales Pipelines
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Autonomous lead extraction across Instagram, LinkedIn & Twitter. Extract verified B2B contacts, score ICP alignment using 1536-dim vector RAG, and generate hyper-personalized cold outreach copy.
            <span className="text-white font-semibold"> Clay-level intelligence at 5x lower cost.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
            >
              Start Free — 50 Credits
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-white/80 hover:text-white px-6 py-4 rounded-xl transition-colors font-medium border border-white/10 hover:border-white/20 bg-white/[0.02]"
            >
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Live Workflow
            </a>
          </div>

          {/* Hero Visual — Mock Dashboard */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-white/10 bg-[#12121a] shadow-2xl shadow-black/50 overflow-hidden">
              {/* Mock Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0d0d15]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-white/40 font-mono text-center">
                    app.leadforge.ai/dashboard
                  </div>
                </div>
              </div>
              {/* Mock Dashboard Content */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Leads Found', value: '1,247', color: 'violet' },
                    { label: 'Avg ICP Score', value: '78/100', color: 'emerald' },
                    { label: 'Verified Emails', value: '891', color: 'cyan' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-white/50 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                {/* Mock Lead Rows */}
                <div className="space-y-2">
                  {[
                    { name: 'Alex Chen', role: 'CEO @ TechStartup', score: 94, platform: '📸', email: true },
                    { name: 'Sarah Johnson', role: 'VP Marketing @ GrowthForge', score: 87, platform: '💼', email: true },
                    { name: 'Marcus Rivera', role: 'CTO @ InnovateTech', score: 82, platform: '🐦', email: true },
                    { name: 'Lisa Park', role: 'Head of Growth @ ScaleUp', score: 76, platform: '🐦', email: false },
                  ].map((lead) => (
                    <div key={lead.name} className="flex items-center gap-4 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/30 flex items-center justify-center text-xs">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white/90 truncate">{lead.name}</p>
                        <p className="text-xs text-white/50 truncate">{lead.role}</p>
                      </div>
                      <span className="text-sm">{lead.platform}</span>
                      <div className={`px-2 py-0.5 rounded text-xs font-mono ${
                        lead.score >= 90 ? 'bg-emerald-500/20 text-emerald-400' :
                        lead.score >= 70 ? 'bg-violet-500/20 text-violet-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {lead.score}
                      </div>
                      {lead.email && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-white/50 mb-6 font-medium">Trusted by high-growth B2B teams and outbound agencies</p>
          <div className="flex items-center justify-center gap-12 text-white/40">
            {['SaaS Founders', 'Growth Agencies', 'SDR Teams', 'Indie Hackers', 'Marketing Teams'].map((name) => (
              <span key={name} className="text-sm font-medium">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Not Just a Scraper.
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                An Autonomous Lead Intelligence Engine.
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Standard scrapers dump unverified contact lists. LeadForge enriches every lead with 1536-dim RAG scoring, intent signal detection, and customized outreach copy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Multi-Platform Extraction',
                description: 'Extract leads across Instagram, LinkedIn, and Twitter from a single dashboard. Filter by bio keywords, follower thresholds, or geo-locations.',
                gradient: 'from-violet-500/20 to-indigo-500/20',
              },
              {
                icon: '🧠',
                title: '1536-Dim RAG ICP Scoring',
                description: 'Google Gemini computes vector embeddings for every profile to measure semantic alignment against your exact ICP on a 0 to 100 scale.',
                gradient: 'from-emerald-500/20 to-cyan-500/20',
              },
              {
                icon: '📧',
                title: 'Verified Contact Discovery',
                description: 'Extract deliverable business emails and phone numbers from bios, external sites, and profile data with pre-verified validation.',
                gradient: 'from-amber-500/20 to-orange-500/20',
              },
              {
                icon: '🎯',
                title: '"Why They Fit" Executive Summaries',
                description: 'Every record includes a 2-3 sentence AI summary breaking down exactly why the prospect matches your ICP criteria.',
                gradient: 'from-rose-500/20 to-pink-500/20',
              },
              {
                icon: '📡',
                title: 'Real-Time Intent Signal Detection',
                description: 'Identify high-intent buying signals: hiring sprees, fundraising announcements, tool complaints, and competitor mentions.',
                gradient: 'from-cyan-500/20 to-blue-500/20',
              },
              {
                icon: '✉️',
                title: 'Hyper-Personalized Outreach',
                description: 'Generate non-generic cold DMs and emails referencing specific posts, achievements, or bio details for maximum reply rates.',
                gradient: 'from-indigo-500/20 to-violet-500/20',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              From Search Query to Closed Deals in 3 Steps
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Automate your outbound lead sourcing pipeline without manual spreadsheet work.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                step: '01',
                title: '1. Prompt Your Target ICP',
                description: 'Describe your target customer in natural language: "SaaS founders in fintech with 1K+ followers who talk about automation." Our AI understands your criteria instantly.',
                color: 'violet',
              },
              {
                step: '02',
                title: '2. Autonomous Scrape & RAG Scoring',
                description: 'LeadForge extracts live profiles across Instagram, Twitter, and LinkedIn, pulls verified emails, and computes 1536-dimensional vector embeddings to rank profile alignment from 0 to 100.',
                color: 'indigo',
              },
              {
                step: '03',
                title: '3. Export & Launch Campaigns',
                description: 'Get a ranked database of qualified B2B contacts with AI-written cold DMs, intent signal breakdowns, and verified deliverability. Export to CSV or push to your CRM.',
                color: 'cyan',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center`}>
                  <span className={`text-2xl font-bold text-violet-400 font-mono`}>{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Why High-Growth Teams Switch to LeadForge
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto">
              Stop paying $185/mo for complex workflows or $69/mo for raw unverified profiles. Get end-to-end B2B data extraction and RAG scoring in one unified platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/50 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-white/50 font-medium">PhantomBuster</th>
                  <th className="text-center py-4 px-4 text-white/50 font-medium">Clay</th>
                  <th className="text-center py-4 px-4 text-white/50 font-medium">IGLeads</th>
                  <th className="text-center py-4 px-4">
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-bold">LeadForge</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                {[
                  ['Multi-platform scrape', '✅', '❌', '❌', '✅'],
                  ['AI ICP scoring', '❌', '✅', '❌', '✅'],
                  ['RAG enrichment', '❌', 'Partial', '❌', '✅'],
                  ['"Why they fit" summaries', '❌', '✅', '❌', '✅'],
                  ['Email verification', '❌', 'Via credits', '✅', '✅'],
                  ['Outreach messages', '❌', 'Complex', '❌', '✅'],
                  ['Learning curve', '🔴 High', '🔴 Very High', '🟢 Low', '🟢 Low'],
                  ['Starting price', '$69/mo', '$185/mo', '$49/mo', '$39/mo'],
                ].map(([feature, ...values]) => (
                  <tr key={feature} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 text-white/90 font-medium">{feature}</td>
                    {values.map((val, i) => (
                      <td key={i} className={`py-3.5 px-4 text-center ${i === 3 ? 'text-violet-400 font-bold' : ''}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/70 text-lg">Start free with 50 leads. Scale when your revenue demands it.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 items-stretch">
            {(Object.entries(PLAN_CONFIG) as [string, typeof PLAN_CONFIG['free']][]).map(([key, plan]) => {
              const isPopular = key === 'growth';
              return (
                <div
                  key={key}
                  className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    isPopular
                      ? 'border-violet-500/50 bg-violet-500/5 shadow-lg shadow-violet-500/10'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-xs font-medium text-white">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold text-white">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && <span className="text-white/40 text-sm">/month</span>}
                    </div>
                    <p className="text-sm text-white/70 mb-6 font-medium">
                      {plan.credits.toLocaleString()} leads/month
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                          <svg className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4">
                    <Link
                      href="/signup"
                      className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        isPopular
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/25'
                          : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {plan.price === 0 ? 'Start Free' : 'Get Started'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Stop Scraping Manually.
            </span>
            <br />
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              Start Closing High-Intent Deals.
            </span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Join hundreds of growth teams using LeadForge to find, qualify, and convert leads with vector RAG intelligence.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
          >
            Get Started Free — 50 Leads Included
          </Link>
        </div>
      </section>
    </div>
  );
}
