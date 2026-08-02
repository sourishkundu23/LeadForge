"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const chats = [
    {
      id: "1",
      title: "Smakg Growth Plays",
      updatedAt: "Updated 1 hour ago",
      createdAt: "Created Aug 2, 2026",
      owner: "Sourish",
    },
  ];

  const filteredChats = chats.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1a1a24] tracking-tight">Chats</h1>
        <p className="text-sm text-[#64748b] mt-1 font-medium">
          Create, organize, and manage your chats
        </p>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between gap-4 pt-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats"
            className="w-full pl-9 pr-4 py-2 bg-white border border-black/10 rounded-xl text-sm text-[#1a1a24] placeholder-gray-400 focus:outline-none focus:border-[#e60067] transition-colors shadow-xs"
          />
        </div>

        {/* Sort & Create */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-[#64748b] cursor-pointer hover:text-[#1a1a24] font-medium">
            <span>Sort:</span>
            <span className="font-bold text-[#1a1a24]">Updated ▾</span>
          </div>

          <Link
            href="/dashboard/new"
            className="bg-white text-[#e60067] hover:bg-[#fff0f5] font-bold text-xs px-4 py-2 rounded-xl border border-[#e60067] transition-colors shadow-xs"
          >
            Create
          </Link>
        </div>
      </div>

      {/* Chats List */}
      <div className="bg-white border border-black/5 rounded-2xl divide-y divide-black/5 shadow-xs overflow-hidden">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              {/* Gray Rounded Avatar S */}
              <div className="w-9 h-9 rounded-full bg-[#e3e3e8] text-[#64748b] font-bold text-sm flex items-center justify-center">
                S
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1a1a24]">{chat.title}</h3>
                <p className="text-xs text-[#64748b] font-medium mt-0.5">
                  {chat.updatedAt} · {chat.createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#e60067] text-white font-bold text-[10px] flex items-center justify-center">
                  S
                </div>
                <span className="text-xs text-[#64748b] font-medium">{chat.owner}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 px-2 py-1 text-base font-bold">
                ⋮
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
