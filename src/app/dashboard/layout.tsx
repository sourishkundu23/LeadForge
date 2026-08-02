"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"outbound" | "content">("outbound");
  const [isSequencingOpen, setIsSequencingOpen] = useState(true);
  const [isMaintenanceDismissed, setIsMaintenanceDismissed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d12] flex text-white font-[family-name:var(--font-inter)] selection:bg-rose-500/30 selection:text-rose-200">
      {/* Origami Left Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#111118] flex flex-col justify-between p-4 flex-shrink-0 select-none">
        <div className="space-y-4">
          {/* Workspace Selector */}
          <div className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
            <div className="flex items-center gap-2.5">
              {/* Origami Pink Crane Logo */}
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 origami-logo-crane">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">Personal</span>
            </div>
            <span className="text-white/40 text-xs font-mono">▾</span>
          </div>

          {/* Segmented Control Switcher: Outbound | Content */}
          <div className="bg-[#161622] p-1 rounded-xl flex border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab("outbound")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "outbound"
                  ? "bg-[#202030] text-white shadow-sm border border-white/10"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <span>🚀</span> Outbound
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "content"
                  ? "bg-[#202030] text-white shadow-sm border border-white/10"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <span>📝</span> Content
            </button>
          </div>

          {/* + New Chat / Scrape Button */}
          <Link
            href="/dashboard/new"
            className="w-full flex items-center justify-center gap-2 bg-[#1b1b28] hover:bg-[#232334] text-white font-semibold py-2.5 px-4 rounded-xl border border-white/10 text-sm transition-all shadow-md group hover:border-rose-500/40"
          >
            <span className="text-rose-400 group-hover:scale-110 transition-transform text-base">+</span>
            <span>New chat</span>
          </Link>

          {/* Origami Navigation Items */}
          <nav className="space-y-1 pt-2">
            <Link
              href="/dashboard/leads"
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                pathname === "/dashboard/leads"
                  ? "bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">💬</span> All chats
              </div>
              <span className="bg-white/10 text-white/50 text-[10px] px-1.5 py-0.5 rounded-full font-mono">12</span>
            </Link>

            <Link
              href="/dashboard/icps"
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                pathname === "/dashboard/icps"
                  ? "bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🕒</span> Scheduled
              </div>
            </Link>

            {/* Collapsible Sequencing Menu */}
            <div>
              <button
                onClick={() => setIsSequencingOpen(!isSequencingOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">⚡</span> Sequencing
                </div>
                <span className="text-[10px] text-white/40">{isSequencingOpen ? "▾" : "▸"}</span>
              </button>

              {isSequencingOpen && (
                <div className="ml-6 border-l border-white/5 pl-3 py-1 space-y-1 text-xs">
                  <Link
                    href="/dashboard"
                    className={`block py-1.5 px-2 rounded-lg transition-colors ${
                      pathname === "/dashboard" ? "text-rose-400 font-semibold" : "text-white/50 hover:text-white"
                    }`}
                  >
                    Campaigns
                  </Link>
                  <Link
                    href="/dashboard/leads"
                    className="block py-1.5 px-2 text-white/50 hover:text-white transition-colors"
                  >
                    Inbox
                  </Link>
                  <Link
                    href="/dashboard/leads"
                    className="block py-1.5 px-2 text-white/50 hover:text-white transition-colors"
                  >
                    Senders
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block py-1.5 px-2 text-white/50 hover:text-white transition-colors"
                  >
                    Analytics
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Origami Bottom Navigation Section */}
        <div className="space-y-3 border-t border-white/5 pt-4">
          <div className="px-2">
            <span className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Your Recent Chats ▾</span>
          </div>

          <div className="bg-[#161622] border border-white/5 rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white/90">Smakg Growth Plays</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-white/50">
              <span>Get started</span>
              <span className="font-mono text-white/40">0/5</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[15%]" />
            </div>
          </div>

          <div className="space-y-1 text-xs text-white/60">
            <a href="https://slack.com" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-white transition-colors">
              <span>#</span> Join Slack
            </a>
            <a href="#learn" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-white transition-colors">
              <span>📖</span> Learn
            </a>
            <a href="#settings" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-white transition-colors">
              <span>⚙️</span> Settings
            </a>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                S
              </div>
              <span className="text-xs font-semibold text-white">Sourish Kundu</span>
            </div>
            <span className="text-white/30 text-xs cursor-pointer hover:text-white">🔒</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#0d0d12]">
        {/* Yellow/Rose Announcement Banner */}
        {!isMaintenanceDismissed && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>We&apos;re planning to conduct scheduled maintenance on August 1st (Saturday) between 8am and 5pm Pacific Time</span>
            </div>
            <button
              onClick={() => setIsMaintenanceDismissed(true)}
              className="text-amber-400/60 hover:text-amber-200 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <header className="px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="text-white/80 font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-white/5 text-white/70 text-xs px-3 py-1 rounded-full border border-white/10 font-medium">
              Free plan
            </span>
          </div>
        </header>

        <div className="p-8 max-w-5xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
