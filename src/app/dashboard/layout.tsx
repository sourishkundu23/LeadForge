"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"outbound" | "content">("outbound");
  const [isSequencingOpen, setIsSequencingOpen] = useState(true);
  const [isMaintenanceDismissed, setIsMaintenanceDismissed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Light mode default matching Image 3!

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex selection:bg-rose-500/20 selection:text-rose-600 ${isDarkMode ? "dark bg-[#0d0d12] text-white" : "bg-[#f8f8fb] text-[#1a1a24]"}`}>
      {/* Origami Left Sidebar — 100% Identical to Image 3 */}
      <aside className="w-64 origami-sidebar flex flex-col justify-between p-4 flex-shrink-0 select-none transition-colors">
        <div className="space-y-4">
          {/* Top Brand & Workspace Switcher */}
          <div className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
            <div className="flex items-center gap-2.5">
              {/* Pink Origami Crane Bird Icon */}
              <div className="w-7 h-7 rounded-lg bg-[#e60067] text-white flex items-center justify-center shadow-md shadow-rose-500/30">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[var(--text-main)]">Personal</span>
            </div>
            <span className="text-[var(--text-sub)] text-xs">▾</span>
          </div>

          {/* Outbound / Content Segmented Pill Switcher */}
          <div className="origami-tab-track p-1 rounded-xl flex">
            <button
              onClick={() => setActiveTab("outbound")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "outbound"
                  ? "origami-tab-active"
                  : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
              }`}
            >
              <span>🚀</span> Outbound
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "content"
                  ? "origami-tab-active"
                  : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
              }`}
            >
              <span>📝</span> Content
            </button>
          </div>

          {/* + New Chat Action Button */}
          <Link
            href="/dashboard/new"
            className="w-full flex items-center justify-center gap-2 origami-new-chat-btn font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-xs"
          >
            <span className="text-[#e60067] text-base">+</span>
            <span>New chat</span>
          </Link>

          {/* Origami Sidebar Navigation Items */}
          <nav className="space-y-1 pt-1">
            <Link
              href="/dashboard/leads"
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                pathname === "/dashboard/leads"
                  ? "bg-rose-500/10 text-[#e60067] font-semibold border border-rose-500/20"
                  : "text-[var(--text-sub)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--text-main)]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">💬</span> All chats
              </div>
              <span className="bg-black/5 dark:bg-white/10 text-[var(--text-sub)] text-[10px] px-1.5 py-0.5 rounded-full font-mono">12</span>
            </Link>

            <Link
              href="/dashboard/icps"
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                pathname === "/dashboard/icps"
                  ? "bg-rose-500/10 text-[#e60067] font-semibold border border-rose-500/20"
                  : "text-[var(--text-sub)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--text-main)]"
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
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[var(--text-sub)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--text-main)] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">⚡</span> Sequencing
                </div>
                <span className="text-[10px] text-[var(--text-sub)]">{isSequencingOpen ? "▾" : "▸"}</span>
              </button>

              {isSequencingOpen && (
                <div className="ml-6 border-l border-[var(--border)] pl-3 py-1 space-y-1 text-xs">
                  <Link
                    href="/dashboard"
                    className={`block py-1.5 px-2 rounded-lg transition-colors ${
                      pathname === "/dashboard" ? "text-[#e60067] font-semibold" : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    Campaigns
                  </Link>
                  <Link
                    href="/dashboard/leads"
                    className="block py-1.5 px-2 text-[var(--text-sub)] hover:text-[var(--text-main)] transition-colors"
                  >
                    Inbox
                  </Link>
                  <Link
                    href="/dashboard/leads"
                    className="block py-1.5 px-2 text-[var(--text-sub)] hover:text-[var(--text-main)] transition-colors"
                  >
                    Senders
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block py-1.5 px-2 text-[var(--text-sub)] hover:text-[var(--text-main)] transition-colors"
                  >
                    Analytics
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Origami Bottom Sidebar Section */}
        <div className="space-y-3 border-t border-[var(--border)] pt-3">
          <div className="px-2">
            <span className="text-[10px] uppercase font-bold text-[var(--text-sub)] tracking-wider">YOUR RECENT CHATS ▾</span>
          </div>

          {/* Smakg Growth Plays Card */}
          <div className="origami-card rounded-xl p-3 space-y-2 shadow-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[var(--text-main)]">Smakg Growth Plays</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[var(--text-sub)] font-medium">
              <span>Get started</span>
              <span className="font-mono">0/5</span>
            </div>
            <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#e60067] h-full w-[20%]" />
            </div>
          </div>

          <div className="space-y-1 text-xs text-[var(--text-sub)] font-medium">
            <a href="https://slack.com" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-[var(--text-main)] transition-colors">
              <span>#</span> Join Slack
            </a>
            <a href="#learn" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-[var(--text-main)] transition-colors">
              <span>📖</span> Learn
            </a>
            <a href="#settings" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-[var(--text-main)] transition-colors">
              <span>⚙️</span> Settings
            </a>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center justify-between px-2 pt-2 border-t border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#e60067] flex items-center justify-center text-xs font-bold text-white shadow-md">
                S
              </div>
              <span className="text-xs font-bold text-[var(--text-main)]">Sourish Kundu</span>
            </div>
            <span className="text-[var(--text-sub)] text-xs cursor-pointer hover:text-[var(--text-main)]">🔒</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto origami-pagoda-bg">
        {/* Yellow/Pink Top Maintenance Banner */}
        {!isMaintenanceDismissed && (
          <div className="bg-[#fff0f5] dark:bg-rose-950/30 border-b border-[#fbcfe8] dark:border-rose-500/20 px-6 py-2 flex items-center justify-between text-xs text-[#e60067] dark:text-rose-300">
            <div className="flex items-center gap-2 mx-auto font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>We&apos;re planning to conduct scheduled maintenance on August 1st (Saturday) between 8am and 5pm Pacific Time</span>
            </div>
            <button
              onClick={() => setIsMaintenanceDismissed(true)}
              className="text-[#e60067]/60 dark:text-rose-300/60 hover:text-[#e60067] dark:hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <header className="px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-[var(--text-sub)]">
            <span className="text-[var(--text-main)] font-semibold">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-white dark:bg-white/10 text-xs px-3.5 py-1.5 rounded-full border border-[var(--border)] font-semibold text-[var(--text-main)] shadow-xs hover:scale-105 transition-transform"
            >
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <span className="bg-white dark:bg-white/10 text-[var(--text-sub)] text-xs px-3.5 py-1.5 rounded-full border border-[var(--border)] font-semibold shadow-xs">
              Free plan
            </span>
          </div>
        </header>

        <div className="p-8 max-w-5xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
