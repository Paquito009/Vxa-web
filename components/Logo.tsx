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
        <span
          className="font-sans font-semibold text-white"
          style={{ fontSize: height * 0.7 }}
        >
          VXA
        </span>
      ) : (
        <Image
          src={LOGO_SRC}
          alt="VXA"
          width={width}
          height={height}
          priority={priority}
          className="w-auto object-contain"
          style={{ height }}
          sizes="(max-width: 640px) 28px, 28px"
          onError={() => setImgError(true)}
        />
      )}
      {showText && (
        <span className="text-lg font-bold text-text-primary">VXA</span>
      )}
    </div>
  );
}
