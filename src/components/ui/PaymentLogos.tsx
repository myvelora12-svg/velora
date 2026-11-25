import React from "react";

interface PaymentBadgeProps {
  method: string;
  className?: string;
}

const LOGOS: Record<string, { src: string; alt: string; title: string }> = {
  QRIS: { src: "/payments/qris.png", alt: "QRIS", title: "QRIS - Semua Bank & E-Wallet" },
  BCA: { src: "/payments/bca.png", alt: "BCA", title: "Bank Central Asia (BCA)" },
  BRI: { src: "/payments/bri.png", alt: "BRImo", title: "Bank BRI / BRImo" },
  DANA: { src: "/payments/dana.png", alt: "DANA", title: "DANA E-Wallet" },
};

const BOX =
  "inline-flex h-10 min-w-[64px] px-3 items-center justify-center rounded-xl border border-[#EAD6E0] bg-[#FBF7F4] transition-colors hover:border-[#FA3890]/60 hover:bg-[#FAF0F5]";

/**
 * Official payment badges with clean, uniform sizing.
 */
export function PaymentBadge({ method, className = "" }: PaymentBadgeProps) {
  const norm = method.toUpperCase().trim();

  let key: string | null = null;
  if (norm.includes("GOPAY")) key = "GOPAY";
  else if (norm.includes("QRIS")) key = "QRIS";
  else if (norm.includes("BCA")) key = "BCA";
  else if (norm.includes("BRI")) key = "BRI";
  else if (norm.includes("DANA")) key = "DANA";

  if (key === "GOPAY") {
    return (
      <div className={`${BOX} gap-1.5 ${className}`} title="GoPay E-Wallet">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00AED6] text-xs font-black text-white">
          g
        </span>
        <span className="text-xs font-bold text-[#47023B]">GoPay</span>
      </div>
    );
  }

  if (key && LOGOS[key]) {
    const l = LOGOS[key];
    return (
      <div className={`${BOX} ${className}`} title={l.title}>
        <img src={l.src} alt={l.alt} className="h-5 w-auto max-w-[56px] object-contain" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`${BOX} text-xs font-bold text-[#47023B] ${className}`} title={method}>
      {method}
    </div>
  );
}
