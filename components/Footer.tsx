"use client";

import { scrollToSection } from "@/lib/scroll";
import Logo from "./Logo";

const footerLinks = [
  { label: "Services", id: "services" },
  { label: "Demo", id: "demo" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080808] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <Logo height={36} />
            </div>
            <p className="mb-4 text-sm text-[#5A5A5A]">
              AI Automation for Real Estate Agencies
            </p>
            <a
              href="https://wa.me/541166965574"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#00E5A0] opacity-80 transition-opacity duration-150 hover:opacity-100"
            >
              Chat on WhatsApp &rarr;
            </a>
            <a
              href="mailto:contacto@vxaagency.com"
              className="mt-1 block text-sm text-[#5A5A5A] opacity-50 transition-all duration-150 hover:text-[#00E5A0] hover:opacity-100"
            >
              contacto@vxaagency.com
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#3A3A3A]">
              Navigation
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-[#5A5A5A] opacity-50 transition-all duration-150 hover:text-[#00E5A0] hover:opacity-100"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-semibold text-[#EFEFEF]">
              Ready to automate your agency?
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary"
            >
              Book a Free Call
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center text-xs text-[#3A3A3A]">
          &copy; 2026 VXA &ndash; Vertex Automation Agency. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
