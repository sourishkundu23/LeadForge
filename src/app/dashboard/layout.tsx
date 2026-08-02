"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// ── tiny SVG icons matching Origami exactly ──────────────────────────────────
const IconNewChat = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconAllChats = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h8M8 14h5" />
  </svg>
);
const IconScheduled = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconSequencing = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconPosts = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"outbound" | "content">("outbound");
  const [isSequencingOpen, setIsSequencingOpen] = useState(true);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"x" | "linkedin" | "tiktok" | "instagram">("x");

  const handleTabChange = (tab: "outbound" | "content") => {
    setActiveTab(tab);
    if (tab === "content") setIsContentModalOpen(true);
  };

  // ── active state helper ────────────────────────────────────────────────────
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const navItem = (active: boolean) =>
    `flex items-center gap-2.5 w-full px-3 py-[7px] rounded-xl text-[13px] transition-all cursor-pointer ${
      active
        ? "bg-white/70 text-[#0f172a] font-semibold shadow-xs border border-black/[0.06]"
        : "text-[#64748b] hover:bg-black/5 hover:text-[#0f172a] font-medium"
    }`;

  const subNavItem = (active: boolean) =>
    `block w-full text-left py-1.5 px-2 text-[12.5px] rounded-lg transition-colors ${
      active ? "text-[#e60067] font-semibold" : "text-[#64748b] hover:text-[#0f172a] font-medium"
    }`;

  // ── page title ────────────────────────────────────────────────────────────
  const pageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/chats") return "Chats";
    if (pathname === "/dashboard/leads") return "Leads";
    if (pathname === "/dashboard/scheduled") return "Scheduled";
    if (pathname === "/dashboard/icps") return "ICP Profiles";
    if (pathname === "/dashboard/new") return "New chat";
    if (pathname === "/dashboard/posts") return "Your posts";
    if (pathname === "/dashboard/campaigns") return "Campaigns";
    if (pathname === "/dashboard/senders") return "Senders";
    if (pathname === "/dashboard/analytics") return "Analytics";
    return "Dashboard";
  };

  return (
    <div className="min-h-screen flex bg-[#f5f5f8]">
      {/* ================================================================== */}
      {/* SIDEBAR                                                             */}
      {/* ================================================================== */}
      <aside
        className="w-[220px] flex-shrink-0 flex flex-col"
        style={{ background: "#f0f0f3", borderRight: "1px solid rgba(0,0,0,0.08)" }}
      >
        {/* ── top scrollable section ───────────────────────────────────── */}
        <div className="flex flex-col flex-1 overflow-y-auto p-3 space-y-1">

          {/* Brand / workspace */}
          <div className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-black/5 rounded-xl mb-1 select-none">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#e60067] flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-[13px] font-bold text-[#0f172a]">Personal</span>
            </div>
            <svg className="w-3.5 h-3.5 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Outbound / Content tabs */}
          <div className="bg-[#e3e3e8] p-1 rounded-xl flex gap-0.5 mb-2">
            <button
              onClick={() => handleTabChange("outbound")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[12px] font-semibold transition-all flex items-center justify-center gap-1 ${
                activeTab === "outbound"
                  ? "bg-white text-[#0f172a] shadow-xs"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              🚀 Outbound
            </button>
            <button
              onClick={() => handleTabChange("content")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[12px] font-semibold transition-all flex items-center justify-center gap-1 ${
                activeTab === "content"
                  ? "bg-white text-[#0f172a] shadow-xs"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              ✏️ Content
            </button>
          </div>

          {/* ── NAV ITEMS ── */}
          {activeTab === "outbound" ? (
            <nav className="space-y-0.5">
              {/* New chat */}
              <Link href="/dashboard" className={navItem(pathname === "/dashboard")}>
                <span className={pathname === "/dashboard" ? "text-[#0f172a]" : "text-[#94a3b8]"}>
                  <IconNewChat />
                </span>
                New chat
              </Link>

              {/* All chats */}
              <Link href="/dashboard/chats" className={navItem(isActive("/dashboard/chats"))}>
                <span className={isActive("/dashboard/chats") ? "text-[#0f172a]" : "text-[#94a3b8]"}>
                  <IconAllChats />
                </span>
                All chats
              </Link>

              {/* Scheduled */}
              <Link href="/dashboard/scheduled" className={navItem(pathname.startsWith("/dashboard/scheduled"))}>
                <span className={isActive("/dashboard/scheduled") ? "text-[#0f172a]" : "text-[#94a3b8]"}>
                  <IconScheduled />
                </span>
                Scheduled
              </Link>

              {/* Sequencing (collapsible) */}
              <div>
                <button
                  onClick={() => setIsSequencingOpen(!isSequencingOpen)}
                  className={navItem(false) + " justify-between"}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#94a3b8]"><IconSequencing /></span>
                    Sequencing
                  </span>
                  <span className="text-[#94a3b8]">
                    {isSequencingOpen ? <IconChevronDown /> : <IconChevronRight />}
                  </span>
                </button>

                {isSequencingOpen && (
                  <div className="ml-[26px] border-l border-black/[0.07] pl-3 mt-0.5 space-y-0.5">
                    <Link href="/dashboard/campaigns" className={subNavItem(isActive("/dashboard/campaigns"))}>
                      Campaigns
                    </Link>
                    <Link href="/dashboard/leads" className={subNavItem(isActive("/dashboard/leads"))}>
                      Inbox
                    </Link>
                    <Link href="/dashboard/senders" className={subNavItem(isActive("/dashboard/senders"))}>
                      Senders
                    </Link>
                    <Link href="/dashboard/analytics" className={subNavItem(isActive("/dashboard/analytics"))}>
                      Analytics
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          ) : (
            /* Content mode nav */
            <nav className="space-y-0.5">
              <Link href="/dashboard" className={navItem(pathname === "/dashboard")}>
                <span className="text-[#94a3b8]"><IconNewChat /></span>
                New chat
              </Link>
              <Link href="/dashboard/chats" className={navItem(isActive("/dashboard/chats"))}>
                <span className="text-[#94a3b8]"><IconAllChats /></span>
                All chats
              </Link>
              <Link href="/dashboard/posts" className={navItem(isActive("/dashboard/posts"))}>
                <span className="text-[#94a3b8]"><IconPosts /></span>
                Your posts
              </Link>
            </nav>
          )}
        </div>

        {/* ── bottom section ───────────────────────────────────────────── */}
        <div className="p-3 space-y-2 border-t border-black/[0.07]">

          {/* YOUR RECENT CHATS label */}
          <button className="flex items-center gap-1 px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-[#94a3b8] hover:text-[#64748b] transition-colors select-none">
            Your recent chats
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Recent chat card */}
          <div className="bg-white rounded-xl border border-black/[0.07] p-3 space-y-2 shadow-xs cursor-pointer hover:border-black/10 transition-colors">
            <p className="text-[12.5px] font-bold text-[#0f172a] truncate">Smakg Growth Plays</p>
            <div className="flex items-center justify-between text-[11px] text-[#94a3b8] font-medium">
              <span>Get started</span>
              <span className="font-mono">0/5</span>
            </div>
            <div className="w-full bg-[#e8e8ec] h-1 rounded-full overflow-hidden">
              <div className="bg-[#e60067] h-full rounded-full" style={{ width: "20%" }} />
            </div>
          </div>

          {/* Utility links */}
          <div className="space-y-0.5 pt-1">
            {[
              {
                label: "Join Slack",
                href: "https://slack.com",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22.08 9C19.81 1.41 9 2.33 9 9a3 3 0 0 0 3 3h9a3 3 0 0 0 1.08-5.79" />
                    <path d="M9 22.08C1.41 19.81 2.33 9 9 9a3 3 0 0 1 3 3v9a3 3 0 0 1-3.79 1.08" />
                    <path d="M22.08 15C19.81 22.59 9 21.67 9 15a3 3 0 0 1 3-3h9a3 3 0 0 1 1.08 5.79" />
                    <path d="M15 1.92C22.59 4.19 21.67 15 15 15a3 3 0 0 1-3-3V3a3 3 0 0 1 3.79-1.08" />
                  </svg>
                ),
                external: true,
              },
              {
                label: "Learn",
                href: "#learn",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
              },
              {
                label: "Settings",
                href: "#settings",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12.5px] font-medium text-[#64748b] hover:text-[#0f172a] hover:bg-black/5 transition-colors"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          {/* User profile */}
          <div className="flex items-center justify-between px-2 pt-2 border-t border-black/[0.07]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0f172a] flex items-center justify-center text-[11px] font-extrabold text-white">
                S
              </div>
              <span className="text-[12.5px] font-semibold text-[#0f172a]">Sourish Kundu</span>
            </div>
            <button className="text-[#94a3b8] hover:text-[#64748b] transition-colors p-1 rounded-lg hover:bg-black/5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ================================================================== */}
      {/* MAIN CONTENT                                                        */}
      {/* ================================================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f5f8] origami-pagoda-bg relative">
        {/* Header */}
        <header className="px-8 py-4 flex justify-between items-center">
          <span className="text-[13px] font-semibold text-[#0f172a]">{pageTitle()}</span>
          <span className="text-[12px] font-semibold text-[#e60067]">Free plan</span>
        </header>

        <div className="px-8 pb-8 max-w-5xl w-full mx-auto flex-1">{children}</div>

        {/* Floating Intercom-style chat button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button className="w-12 h-12 bg-[#0f172a] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </main>

      {/* ================================================================== */}
      {/* CONTENT MODAL                                                       */}
      {/* ================================================================== */}
      {isContentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-2xl max-w-[480px] w-full p-7 relative shadow-2xl space-y-5 border border-black/10">
            <button
              onClick={() => setIsContentModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-[#94a3b8] hover:text-[#0f172a] hover:bg-black/5 transition-all text-base"
            >
              ✕
            </button>

            <div className="text-center space-y-3 pb-1">
              <div className="w-10 h-10 rounded-full bg-[#fff0f5] border border-[#fbcfe8] flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-[#e60067]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h2 className="text-[17px] font-bold text-[#0f172a]">Get customers by going viral in your niche</h2>
              <p className="text-[12.5px] text-[#64748b] leading-relaxed">
                Going viral builds the brand that wins customers — more inbound, warmer outreach. We learn your voice from your best posts, then find viral formats in your niche you can make your own.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold text-[#0f172a]">Pick a platform to start</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "x", name: "X", icon: "𝕏", color: "" },
                  { id: "linkedin", name: "LinkedIn", icon: "in", color: "text-[#0A66C2]" },
                  { id: "tiktok", name: "TikTok", icon: "♪", color: "text-black" },
                  { id: "instagram", name: "Instagram", icon: "◎", color: "text-[#E4405F]" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id as any)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      selectedPlatform === p.id
                        ? "bg-[#fff0f5] border-[#e60067] shadow-sm"
                        : "bg-white border-black/10 hover:border-black/20"
                    }`}
                  >
                    <div className={`text-base font-bold mb-0.5 ${p.color}`}>{p.icon}</div>
                    <div className="text-[11px] font-medium text-[#64748b]">{p.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[12.5px] font-semibold text-[#0f172a]">
                Your {selectedPlatform === "x" ? "X" : selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} handle{" "}
                <span className="text-[#94a3b8] font-normal">optional</span>
              </label>
              <input
                type="text"
                defaultValue="@yourhandle"
                className="w-full bg-[#f5f5f8] border border-black/10 rounded-xl px-3.5 py-2.5 text-[13px] text-[#0f172a] focus:outline-none focus:border-[#e60067] transition-colors"
              />
              <p className="text-[11px] text-[#94a3b8] leading-relaxed pt-0.5">
                We study your post history on this platform — including older hits, not just recent ones — so drafts sound like you at your best.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[12.5px] font-semibold text-[#0f172a]">
                Your domain{" "}
                <span className="text-[#94a3b8] font-normal">for context on your targeting</span>
              </label>
              <input
                type="text"
                defaultValue="smakg.com"
                className="w-full bg-[#f5f5f8] border border-black/10 rounded-xl px-3.5 py-2.5 text-[13px] text-[#0f172a] focus:outline-none focus:border-[#e60067] transition-colors"
              />
            </div>

            <button
              onClick={() => setIsContentModalOpen(false)}
              className="w-full bg-[#0f172a] hover:bg-black text-white font-bold py-3 rounded-xl text-[13px] transition-all shadow-md"
            >
              Learn my voice &amp; find templates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
