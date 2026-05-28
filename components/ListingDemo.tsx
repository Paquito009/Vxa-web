"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Copy, Check, Loader2, Sparkles } from "lucide-react";
import FadeIn from "./FadeIn";

interface ListingOutput {
  property24: { title: string; description: string };
  instagram: { caption: string; hashtags: string };
  whatsapp: { message: string };
}

const initialForm = {
  propertyType: "House",
  bedrooms: "3",
  bathrooms: "2",
  area: "",
  price: "",
  features: "",
  highlights: "",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-md border border-[var(--border-light)] px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent-primary/40 hover:text-text-primary"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function ListingDemo() {
  const [form, setForm] = useState(initialForm);
  const [output, setOutput] = useState<ListingOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setOutput(null);

    try {
      const res = await fetch("/api/listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Request failed");
      }

      setOutput(data);
    } catch {
      setError("Something went wrong. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="listing-demo" className="bg-bg-secondary px-4 py-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4">
              Generate a Full Listing in 30 Seconds
            </h2>
            <p className="text-text-secondary">
              Fill in the basic details. Get a Property24 description, an
              Instagram caption, and a WhatsApp message — all ready to copy and
              paste.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Property Type
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) => update("propertyType", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary/50"
                >
                  {["House", "Apartment", "Townhouse", "Plot"].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Bedrooms
                </label>
                <select
                  value={form.bedrooms}
                  onChange={(e) => update("bedrooms", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary/50"
                >
                  {["1", "2", "3", "4", "5+"].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Bathrooms
                </label>
                <select
                  value={form.bathrooms}
                  onChange={(e) => update("bathrooms", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent-primary/50"
                >
                  {["1", "2", "3", "4+"].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Area / Suburb
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sea Point, Cape Town"
                  value={form.area}
                  onChange={(e) => update("area", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-primary/50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Price
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. R 2,800,000"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-primary/50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Key Features
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Pool, double garage, mountain views, renovated kitchen"
                  value={form.features}
                  onChange={(e) => update("features", e.target.value)}
                  className="w-full resize-none rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-primary/50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Special Highlights (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Corner plot, pet-friendly, solar panels"
                  value={form.highlights}
                  onChange={(e) => update("highlights", e.target.value)}
                  className="w-full resize-none rounded-lg border border-[var(--border-light)] bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-primary/50"
                />
              </div>
            </div>

            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="mr-2" />
                  Generate Listing ✨
                </>
              )}
            </button>
          </form>
        </FadeIn>

        {loading && (
          <div className="card animate-pulse space-y-4">
            <div className="h-4 w-1/3 rounded bg-bg-secondary" />
            <div className="h-3 w-full rounded bg-bg-secondary" />
            <div className="h-3 w-full rounded bg-bg-secondary" />
            <div className="h-3 w-2/3 rounded bg-bg-secondary" />
          </div>
        )}

        {output && !loading && (
          <FadeIn>
            <Tabs.Root defaultValue="property24" className="card">
              <Tabs.List className="mb-6 flex flex-wrap gap-2 border-b border-[var(--border-light)] pb-4">
                {[
                  { value: "property24", label: "Property24" },
                  { value: "instagram", label: "Instagram" },
                  { value: "whatsapp", label: "WhatsApp" },
                ].map((tab) => (
                  <Tabs.Trigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors data-[state=active]:bg-accent-primary/20 data-[state=active]:text-accent-primary"
                  >
                    {tab.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <Tabs.Content value="property24">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-text-primary">
                    {output.property24.title}
                  </h3>
                  <CopyButton
                    text={`${output.property24.title}\n\n${output.property24.description}`}
                  />
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
                  {output.property24.description}
                </p>
              </Tabs.Content>

              <Tabs.Content value="instagram">
                <div className="mb-4 flex justify-end">
                  <CopyButton
                    text={`${output.instagram.caption}\n\n${output.instagram.hashtags}`}
                  />
                </div>
                <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
                  {output.instagram.caption}
                </p>
                <p className="text-sm text-accent-secondary">
                  {output.instagram.hashtags}
                </p>
              </Tabs.Content>

              <Tabs.Content value="whatsapp">
                <div className="mb-4 flex justify-end">
                  <CopyButton text={output.whatsapp.message} />
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
                  {output.whatsapp.message}
                </p>
              </Tabs.Content>
            </Tabs.Root>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
