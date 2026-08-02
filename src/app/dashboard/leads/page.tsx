"use client";

import { useState, useEffect } from "react";

interface MockLead {
  id: string;
  name: string;
  username: string;
  platform: string;
  title: string;
  company: string;
  bio: string;
  email: string | null;
  email_verified: boolean;
  followers: number;
  score: number;
  ai_summary: string;
  outreach_message: string;
}

export default function LeadsDatabasePage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [minScore, setMinScore] = useState<number>(70);
  const [onlyEmails, setOnlyEmails] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<MockLead | null>(null);
  const [liveLeads, setLiveLeads] = useState<MockLead[]>([]);

  useEffect(() => {
    async function fetchLiveLeads() {
      try {
        const queryParams = new URLSearchParams({
          min_score: minScore.toString(),
          has_email: onlyEmails.toString(),
          platform: selectedPlatform,
        });
        const res = await fetch(`/api/leads?${queryParams.toString()}`, {
          headers: { Authorization: "Bearer dev-token" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.leads && data.leads.length > 0) {
            const mapped: MockLead[] = data.leads.map((l: any) => ({
              id: l.id,
              name: l.full_name || l.username || "Unknown",
              username: l.username || "user",
              platform: l.platform,
              title: l.title || "Professional",
              company: l.company || "Company",
              bio: l.bio || "",
              email: l.email,
              email_verified: l.email_verified || false,
              followers: l.follower_count || 0,
              score: l.icp_score || 50,
              ai_summary: l.ai_summary || "Scraped and processed by RAG engine.",
              outreach_message: l.outreach_message || "Hey! Noticed your profile on " + l.platform + "...",
            }));
            setLiveLeads(mapped);
          }
        }
      } catch {
        // Fallback to mock leads if offline or no DB connection
      }
    }
    fetchLiveLeads();
  }, [selectedPlatform, minScore, onlyEmails]);

  const mockLeads = [
    {
      id: "1",
      name: "Alex Chen",
      username: "alexchen_saas",
      platform: "linkedin",
      title: "Founder & CEO",
      company: "TechStartup.io",
      bio: "🚀 Building the future of B2B SaaS | CEO @TechStartup | Previously @Google | alex@techstartup.io | YC S24",
      email: "alex@techstartup.io",
      email_verified: true,
      followers: 12500,
      score: 94,
      ai_summary: "High-intent match. Active SaaS founder currently hiring engineering & sales leads. Clear decision maker with verified contact info.",
      outreach_message: "Hi Alex, saw your recent post about closing your Series A! Impressive growth at TechStartup.io. Given your focus on scaling sales outreach right now, thought you'd find our RAG lead intelligence engine interesting...",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      username: "sarah_growth",
      platform: "instagram",
      title: "VP of Marketing",
      company: "GrowthForge Agency",
      bio: "📈 Growth Marketing Agency | Helped 200+ SaaS companies scale | Need leads? DM me | sarah@growthengine.co",
      email: "sarah@growthengine.co",
      email_verified: true,
      followers: 8900,
      score: 89,
      ai_summary: "Strong fit. Runs a growth agency scaling outbound for SaaS clients. High likelihood of purchasing agency-tier scraping credits.",
      outreach_message: "Hey Sarah, loved your case study on generating 500 leads in 30 days. As someone scaling growth engines for SaaS clients, you might want to test our multi-platform RAG enrichment tool to double lead quality...",
    },
    {
      id: "3",
      name: "Marcus Rivera",
      username: "startup_cto",
      platform: "twitter",
      title: "CTO & Co-Founder",
      company: "InnovateTech AI",
      bio: "CTO @InnovateTech | Building AI-powered sales tools | Ex-Stripe | marcus@innovatetech.com",
      email: "marcus@innovatetech.com",
      email_verified: true,
      followers: 15400,
      score: 85,
      ai_summary: "Solid technical decision maker. Active poster in AI sales tech space. Explicitly looking for higher quality lead pipelines.",
      outreach_message: "Hey Marcus, resonated with your hot take on lead tools needing higher precision over raw quantity. Built LeadForge specifically with pgvector RAG to solve that context gap...",
    },
    {
      id: "4",
      name: "Lisa Park",
      username: "lisa_growth_pro",
      platform: "twitter",
      title: "Head of Growth",
      company: "ScaleUp Global",
      bio: "Head of Growth @ScaleUp | Speaker | Newsletter: growthweekly.co",
      email: null,
      email_verified: false,
      followers: 23000,
      score: 74,
      ai_summary: "Good profile fit but missing direct verified email. High engagement on Twitter lead automation threads.",
      outreach_message: "Hi Lisa, noticed your thread on LinkedIn & Twitter lead pipelines. Sharing a quick demo of how LeadForge scores profiles automatically using RAG...",
    },
  ];

  const allLeads = liveLeads.length > 0 ? liveLeads : mockLeads;

  const filteredLeads = allLeads.filter((lead) => {
    if (selectedPlatform !== "all" && lead.platform !== selectedPlatform) return false;
    if (lead.score < minScore) return false;
    if (onlyEmails && !lead.email) return false;
    return true;
  });

  const handleExportCSV = () => {
    const csvHeader = "Name,Username,Platform,Title,Company,Email,Verified,Score,AI Summary\n";
    const csvRows = filteredLeads
      .map(
        (l) =>
          `"${l.name}","${l.username}","${l.platform}","${l.title}","${l.company}","${l.email || ""}","${
            l.email_verified
          }",${l.score},"${l.ai_summary.replace(/"/g, '""')}"`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leadforge-export-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Leads Database</h1>
          <p className="text-sm text-white/50">
            {filteredLeads.length} enriched leads matching current filters.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-xl border border-white/10 text-sm transition-all"
        >
          <span>📥 Export to CSV</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#12121a] border border-white/5 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {["all", "linkedin", "instagram", "twitter"].map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedPlatform === plat
                  ? "bg-violet-600 text-white"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span>Min ICP Score:</span>
            <span className="font-mono font-bold text-violet-400">{minScore}+</span>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="accent-violet-500 bg-white/10 rounded cursor-pointer w-24"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyEmails}
              onChange={(e) => setOnlyEmails(e.target.checked)}
              className="rounded accent-violet-500"
            />
            <span>Has Email Only</span>
          </label>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#12121a] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0d0d15] text-white/40 border-b border-white/5 text-xs">
              <tr>
                <th className="py-3.5 px-6 font-medium">Lead Profile</th>
                <th className="py-3.5 px-4 font-medium">Role & Company</th>
                <th className="py-3.5 px-4 font-medium">Platform</th>
                <th className="py-3.5 px-4 font-medium">Contact</th>
                <th className="py-3.5 px-4 font-medium">ICP Match</th>
                <th className="py-3.5 px-6 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-sm font-bold text-violet-400">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{lead.name}</p>
                        <p className="text-xs text-white/40">@{lead.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/80">
                    <p className="text-xs font-medium">{lead.title}</p>
                    <p className="text-[11px] text-white/40">{lead.company}</p>
                  </td>
                  <td className="py-4 px-4 capitalize text-xs text-white/60">
                    {lead.platform === "linkedin" && "💼 LinkedIn"}
                    {lead.platform === "instagram" && "📸 Instagram"}
                    {lead.platform === "twitter" && "🐦 Twitter"}
                  </td>
                  <td className="py-4 px-4 text-xs font-mono">
                    {lead.email ? (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <span>{lead.email}</span>
                        {lead.email_verified && <span className="text-[10px] bg-emerald-500/20 px-1 rounded">✓</span>}
                      </div>
                    ) : (
                      <span className="text-white/20">No email found</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-xs font-mono font-bold ${
                        lead.score >= 90
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : lead.score >= 80
                          ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {lead.score} / 100
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-xs bg-violet-600/20 text-violet-400 hover:bg-violet-600 hover:text-white px-3 py-1.5 rounded-lg border border-violet-500/30 transition-all"
                    >
                      View AI Insights
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-lg"
            >
              ✕
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-bold">
                {selectedLead.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                <p className="text-xs text-white/50">{selectedLead.title} • {selectedLead.company}</p>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">RAG Fit Intelligence</span>
              <p className="text-sm text-white/80 leading-relaxed">{selectedLead.ai_summary}</p>
            </div>

            {/* AI Outreach Draft */}
            <div className="bg-violet-950/20 border border-violet-500/20 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-violet-400 uppercase font-semibold">Personalized Cold Outreach Draft</span>
              <p className="text-sm text-white/90 font-mono leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                {selectedLead.outreach_message}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedLead.outreach_message);
                  alert("Outreach message copied to clipboard!");
                }}
                className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              >
                📋 Copy Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
