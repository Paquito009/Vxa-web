"use client";

import FadeIn from "./FadeIn";

const stats = [
  { value: "6+", label: "Services Available" },
  { value: "< 48h", label: "Setup Time for Demos" },
  { value: "$0", label: "Wasted on Generic Tools" },
];

export default function About() {
  return (
    <section id="about" className="bg-bg-secondary px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <div>
              <h2 className="section-title mb-6">About VXA</h2>
              <div className="space-y-4 text-sm leading-relaxed text-text-secondary md:text-base">
                <p>
                  VXA was built for one reason: South African real estate agencies
                  are losing money every week to problems that automation can fix
                  in a weekend.
                </p>
                <p>
                  Missed leads on Friday nights. Listings that take two hours to
                  write. Buyers who said &quot;not yet&quot; and were never
                  followed up. Reports that don&apos;t exist.
                </p>
                <p>
                  We specialize exclusively in real estate automation because
                  generic solutions don&apos;t work. A property agency has specific
                  workflows, specific platforms (Property24, WhatsApp, Google
                  Business), and specific client expectations. We know them well.
                </p>
                <p>
                  We work with agencies in Cape Town, Johannesburg, and Durban —
                  remotely, with clear deliverables and measurable results.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-0">
                {stats.map((s, i) => (
                  <div key={s.label} className="flex items-center">
                    {i > 0 && (
                      <div className="mx-6 hidden h-10 w-px bg-[var(--border-light)] sm:block" />
                    )}
                    <div className="sm:pr-8">
                      <p className="text-2xl font-bold text-text-primary">
                        {s.value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-text-muted">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-bg-card lg:h-80">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 30% 50%, rgba(0,229,160,0.12) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(0,229,160,0.06) 0%, transparent 60%)",
                }}
              />
              <div className="relative text-center">
                <p className="text-6xl font-extrabold gradient-text">VXA</p>
                <p className="mt-2 text-sm text-text-secondary">
                  Vertex Automation Agency
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
