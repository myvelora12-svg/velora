import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MyVeloraLogoProps {
  variant?: "full" | "icon" | "image-full" | "image-icon";
  surface?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * My Velora Brand Logo — uses official mv logo asset from Myvelora Store
 * without redundant text beside it.
 */
export function MyVeloraLogo({
  surface = "dark",
  className = "",
  size = "md",
}: MyVeloraLogoProps) {
  const sizeMap = {
    sm: { width: 48, height: 25, imgClass: "h-6 w-auto" },
    md: { width: 62, height: 32, imgClass: "h-7 sm:h-8 w-auto" },
    lg: { width: 84, height: 44, imgClass: "h-10 sm:h-11 w-auto" },
  };

  const currentSize = sizeMap[size];

  if (surface === "light") {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-xl bg-[#47023B] px-3 py-1.5 select-none shadow-sm",
          className
        )}
      >
        <Image
          src="/brand/myvelora-logo.png"
          alt="My Velora"
          width={currentSize.width}
          height={currentSize.height}
          className={cn("object-contain shrink-0", currentSize.imgClass)}
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center select-none py-1", className)}>
      <Image
        src="/brand/myvelora-logo.png"
        alt="My Velora"
        width={currentSize.width}
        height={currentSize.height}
        className={cn("object-contain shrink-0", currentSize.imgClass)}
        priority
      />
    </div>
  );
}
