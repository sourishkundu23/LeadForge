"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from "@/components/PlatformIcons";

export default function NewScrapeJobPage() {
  const router = useRouter();
  const [platform, setPlatform] = useState<"instagram" | "linkedin" | "twitter">("linkedin");
  const [searchType, setSearchType] = useState<string>("keyword");
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [limit, setLimit] = useState(50);
  const [icpDescription, setIcpDescription] = useState(
    "SaaS founders or agency owners looking to scale outreach and automate lead generation."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer dev-token",
        },
        body: JSON.stringify({
          platform,
          search_type: searchType,
          query: {
            keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
            location: location || undefined,
            limit,
          },
          icp_description: icpDescription,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/leads?job_id=${data.job?.id || ""}`);
      } else {
        router.push("/dashboard/leads");
      }
    } catch {
      router.push("/dashboard/leads");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-main)] mb-1">Launch New AI Scrape Job</h1>
        <p className="text-sm text-[var(--text-sub)]">
          Target leads across LinkedIn, Instagram, or Twitter/X with real-time 1536-dim RAG ICP enrichment.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="origami-card p-8 space-y-6">
        {/* Platform Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase text-[var(--text-muted)] mb-3 tracking-wider">
            1. Select Target Platform
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                id: "linkedin",
                name: "LinkedIn",
                color: "text-[#0A66C2]",
                bgColor: "bg-[#0A66C2]/10",
                badge: "High B2B Intent",
                Icon: LinkedInIcon,
              },
              {
                id: "instagram",
                name: "Instagram",
                color: "text-[#E4405F]",
                bgColor: "bg-[#E4405F]/10",
                badge: "Direct Bio Emails",
                Icon: InstagramIcon,
              },
              {
                id: "twitter",
                name: "Twitter / X",
                color: "text-[var(--text-main)]",
                bgColor: "bg-[var(--badge-bg)]",
                badge: "Public Signals",
                Icon: TwitterXIcon,
              },
            ].map((p) => {
              const isSelected = platform === p.id;
              const IconComponent = p.Icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as "instagram" | "linkedin" | "twitter")}
                  className={`p-5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-[var(--pink-soft)] border-[var(--pink)] shadow-sm"
                      : "bg-[var(--card-bg)] border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${p.bgColor} ${p.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--pink)] animate-pulse" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-base block text-[var(--text-main)]">{p.name}</span>
                    <span className="text-[11px] text-[var(--pink)] font-mono mt-0.5 block font-medium">{p.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Type Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase text-[var(--text-muted)] mb-2.5 tracking-wider">
            2. Search Type
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "keyword", label: "Keyword / Bio Search" },
              { id: "hashtag", label: "Hashtags" },
              { id: "competitor_followers", label: "Competitor Followers" },
              { id: "location", label: "Geo Location" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSearchType(st.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                  searchType === st.id
                    ? "bg-[var(--pink)] text-white border-[var(--pink)] shadow-sm"
                    : "bg-[var(--card-bg)] border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text-main)] hover:border-[var(--border-hover)]"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Criteria */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-sub)] mb-1.5">Keywords / Bio Search</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. Founder, CEO, AI engineer, Marketing"
              className="origami-input"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-sub)] mb-1.5">Target Location (Optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, New York, Remote"
              className="origami-input"
            />
          </div>
        </div>

        {/* Max Leads Limit Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-medium text-[var(--text-sub)]">Target Lead Count</label>
            <span className="text-xs font-mono font-bold text-[var(--pink)] bg-[var(--pink-soft)] px-2.5 py-1 rounded-lg border border-[var(--pink-border)]">
              {limit} Leads
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="250"
            step="10"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="w-full accent-[var(--pink)] bg-[var(--border)] rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* ICP Description */}
        <div className="border-t border-[var(--border)] pt-6">
          <label className="block text-xs font-semibold uppercase text-[var(--text-muted)] mb-1.5 tracking-wider">
            3. Natural Language ICP Criteria (RAG Context)
          </label>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            Our AI engine uses this exact criteria to analyze lead bios and recent post content, score alignment from 0 to 100, and draft personalized outreach.
          </p>
          <textarea
            rows={3}
            value={icpDescription}
            onChange={(e) => setIcpDescription(e.target.value)}
            className="origami-textarea"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="origami-btn-primary w-full py-3.5"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Executing Live Apify Scraper...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Start Scrape & AI Enrichment ({limit} Credits)</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
