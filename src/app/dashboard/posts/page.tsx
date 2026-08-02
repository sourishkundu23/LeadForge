"use client";

import Link from "next/link";

export default function YourPostsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight">Your posts</h1>
        <p className="text-sm text-[#64748b] mt-1 font-medium">
          Manage viral drafts and templates learned from your social voice
        </p>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl p-12 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#fff0f5] border border-[#fbcfe8] text-[#e60067] flex items-center justify-center mx-auto text-xl">
          📝
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#1a1a24]">No posts generated yet</h3>
          <p className="text-xs text-[#64748b] max-w-sm mx-auto">
            Switch to the Content tab in the left sidebar to connect your X, LinkedIn, or Instagram handle and generate viral templates.
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-block bg-[#18181b] hover:bg-black text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all"
        >
          Create new post draft →
        </Link>
      </div>
    </div>
  );
}
