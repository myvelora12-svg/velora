"use client";

import { useMemo } from "react";
import { Star, CheckCircle } from "lucide-react";

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
    <div className="w-[260px] sm:w-[340px] shrink-0 rounded-2xl border border-[#EAD6E0] bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-[#FA3890]/60 flex flex-col justify-between select-none">
      <div>
        {/* Rating + Time */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            ))}
          </div>
          {item.time && (
            <span className="text-[11px] font-medium text-[#6E3B65]">
              {item.time}
            </span>
          )}
        </div>

        {/* Quote */}
        <blockquote className="text-xs sm:text-sm text-[#47023B] leading-relaxed italic line-clamp-3">
          “{item.quote}”
        </blockquote>
      </div>

      {/* Author Info */}
      <div className="mt-3.5 pt-3 border-t border-[#EAD6E0] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <CheckCircle className="h-3.5 w-3.5 text-[#FA3890] shrink-0" />
          <span
            className={`text-xs font-bold truncate text-[#47023B] ${
              isUsername ? "font-mono tracking-tight" : ""
            }`}
          >
            {item.name}
          </span>
        </div>

        {/* Game Tag */}
        {item.game && (
          <span className="shrink-0 text-[10px] font-semibold text-[#47023B] rounded-md bg-[#FAF0F5] px-2 py-0.5 border border-[#EAD6E0]">
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
      className="w-full max-w-full min-w-0 overflow-hidden border-t border-[#EAD6E0] py-12 sm:py-20 bg-[#FBF7F4]"
      aria-label="Ulasan pelanggan"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-8 text-center sm:text-left">
        <div className="text-xs font-bold uppercase tracking-wider text-[#6E3B65]">
          <span>Bukti Sosial Komunitas</span>
        </div>
        <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl text-[#47023B] mv-heading-italic">
          Ulasan Asli Pembeli
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[#6E3B65] max-w-xl">
          Pengalaman nyata pelanggan My Velora saat top up Robux, Diamond, UC & FC Points.
        </p>
      </div>

      {/* Marquee Container strictly isolated with overflow-hidden and min-w-0 */}
      <div className="relative w-full max-w-full min-w-0 overflow-hidden space-y-4">
        {/* Left & Right Gradient Shadows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-28 bg-gradient-to-r from-[#FBF7F4] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-28 bg-gradient-to-l from-[#FBF7F4] to-transparent z-10" />

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
