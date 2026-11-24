"use client";

import { useMemo } from "react";
import { Star, CheckCircle } from "lucide-react";
import { CloverIcon } from "@/components/ui/CloverLogo";

export interface Testimonial {
  name: string;
  quote: string;
  game?: string;
  robux?: number;
  time?: string;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const isUsername = item.name.includes("_") || item.name.includes(".");

  return (
    <div className="w-[260px] sm:w-[340px] shrink-0 rounded-2xl border border-[#243028] bg-[#161c18] p-4 sm:p-5 shadow-md transition-all duration-300 hover:border-[#00b869]/50 flex flex-col justify-between select-none">
      <div>
        {/* Rating + Time */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            ))}
          </div>
          {item.time && (
            <span className="text-[11px] font-medium text-zinc-400">
              {item.time}
            </span>
          )}
        </div>

        {/* Quote */}
        <blockquote className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic line-clamp-3">
          “{item.quote}”
        </blockquote>
      </div>

      {/* Author Info */}
      <div className="mt-3.5 pt-3 border-t border-[#243028] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <CheckCircle className="h-3.5 w-3.5 text-[#00b869] shrink-0" />
          <span
            className={`text-xs font-bold truncate ${
              isUsername ? "text-[#34d399] font-mono tracking-tight" : "text-white"
            }`}
          >
            {item.name}
          </span>
        </div>

        {/* Game Tag */}
        {item.game && (
          <span className="shrink-0 text-[10px] font-semibold text-zinc-400 rounded-md bg-[#111613] px-2 py-0.5 border border-[#243028]">
            {item.game}
          </span>
        )}
      </div>
    </div>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const validItems = useMemo(() => {
    return Array.isArray(items)
      ? items.filter((it) => it && (it.quote?.trim() || it.name?.trim()))
      : [];
  }, [items]);

  if (!validItems.length) return null;

  // Split into 2 rows for bidirectional marquee
  const mid = Math.ceil(validItems.length / 2);
  const row1 = validItems.slice(0, mid);
  const row2 = validItems.slice(mid);

  // Duplicate arrays to achieve seamless infinite looping
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section
      className="w-full max-w-full min-w-0 overflow-hidden border-t border-[#243028] py-12 sm:py-20 bg-[#111613]"
      aria-label="Ulasan pelanggan"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00b869]">
          <CloverIcon className="h-4 w-4" />
          <span>Bukti Sosial Komunitas</span>
        </div>
        <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-heading">
          Ulasan Asli Pembeli
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
          Pengalaman nyata pelanggan cloverbux saat top up Robux, Diamond, UC & FC Points.
        </p>
      </div>

      {/* Marquee Container strictly isolated with overflow-hidden and min-w-0 */}
      <div className="relative w-full max-w-full min-w-0 overflow-hidden space-y-4">
        {/* Left & Right Gradient Shadows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-28 bg-gradient-to-r from-[#111613] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-28 bg-gradient-to-l from-[#111613] to-transparent z-10" />

        {/* Row 1: Leftward Infinite Marquee */}
        <div className="w-full max-w-full min-w-0 overflow-hidden">
          <div className="animate-marquee-left flex gap-3.5 sm:gap-4 px-2">
            {marqueeRow1.map((item, idx) => (
              <TestimonialCard key={`r1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="w-full max-w-full min-w-0 overflow-hidden">
          <div className="animate-marquee-right flex gap-3.5 sm:gap-4 px-2">
            {marqueeRow2.map((item, idx) => (
              <TestimonialCard key={`r2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
