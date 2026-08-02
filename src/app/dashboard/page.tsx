import Link from "next/link";

export default function DashboardOverview() {
  const stats = [
    { label: "Total Scraped Leads", value: "1,248", change: "+18%", icon: "🎯", color: "violet" },
    { label: "High Match (80%+ ICP)", value: "542", change: "+24%", icon: "🧠", color: "emerald" },
    { label: "Verified Emails", value: "891", change: "+12%", icon: "📧", color: "cyan" },
    { label: "Credits Left", value: "450 / 500", change: "Resets in 12d", icon: "⚡", color: "amber" },
  ];

  const recentJobs = [
    { id: "1", query: "SaaS Founders in Fintech", platform: "LinkedIn", status: "completed", leads: 48, date: "10 mins ago" },
    { id: "2", query: "#growthhacking OR #saas", platform: "Twitter", status: "completed", leads: 120, date: "2 hours ago" },
    { id: "3", query: "Marketing Agency Owners", platform: "Instagram", status: "scraping", leads: 32, date: "Running..." },
  ];

  const topLeads = [
    { name: "Alex Chen", role: "CEO @ TechStartup", platform: "LinkedIn", score: 94, email: "alex@techstartup.io" },
    { name: "Sarah Johnson", role: "VP Marketing @ GrowthForge", platform: "Instagram", score: 89, email: "sarah@growthforge.co" },
    { name: "Marcus Rivera", role: "CTO @ InnovateTech", platform: "Twitter", score: 85, email: "marcus@innovatetech.com" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-violet-900/30 via-indigo-900/20 to-transparent p-6 rounded-2xl border border-violet-500/20">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Alex! 👋</h1>
          <p className="text-sm text-white/50">Your RAG intelligence engine has processed 1,248 leads this month.</p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-violet-500/20"
        >
          <span>⚡ Launch New Scraper</span>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#12121a] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Scrape Jobs */}
        <div className="lg:col-span-2 bg-[#12121a] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Scrape Jobs</h2>
            <Link href="/dashboard/leads" className="text-xs text-violet-400 hover:underline">View All</Link>
          </div>

          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-sm font-bold text-violet-400">
                    {job.platform[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{job.query}</p>
                    <p className="text-xs text-white/40">{job.platform} • {job.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    job.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                  }`}>
                    {job.status}
                  </span>
                  <span className="text-sm font-mono font-medium text-white/80">{job.leads} leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Matches */}
        <div className="bg-[#12121a] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Top ICP Matches</h2>
            <span className="text-xs text-emerald-400 font-mono">RAG Scored</span>
          </div>

          <div className="space-y-4">
            {topLeads.map((lead) => (
              <div key={lead.name} className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-white">{lead.name}</p>
                    <p className="text-xs text-white/40">{lead.role}</p>
                  </div>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold px-2 py-0.5 rounded">
                    {lead.score} fit
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 text-white/50 border-t border-white/5">
                  <span className="truncate">{lead.email}</span>
                  <span className="text-violet-400 font-medium">Ready →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
