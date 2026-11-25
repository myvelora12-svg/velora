"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Berapa lama proses pengiriman Robux di My Velora?",
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
    <section id="faq" className="w-full max-w-full min-w-0 overflow-hidden border-t border-[#EAD6E0] bg-[#FAF0F5]/60 py-14 sm:py-16 scroll-mt-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-xs font-bold uppercase tracking-wider text-[#6E3B65] mb-1">
          <span>Bantuan & FAQ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl text-[#47023B] mv-heading-italic">
          Pertanyaan Umum
        </h2>
        <div className="mt-6 divide-y divide-[#EAD6E0] border-y border-[#EAD6E0] bg-white rounded-2xl px-5 shadow-xs">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-[#47023B] transition-colors duration-150 hover:text-[#5E074F]"
                >
                  {faq.q}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 shrink-0 text-[#6E3B65] transition-transform duration-200",
                      isOpen && "rotate-180 text-[#FA3890]",
                    )}
                  />
                </button>
                <div className="accordion" data-open={isOpen}>
                  <div>
                    <p className="pb-4 pr-8 text-sm leading-6 text-[#6E3B65]">{faq.a}</p>
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
