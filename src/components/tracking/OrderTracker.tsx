"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrisDisplay } from "@/components/ui/QrisDisplay";

interface OrderTrackerProps {
  initialCode?: string;
  initialOrder?: any;
  adminWhatsapp?: string;
  qrImageUrl?: string;
}

const statusMap: Record<string, { label: string; className: string; desc: string }> = {
  pending: {
    label: "Pending",
    className: "border-amber-500/40 bg-amber-50 text-amber-800 font-semibold",
    desc: "Pesanan berstatus pending. Butuh aktivasi senilai Rp. 99,123 untuk melanjutkan proses.",
  },
  pending_payment: {
    label: "Menunggu pembayaran",
    className: "border-amber-500/40 bg-amber-50 text-amber-800",
    desc: "Silakan selesaikan pembayaran dan unggah bukti transfer.",
  },
  waiting_verify: {
    label: "Menunggu verifikasi",
    className: "border-blue-500/40 bg-blue-50 text-blue-800",
    desc: "Bukti transfer diterima. Tim My Velora sedang memverifikasi pembayaran Anda.",
  },
  approved: {
    label: "Pembayaran disetujui",
    className: "border-emerald-500/40 bg-emerald-50 text-emerald-800",
    desc: "Pembayaran terverifikasi. Pesanan masuk antrean pengiriman.",
  },
  processing: {
    label: "Sedang dikirim",
    className: "border-cyan-500/40 bg-cyan-50 text-cyan-800",
    desc: "Item pesanan sedang diproses dan dikirim langsung ke akun Anda.",
  },
  completed: {
    label: "Pesanan selesai",
    className: "border-[#00b869]/50 bg-emerald-50 text-emerald-700 font-semibold",
    desc: "Pesanan berhasil dikirim ke akun Anda. Terima kasih telah top up di My Velora!",
  },
  rejected: {
    label: "Pesanan ditolak",
    className: "border-[#C81E4A]/40 bg-[#C81E4A]/10 text-[#C81E4A]",
    desc: "Pesanan dibatalkan atau bukti transfer tidak valid.",
  },
  expired: {
    label: "Kedaluwarsa",
    className: "border-[#EAD6E0] bg-[#FAF0F5] text-[#6E3B65]",
    desc: "Batas waktu transfer 24 jam telah habis.",
  },
};

export function OrderTracker({
  initialCode,
  initialOrder,
  adminWhatsapp = "",
  qrImageUrl = "",
}: OrderTrackerProps) {
  const [query, setQuery] = useState(initialCode || "");
  const [order, setOrder] = useState<any>(initialOrder || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/order/check?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.order) {
        setError(data.error || "Pesanan tidak ditemukan. Periksa kembali kode atau Order ID Anda.");
        setOrder(null);
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Gagal menghubungkan ke server.");
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = order ? statusMap[order.status] || statusMap.pending_payment : null;

  return (
    <Card className="mx-auto max-w-xl p-5 shadow-sm sm:p-8 bg-white border-[#EAD6E0] text-[#47023B]">
      <div className="text-center text-xs font-bold uppercase tracking-wider text-[#6E3B65] mb-1">
        <span>Lacak Pesanan My Velora</span>
      </div>
      <h2 className="text-center text-2xl text-[#47023B] mv-heading-italic">Status Pesanan</h2>
      <p className="mt-1.5 text-center text-sm text-[#6E3B65]">
        Masukkan kode unik 8 karakter atau nomor Order ID Anda.
      </p>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="Masukkan kode atau Order ID"
          aria-label="Kode cek atau Order ID"
          className="min-w-0 uppercase bg-[#FBF7F4] border-[#EAD6E0] text-[#47023B] placeholder:text-[#6E3B65]/50 focus-visible:ring-[#47023B]"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#47023B] hover:bg-[#5E074F] text-white font-bold shadow-xs"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Cari
        </Button>
      </form>

      {error && (
        <p className="mt-4 rounded-lg border border-[#C81E4A]/30 bg-[#C81E4A]/10 p-3 text-sm text-[#C81E4A]" role="alert">
          {error}
        </p>
      )}

      {order && currentStatus ? (
        <div className="mt-6 border-t border-[#EAD6E0] pt-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#6E3B65]">Status pesanan</span>
            <Badge variant="outline" className={currentStatus.className}>{currentStatus.label}</Badge>
          </div>
          <p className="mt-3 rounded-xl bg-[#FAF0F5] border border-[#EAD6E0] p-3.5 text-sm leading-6 text-[#47023B]">
            {currentStatus.desc}
          </p>

          {order.adminNote && (
            <p className="mt-3 rounded-xl border border-amber-500/40 bg-amber-50 p-3 text-sm text-amber-900">
              <strong className="text-amber-700">Catatan admin:</strong> {order.adminNote}
            </p>
          )}

          {order.requiresActivation && qrImageUrl && (
            <QrisDisplay
              src={qrImageUrl}
              alt="QRIS Aktivasi My Velora"
              title={`QRIS Aktivasi ${order.activationAmountText ? `(${order.activationAmountText})` : ""}`}
              downloadFilename={`qris-aktivasi-${order.orderId}.png`}
              caption={
                <>
                  Scan QRIS di atas untuk melakukan aktivasi senilai{" "}
                  <strong className="text-[#47023B]">{order.activationAmountText || "Rp. 99,123"}</strong>.
                </>
              }
            />
          )}

          <dl className="mt-4 divide-y divide-[#EAD6E0] rounded-xl border border-[#EAD6E0] bg-[#FBF7F4] px-4 text-sm">
            {[
              ["Order ID", order.orderId],
              ["Game", (order.game ? order.game.toUpperCase() : "ROBLOX")],
              ...(order.gameUserId ? [["ID Akun", order.gameZoneId ? `${order.gameUserId} (Zone: ${order.gameZoneId})` : order.gameUserId]] : []),
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between gap-4 py-2.5">
                <dt className="text-[#6E3B65]">{label}</dt>
                <dd className="text-right font-semibold text-[#47023B]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 text-center">
            {adminWhatsapp && (
              <a
                href={`https://wa.me/${adminWhatsapp}?text=${encodeURIComponent(`Halo Admin My Velora, saya ingin menanyakan status pesanan saya dengan Order ID: ${order.orderId} (Kode: ${order.code})`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-[#47023B] underline underline-offset-4 transition-colors duration-150 hover:text-[#5E074F]"
              >
                Butuh bantuan? Hubungi admin via WhatsApp
              </a>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-5 rounded-xl bg-[#FAF0F5] border border-[#EAD6E0] p-3 text-sm text-[#6E3B65]">
          Setelah membuat pesanan, masukkan kode cek atau Order ID di atas untuk melihat status pembayaran dan pengiriman secara real-time.
        </p>
      )}
    </Card>
  );
}
