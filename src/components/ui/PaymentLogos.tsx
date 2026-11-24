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
  "inline-flex h-11 w-16 sm:w-20 items-center justify-center rounded-xl border border-[#243028] bg-white p-1.5 shadow-sm transition-all hover:border-[#00b869]/60 hover:scale-105";

/**
 * Official payment logos only (no text) to trigger the Authority Effect.
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
      <div className={`${BOX} ${className}`} title="GoPay E-Wallet">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00AED6] text-base font-black text-white">
          g
        </div>
      </div>
    );
  }

  if (key && LOGOS[key]) {
    const l = LOGOS[key];
    return (
      <div className={`${BOX} ${className}`} title={l.title}>
        <img src={l.src} alt={l.alt} className="h-full w-full object-contain" loading="lazy" />
      </div>
    );
  }

  // Fallback for other banks: text only when no logo exists
  return (
    <div className={`${BOX} text-[10px] font-bold text-zinc-800 ${className}`} title={method}>
      {method}
    </div>
  );
}
