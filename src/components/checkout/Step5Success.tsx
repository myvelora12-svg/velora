import Link from "next/link";
import { CheckCircle, Search, Home } from "lucide-react";
import { formatRupiah, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface Step5Props {
  order: {
    orderId: string;
    code: string;
    game?: string;
    itemName?: string;
    gameUserId?: string;
    gameZoneId?: string;
    robuxAmount?: number;
    totalPrice: number;
    robloxUsername?: string;
  };
}

export function Step5Success({ order }: Step5Props) {
  const accountText = order.gameZoneId
    ? `${order.gameUserId || order.robloxUsername} (Zone: ${order.gameZoneId})`
    : (order.gameUserId || order.robloxUsername || "-");

  const itemText = order.itemName || (order.robuxAmount ? `${order.robuxAmount.toLocaleString("id-ID")} Robux` : "-");

  const rows = [
    { label: "Order ID", value: order.orderId, mono: true },
    { label: "Kode cek status", value: order.code, mono: true, accent: true },
    { label: "Game", value: (order.game ? order.game.toUpperCase() : "ROBLOX") },
    { label: "Akun / Player ID", value: accountText },
    { label: "Paket Item", value: itemText },
    { label: "Total dibayar", value: formatRupiah(order.totalPrice) },
  ];

  return (
    <div className="py-4 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF0F5] border border-[#FA3890]/50 text-[#FA3890] shadow-xs">
        <CheckCircle className="h-8 w-8" aria-hidden="true" />
      </span>

      <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#47023B] font-heading">Pesanan Berhasil Dibuat</h3>
      <p className="mt-1 text-sm text-[#6E3B65]">
        Bukti transfer telah diterima tim <span className="text-[#47023B] font-bold">My Velora</span> dan sedang diverifikasi.
      </p>

      <dl className="mx-auto mt-6 max-w-md divide-y divide-[#EAD6E0] rounded-xl border border-[#EAD6E0] bg-[#FBF7F4] px-4 text-left shadow-xs">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
            <dt className="text-[#6E3B65]">{r.label}</dt>
            <dd className={`text-right ${r.accent ? "font-mono font-bold text-[#47023B]" : "font-medium text-[#47023B]"}`}>
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={`/cek-order?code=${order.code}`}
          className={cn(buttonVariants(), "bg-[#47023B] hover:bg-[#5E074F] text-white font-bold shadow-xs")}
        >
          <Search className="h-4 w-4" /> Cek status pesanan
        </Link>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "border-[#EAD6E0] bg-white text-[#47023B] hover:bg-[#FAF0F5]")}
        >
          <Home className="h-4 w-4" /> Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
