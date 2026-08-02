"use client";

import { useState } from "react";

export default function ICPProfilesPage() {
  const [icps, setIcps] = useState([
    {
      id: "1",
      name: "SaaS Founders (Pre-Series A)",
      description: "Founders of B2B SaaS companies with 5-20 employees looking to automate outbound lead generation.",
      target_role: "CEO / Founder",
      target_company_size: "5-20 employees",
      is_default: true,
    },
    {
      id: "2",
      name: "B2B Marketing Agencies",
      description: "Agencies managing client outbound campaigns seeking high-volume multi-platform lead scraping with verified emails.",
      target_role: "VP Marketing / Agency Owner",
      target_company_size: "10-50 employees",
      is_default: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleAddICP = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      name: newName,
      description: newDesc,
      target_role: newRole || "Decision Maker",
      target_company_size: "Any",
      is_default: false,
    };
    setIcps([...icps, newEntry]);
    setShowModal(false);
    setNewName("");
    setNewDesc("");
    setNewRole("");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">ICP Profiles</h1>
          <p className="text-sm text-white/50">
            Define your Ideal Customer Profiles to guide the RAG scoring engine.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-violet-500/20"
        >
          + Create New ICP
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {icps.map((icp) => (
          <div
            key={icp.id}
            className="bg-[#12121a] border border-white/5 rounded-2xl p-6 relative hover:border-white/10 transition-colors space-y-4"
          >
            {icp.is_default && (
              <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded">
                Default Profile
              </span>
            )}

            <h3 className="text-lg font-semibold text-white">{icp.name}</h3>
            <p className="text-sm text-white/60 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
              {icp.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-white/40 pt-2 border-t border-white/5">
              <span>Target Role: <strong className="text-white/80">{icp.target_role}</strong></span>
              <span>•</span>
              <span>Size: <strong className="text-white/80">{icp.target_company_size}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddICP}
            className="bg-[#12121a] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl"
          >
            <h3 className="text-lg font-bold text-white">Create Ideal Customer Profile</h3>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1">Profile Name</label>
              <input
                type="text"
                placeholder="e.g. Fintech Tech Leads"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1">Target Role</label>
              <input
                type="text"
                placeholder="e.g. CTO, VP Engineering"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1">Detailed Description (RAG Criteria)</label>
              <textarea
                rows={3}
                placeholder="Describe your ideal buyer's background, active interests, and intent signals..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium px-4 py-2 rounded-lg"
              >
                Save ICP Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
