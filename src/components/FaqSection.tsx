"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CloverIcon } from "@/components/ui/CloverLogo";

const faqs = [
  {
    q: "Berapa lama proses pengiriman Robux di cloverbux?",
    a: "Setelah bukti transfer diverifikasi admin, pengiriman memakan waktu 5 hingga 30 menit pada jam operasional.",
  },
  {
    q: "Metode apa yang digunakan untuk mengirimkan Robux?",
    a: "Pengiriman dilakukan via Group Payout resmi atau pembelian Game Pass langsung dari akun Roblox Anda secara legal.",
  },
  {
    q: "Apakah akun game saya aman? Butuh password?",
    a: "100% aman! Kami TIDAK PERNAH meminta password akun Anda. Kami hanya memerlukan username Roblox atau User ID game Anda saja.",
  },
  {
    q: "Bagaimana cara memeriksa status pesanan saya?",
    a: "Setiap transaksi mendapatkan Order ID dan kode cek unik 8 karakter. Anda bisa memeriksa statusnya kapan saja di halaman Lacak Order.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full max-w-full min-w-0 overflow-hidden border-t border-[#243028] bg-[#111613] py-14 sm:py-16 scroll-mt-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00b869] mb-1">
          <CloverIcon className="h-3.5 w-3.5" />
          <span>Bantuan & FAQ</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white font-heading">
          Pertanyaan Umum
        </h2>
        <div className="mt-6 divide-y divide-[#243028] border-y border-[#243028]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-white transition-colors duration-150 hover:text-[#00b869]"
                >
                  {faq.q}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200",
                      isOpen && "rotate-180 text-[#00b869]",
                    )}
                  />
                </button>
                <div className="accordion" data-open={isOpen}>
                  <div>
                    <p className="pb-4 pr-8 text-sm leading-6 text-zinc-400">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
