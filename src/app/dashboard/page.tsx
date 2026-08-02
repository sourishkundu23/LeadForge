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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleLaunch();
  };

  return (
    /* NO max-width — fills the full content area. Compact vertical spacing. */
    <div className="space-y-5 py-2">

      {/* Welcome */}
      <div className="text-center pt-2">
        <h1 className="text-[2rem] font-bold tracking-tight text-[#0f172a] leading-tight">
          Welcome back, Sourish.
        </h1>
      </div>

      {/* AI Prompt */}
      <div className="bg-white border border-black/[0.08] rounded-2xl shadow-xs">
        <textarea
          rows={2}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Build a list"
          className="w-full bg-transparent text-[#0f172a] placeholder-[#94a3b8] text-[14px] px-5 pt-4 pb-1 focus:outline-none resize-none leading-relaxed"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-black/[0.05]">
          <div className="flex items-center gap-0.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94a3b8] hover:text-[#0f172a] hover:bg-black/5 transition-colors font-bold text-lg">+</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94a3b8] hover:text-[#0f172a] hover:bg-black/5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94a3b8] hover:text-[#0f172a] hover:bg-black/5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
            </button>
          </div>

          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-black/[0.08] bg-white text-[12px] font-semibold text-[#0f172a] hover:bg-[#f5f5f8] transition-colors"
              >
                <svg className="w-3 h-3 text-[#e60067]" fill="currentColor" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                {modelType}
                <svg className="w-3 h-3 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {isModelDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-36 bg-white border border-black/[0.08] rounded-xl shadow-2xl py-1 z-50 text-xs">
                  {(["Lite", "Pro RAG", "Deep Search"] as const).map((m) => (
                    <button key={m} onClick={() => { setModelType(m); setIsModelDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 transition-colors font-medium ${modelType === m ? "text-[#e60067] bg-[#fff0f5]" : "text-[#0f172a] hover:bg-[#f5f5f8]"}`}
                    >{m}</button>
                  ))}
                </div>
              )}
            </div>

            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94a3b8] hover:text-[#0f172a] hover:bg-black/5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
            </button>

            <button onClick={handleLaunch}
              className="w-8 h-8 rounded-xl bg-[#e60067] hover:bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 active:scale-95 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Action Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button onClick={() => setPromptText("Give me ideas for reaching SaaS founders")}
          className="flex items-center gap-1.5 bg-[#fff0f5] border border-[#fbcfe8] text-[#e60067] hover:bg-rose-50 rounded-full text-[12px] font-semibold px-3.5 py-1.5 transition-all"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Give me ideas
        </button>
        <Link href="/dashboard/campaigns" className="flex items-center gap-1.5 bg-white border border-black/[0.09] text-[#64748b] hover:text-[#0f172a] hover:border-black/20 rounded-full text-[12px] font-medium px-3.5 py-1.5 transition-all">
          + New campaign
        </Link>
        <Link href="/dashboard/icps" className="flex items-center gap-1.5 bg-white border border-black/[0.09] text-[#64748b] hover:text-[#0f172a] hover:border-black/20 rounded-full text-[12px] font-medium px-3.5 py-1.5 transition-all">
          Set up signals
        </Link>
        <Link href="/dashboard/leads" className="flex items-center gap-1.5 bg-white border border-black/[0.09] text-[#64748b] hover:text-[#0f172a] hover:border-black/20 rounded-full text-[12px] font-medium px-3.5 py-1.5 transition-all">
          Upload CSV
        </Link>
      </div>

      {/* Past 7 Days */}
      <div className="space-y-2.5">
        <p className="text-[10.5px] font-bold text-[#94a3b8] uppercase tracking-widest">Past 7 days</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-black/[0.07] rounded-2xl px-5 py-4 shadow-xs">
            <p className="text-[28px] font-bold text-[#0f172a] leading-none mb-0.5">23</p>
            <p className="text-[11.5px] text-[#94a3b8] font-medium">New leads</p>
          </div>
          <div className="bg-white border border-black/[0.07] rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer hover:border-[#e60067]/30 transition-colors group shadow-xs">
            <div className="space-y-1.5">
              <div className="w-10 h-1.5 bg-[#f0f0f3] rounded-full" />
              <div className="w-7 h-1.5 bg-[#f0f0f3] rounded-full" />
            </div>
            <span className="text-[12px] font-bold text-[#e60067] group-hover:underline">Connect email →</span>
          </div>
          <div className="bg-white border border-black/[0.07] rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer hover:border-[#e60067]/30 transition-colors group shadow-xs">
            <div className="space-y-1.5">
              <div className="w-10 h-1.5 bg-[#f0f0f3] rounded-full" />
              <div className="w-7 h-1.5 bg-[#f0f0f3] rounded-full" />
            </div>
            <span className="text-[12px] font-bold text-[#e60067] group-hover:underline">Connect LinkedIn →</span>
          </div>
        </div>
      </div>

      {/* Insights Card */}
      <div className="bg-white border border-black/[0.07] rounded-2xl shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#e60067] text-white flex items-center justify-center shadow-sm flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M21.66 10.36l-9-16a1 1 0 0 0-1.73 0l-9 16A1 1 0 0 0 3 12h18a1 1 0 0 0 .66-1.64z"/></svg>
            </div>
            <span className="text-[12.5px] font-bold text-[#0f172a]">What&apos;s costing you replies</span>
            <span className="text-[11.5px] text-[#94a3b8]">· from your August 2 report</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-[11.5px] text-[#64748b] hover:text-[#0f172a] transition-colors font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              Recheck
            </button>
            <button className="text-[12px] font-bold text-[#e60067] hover:underline">Open report</button>
          </div>
        </div>
        <div className="divide-y divide-black/[0.04]">
          {[
            { title: "No sender connected", desc: "10 verified UK/EU AI founders ready to hear from you" },
            { title: "Your best list has never been sequenced", desc: "10 qualified founders, not a single message sent" },
            { title: "The trigger that predicts your buyers is unbuilt", desc: "recently-funded startups hiring AI engineers" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-4 h-4 rounded-full border-[1.5px] border-[#cbd5e1] flex-shrink-0" />
                <p className="text-[12.5px] truncate">
                  <span className="font-semibold text-[#0f172a]">{item.title}</span>
                  <span className="text-[#94a3b8] ml-1.5">· {item.desc}</span>
                </p>
              </div>
              <button className="text-[11.5px] text-[#64748b] hover:text-[#0f172a] transition-colors font-medium ml-4 flex-shrink-0">
                View details
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
