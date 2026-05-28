"use client";

import FadeIn from "./FadeIn";
import { scrollToSection } from "@/lib/scroll";
import {
  Globe,
  MessageCircle,
  PenLine,
  Star,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const services = [
  {
    id: "webcraft",
    icon: Globe,
    name: "01 🌐 WebCraft",
    tagline:
      "Your professional online presence, built from scratch. HTML, CSS and JavaScript — no templates, no limitations.",
    problem:
      "Many businesses have outdated, slow websites built on platforms with monthly fees that you don't own. They don't reflect your brand or integrate with your systems.",
    includes: [
      "100% custom build — no templates",
      "Full ownership of the code",
      "Native integration with the VXA ecosystem",
      "Fast, modern sites ready to connect with LeadFlow, ContentAI and more",
    ],
    setup: "$600 – $3,000 USD / €550 – €2,750 EUR",
    monthly: "$150 – $550 USD / €140 – €550 EUR/mo",
    cta: "Add WebCraft →",
    ctaAction: () => scrollToSection("contact"),
  },
  {
    id: "leadflow",
    icon: MessageCircle,
    tag: "Most Popular",
    featured: true,
    name: "02 LeadFlow 24/7",
    tagline: "No lead goes unanswered. Ever.",
    problem:
      "You lose 40–60% of your leads because nobody responds on weekends or after 6pm. By Monday morning, they've already signed with someone else.",
    includes: [
      "WhatsApp bot that responds in under 5 minutes, 24/7",
      "Qualifies the lead automatically (budget, area, property type)",
      "Books property viewings directly into your calendar",
      "Notifies the responsible agent instantly",
    ],
    setup: "$800 – $1,200 USD",
    monthly: "$400 – $700 USD/mo",
    cta: "Add LeadFlow →",
    ctaAction: () => scrollToSection("contact"),
  },
  {
    id: "contentai",
    icon: PenLine,
    name: "03 ContentAI",
    tagline: "One form. 30 seconds. Property24 + Instagram + WhatsApp — done.",
    problem:
      "Writing descriptions for Property24, Instagram captions, and WhatsApp messages for every new listing takes 2–3 hours per property. Multiply that by 10 listings a month.",
    includes: [
      "Agent fills a simple form (beds, baths, area, features, price)",
      "AI generates: full Property24 listing, Instagram caption with hashtags, WhatsApp broadcast message",
      "All 3 outputs in under 30 seconds",
      "Consistent brand voice across all channels",
    ],
    setup: "$400 – $600 USD",
    monthly: "$200 – $400 USD/mo",
    cta: "Try the Demo Below →",
    ctaAction: () => scrollToSection("listing-demo"),
  },
  {
    id: "reviewbot",
    icon: Star,
    name: "04 ReviewBot",
    tagline: "More 5-star reviews. Zero manual effort.",
    problem:
      "After every successful deal, your agents forget to ask for a Google review. Negative reviews appear with no response. Your online reputation runs itself — badly.",
    includes: [
      "Automatic WhatsApp message after every closing asking for a Google review",
      "Auto-responses to positive reviews (branded, not generic)",
      "Instant alert to the owner if a negative review comes in",
      "Monthly reputation report",
    ],
    setup: "$300 – $500 USD",
    monthly: "$150 – $300 USD/mo",
    cta: "Add ReviewBot →",
    ctaAction: () => scrollToSection("contact"),
  },
  {
    id: "reportai",
    icon: BarChart3,
    name: "05 ReportAI",
    tagline: "Every Monday at 8am, your business in your WhatsApp.",
    problem:
      "You don't know in real time how many leads came in, which agent followed up, or how many viewings were booked. You're running your agency blind.",
    includes: [
      "Live dashboard with key metrics (leads, viewings, closings, response rates)",
      "Automated Monday morning report via WhatsApp at 8am",
      "Per-agent performance breakdown",
      "Weekly trend comparison",
    ],
    setup: "$500 – $800 USD",
    monthly: "$200 – $400 USD/mo",
    cta: "Add ReportAI →",
    ctaAction: () => scrollToSection("contact"),
  },
  {
    id: "nurtureflow",
    icon: RefreshCw,
    name: "06 NurtureFlow",
    tagline: "Reactivate your dead leads automatically.",
    problem:
      "Every agency has hundreds of contacts who said \"not right now\" 6 months ago. They're never followed up. That's your biggest untapped revenue source.",
    includes: [
      "Automatically matches new listings to past buyer profiles",
      "Sends personalized WhatsApp/email when a match is found",
      "Notifies the agent the moment a contact responds",
      "CRM integration to track reactivation history",
    ],
    setup: "$600 – $1,000 USD",
    monthly: "$300 – $500 USD/mo",
    cta: "Add NurtureFlow →",
    ctaAction: () => scrollToSection("contact"),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-bg-secondary px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="section-title mb-4">
              The 6 Systems That Run Your Agency on Autopilot
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Each one solves a specific problem that&apos;s costing you time and
              money right now.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn
                key={service.id}
                delay={index * 80}
                className={service.featured ? "md:col-span-2" : ""}
              >
                <div
                  className={`card h-full flex flex-col ${
                    service.featured
                      ? "border-accent-primary/50 ring-1 ring-accent-primary/20"
                      : ""
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-primary/15 text-accent-primary">
                      <Icon size={24} />
                    </div>
                    {service.tag && (
                      <span className="rounded-full bg-accent-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-1 text-xl font-bold text-text-primary">
                    {service.name}
                  </h3>
                  <p className="mb-4 text-sm font-medium text-accent-secondary">
                    {service.tagline}
                  </p>

                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {service.problem}
                  </p>

                  <ul className="mb-6 flex-1 space-y-2">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-1 text-accent-primary">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4 space-y-1 border-t border-[var(--border-light)] pt-4 text-sm">
                    <p className="text-text-muted">
                      Setup:{" "}
                      <span className="text-text-primary">{service.setup}</span>
                    </p>
                    <p className="text-text-muted">
                      Monthly:{" "}
                      <span className="text-text-primary">{service.monthly}</span>
                    </p>
                  </div>

                  <button
                    onClick={service.ctaAction}
                    className="btn-secondary w-full text-sm"
                  >
                    {service.cta}
                  </button>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={200}>
          <div id="pricing" className="card mt-8 scroll-mt-28 text-center md:mt-12">
            <h3 className="mb-2 text-2xl font-bold text-text-primary">
              All 6 Systems — Full Automation Package
            </h3>
            <p className="mb-2 text-3xl font-bold gradient-text">
              $1,400 – $2,300 USD/month
            </p>
            <p className="mb-6 text-text-secondary">
              Everything above. One agency. Fully automated.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary"
            >
              Get the Full Package →
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
