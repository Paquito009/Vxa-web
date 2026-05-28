"use client";

import FadeIn from "./FadeIn";
import { scrollToSection } from "@/lib/scroll";

const metrics = [
  { value: "< 5 min", label: "Response Time" },
  { value: "40–60%", label: "Leads Saved Per Month" },
  { value: "R 82,000+", label: "Monthly Revenue Recovered" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-16 sm:px-6 md:min-h-screen md:px-8 md:pb-24 md:pt-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108, 99, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 99, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(108, 99, 255, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="particles pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="hero-particle absolute h-1 w-1 rounded-full bg-accent-primary/30"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDuration: `${8 + (i % 5)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <FadeIn>
          <p className="mb-8 inline-block rounded-full border border-accent-primary/25 bg-accent-primary/10 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-primary sm:text-xs">
            AI Automation for Real Estate Agencies
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mx-auto mb-8 max-w-[18ch] text-balance text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:max-w-none sm:text-5xl md:mb-10 md:text-6xl md:leading-[1.08] lg:text-[3.5rem] lg:leading-[1.06]">
            <span className="gradient-text">Every</span> lead answered.
            <br />
            <span className="gradient-text">Every</span> listing ready.
            <br />
            <span className="gradient-text">Zero</span> extra hours.
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-12 max-w-2xl text-pretty text-base font-normal leading-[1.7] text-text-secondary sm:text-lg md:mb-14 md:text-xl md:leading-[1.65]">
            VXA automates the repetitive work that costs South African real estate
            agencies 40+ hours per month — lead follow-up, listing descriptions,
            review requests, and weekly reports. All powered by AI.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mb-16 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mb-20">
            <button onClick={() => scrollToSection("demo")} className="btn-primary w-full sm:w-auto">
              See It In Action →
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="btn-secondary w-full sm:w-auto"
            >
              View Services
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="border-t border-[var(--border-light)] pt-10 md:pt-12">
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
              {metrics.map((m, i) => (
                <div key={m.label} className="flex items-center">
                  {i > 0 && (
                    <div className="mx-8 hidden h-12 w-px bg-[var(--border-light)] sm:block" />
                  )}
                  <div className="text-center sm:min-w-[9rem] sm:px-6">
                    <p className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-text-muted sm:text-xs">
                      {m.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
