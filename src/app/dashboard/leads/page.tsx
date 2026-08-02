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

  const getScoreLevel = (score: number) => {
    if (score >= 80) return "high";
    if (score >= 50) return "medium";
    return "low";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 50) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="space-y-6">
      {/* Active Job Progress Banner */}
      {jobStatus && jobStatus.status !== "completed" && jobStatus.status !== "failed" && (
        <div className="origami-card p-6 space-y-3 border-l-4 border-l-[var(--pink)]">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="flex items-center gap-2 text-[var(--text-sub)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Status: <strong className="capitalize text-[var(--text-main)]">{jobStatus.status}...</strong>
            </span>
            <span className="font-mono text-[var(--pink)] font-bold text-xs">{jobStatus.progress}% Complete</span>
          </div>
          <div className="w-full bg-[var(--border)] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[var(--pink)] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(jobStatus.progress, 15)}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Apify scraper is extracting profiles & Gemini RAG is scoring ICP alignment in real-time.
          </p>
        </div>
      )}

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)] mb-1">Leads Database</h1>
          <p className="text-sm text-[var(--text-sub)]">
            {leads.length} real scraped leads from database matching filters.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="origami-btn-outline text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to CSV
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="origami-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {["all", "linkedin", "instagram", "twitter"].map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedPlatform === plat
                  ? "bg-[var(--pink)] text-white"
                  : "bg-[var(--badge-bg)] text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--border)]"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs text-[var(--text-sub)]">
          <div className="flex items-center gap-2">
            <span className="font-medium">Min ICP Score:</span>
            <span className="font-mono font-bold text-[var(--pink)]">{minScore}+</span>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="accent-[var(--pink)] bg-[var(--border)] rounded cursor-pointer w-24"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={onlyEmails}
              onChange={(e) => setOnlyEmails(e.target.checked)}
              className="rounded accent-[var(--pink)]"
            />
            <span>Has Email Only</span>
          </label>
        </div>
      </div>

      {/* Leads Table */}
      <div className="origami-card overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-[var(--text-muted)] space-y-3">
            <svg className="animate-spin h-6 w-6 mx-auto text-[var(--pink)]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm">Fetching leads from Supabase database...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[var(--pink-soft)] flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-[var(--pink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[var(--text-main)]">No leads found in database yet</p>
            <p className="text-sm text-[var(--text-sub)] max-w-md mx-auto">
              Launch a new scrape job to target Instagram, LinkedIn, or Twitter profiles with live Gemini RAG scoring.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="origami-table">
              <thead>
                <tr>
                  <th className="pl-6">Lead Profile</th>
                  <th>Role & Company</th>
                  <th>Platform</th>
                  <th>Contact</th>
                  <th>Fit Score</th>
                  <th className="text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--pink-soft)] flex items-center justify-center text-sm font-bold text-[var(--pink)]">
                          {lead.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-main)]">{lead.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">@{lead.username}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-medium text-[var(--text-secondary)]">{lead.title}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{lead.company}</p>
                    </td>
                    <td className="capitalize text-xs">
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
                        <span className="flex items-center gap-1.5 text-[var(--text-main)]">
                          <TwitterXIcon className="w-4 h-4" /> Twitter / X
                        </span>
                      )}
                    </td>
                    <td className="text-xs font-mono">
                      {lead.email ? (
                        <div className="flex items-center gap-1.5 text-emerald-600">
                          <span>{lead.email}</span>
                          {lead.email_verified && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1 rounded font-bold">✓</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[var(--text-muted)]">No email found</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className={`score-bar score-${getScoreLevel(lead.score)}`}>
                          <div className="score-bar-fill" style={{ width: `${lead.score}%` }} />
                        </div>
                        <span className={`score-badge score-${getScoreLevel(lead.score)}`}>
                          <span className="w-2 h-2 rounded-sm" style={{ background: getScoreColor(lead.score) }} />
                          {lead.score}
                        </span>
                      </div>
                    </td>
                    <td className="text-right pr-6">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="origami-btn-pink-outline text-xs px-3 py-1.5"
                      >
                        View Details
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl animate-slide-up">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--pink-soft)] flex items-center justify-center text-lg font-bold text-[var(--pink)]">
                {selectedLead.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-main)]">{selectedLead.name}</h3>
                <p className="text-xs text-[var(--text-sub)]">{selectedLead.title} • {selectedLead.company}</p>
              </div>
            </div>

            {/* AI Summary */}
            <div className="origami-card p-4 space-y-2">
              <span className="text-xs font-mono text-emerald-600 uppercase font-semibold">Gemini RAG Fit Intelligence</span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedLead.ai_summary}</p>
            </div>

            {/* AI Outreach Draft */}
            <div className="bg-[var(--pink-soft)] border border-[var(--pink-border)] rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-[var(--pink)] uppercase font-semibold">Personalized Cold Outreach Draft</span>
              <p className="text-sm text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--card-bg)] p-3 rounded-lg border border-[var(--border)]">
                {selectedLead.outreach_message}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedLead.outreach_message);
                  alert("Outreach message copied to clipboard!");
                }}
                className="origami-btn-primary text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Message
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
    <Suspense fallback={<div className="p-8 text-center text-[var(--text-muted)]">Loading Leads Database...</div>}>
      <LeadsDatabaseContent />
    </Suspense>
  );
}
