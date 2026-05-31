"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const navLinks = [
  { label: "Services", href: "services" },
  { label: "Demo", href: "demo" },
  { label: "Pricing", href: "pricing" },
  { label: "About", href: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      let current = "";
      navLinks.forEach(({ href }) => {
        const section = document.getElementById(href);
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top <= 120) current = href;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "bg-black/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : "bg-black/70"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-3.5">
        <a
          href="/"
          className="rounded-md opacity-100 transition-opacity duration-150 hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5A0]"
          aria-label="VXA — home"
        >
          <span className="font-geist text-xl font-bold tracking-wider text-white">VXA</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className={`text-sm font-medium transition-opacity duration-150 ${
                activeSection === link.href
                  ? "text-[#00E5A0] opacity-100"
                  : "text-[#EFEFEF] opacity-60 hover:opacity-100"
              }`}
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
          className="text-[#EFEFEF] opacity-70 transition-opacity duration-150 hover:opacity-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-black/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className={`text-left text-sm transition-opacity duration-150 ${
                  activeSection === link.href
                    ? "text-[#00E5A0] opacity-100"
                    : "text-[#EFEFEF] opacity-60 hover:opacity-100"
                }`}
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
