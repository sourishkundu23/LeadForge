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
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-[family-name:var(--font-inter)]">
          Welcome back, Sourish.
        </h1>
      </div>

      {/* Origami Central AI Command Prompt Input Box */}
      <div className="origami-chat-box p-5 space-y-4 relative">
        <textarea
          rows={3}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Create a campaign to reach Series A SaaS companies hiring SDRs..."
          className="w-full bg-transparent text-white placeholder-white/30 text-base focus:outline-none resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white" title="Add action">
              ➕
            </button>
            <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white" title="Attach file">
              📎
            </button>
            <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white" title="Insert URL link">
              🔗
            </button>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Model Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-white/80 font-medium transition-colors"
              >
                <span className="text-rose-400">⚡</span> {modelType} <span className="text-[10px] text-white/40">▾</span>
              </button>

              {isModelDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-36 bg-[#161622] border border-white/10 rounded-xl shadow-2xl py-1 z-50 text-xs">
                  {(["Lite", "Pro RAG", "Deep Search"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setModelType(m);
                        setIsModelDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-white/80 hover:bg-rose-500/10 hover:text-rose-400 transition-colors font-medium"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white" title="Voice Input">
              🎙️
            </button>

            {/* Pink Origami Send Button */}
            <button
              onClick={handleLaunch}
              className="bg-[#e60067] hover:bg-rose-600 text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-all active:scale-95 shadow-lg shadow-rose-500/25"
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      {/* Origami Action Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setPromptText("Find 50 Series A SaaS founders in Fintech hiring Growth Marketers")}
          className="origami-action-chip flex items-center gap-2 border-rose-500/30 text-rose-300 bg-rose-500/10 hover:bg-rose-500/20"
        >
          <span>🧠</span> Give me ideas
        </button>
        <Link href="/dashboard/new" className="origami-action-chip flex items-center gap-2">
          <span>+</span> New campaign
        </Link>
        <Link href="/dashboard/icps" className="origami-action-chip flex items-center gap-2">
          <span>⚡</span> Set up signals
        </Link>
        <Link href="/dashboard/leads" className="origami-action-chip flex items-center gap-2">
          <span>📥</span> Upload CSV
        </Link>
      </div>

      {/* Past 7 Days Metrics Grid */}
      <div className="space-y-3 pt-4">
        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Past 7 days</span>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#161622] border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
              <p className="text-3xl font-bold text-white mb-1 font-mono">23</p>
              <p className="text-xs text-white/50">New leads enriched</p>
            </div>
          </div>

          <div className="bg-[#161622] border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/15 transition-colors cursor-pointer group shadow-lg">
            <span className="text-sm font-semibold text-rose-400 group-hover:underline">Connect email →</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              ✉️
            </div>
          </div>

          <div className="bg-[#161622] border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/15 transition-colors cursor-pointer group shadow-lg">
            <span className="text-sm font-semibold text-rose-400 group-hover:underline">Connect LinkedIn →</span>
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              💼
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Insights Report Section */}
      <div className="bg-[#161622] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5 text-xs">
            <div className="w-6 h-6 rounded-full bg-[#e60067] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-rose-500/20">
              ✈
            </div>
            <span className="font-semibold text-white">What&apos;s costing you replies</span>
            <span className="text-white/40">· from your August 2 report</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button className="text-white/50 hover:text-white transition-colors flex items-center gap-1">
              <span>🔄</span> Recheck
            </button>
            <button className="text-rose-400 font-semibold hover:underline">
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
            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white/40">
                  ○
                </div>
                <div>
                  <span className="font-semibold text-white">{item.title}</span>
                  <span className="text-white/50 text-xs ml-2">· {item.desc}</span>
                </div>
              </div>
              <button className="text-xs text-white/50 hover:text-white hover:underline transition-colors font-medium">
                View details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
