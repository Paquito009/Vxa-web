"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import FadeIn from "./FadeIn";

const agentOptions = ["1–5 agents", "6–15 agents", "16–30 agents", "30+ agents"];
const leadOptions = ["Less than 10", "10–30", "30–60", "60+"];

const challenges = [
  "Slow lead response time",
  "Writing listing descriptions takes too long",
  "Not enough Google reviews",
  "No visibility on agent performance",
  "Old contacts going cold",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    agencyName: "",
    contactName: "",
    whatsapp: "",
    agents: "",
    leadsPerWeek: "",
    challenges: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleChallenge = (c: string) => {
    setForm((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(c)
        ? prev.challenges.filter((x) => x !== c)
        : [...prev.challenges, c],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agency_name: form.agencyName,
          contact_name: form.contactName,
          whatsapp: form.whatsapp,
          agents: form.agents,
          leads_per_week: form.leadsPerWeek,
          challenges: form.challenges,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Request failed");
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="contact" className="px-4 py-24 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <FadeIn>
            <div className="card py-12">
              <p className="text-4xl mb-4">🚀</p>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                Done! We&apos;ll reach out on WhatsApp within 24 hours.
              </h2>
              <p className="text-text-secondary">
                Your personalized agency audit is on its way.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4">
              Let&apos;s See What VXA Can Do For Your Agency
            </h2>
            <p className="text-text-secondary">
              Answer 4 quick questions. We&apos;ll send you a personalized
              breakdown of exactly which systems would have the biggest impact
              for your agency — within 24 hours.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <form onSubmit={handleSubmit} className="card space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Agency name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Coastal Property Group"
                value={form.agencyName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, agencyName: e.target.value }))
                }
                className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-primary/50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Your name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Linda French"
                value={form.contactName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contactName: e.target.value }))
                }
                className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-primary/50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                WhatsApp number
              </label>
              <input
                required
                type="tel"
                placeholder="+27 XX XXX XXXX"
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((p) => ({ ...p, whatsapp: e.target.value }))
                }
                className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-primary/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                How many agents does your agency have?
              </label>
              <div className="space-y-2">
                {agentOptions.map((opt) => (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-light)] px-4 py-3 transition-colors has-[:checked]:border-accent-primary/50 has-[:checked]:bg-accent-primary/10"
                  >
                    <input
                      type="radio"
                      name="agents"
                      value={opt}
                      required
                      checked={form.agents === opt}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, agents: e.target.value }))
                      }
                      className="accent-accent-primary"
                    />
                    <span className="text-sm text-text-primary">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                How many leads do you receive per week?
              </label>
              <select
                required
                value={form.leadsPerWeek}
                onChange={(e) =>
                  setForm((p) => ({ ...p, leadsPerWeek: e.target.value }))
                }
                className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary/50"
              >
                <option value="">Select...</option>
                {leadOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                What&apos;s your biggest challenge right now?
              </label>
              <div className="space-y-2">
                {challenges.map((c) => (
                  <label
                    key={c}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-light)] px-4 py-3 transition-colors has-[:checked]:border-accent-primary/50 has-[:checked]:bg-accent-primary/10"
                  >
                    <input
                      type="checkbox"
                      checked={form.challenges.includes(c)}
                      onChange={() => toggleChallenge(c)}
                      className="accent-accent-primary"
                    />
                    <span className="text-sm text-text-primary">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || form.challenges.length === 0}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Get My Free Agency Audit →"
              )}
            </button>

            <p className="text-center text-xs text-text-muted">
              🔒 No spam. No sales pitch. Just a clear breakdown of what&apos;s
              costing you money and exactly how to fix it. Response within 24
              hours.
            </p>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
