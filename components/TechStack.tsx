"use client";

import FadeIn from "./FadeIn";

const tools = [
  { name: "Claude", label: "Anthropic AI" },
  { name: "Make.com", label: "Automations" },
  { name: "n8n", label: "Workflows" },
  { name: "WhatsApp", label: "Business API" },
  { name: "Airtable", label: "CRM" },
  { name: "Notion", label: "Docs" },
  { name: "Google Calendar", label: "Scheduling" },
  { name: "Python", label: "Scripts" },
  { name: "Next.js", label: "Web Apps" },
];

export default function TechStack() {
  return (
    <section className="border-y border-[var(--border-light)] px-4 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4">Built With Best-in-Class Tools</h2>
            <p className="text-text-secondary">
              Enterprise-grade automation. No vendor lock-in. Scales with your
              agency.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:gap-6">
            {tools.map((tool, i) => (
              <div
                key={tool.name}
                className="group flex flex-col items-center justify-center rounded-xl border border-[var(--border-light)] bg-bg-card px-3 py-6 transition-all duration-300 hover:border-accent-primary/30"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-lg font-bold text-text-secondary grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-accent-primary">
                  {tool.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-center text-xs font-semibold text-text-primary transition-colors group-hover:text-accent-primary">
                  {tool.name}
                </p>
                <p className="mt-0.5 text-center text-[10px] text-text-muted">
                  {tool.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
