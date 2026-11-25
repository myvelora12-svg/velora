import Link from "next/link";
import { ArrowRight, ShieldCheck, Search, Star, Zap } from "lucide-react";

export function HeroSection({ bannerUrl = "" }: { bannerUrl?: string }) {
  return (
    <section className="relative w-full max-w-full overflow-hidden border-b border-[#EAD6E0] bg-[#FBF7F4]">
      <div className="relative mx-auto max-w-6xl px-4 py-9 sm:py-16">
        {bannerUrl ? (
          <Link href="#katalog" className="mb-6 sm:mb-8 block overflow-hidden rounded-2xl border border-[#EAD6E0] shadow-sm mv-corner-frame">
            <img src={bannerUrl} alt="Banner promo My Velora" className="max-h-72 w-full object-cover" />
          </Link>
        ) : null}

        <div className="max-w-3xl w-full">
          {/* Eyebrow Pill */}
          <div className="inline-flex max-w-full overflow-hidden items-center rounded-full border border-[#EAD6E0] bg-[#F5D5E3]/60 px-3 py-1 text-[11px] sm:text-xs font-bold text-[#47023B] mb-4">
            <span className="truncate min-w-0 tracking-wider uppercase">Layanan Top Up Game Instan</span>
          </div>

          {/* Focal Headline */}
          <h1 className="max-w-2xl text-2xl min-[380px]:text-3xl font-extrabold leading-[1.14] tracking-tight sm:text-5xl font-heading text-[#47023B] break-words">
            Robux & Voucher Game Resmi, Kirim Langsung ke Akun Kamu.
          </h1>

          <p className="mt-3 max-w-xl text-sm sm:text-lg leading-relaxed text-[#6E3B65]">
            Pilihan nominal lengkap untuk Roblox, MLBB, Free Fire, dan lainnya. Cukup scan QRIS, pesanan terverifikasi otomatis dalam 1–3 menit.
          </p>

          {/* Primary CTA */}
          <div className="mt-6 sm:mt-8 flex flex-col items-stretch sm:items-center gap-3 sm:flex-row">
            <Link
              href="#katalog"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#47023B] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white hover:bg-[#5E074F] transition-colors cursor-pointer shadow-sm"
            >
              <span>Mulai Top Up</span>
              <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 text-[#FA3890]" />
            </Link>

            {/* Support Action */}
            <Link
              href="/cek-order"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold text-[#47023B] bg-white hover:bg-[#F5D5E3]/50 border border-[#EAD6E0] transition-colors"
            >
              <Search className="h-4 w-4 text-[#6E3B65] shrink-0" />
              <span>Lacak Pesanan</span>
            </Link>
          </div>

          {/* Social Proof & Trust Badges Strip */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#EAD6E0] flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2.5 text-xs sm:text-sm text-[#6E3B65]">
            <div className="flex items-center gap-1.5 font-medium text-[#47023B]">
              <div className="flex text-amber-500">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500" />
              </div>
              <span className="font-bold text-[#47023B]">2.500+</span>
              <span className="text-[#6E3B65]">Ulasan Puas</span>
            </div>

            <div className="hidden sm:block h-3.5 w-px bg-[#EAD6E0]" />

            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FA3890] shrink-0" />
              <span>Payout & Voucher Instan</span>
            </div>

            <div className="hidden sm:block h-3.5 w-px bg-[#EAD6E0]" />

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#47023B] shrink-0" />
              <span>Legal & Privasi Terjaga</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
