"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"outbound" | "content">("outbound");
  const [isSequencingOpen, setIsSequencingOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0b0b10] flex text-white font-[family-name:var(--font-inter)] selection:bg-rose-500/30 selection:text-rose-200">
      {/* Origami Dark Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0e0e15] flex flex-col justify-between p-4 flex-shrink-0 select-none">
        <div className="space-y-4">
          {/* Workspace Switcher */}
          <div className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-white/5 rounded-lg transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-xs font-bold">
                P
              </div>
              <span className="text-sm font-semibold text-white/90">Personal</span>
            </div>
            <span className="text-white/40 text-xs">▾</span>
          </div>

          {/* Outbound / Content Pill Switcher */}
          <div className="bg-[#14141d] p-1 rounded-xl flex border border-white/5">
            <button
              onClick={() => setActiveTab("outbound")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "outbound"
                  ? "bg-[#1f1f2e] text-white shadow-sm border border-white/5 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <span>🚀</span> Outbound
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "content"
                  ? "bg-[#1f1f2e] text-white shadow-sm border border-white/5 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <span>📝</span> Content
            </button>
          </div>

          {/* Primary CTA: + New Scrape Job / Chat */}
          <Link
            href="/dashboard/new"
            className="w-full flex items-center justify-center gap-2 bg-[#171722] hover:bg-[#1e1e2d] text-white font-medium py-2.5 px-4 rounded-xl border border-white/10 text-sm transition-all shadow-md group hover:border-rose-500/40"
          >
            <span className="text-rose-400 group-hover:scale-110 transition-transform">⊕</span>
            <span>New Scrape Job</span>
          </Link>

          {/* Origami Navigation Links */}
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
                <span>💬</span> All Scrapes
              </div>
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
                <span>🧠</span> Scheduled Signals
              </div>
            </Link>

            {/* Collapsible Sequencing Menu */}
            <div>
              <button
                onClick={() => setIsSequencingOpen(!isSequencingOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span>⚡</span> Sequencing
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

        {/* Origami Bottom Section */}
        <div className="space-y-3 border-t border-white/5 pt-4">
          <div className="px-2">
            <span className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Your Recent Chats</span>
          </div>

          <div className="bg-[#14141d] border border-white/5 rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white/80">Smakg Growth Plays</span>
              <span className="text-white/40 text-[11px]">0/5</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[20%]" />
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
              <span className="text-xs font-semibold text-white/90">Sourish Kundu</span>
            </div>
            <span className="text-white/30 text-xs">🔒</span>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#0b0b10]">
        {/* Origami Top Announcement & Header */}
        <div className="bg-gradient-to-r from-rose-950/20 via-pink-950/20 to-purple-950/20 border-b border-rose-500/10 px-6 py-2 flex items-center justify-between text-xs text-rose-300">
          <div className="flex items-center gap-2 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>We&apos;re planning to conduct scheduled maintenance on August 1st between 8am and 5pm Pacific Time</span>
          </div>
          <span className="text-white/40 hover:text-white cursor-pointer">✕</span>
        </div>

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

        <div className="p-8 max-w-6xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
