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
          <h1 className="text-2xl font-bold text-[var(--text-main)] mb-1">ICP Profiles</h1>
          <p className="text-sm text-[var(--text-sub)]">
            Define your Ideal Customer Profiles to guide the RAG scoring engine.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="origami-btn-primary"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New ICP
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {icps.map((icp) => (
          <div
            key={icp.id}
            className="origami-card p-6 relative space-y-4 hover:shadow-md transition-shadow"
          >
            {icp.is_default && (
              <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-bold bg-[var(--pink-soft)] text-[var(--pink)] border border-[var(--pink-border)] px-2 py-0.5 rounded">
                Default Profile
              </span>
            )}

            <h3 className="text-lg font-semibold text-[var(--text-main)] pr-24">{icp.name}</h3>
            <p className="text-sm text-[var(--text-sub)] leading-relaxed bg-[var(--bg-subtle)] p-3 rounded-xl border border-[var(--border)]">
              {icp.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
              <span>Target Role: <strong className="text-[var(--text-secondary)]">{icp.target_role}</strong></span>
              <span className="text-[var(--border-hover)]">•</span>
              <span>Size: <strong className="text-[var(--text-secondary)]">{icp.target_company_size}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <form
            onSubmit={handleAddICP}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl animate-slide-up"
          >
            <h3 className="text-lg font-bold text-[var(--text-main)]">Create Ideal Customer Profile</h3>

            <div>
              <label className="block text-xs font-medium text-[var(--text-sub)] mb-1.5">Profile Name</label>
              <input
                type="text"
                placeholder="e.g. Fintech Tech Leads"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="origami-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-sub)] mb-1.5">Target Role</label>
              <input
                type="text"
                placeholder="e.g. CTO, VP Engineering"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="origami-input"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-sub)] mb-1.5">Detailed Description (RAG Criteria)</label>
              <textarea
                rows={3}
                placeholder="Describe your ideal buyer's background, active interests, and intent signals..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="origami-textarea"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs text-[var(--text-sub)] hover:text-[var(--text-main)] font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="origami-btn-primary text-xs"
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
