"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scroll";

const statsData = [
  {
    end: 60,
    displayCount: (n: number) => `40–60%`.replace("60", String(n)),
    label: "Leads Saved Per Month",
  },
  {
    end: 5,
    displayCount: (n: number) => `< ${n} min`,
    label: "Response Time",
  },
  {
    end: 82000,
    displayCount: (n: number) =>
      `R ${
        n >= 1000
          ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, "0")}`
          : n
      }+`,
    label: "Monthly Revenue Recovered",
  },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function Hero() {
  const [counters, setCounters] = useState([0, 0, 0]);
  const [statsVisible, setStatsVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setCounters(statsData.map((s) => s.end));
      setStatsVisible(true);
      setLineVisible(true);
      return;
    }

    const t1 = setTimeout(() => setStatsVisible(true), 400);
    const t2 = setTimeout(() => setLineVisible(true), 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setCounters(statsData.map((s) => s.end));
      return;
    }

    const duration = 1000;

    statsData.forEach((stat, index) => {
      const delay = index * 100;
      setTimeout(() => {
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          setCounters((prev) => {
            const next = [...prev];
            next[index] = Math.round(eased * stat.end);
            return next;
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, delay);
    });
  }, [statsVisible]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 sm:px-6 md:px-8"
    >
      {/* Radial glow — left-biased for the split layout */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,229,160,0.05), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 py-24 md:grid-cols-[55fr_45fr] md:gap-16">
        {/* Left: Content */}
        <div>
          {/* Proof line */}
          <div className="mb-6 flex items-center gap-2.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#00E5A0]"
              style={{ boxShadow: "0 0 8px rgba(0,229,160,0.7)" }}
            />
            <p className="text-xs text-[#5A5A5A]">
              Used by agencies in Cape Town, Johannesburg &amp; Durban
            </p>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold leading-none tracking-[-0.04em] text-[#EFEFEF] md:text-7xl">
            <span className="text-[#00E5A0]">Every</span> lead answered.
            <br />
            <span className="text-[#00E5A0]">Every</span> listing ready.
            <br />
            <span className="text-[#00E5A0]">Zero</span> extra hours.
          </h1>

          {/* Body */}
          <p className="mb-10 max-w-[65ch] text-base leading-relaxed text-[#5A5A5A]">
            VXA automates the repetitive work that costs South African real
            estate agencies 40+ hours per month &mdash; lead follow-up, listing
            descriptions, review requests, and weekly reports. All powered by
            AI.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection("demo")}
              className="btn-primary w-full sm:w-auto"
            >
              See It In Action &rarr;
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="btn-ghost w-full sm:w-auto"
            >
              View Services
            </button>
          </div>

          {/* Animated divider line */}
          <div className="mb-10 h-px overflow-hidden bg-[#1C1C1C]">
            <div
              style={{
                height: "100%",
                backgroundColor: "rgba(0,229,160,0.25)",
                width: lineVisible ? "100%" : "0%",
                transition: lineVisible
                  ? "width 600ms cubic-bezier(0.23,1,0.32,1)"
                  : "none",
              }}
            />
          </div>

          {/* Stats row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-0">
            {statsData.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && (
                  <div className="mx-8 hidden h-10 w-px bg-[#1C1C1C] sm:block" />
                )}
                <div
                  style={{
                    opacity: statsVisible ? 1 : 0,
                    transform: statsVisible
                      ? "translateY(0)"
                      : "translateY(8px)",
                    transition: `opacity 300ms cubic-bezier(0.23,1,0.32,1) ${i * 100}ms, transform 300ms cubic-bezier(0.23,1,0.32,1) ${i * 100}ms`,
                  }}
                >
                  <p className="font-mono text-2xl font-bold text-[#EFEFEF] md:text-3xl">
                    {stat.displayCount(counters[i])}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#3A3A3A]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Orbital visual */}
        <div className="relative hidden items-center justify-center md:flex">
          <div
            className="absolute h-[480px] w-[480px] rounded-full"
            style={{ border: "1px solid rgba(0,229,160,0.06)" }}
          />
          <div
            className="absolute h-[340px] w-[340px] rounded-full"
            style={{
              border: "1px solid rgba(0,229,160,0.09)",
              background:
                "radial-gradient(circle, rgba(0,229,160,0.02) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute h-[200px] w-[200px] rounded-full"
            style={{
              border: "1px solid rgba(0,229,160,0.14)",
              background:
                "radial-gradient(circle, rgba(0,229,160,0.04) 0%, transparent 70%)",
            }}
          />
          {/* Orbital nodes */}
          <div
            className="absolute h-2 w-2 rounded-full bg-[#00E5A0]"
            style={{
              top: "calc(50% - 170px)",
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 0 12px rgba(0,229,160,0.5)",
            }}
          />
          <div
            className="absolute h-1.5 w-1.5 rounded-full bg-[#00E5A0]/50"
            style={{
              top: "50%",
              right: "calc(50% - 240px)",
              transform: "translateY(-50%)",
            }}
          />
          <div
            className="absolute h-1.5 w-1.5 rounded-full bg-[#00E5A0]/30"
            style={{
              bottom: "calc(50% - 170px)",
              left: "calc(50% + 80px)",
            }}
          />
          {/* Center glow */}
          <div
            className="h-4 w-4 rounded-full bg-[#00E5A0]"
            style={{
              boxShadow:
                "0 0 24px rgba(0,229,160,0.9), 0 0 60px rgba(0,229,160,0.4)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
