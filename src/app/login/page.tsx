"use client";

import Link from "next/link";
import { useState } from "react";

const testimonials = [
  {
    company: "STELLAR",
    quote:
      '"Stellar closed $200k ARR each month using LeadForge pre-researched leads."',
    person: "Matt Wetrich",
    role: "CEO, Stellar",
    features: ["Pre-researched Leads", "Pipeline Automation", "CRM Integration"],
  },
  {
    company: "NEXUS AI",
    quote:
      '"LeadForge transformed our outbound — 3x more meetings booked in the first month."',
    person: "Sarah Chen",
    role: "VP Sales, Nexus AI",
    features: ["Buying Signals", "Account Flows", "Lead Quality"],
  },
];

export default function LoginPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const t = testimonials[activeTestimonial];

  return (
    <div className="auth-split-pane">
      {/* Left — Testimonial */}
      <div className="auth-left hidden lg:flex">
        {/* Top-left brand */}
        <div className="absolute top-6 left-8 flex items-center gap-1.5">
          <svg className="w-6 h-6 text-[var(--pink)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <div className="max-w-lg mx-auto space-y-8 relative z-10">
          <h2 className="text-2xl font-bold text-[#09090b] tracking-tight">
            {t.company}
          </h2>

          <p className="text-lg text-[#3f3f46] leading-relaxed font-normal">
            {t.quote}
          </p>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-sm font-bold text-zinc-600">
              {t.person[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#09090b]">{t.person}</p>
              <p className="text-xs text-[#71717a]">{t.role}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-black/10 space-y-3">
            <span className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-widest">
              {t.company}&apos;S FAVORITE FEATURES
            </span>
            <div className="flex items-center gap-2 text-sm text-[#3f3f46]">
              {t.features.map((f, i) => (
                <span key={f}>
                  {f}
                  {i < t.features.length - 1 && (
                    <span className="text-[#d4d4d8] ml-2">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2 pt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`rounded-full transition-all ${
                  i === activeTestimonial
                    ? "w-6 h-2.5 bg-[var(--pink)]"
                    : "w-2.5 h-2.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-6 left-8 right-8 flex justify-between text-xs text-[#a1a1aa]">
          <span>© 2026 LeadForge</span>
          <span>Trusted by sales teams at leading brands</span>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="auth-right">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-[var(--pink)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h1 className="text-xl font-bold text-[var(--text-main)]">Welcome Back</h1>
            <p className="text-sm text-[var(--text-sub)]">
              Sign in to continue building with LeadForge
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="origami-input"
              />
            </div>

            <Link
              href="/dashboard"
              className="origami-btn-pink-outline w-full text-center block py-2.5"
            >
              Continue with Email &gt;
            </Link>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Google SSO */}
          <button className="origami-btn-outline w-full py-2.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-[var(--text-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[var(--pink)] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
