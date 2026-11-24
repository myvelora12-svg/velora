import type { RekeningItem } from "@/services/config";
import { PaymentBadge } from "@/components/ui/PaymentLogos";
import { ShieldCheck } from "lucide-react";

export function PaymentStrip({
  rekeningList,
  qrImageUrl,
}: {
  rekeningList: RekeningItem[];
  qrImageUrl?: string;
}) {
  // Normalize and deduplicate payment methods
  const rawList = [
    "QRIS", // Selalu sediakan QRIS sebagai standar universal
    ...(rekeningList && rekeningList.length > 0
      ? rekeningList.map((r) => r.bank)
      : ["BCA", "BRI", "DANA", "GoPay"]),
  ];

  // Map into canonical labels and deduplicate
  const uniqueMethods = Array.from(
    new Set(
      rawList.map((m) => {
        const u = m.toUpperCase().trim();
        if (u.includes("GOPAY")) return "GoPay";
        if (u.includes("QRIS")) return "QRIS";
        if (u.includes("BCA")) return "BCA";
        if (u.includes("BRI")) return "BRI";
        if (u.includes("DANA")) return "DANA";
        if (u.includes("MANDIRI")) return "Mandiri";
        if (u.includes("SHOPEE")) return "ShopeePay";
        return m.trim();
      })
    )
  );

  return (
    <section className="w-full max-w-full min-w-0 overflow-hidden border-y border-[#243028] bg-[#141a16] py-5 sm:py-6" aria-label="Metode pembayaran resmi">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row">
        {/* Left: Authority & Security Guarantee */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111613] border border-[#243028] text-[#00b869] shrink-0 shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
              Metode Pembayaran Resmi
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-400">
              Verifikasi transfer instan 24 jam nonstop tanpa biaya tersembunyi
            </span>
          </div>
        </div>

        {/* Right: Payment Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {uniqueMethods.map((method) => (
            <PaymentBadge key={method} method={method} />
          ))}
        </div>
      </div>
    </section>
  );
}
