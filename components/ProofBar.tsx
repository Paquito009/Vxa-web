"use client";

import { useEffect, useRef, useState } from "react";

const proofStats = [
  {
    end: 60,
    format: (n: number) => `40–60%`.replace("60", String(n)),
    label: "Leads saved per month",
  },
  {
    end: 5,
    format: (n: number) => `< ${n} min`,
    label: "Average response time",
  },
  {
    end: 82000,
    format: (n: number) =>
      `R${
        n >= 1000
          ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, "0")}`
          : n
      }+`,
    label: "Monthly revenue recovered",
  },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState([0, 0, 0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setCounters(proofStats.map((s) => s.end));
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setCounters(proofStats.map((s) => s.end));
      return;
    }

    const duration = 1400;

    proofStats.forEach((stat, i) => {
      const delay = i * 150;
      setTimeout(() => {
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          setCounters((prev) => {
            const next = [...prev];
            next[i] = Math.round(eased * stat.end);
            return next;
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, delay);
    });
  }, [visible]);

  return (
    <div
      ref={ref}
      className="border-y border-[#1C1C1C] bg-[#0A0A0A] px-4 py-12 md:px-8"
    >
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
        {proofStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center ${
              i < proofStats.length - 1
                ? "sm:border-r sm:border-[#1C1C1C] sm:pr-8"
                : ""
            } ${i > 0 ? "sm:pl-8" : ""}`}
          >
            <p className="font-mono text-4xl font-bold text-[#00E5A0]">
              {stat.format(counters[i])}
            </p>
            <p className="mt-2 text-sm text-[#5A5A5A]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
