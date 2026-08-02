"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"outbound" | "content">("outbound");
  const [isSequencingOpen, setIsSequencingOpen] = useState(true);
  const [isMaintenanceDismissed, setIsMaintenanceDismissed] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"x" | "linkedin" | "tiktok" | "instagram">("x");

  const handleTabChange = (tab: "outbound" | "content") => {
    setActiveTab(tab);
    if (tab === "content") {
      setIsContentModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-rose-500/20 selection:text-rose-600">
      {/* ========================================= */}
      {/* Origami Left Sidebar                      */}
      {/* ========================================= */}
      <aside className="w-64 bg-[#f4f4f7] border-r border-black/10 flex flex-col justify-between p-4 flex-shrink-0 select-none">
        <div className="space-y-4">
          {/* Brand & Workspace Switcher */}
          <div className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-black/5 rounded-xl transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#e60067] text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#1a1a24]">Personal</span>
            </div>
            <span className="text-[#64748b] text-xs font-bold">▾</span>
          </div>

          {/* Outbound / Content Segmented Pill */}
          <div className="bg-[#e3e3e8] p-1 rounded-xl flex border border-black/5">
            <button
              onClick={() => handleTabChange("outbound")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "outbound"
                  ? "bg-white text-[#1a1a24] shadow-xs border border-black/5"
                  : "text-[#64748b] hover:text-[#1a1a24]"
              }`}
            >
              <span>🚀</span> Outbound
            </button>
            <button
              onClick={() => handleTabChange("content")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "content"
                  ? "bg-white text-[#1a1a24] shadow-xs border border-black/5"
                  : "text-[#64748b] hover:text-[#1a1a24]"
              }`}
            >
              <span>📝</span> Content
            </button>
          </div>

          {/* + New Chat Button */}
          <Link
            href="/dashboard/new"
            className="w-full flex items-center justify-center gap-2 bg-[#e3e3e8] hover:bg-[#dcdce1] text-[#1a1a24] font-bold py-2 px-4 rounded-xl border border-black/5 text-sm transition-all shadow-xs"
          >
            <span className="text-[#e60067] font-extrabold text-base">+</span>
            <span>New chat</span>
          </Link>

          {/* Navigation Items based on Active Tab */}
          <nav className="space-y-0.5 pt-1">
            {activeTab === "outbound" ? (
              <>
                <Link
                  href="/dashboard/chats"
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/dashboard/chats" || pathname === "/dashboard/leads"
                      ? "bg-rose-500/10 text-[#e60067] font-bold border border-rose-500/20"
                      : "text-[#64748b] hover:bg-black/5 hover:text-[#1a1a24]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">💬</span> All chats
                  </div>
                  <span className="bg-black/5 text-[#64748b] text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold">12</span>
                </Link>

                <Link
                  href="/dashboard/icps"
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/dashboard/icps"
                      ? "bg-rose-500/10 text-[#e60067] font-bold border border-rose-500/20"
                      : "text-[#64748b] hover:bg-black/5 hover:text-[#1a1a24]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">🕒</span> Scheduled
                  </div>
                </Link>

                {/* Collapsible Sequencing */}
                <div>
                  <button
                    onClick={() => setIsSequencingOpen(!isSequencingOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#64748b] hover:bg-black/5 hover:text-[#1a1a24] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">⚡</span> Sequencing
                    </div>
                    <span className="text-[10px] text-[#64748b]">{isSequencingOpen ? "▾" : "▸"}</span>
                  </button>

                  {isSequencingOpen && (
                    <div className="ml-6 border-l border-black/10 pl-3 py-1 space-y-1 text-xs">
                      <Link
                        href="/dashboard"
                        className={`block py-1.5 px-2 rounded-lg transition-colors ${
                          pathname === "/dashboard" ? "text-[#e60067] font-bold" : "text-[#64748b] hover:text-[#1a1a24]"
                        }`}
                      >
                        Campaigns
                      </Link>
                      <Link
                        href="/dashboard/leads"
                        className="block py-1.5 px-2 text-[#64748b] hover:text-[#1a1a24] transition-colors"
                      >
                        Inbox
                      </Link>
                      <Link
                        href="/dashboard/leads"
                        className="block py-1.5 px-2 text-[#64748b] hover:text-[#1a1a24] transition-colors"
                      >
                        Senders
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block py-1.5 px-2 text-[#64748b] hover:text-[#1a1a24] transition-colors"
                      >
                        Analytics
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/chats"
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/dashboard/chats"
                      ? "bg-rose-500/10 text-[#e60067] font-bold border border-rose-500/20"
                      : "text-[#64748b] hover:bg-black/5 hover:text-[#1a1a24]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">💬</span> All chats
                  </div>
                </Link>

                <Link
                  href="/dashboard/posts"
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/dashboard/posts"
                      ? "bg-rose-500/10 text-[#e60067] font-bold border border-rose-500/20"
                      : "text-[#64748b] hover:bg-black/5 hover:text-[#1a1a24]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">📝</span> Your posts
                  </div>
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Bottom Sidebar Section */}
        <div className="space-y-3 border-t border-black/10 pt-3">
          <div className="px-2">
            <span className="text-[10px] uppercase font-extrabold text-[#8e8e93] tracking-wider">
              YOUR RECENT CHATS ▾
            </span>
          </div>

          {/* Progress Card */}
          <div className="bg-white text-[#1a1a24] border border-black/10 rounded-xl p-3 space-y-2 shadow-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-[#1a1a24]">Smakg Growth Plays</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#64748b] font-semibold">
              <span>Get started</span>
              <span className="font-mono">0/5</span>
            </div>
            <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#e60067] h-full w-[20%]" />
            </div>
          </div>

          {/* Utility Links */}
          <div className="space-y-1 text-xs text-[#64748b] font-semibold">
            <a href="https://slack.com" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-[#1a1a24] transition-colors">
              <span>#</span> Join Slack
            </a>
            <a href="#learn" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-[#1a1a24] transition-colors">
              <span>📖</span> Learn
            </a>
            <a href="#settings" className="flex items-center gap-2.5 px-2 py-1.5 hover:text-[#1a1a24] transition-colors">
              <span>⚙️</span> Settings
            </a>
          </div>

          {/* User Profile */}
          <div className="flex items-center justify-between px-2 pt-2 border-t border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#e60067] flex items-center justify-center text-xs font-bold text-white shadow-md">
                S
              </div>
              <span className="text-xs font-extrabold text-[#1a1a24]">Sourish Kundu</span>
            </div>
            <span className="text-[#64748b] text-xs cursor-pointer hover:text-[#1a1a24]">🔒</span>
          </div>
        </div>
      </aside>

      {/* ========================================= */}
      {/* Main Content Area                         */}
      {/* ========================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto origami-pagoda-bg relative">
        {/* Maintenance Banner */}
        {!isMaintenanceDismissed && (
          <div className="bg-[#fff0f5] border-b border-[#fbcfe8] px-6 py-2 flex items-center justify-between text-xs text-[#e60067]">
            <div className="flex items-center gap-2 mx-auto font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>We&apos;re planning to conduct scheduled maintenance on August 1st (Saturday) between 8am and 5pm Pacific Time</span>
            </div>
            <button
              onClick={() => setIsMaintenanceDismissed(true)}
              className="text-[#e60067]/60 hover:text-[#e60067] transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top Header */}
        <header className="px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-[#64748b]">
            <span className="text-[#1a1a24] font-semibold">
              {pathname === "/dashboard"
                ? "Dashboard"
                : pathname === "/dashboard/chats"
                ? "Chats"
                : pathname === "/dashboard/leads"
                ? "Leads Database"
                : pathname === "/dashboard/icps"
                ? "ICP Profiles"
                : "New Job"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-white text-[#64748b] text-xs px-3.5 py-1.5 rounded-full border border-black/10 font-semibold shadow-xs">
              Free plan
            </span>
          </div>
        </header>

        <div className="p-8 max-w-5xl w-full mx-auto">{children}</div>

        {/* Floating Chat Trigger Icon Bottom Right */}
        <div className="fixed bottom-6 right-6 z-40">
          <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </main>

      {/* ========================================= */}
      {/* Origami Content Tab Viral Modal (Image 3) */}
      {/* ========================================= */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl space-y-6 text-center animate-fade-in border border-black/10">
            <button
              onClick={() => setIsContentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>

            {/* Pink Circle Pencil Icon */}
            <div className="w-12 h-12 rounded-full bg-[#fff0f5] border border-[#fbcfe8] text-[#e60067] flex items-center justify-center mx-auto text-xl shadow-xs">
              ✏️
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#1a1a24]">
                Get customers by going viral in your niche
              </h2>
              <p className="text-xs text-[#64748b] leading-relaxed max-w-md mx-auto">
                Going viral builds the brand that wins customers — more inbound, warmer outreach. We learn your voice from your best posts, then find viral formats in your niche you can make your own.
              </p>
            </div>

            {/* Platform Selector Grid */}
            <div className="space-y-2 text-left">
              <label className="block text-xs font-semibold text-[#1a1a24]">
                Pick a platform to start
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { id: "x", name: "X", icon: "𝕏" },
                  { id: "linkedin", name: "LinkedIn", icon: "in", iconColor: "text-[#0A66C2]" },
                  { id: "tiktok", name: "TikTok", icon: "🎵", iconColor: "text-[#E4405F]" },
                  { id: "instagram", name: "Instagram", icon: "📷", iconColor: "text-[#E4405F]" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      selectedPlatform === p.id
                        ? "bg-[#fff0f5] border-[#fbcfe8] text-[#e60067] shadow-xs font-bold"
                        : "bg-white border-black/10 text-gray-700 hover:border-black/20"
                    }`}
                  >
                    <span className={`text-lg font-bold ${p.iconColor || ""}`}>{p.icon}</span>
                    <span className="text-xs font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Handle Input */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-semibold text-[#1a1a24]">
                Your {selectedPlatform.toUpperCase()} handle <span className="text-gray-400 font-normal">optional</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={`@yourhandle`}
                  defaultValue="@yourhandle"
                  className="w-full bg-[#f4f4f7] border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#1a1a24] focus:outline-none focus:border-[#e60067]"
                />
              </div>
              <p className="text-[11px] text-gray-400 leading-normal pt-1">
                We study your post history on this platform — including older hits, not just recent ones — so drafts sound like you at your best. No handle? We&apos;ll ask you to pick a starter voice instead.
              </p>
            </div>

            {/* Domain Input */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-semibold text-[#1a1a24]">
                Your domain <span className="text-gray-400 font-normal">for context on your targeting</span>
              </label>
              <input
                type="text"
                defaultValue="smakg.com"
                className="w-full bg-[#f4f4f7] border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#1a1a24] focus:outline-none focus:border-[#e60067]"
              />
            </div>

            {/* Black CTA Button */}
            <button
              onClick={() => setIsContentModalOpen(false)}
              className="w-full bg-[#18181b] hover:bg-black text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md active:scale-98"
            >
              Learn my voice &amp; find templates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
