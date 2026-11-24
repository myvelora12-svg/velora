import React from "react";
import Image from "next/image";

interface CloverLogoProps {
  variant?: "full" | "icon" | "image-full" | "image-icon";
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Geometric 4-leaf clover SVG matching the official cloverbux branding
 */
export function CloverIcon({ className = "h-7 w-7 text-[#00b869]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top-Left Petal */}
      <polygon points="18,6 36,6 47,17 47,47 6,47 6,18" />
      {/* Top-Right Petal */}
      <polygon points="64,6 82,6 94,18 94,47 53,47 53,17" />
      {/* Bottom-Left Petal */}
      <polygon points="6,53 47,53 47,83 36,94 18,94 6,82" />
      {/* Bottom-Right Petal */}
      <polygon points="53,53 94,53 94,82 82,94 64,94 53,83" />
      {/* Stem */}
      <polygon points="43,62 50,75 50,96 43,96 41,83" />
    </svg>
  );
}

export function CloverLogo({
  variant = "full",
  className = "",
  iconClassName = "h-7 w-7",
  size = "md",
}: CloverLogoProps) {
  if (variant === "image-full") {
    return (
      <div className={`relative flex items-center ${className}`}>
        <Image
          src="/brand/logo-full.jpg"
          alt="cloverbux"
          width={180}
          height={48}
          className="h-9 w-auto object-contain rounded"
          priority
        />
      </div>
    );
  }

  if (variant === "image-icon") {
    return (
      <div className={`relative flex items-center ${className}`}>
        <Image
          src="/brand/logo-icon.jpg"
          alt="cloverbux"
          width={40}
          height={40}
          className="h-8 w-8 rounded-lg object-contain"
        />
      </div>
    );
  }

  const textSize =
    size === "sm"
      ? "text-sm sm:text-base"
      : size === "lg"
      ? "text-xl sm:text-3xl"
      : "text-base min-[380px]:text-lg sm:text-2xl";

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 ${className}`}>
      <span className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#161c18] border border-[#243028] shadow-sm">
        <CloverIcon className="h-4.5 w-4.5 sm:h-6 sm:w-6 text-[#00b869] drop-shadow-[0_0_8px_rgba(0,184,105,0.4)]" />
      </span>

      {variant === "full" && (
        <span className={`font-heading font-black tracking-tight ${textSize} leading-none`}>
          <span className="text-white">clover</span>
          <span className="text-[#00b869]">bux</span>
        </span>
      )}
    </div>
  );
}

