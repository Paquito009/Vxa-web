"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import Logo from "./Logo";

const navLinks = [
  { label: "Services", href: "services" },
  { label: "Demo", href: "demo" },
  { label: "Pricing", href: "pricing" },
  { label: "About", href: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/95 backdrop-blur-md border-b border-[var(--border-light)] shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
          : "bg-bg-primary/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-3.5">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("hero");
          }}
          className="flex items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          aria-label="VXA — back to top"
        >
          <Logo height={40} priority />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button onClick={() => handleNav("contact")} className="btn-primary text-sm">
            Book a Free Demo
          </button>
        </div>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border-light)] bg-bg-primary/98 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-left text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => handleNav("contact")} className="btn-primary w-full">
              Book a Free Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
