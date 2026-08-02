"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#12121a] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            LeadForge
          </span>
        </div>

        <h1 className="text-xl font-semibold text-center text-white mb-2">Create Your Account</h1>
        <p className="text-sm text-center text-white/40 mb-6">Get 50 free leads instantly. No credit card required.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="Alex Chen"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Work Email</label>
            <input
              type="email"
              placeholder="alex@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <Link
            href="/dashboard"
            className="w-full block text-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium py-2.5 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-violet-500/25 mt-2"
          >
            Start Free Trial →
          </Link>
        </form>

        <div className="mt-6 text-center text-xs text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:underline font-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
