"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  const pageTitle = () => {
    const map: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/dashboard/chats": "Chats",
      "/dashboard/leads": "Leads",
      "/dashboard/scheduled": "Scheduled",
      "/dashboard/icps": "ICP Profiles",
      "/dashboard/new": "New chat",
      "/dashboard/posts": "Your posts",
      "/dashboard/campaigns": "Campaigns",
      "/dashboard/senders": "Senders",
      "/dashboard/analytics": "Analytics",
    };
    return map[pathname] ?? "Dashboard";
  };

  // ── nav item class ─────────────────────────────────────────────────────────
  const ni = (active: boolean) =>
    `flex items-center gap-2.5 w-full px-3 py-1.5 rounded-xl text-[13px] transition-colors ${
      active
        ? "bg-white text-[#111827] font-semibold shadow-sm border border-black/[0.07]"
        : "text-[#6b7280] hover:bg-black/[0.04] hover:text-[#111827] font-medium"
    }`;

  const sub = (active: boolean) =>
    `block px-2 py-1 text-[12.5px] rounded-lg transition-colors w-full text-left ${
      active ? "text-[#e60067] font-semibold" : "text-[#6b7280] hover:text-[#111827] font-medium"
    }`;

  const isAt = (href: string) => pathname === href;
  const startsWith = (href: string) => pathname.startsWith(href) && href !== "/dashboard";

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f8" }}>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SIDEBAR                                                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: "170px", zIndex: 40,
        background: "#f0f0f4",
        borderRight: "1px solid rgba(0,0,0,0.09)",
        display: "flex", flexDirection: "column",
        overflowY: "auto", overflowX: "hidden",
      }}>

        {/* ── scrollable top ────────────────────────────────────────────── */}
        <div style={{ flex: 1, padding: "10px 10px 0 10px", display: "flex", flexDirection: "column", gap: "2px" }}>

          {/* Personal workspace */}
          <div className="flex items-center justify-between px-2 py-2 rounded-xl cursor-pointer hover:bg-black/[0.04] select-none mb-0.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#e60067] flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-[13px] font-bold text-[#111827]">Personal</span>
            </div>
            <svg className="w-3.5 h-3.5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          {/* Outbound / Content tabs */}
          <div className="flex p-0.5 rounded-xl mb-2" style={{ background: "#e2e2e8" }}>
            <button onClick={() => handleTabChange("outbound")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                activeTab === "outbound" ? "bg-white text-[#111827] shadow-sm" : "text-[#6b7280] hover:text-[#111827]"
              }`}>
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Outbound
            </button>
            <button onClick={() => handleTabChange("content")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                activeTab === "content" ? "bg-white text-[#111827] shadow-sm" : "text-[#6b7280] hover:text-[#111827]"
              }`}>
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>
              </svg>
              Content
            </button>
          </div>

          {/* NAV */}
          {activeTab === "outbound" ? (
            <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>

              {/* New chat */}
              <Link href="/dashboard" className={ni(isAt("/dashboard"))}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                New chat
              </Link>

              {/* All chats */}
              <Link href="/dashboard/chats" className={ni(isAt("/dashboard/chats") || startsWith("/dashboard/chats"))}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <path strokeLinecap="round" d="M8 10h8M8 13.5h5"/>
                </svg>
                All chats
              </Link>

              {/* Scheduled */}
              <Link href="/dashboard/scheduled" className={ni(isAt("/dashboard/scheduled"))}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Scheduled
              </Link>

              {/* Sequencing */}
              <div>
                <button onClick={() => setIsSequencingOpen(!isSequencingOpen)}
                  className={ni(false) + " justify-between"}>
                  <span className="flex items-center gap-2.5">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    Sequencing
                  </span>
                  <svg className="w-3 h-3 text-[#9ca3af] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    {isSequencingOpen
                      ? <polyline points="6 9 12 15 18 9"/>
                      : <polyline points="9 18 15 12 9 6"/>}
                  </svg>
                </button>

                {isSequencingOpen && (
                  <div className="ml-5 pl-3 mt-0.5 space-y-0" style={{ borderLeft: "1px solid rgba(0,0,0,0.08)" }}>
                    {[
                      { label: "Campaigns", href: "/dashboard/campaigns" },
                      { label: "Inbox",     href: "/dashboard/leads" },
                      { label: "Senders",   href: "/dashboard/senders" },
                      { label: "Analytics", href: "/dashboard/analytics" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} className={sub(isAt(item.href))}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          ) : (
            <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <Link href="/dashboard" className={ni(isAt("/dashboard"))}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                New chat
              </Link>
              <Link href="/dashboard/chats" className={ni(isAt("/dashboard/chats"))}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <path strokeLinecap="round" d="M8 10h8M8 13.5h5"/>
                </svg>
                All chats
              </Link>
              <Link href="/dashboard/posts" className={ni(isAt("/dashboard/posts"))}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>
                </svg>
                Your posts
              </Link>
            </nav>
          )}
        </div>

        {/* ── bottom section ─────────────────────────────────────────────── */}
        <div style={{ padding: "10px", borderTop: "1px solid rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: "4px" }}>

          {/* YOUR RECENT CHATS */}
          <button className="flex items-center gap-1 px-1 text-[10px] uppercase font-bold tracking-widest text-[#9ca3af] hover:text-[#6b7280] transition-colors select-none py-1">
            Your recent chats
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Progress card */}
          <div className="bg-white rounded-xl border border-black/[0.07] p-2.5 shadow-xs cursor-pointer hover:border-black/10 transition-colors">
            <p className="text-[12px] font-bold text-[#111827] truncate mb-1.5">Smakg Growth Plays</p>
            <div className="flex items-center justify-between text-[11px] text-[#9ca3af] font-medium mb-1.5">
              <span>Get started</span>
              <span className="font-mono">0/5</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: "3px", background: "#e5e7eb" }}>
              <div style={{ width: "20%", height: "100%", background: "#e60067", borderRadius: "999px" }}/>
            </div>
          </div>

          {/* Utility links */}
          {[
            {
              label: "Join Slack", href: "https://slack.com", external: true,
              icon: <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22.08 9C19.81 1.41 9 2.33 9 9a3 3 0 0 0 3 3h9a3 3 0 0 0 1.08-5.79"/><path d="M9 22.08C1.41 19.81 2.33 9 9 9a3 3 0 0 1 3 3v9a3 3 0 0 1-3.79 1.08"/><path d="M22.08 15C19.81 22.59 9 21.67 9 15a3 3 0 0 1 3-3h9a3 3 0 0 1 1.08 5.79"/><path d="M15 1.92C22.59 4.19 21.67 15 15 15a3 3 0 0 1-3-3V3a3 3 0 0 1 3.79-1.08"/></svg>,
            },
            {
              label: "Learn", href: "#learn", external: false,
              icon: <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
            },
            {
              label: "Settings", href: "#settings", external: false,
              icon: <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
            },
          ].map((item) => (
            <a key={item.label} href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12.5px] font-medium text-[#6b7280] hover:text-[#111827] hover:bg-black/[0.04] transition-colors">
              {item.icon}
              {item.label}
            </a>
          ))}

          {/* User profile */}
          <div className="flex items-center justify-between px-2 py-1.5 border-t border-black/[0.08] mt-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#111827] flex items-center justify-center text-[11px] font-bold text-white shrink-0">S</div>
              <span className="text-[12px] font-semibold text-[#111827] truncate">Sourish Kundu</span>
            </div>
            <button className="text-[#9ca3af] hover:text-[#6b7280] transition-colors shrink-0 p-0.5 rounded hover:bg-black/[0.04]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTENT                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <main style={{ marginLeft: "170px", minHeight: "100vh", display: "flex", flexDirection: "column" }}
        className="origami-pagoda-bg">

        {/* Sticky header */}
        <header className="flex items-center justify-between px-6 py-3 sticky top-0 z-30"
          style={{ background: "rgba(245,245,248,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
          <span className="text-[12.5px] font-semibold text-[#111827]">{pageTitle()}</span>
          <span className="text-[12px] font-semibold text-[#e60067]">Free plan</span>
        </header>

        <div className="px-6 pb-6 flex-1">{children}</div>

        {/* Floating chat button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button className="w-12 h-12 bg-[#111827] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CONTENT MODAL                                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl max-w-[480px] w-full p-7 relative shadow-2xl space-y-5 border border-black/10">
            <button onClick={() => setIsContentModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-[#9ca3af] hover:text-[#111827] hover:bg-black/5 text-base">
              ✕
            </button>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#fff0f5] border border-[#fbcfe8] flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-[#e60067]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </div>
              <h2 className="text-[17px] font-bold text-[#111827]">Get customers by going viral in your niche</h2>
              <p className="text-[12.5px] text-[#6b7280] leading-relaxed">Going viral builds the brand that wins customers — more inbound, warmer outreach.</p>
            </div>
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold text-[#111827]">Pick a platform to start</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "x", name: "X", icon: "𝕏" },
                  { id: "linkedin", name: "LinkedIn", icon: "in" },
                  { id: "tiktok", name: "TikTok", icon: "♪" },
                  { id: "instagram", name: "Instagram", icon: "◎" },
                ].map((p) => (
                  <button key={p.id} onClick={() => setSelectedPlatform(p.id as any)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      selectedPlatform === p.id ? "bg-[#fff0f5] border-[#e60067] shadow-sm" : "bg-white border-black/10 hover:border-black/20"
                    }`}>
                    <div className="text-base font-bold mb-0.5">{p.icon}</div>
                    <div className="text-[11px] font-medium text-[#6b7280]">{p.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[12.5px] font-semibold text-[#111827]">Your handle <span className="text-[#9ca3af] font-normal">optional</span></label>
              <input type="text" defaultValue="@yourhandle" className="w-full bg-[#f5f5f8] border border-black/10 rounded-xl px-3.5 py-2.5 text-[13px] text-[#111827] focus:outline-none focus:border-[#e60067] transition-colors"/>
            </div>
            <div className="space-y-1">
              <label className="text-[12.5px] font-semibold text-[#111827]">Your domain <span className="text-[#9ca3af] font-normal">for targeting context</span></label>
              <input type="text" defaultValue="smakg.com" className="w-full bg-[#f5f5f8] border border-black/10 rounded-xl px-3.5 py-2.5 text-[13px] text-[#111827] focus:outline-none focus:border-[#e60067] transition-colors"/>
            </div>
            <button onClick={() => setIsContentModalOpen(false)}
              className="w-full bg-[#111827] hover:bg-black text-white font-bold py-3 rounded-xl text-[13px] transition-all shadow-md">
              Learn my voice &amp; find templates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
