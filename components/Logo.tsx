"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  /** Display height in px (width scales automatically). */
  height?: number;
  showText?: boolean;
  className?: string;
  priority?: boolean;
}

const LOGO_SRC = "/logo-vxa.png";
const ASPECT = 1048 / 1008;

export default function Logo({
  height = 40,
  showText = false,
  className = "",
  priority = false,
}: LogoProps) {
  const [imgError, setImgError] = useState(false);
  const width = Math.round(height * ASPECT);

  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      {imgError ? (
        <div
          className="flex items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary font-bold text-white"
          style={{ width: height, height, fontSize: height * 0.35 }}
        >
          V
        </div>
      ) : (
        <Image
          src={LOGO_SRC}
          alt="VXA"
          width={width}
          height={height}
          priority={priority}
          className="h-8 w-auto max-w-[min(100%,10rem)] object-contain sm:h-10"
          sizes="(max-width: 640px) 32px, 40px"
          onError={() => setImgError(true)}
        />
      )}
      {showText && (
        <span className="text-lg font-bold text-text-primary">VXA</span>
      )}
    </div>
  );
}
