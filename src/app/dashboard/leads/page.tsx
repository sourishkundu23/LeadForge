"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from "@/components/PlatformIcons";

interface LeadItem {
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

function LeadsDatabaseContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job_id");

  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [minScore, setMinScore] = useState<number>(0);
  const [onlyEmails, setOnlyEmails] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jobStatus, setJobStatus] = useState<{ status: string; progress: number } | null>(null);

  // Poll job status if a job_id is present in URL
  useEffect(() => {
    if (!jobId) return;

    let interval: NodeJS.Timeout;

    async function checkStatus() {
      try {
        const res = await fetch(`/api/jobs`, {
          headers: { Authorization: "Bearer dev-token" },
        });
        if (res.ok) {
          const data = await res.json();
          const currentJob = data.jobs?.find((j: any) => j.id === jobId);
          if (currentJob) {
            setJobStatus({ status: currentJob.status, progress: currentJob.progress });

            if (currentJob.status === "completed" || currentJob.status === "failed") {
              clearInterval(interval);
            }
          }
        }
      } catch (err) {
        console.error("Error polling job status:", err);
      }
    }

    checkStatus();
    interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [jobId]);

  // Fetch leads from Supabase API
  useEffect(() => {
    async function fetchLeads() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          min_score: minScore.toString(),
          has_email: onlyEmails.toString(),
          platform: selectedPlatform,
        });
        if (jobId) queryParams.append("job_id", jobId);

        const res = await fetch(`/api/leads?${queryParams.toString()}`, {
          headers: { Authorization: "Bearer dev-token" },
        });

        if (res.ok) {
          const data = await res.json();
          const mapped: LeadItem[] = (data.leads || []).map((l: any) => ({
            id: l.id,
            name: l.full_name || l.username || "Lead Profile",
            username: l.username || "user",
            platform: l.platform,
            title: l.title || "Professional",
            company: l.company || "Company",
            bio: l.bio || "",
            email: l.email,
            email_verified: l.email_verified || false,
            followers: l.follower_count || 0,
            score: l.icp_score || 0,
            ai_summary: l.ai_summary || "Scraped and processed by RAG engine.",
            outreach_message: l.outreach_message || "Hey! Noticed your profile...",
          }));

          setLeads(mapped);
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeads();
  }, [jobId, selectedPlatform, minScore, onlyEmails, jobStatus?.status]);

  const handleExportCSV = () => {
    if (leads.length === 0) return alert("No leads to export.");

    const csvHeader = "Name,Username,Platform,Title,Company,Email,Verified,Score,AI Summary\n";
    const csvRows = leads
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
      {/* Active Job Progress Banner */}
      {jobStatus && jobStatus.status !== "completed" && jobStatus.status !== "failed" && (
        <div className="bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border border-violet-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="flex items-center gap-2 text-violet-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Status: <strong className="capitalize text-white">{jobStatus.status}...</strong>
            </span>
            <span className="font-mono text-violet-400 font-bold">{jobStatus.progress}% Complete</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-500 via-indigo-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${Math.max(jobStatus.progress, 15)}%` }}
            />
          </div>
          <p className="text-xs text-white/50">
            Apify scraper is extracting profiles & Gemini RAG is scoring ICP alignment in real-time.
          </p>
        </div>
      )}

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Leads Database</h1>
          <p className="text-sm text-white/50">
            {leads.length} real scraped leads from database matching filters.
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
        {isLoading ? (
          <div className="p-12 text-center text-white/40 space-y-2">
            <svg className="animate-spin h-6 w-6 mx-auto text-violet-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm">Fetching leads from Supabase database...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-4xl">🔍</p>
            <p className="text-lg font-semibold text-white">No leads found in database yet</p>
            <p className="text-sm text-white/40 max-w-md mx-auto">
              Launch a new scrape job above to target Instagram, LinkedIn, or Twitter profiles with live Gemini RAG scoring.
            </p>
          </div>
        ) : (
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
                {leads.map((lead) => (
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
                    <td className="py-4 px-4 capitalize text-xs text-white/80">
                      {lead.platform === "linkedin" && (
                        <span className="flex items-center gap-1.5 text-[#0A66C2]">
                          <LinkedInIcon className="w-4 h-4" /> LinkedIn
                        </span>
                      )}
                      {lead.platform === "instagram" && (
                        <span className="flex items-center gap-1.5 text-[#E4405F]">
                          <InstagramIcon className="w-4 h-4" /> Instagram
                        </span>
                      )}
                      {lead.platform === "twitter" && (
                        <span className="flex items-center gap-1.5 text-white">
                          <TwitterXIcon className="w-4 h-4" /> Twitter / X
                        </span>
                      )}
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
                          lead.score >= 80
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : lead.score >= 50
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
        )}
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
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">Gemini RAG Fit Intelligence</span>
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

export default function LeadsDatabasePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white/40">Loading Leads Database...</div>}>
      <LeadsDatabaseContent />
    </Suspense>
  );
}
