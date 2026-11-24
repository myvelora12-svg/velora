import Link from "next/link";
import { ArrowRight, ShieldCheck, Search, Star, Zap } from "lucide-react";
import { CloverIcon } from "@/components/ui/CloverLogo";

export function HeroSection({ bannerUrl = "" }: { bannerUrl?: string }) {
  return (
    <section className="relative w-full max-w-full overflow-hidden border-b border-[#243028] bg-[#111613]">
      <div className="relative mx-auto max-w-6xl px-4 py-9 sm:py-16">
        {bannerUrl ? (
          <Link href="#katalog" className="mb-6 sm:mb-8 block overflow-hidden rounded-2xl border border-[#243028] shadow-md">
            <img src={bannerUrl} alt="Banner promo cloverbux" className="max-h-72 w-full object-cover" />
          </Link>
        ) : null}

        <div className="max-w-3xl w-full">
          {/* Eyebrow Pill */}
          <div className="inline-flex max-w-full overflow-hidden items-center gap-1.5 sm:gap-2 rounded-full border border-[#243028] bg-[#161c18] px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#00b869] mb-4">
            <CloverIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate min-w-0 tracking-wider">LAYANAN TOP UP GAME INSTAN</span>
          </div>

          {/* Focal Headline */}
          <h1 className="max-w-2xl text-2xl min-[380px]:text-3xl font-extrabold leading-[1.18] tracking-tight sm:text-5xl font-heading text-white break-words">
            Robux & Voucher Game Resmi, Kirim Langsung ke Akun Kamu.
          </h1>

          <p className="mt-3 max-w-xl text-sm sm:text-lg leading-relaxed text-zinc-300">
            Pilihan nominal lengkap untuk Roblox, MLBB, Free Fire, dan lainnya. Cukup scan QRIS, pesanan terverifikasi otomatis dalam 1–3 menit.
          </p>

          {/* Primary CTA */}
          <div className="mt-6 sm:mt-8 flex flex-col items-stretch sm:items-center gap-3 sm:flex-row">
            <Link
              href="#katalog"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00b869] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-extrabold text-[#08100b] hover:bg-[#009e5a] transition-colors cursor-pointer"
            >
              <span>Mulai Top Up</span>
              <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0" />
            </Link>

            {/* Support Action */}
            <Link
              href="/cek-order"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white hover:bg-[#161c18] border border-[#243028] sm:border-transparent hover:border-[#243028] transition-colors"
            >
              <Search className="h-4 w-4 text-zinc-400 shrink-0" />
              <span>Lacak Pesanan</span>
            </Link>
          </div>

          {/* Social Proof & Trust Badges Strip */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#243028] flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2.5 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-1.5 font-medium text-zinc-200">
              <div className="flex text-amber-400">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400" />
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400" />
              </div>
              <span className="font-bold text-white">2.500+</span>
              <span className="text-zinc-400">Ulasan Puas</span>
            </div>

            <div className="hidden sm:block h-3.5 w-px bg-[#243028]" />

            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#00b869] shrink-0" />
              <span>Payout & Voucher Instan</span>
            </div>

            <div className="hidden sm:block h-3.5 w-px bg-[#243028]" />

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#00b869] shrink-0" />
              <span>Legal & Privasi Terjaga</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
