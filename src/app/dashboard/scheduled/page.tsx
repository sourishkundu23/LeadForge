"use client";

import Link from "next/link";

const plays = [
  {
    id: "engage-posts",
    icon: (
      <svg className="w-5 h-5 text-[#e60067]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </svg>
    ),
    title: "People who engage with your posts",
    desc: "Reactions and comments on your posts and company page. Your warmest pool: they already know you.",
    badge: "★ Start here",
    badgeColor: "text-[#e60067]",
  },
  {
    id: "buying-signals",
    icon: (
      <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Companies showing buying signals",
    desc: "Companies that just raised, started hiring, or changed hands. New budget, new urgency.",
    badge: null,
    badgeColor: "",
  },
  {
    id: "competitor-engage",
    icon: (
      <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: "People who engage with a competitor",
    desc: "People reacting to your rivals' posts. Already shopping for tools like yours.",
    badge: null,
    badgeColor: "",
  },
];

export default function ScheduledPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">Scheduled tasks</h1>
        <p className="text-[13px] text-[#64748b] mt-1 leading-relaxed">
          Recurring agent runs. Ask the agent to set one up —{" "}
          <span className="text-[#0f172a]">it picks the cadence and prompt, then runs on its own.</span>
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#cbd5e1] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-[15px] font-semibold text-[#0f172a]">No scheduled tasks yet</p>
          <p className="text-[12.5px] text-[#64748b] max-w-sm leading-relaxed">
            In a workspace chat, ask the agent something like{" "}
            <span className="text-[#0f172a] font-medium">
              &ldquo;every morning, find people who engaged with our posts and add the qualified ones to my Leads table.&rdquo;
            </span>
          </p>
        </div>
      </div>

      {/* Suggested plays */}
      <div className="space-y-4">
        <div>
          <p className="text-[11px] uppercase font-bold tracking-widest text-[#94a3b8] mb-1">Suggested plays</p>
          <p className="text-[12.5px] text-[#64748b]">
            Hands-off monitors that find and reach the right people on a schedule. Pick one to set it up.
          </p>
        </div>

        <div className="space-y-2">
          {plays.map((play) => (
            <button
              key={play.id}
              className="w-full bg-white border border-black/[0.07] rounded-xl p-4 text-left hover:border-black/15 hover:shadow-sm transition-all flex items-center gap-4 group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#f5f5f8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#fff0f5] transition-colors">
                {play.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] font-semibold text-[#0f172a]">{play.title}</span>
                  {play.badge && (
                    <span className={`text-[11px] font-bold ${play.badgeColor}`}>{play.badge}</span>
                  )}
                </div>
                <p className="text-[12px] text-[#64748b] mt-0.5 leading-relaxed truncate">{play.desc}</p>
              </div>
              <svg className="w-4 h-4 text-[#94a3b8] flex-shrink-0 group-hover:text-[#64748b] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* "See the plays" floating chip */}
      <div className="flex justify-center pt-2">
        <button className="flex items-center gap-2 bg-white border border-black/[0.07] shadow-md rounded-full px-5 py-2.5 text-[12.5px] font-semibold text-[#0f172a] hover:shadow-lg hover:border-black/10 transition-all">
          <span className="text-[#e60067]">⚡</span>
          See the plays I&apos;d run for you...
          <span className="ml-1 bg-[#f0f0f3] text-[#64748b] text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">3×</span>
        </button>
      </div>
    </div>
  );
}
