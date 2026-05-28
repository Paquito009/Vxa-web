import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt";
  divider?: boolean;
}

export default function Section({
  id,
  children,
  className = "",
  variant = "default",
  divider = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-4 py-24 md:px-8 ${
        variant === "alt" ? "bg-bg-secondary" : ""
      } ${className}`}
    >
      {divider && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent"
          aria-hidden
        />
      )}
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
