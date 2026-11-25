import type { RekeningItem } from "@/services/config";
import { PaymentBadge } from "@/components/ui/PaymentLogos";
import { ShieldCheck } from "lucide-react";

export function PaymentStrip({
  rekeningList,
}: {
  rekeningList: RekeningItem[];
  qrImageUrl?: string;
}) {
  // Normalize and deduplicate payment methods
  const rawList = [
    "QRIS",
    ...(rekeningList && rekeningList.length > 0
      ? rekeningList.map((r) => r.bank)
      : ["BCA", "BRI", "DANA", "GoPay"]),
  ];

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
    <section
      className="w-full max-w-full min-w-0 overflow-hidden bg-[#FBF7F4] py-6 sm:py-8"
      aria-label="Metode pembayaran resmi"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-[#EAD6E0] bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-xs flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: Clean Left-Aligned Authority Header */}
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F5] border border-[#EAD6E0] text-[#47023B] shrink-0">
              <ShieldCheck className="h-5 w-5 text-[#FA3890]" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#47023B]">
                Metode Pembayaran Resmi
              </span>
              <span className="block text-xs text-[#6E3B65] mt-0.5">
                Verifikasi otomatis 24 jam • Tanpa biaya tersembunyi
              </span>
            </div>
          </div>

          {/* Subtle mobile divider */}
          <div className="h-px w-full bg-[#EAD6E0]/70 md:hidden" />

          {/* Right: Uniform Payment Badges */}
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-2">
            {uniqueMethods.map((method) => (
              <PaymentBadge key={method} method={method} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
