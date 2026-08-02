"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardOverviewPage() {
  const router = useRouter();
  const [promptText, setPromptText] = useState("");
  const [modelType, setModelType] = useState<"Lite" | "Pro RAG" | "Deep Search">("Lite");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const handleLaunch = () => {
    if (!promptText.trim()) return;
    router.push(`/dashboard/new?prompt=${encodeURIComponent(promptText)}`);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Hero Welcome Greeting */}
      <div className="text-center pt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-inter)] text-[var(--text-main)]">
          Welcome back, Sourish.
        </h1>
      </div>

      {/* Origami Central AI Command Prompt Input Box */}
      <div className="origami-input-card p-5 space-y-4 relative">
        <textarea
          rows={3}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Find founders who previously exited and are starting something new"
          className="w-full bg-transparent text-[var(--text-main)] placeholder-gray-400 text-base focus:outline-none resize-none leading-relaxed font-medium"
        />

        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs text-[var(--text-sub)]">
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-[var(--text-sub)] hover:text-[var(--text-main)]" title="Add action">
              ➕
            </button>
            <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-[var(--text-sub)] hover:text-[var(--text-main)]" title="Attach file">
              📎
            </button>
            <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-[var(--text-sub)] hover:text-[var(--text-main)]" title="Insert URL link">
              🔗
            </button>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Model Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 py-1.5 rounded-xl border border-[var(--border)] text-[var(--text-main)] font-semibold transition-colors"
              >
                <span className="text-[#e60067]">⚡</span> {modelType} <span className="text-[10px] text-[var(--text-sub)]">▾</span>
              </button>

              {isModelDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-36 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-2xl py-1 z-50 text-xs">
                  {(["Lite", "Pro RAG", "Deep Search"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setModelType(m);
                        setIsModelDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[var(--text-main)] hover:bg-rose-500/10 hover:text-[#e60067] transition-colors font-medium"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-[var(--text-sub)] hover:text-[var(--text-main)]" title="Voice Input">
              🎙️
            </button>

            {/* Pink Origami Send Button */}
            <button
              onClick={handleLaunch}
              className="bg-[#e60067] hover:bg-rose-600 text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-all active:scale-95 shadow-md shadow-rose-500/30"
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      {/* Origami Action Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setPromptText("Find founders who previously exited and are starting something new")}
          className="origami-chip-primary flex items-center gap-2"
        >
          <span>🧠</span> Give me ideas
        </button>
        <Link href="/dashboard/new" className="origami-chip-secondary flex items-center gap-2">
          <span>+</span> New campaign
        </Link>
        <Link href="/dashboard/icps" className="origami-chip-secondary flex items-center gap-2">
          <span>Set up signals</span>
        </Link>
        <Link href="/dashboard/leads" className="origami-chip-secondary flex items-center gap-2">
          <span>Upload CSV</span>
        </Link>
      </div>

      {/* Past 7 Days Metrics Grid */}
      <div className="space-y-3 pt-4">
        <span className="text-xs font-bold text-[var(--text-sub)] uppercase tracking-wider">Past 7 days</span>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-3xl font-extrabold text-[var(--text-main)] mb-1 font-mono">23</p>
              <p className="text-xs font-medium text-[var(--text-sub)]">New leads</p>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 flex items-center justify-between hover:border-[#e60067]/30 transition-colors cursor-pointer group shadow-sm">
            <span className="text-sm font-bold text-[#e60067] group-hover:underline">Connect email →</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-[#e60067] group-hover:scale-110 transition-transform">
              ✉️
            </div>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 flex items-center justify-between hover:border-[#e60067]/30 transition-colors cursor-pointer group shadow-sm">
            <span className="text-sm font-bold text-[#e60067] group-hover:underline">Connect LinkedIn →</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-[#e60067] group-hover:scale-110 transition-transform">
              💼
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Insights Report Section */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-2.5 text-xs">
            <div className="w-6 h-6 rounded-full bg-[#e60067] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-rose-500/20">
              ✈
            </div>
            <span className="font-bold text-[var(--text-main)]">What&apos;s costing you replies</span>
            <span className="text-[var(--text-sub)]">· from your August 2 report</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button className="text-[var(--text-sub)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1">
              <span>🔄</span> Recheck
            </button>
            <button className="text-[#e60067] font-bold hover:underline">
              Open report
            </button>
          </div>
        </div>

        {/* Origami Insight Items */}
        <div className="space-y-4 text-sm">
          {[
            {
              title: "No sender connected",
              desc: "10 verified UK/EU AI founders ready to hear from you",
            },
            {
              title: "Your best list has never been sequenced",
              desc: "10 qualified founders, not a single message sent",
            },
            {
              title: "The trigger that predicts your buyers is unbuilt",
              desc: "recently-funded startups hiring AI engineers",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-[10px] text-gray-400">
                  ○
                </div>
                <div>
                  <span className="font-bold text-[var(--text-main)]">{item.title}</span>
                  <span className="text-[var(--text-sub)] text-xs ml-2">· {item.desc}</span>
                </div>
              </div>
              <button className="text-xs text-[var(--text-sub)] hover:text-[var(--text-main)] hover:underline transition-colors font-medium">
                View details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
