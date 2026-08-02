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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              LeadForge
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now scraping Instagram, LinkedIn & Twitter
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              AI Lead Intelligence
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              That Actually Works
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Scrape leads from Instagram, LinkedIn & Twitter. Get AI-powered ICP scoring, 
            intent signals, and personalized outreach messages — all in one workflow.
            <span className="text-white/70 font-medium"> Clay-level intelligence at 5x less cost.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
            >
              Start Free — 50 Leads
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-white/60 hover:text-white px-6 py-4 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
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
                  <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-white/30 font-mono text-center">
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
                      <p className="text-xs text-white/40 mb-1">{stat.label}</p>
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
                        <p className="text-xs text-white/40 truncate">{lead.role}</p>
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
          <p className="text-sm text-white/30 mb-6">Trusted by growth teams and agencies worldwide</p>
          <div className="flex items-center justify-center gap-12 text-white/20">
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
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Not Just a Scraper.
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                An Intelligence Engine.
              </span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Most scrapers give you raw data. LeadForge gives you qualified, 
              enriched leads with AI-generated context and outreach messages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Multi-Platform Scraping',
                description: 'Scrape Instagram, LinkedIn, and Twitter from one dashboard. Search by keywords, hashtags, competitor followers, or location.',
                gradient: 'from-violet-500/20 to-indigo-500/20',
              },
              {
                icon: '🧠',
                title: 'RAG-Powered ICP Scoring',
                description: 'AI analyzes each lead\'s bio, posts, and company data against your ICP using RAG — not generic pattern matching. Get 0-100 fit scores.',
                gradient: 'from-emerald-500/20 to-cyan-500/20',
              },
              {
                icon: '📧',
                title: 'Email Extraction + Verification',
                description: 'Automatically extract emails from bios, websites, and social profiles. Verify deliverability before you send a single email.',
                gradient: 'from-amber-500/20 to-orange-500/20',
              },
              {
                icon: '🎯',
                title: '"Why They Fit" Summaries',
                description: 'Every lead gets a 2-3 sentence AI summary explaining exactly why they match your ICP — or why they don\'t. No guesswork.',
                gradient: 'from-rose-500/20 to-pink-500/20',
              },
              {
                icon: '📡',
                title: 'Intent Signal Detection',
                description: 'AI detects buying signals: hiring posts, fundraising announcements, pain point discussions, and competitor mentions.',
                gradient: 'from-cyan-500/20 to-blue-500/20',
              },
              {
                icon: '✉️',
                title: 'Personalized Outreach',
                description: 'Get AI-generated cold DMs and emails that reference specific things about each lead. No more "Hi {first_name}" templates.',
                gradient: 'from-indigo-500/20 to-violet-500/20',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              From Search to Outreach in 3 Steps
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Define Your ICP',
                description: 'Tell LeadForge who you\'re looking for in plain English: "SaaS founders in fintech with 1K+ followers who talk about automation." Our AI understands exactly what you need.',
                color: 'violet',
              },
              {
                step: '02',
                title: 'We Scrape & Enrich',
                description: 'LeadForge scrapes profiles across all 3 platforms, extracts contact info, analyzes their content with RAG, and scores every lead against your ICP. All automatically.',
                color: 'indigo',
              },
              {
                step: '03',
                title: 'Export & Close Deals',
                description: 'Get a ranked list of qualified leads with verified emails, AI summaries, intent signals, and ready-to-send outreach messages. Export to CSV or push to your CRM.',
                color: 'cyan',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center`}>
                  <span className={`text-2xl font-bold text-${item.color}-400 font-mono`}>{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed">{item.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Why Teams Switch to LeadForge
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/40 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-white/40 font-medium">PhantomBuster</th>
                  <th className="text-center py-4 px-4 text-white/40 font-medium">Clay</th>
                  <th className="text-center py-4 px-4 text-white/40 font-medium">IGLeads</th>
                  <th className="text-center py-4 px-4">
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-bold">LeadForge</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-white/60">
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
                    <td className="py-3 px-4 text-white/70 font-medium">{feature}</td>
                    {values.map((val, i) => (
                      <td key={i} className={`py-3 px-4 text-center ${i === 3 ? 'text-violet-400 font-medium' : ''}`}>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/40 text-lg">Start free. Scale when you&apos;re ready.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {(Object.entries(PLAN_CONFIG) as [string, typeof PLAN_CONFIG['free']][]).map(([key, plan]) => {
              const isPopular = key === 'growth';
              return (
                <div
                  key={key}
                  className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
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
                  <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-white">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && <span className="text-white/30 text-sm">/month</span>}
                  </div>
                  <p className="text-sm text-white/40 mb-6">
                    {plan.credits.toLocaleString()} leads/month
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-white/50">
                        <svg className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isPopular
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/25'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {plan.price === 0 ? 'Start Free' : 'Get Started'}
                  </Link>
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
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Start Closing Deals.
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of growth teams using LeadForge to find, qualify, 
            and reach their ideal customers across social platforms.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
          >
            Get 50 Free Leads Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white/60">LeadForge</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-white/20">© 2026 LeadForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
