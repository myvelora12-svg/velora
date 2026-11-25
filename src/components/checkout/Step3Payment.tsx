"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { QrisDisplay } from "@/components/ui/QrisDisplay";

interface Step3Props {
  order: {
    orderId: string;
    totalPrice: number;
    uniqueCode: number;
    code: string;
  };
  rekeningList: Array<{ bank: string; nomor: string; atasNama: string }>;
  qrImageUrl?: string;
  onNext: () => void;
}

export function Step3Payment({ order, rekeningList, qrImageUrl, onNext }: Step3Props) {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} disalin ke clipboard`);
    } catch {
      toast.error("Gagal menyalin ke clipboard");
    }
    setCopiedBank(label.replace("Rekening ", ""));
    setTimeout(() => setCopiedBank(null), 2000);
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-[#47023B]">Transfer pembayaran</h3>
      <p className="mt-1 text-sm text-[#6E3B65]">
        Transfer tepat sesuai total tagihan agar verifikasi berjalan otomatis & lancar.
      </p>

      <div className="mt-4 rounded-xl border border-[#EAD6E0] bg-[#FAF0F5] p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-[#6E3B65]">Total tagihan</span>
          <Badge variant="outline" className="border-[#EAD6E0] bg-white text-[#47023B] text-xs font-semibold">
            Termasuk kode unik +{order.uniqueCode}
          </Badge>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-3xl font-extrabold tracking-tight text-[#47023B]">{formatRupiah(order.totalPrice)}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => copy(String(order.totalPrice), "Nominal transfer")}
            className="text-[#47023B] hover:text-[#5E074F] hover:bg-white"
          >
            <Copy className="h-4 w-4" /> Salin nominal
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#EAD6E0] pt-3 text-xs text-[#6E3B65]">
          <span>
            Order ID: <code className="font-mono text-[#47023B] font-semibold">{order.orderId}</code>
          </span>
          <span>
            Kode cek: <code className="font-mono font-bold text-[#47023B]">{order.code}</code>
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-[#47023B]">Rekening & Metode Pembayaran</h4>
        {qrImageUrl && (
          <QrisDisplay
            src={qrImageUrl}
            alt="QRIS pembayaran My Velora"
            caption="Scan QRIS My Velora untuk membayar."
            downloadFilename={`qris-${order.orderId}.png`}
          />
        )}
        <ul className="mt-2.5 space-y-2.5">
          {rekeningList.map((rek) => (
            <li
              key={`${rek.bank}-${rek.nomor}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#EAD6E0] bg-[#FBF7F4] p-3.5 hover:border-[#FA3890]/60 transition-colors"
            >
              <div className="min-w-0">
                <span className="text-sm font-bold text-[#47023B]">{rek.bank}</span>
                <p className="text-xs text-[#6E3B65]">a.n. {rek.atasNama}</p>
                <code className="mt-1 block font-mono text-sm font-semibold text-[#47023B]">{rek.nomor}</code>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copy(rek.nomor, `Rekening ${rek.bank}`)}
                className="border-[#EAD6E0] bg-white text-[#47023B] hover:bg-[#FAF0F5]"
              >
                {copiedBank === rek.bank ? (
                  <><Check className="h-4 w-4 text-[#00b869]" /> Tersalin</>
                ) : (
                  <><Copy className="h-4 w-4" /> Salin</>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#EAD6E0] bg-[#FAF0F5] p-3 text-sm text-[#47023B]">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FA3890]" aria-hidden="true" />
        Simpan screenshot struk transfer Anda untuk diunggah pada langkah berikutnya.
      </p>

      <div className="mt-6 flex justify-end">
        <Button
          type="button"
          onClick={onNext}
          className="bg-[#47023B] hover:bg-[#5E074F] text-white font-bold shadow-xs"
        >
          Saya sudah transfer
        </Button>
      </div>
    </div>
  );
}
