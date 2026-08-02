"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: "📊" },
    { label: "New Scrape Job", href: "/dashboard/new", icon: "⚡" },
    { label: "Leads Database", href: "/dashboard/leads", icon: "🎯" },
    { label: "ICP Profiles", href: "/dashboard/icps", icon: "🧠" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex text-white font-[family-name:var(--font-inter)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0d0d15] flex flex-col justify-between p-4 flex-shrink-0">
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 px-3 py-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              LeadForge
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-violet-600/15 text-violet-400 border border-violet-500/20"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Credits Footer */}
        <div className="border-t border-white/5 pt-4 space-y-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex justify-between items-center text-xs text-white/50 mb-1.5">
              <span>Credits Available</span>
              <span className="font-semibold text-violet-400">450 / 500</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full w-[90%]" />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center font-bold text-violet-400">
                A
              </div>
              <div>
                <p className="font-medium text-white/80">Alex Chen</p>
                <p className="text-white/40 text-[10px]">Starter Plan</p>
              </div>
            </div>
            <Link href="/" className="text-white/40 hover:text-white transition-colors">
              Log out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="border-b border-white/5 bg-[#0d0d15]/50 backdrop-blur-md px-8 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-white/80 capitalize">
              {pathname === "/dashboard" ? "Overview" : pathname.split("/").pop()?.replace(/-/g, " ") || "Overview"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/new"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all shadow-md shadow-violet-500/20"
            >
              + New Scrape Job
            </Link>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
