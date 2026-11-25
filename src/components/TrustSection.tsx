import { ShieldCheck, RotateCcw, MessageSquare, Users, Zap, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50.000+",
    label: "Transaksi Berhasil",
    detail: "Dilayani dengan aman & tuntas",
  },
  {
    icon: Award,
    value: "4.9 / 5.0",
    label: "Rating Pelanggan",
    detail: "Dari 2.500+ ulasan positif",
  },
  {
    icon: Zap,
    value: "1–3 Menit",
    label: "Kecepatan Pengiriman",
    detail: "Sistem payout & voucher instan",
  },
  {
    icon: ShieldCheck,
    value: "100% Legal",
    label: "Garansi Anti-Banned",
    detail: "Tanpa pernah minta password",
  },
];

export function TrustSection({ whatsapp, serviceHours }: { whatsapp: string; serviceHours: string }) {
  const guaranteesList = [
    {
      icon: ShieldCheck,
      title: "100% Tanpa Password Akun",
      detail: "Kami hanya memerlukan User ID atau Username game Anda. Password akun Anda tetap aman dan privasi 100% terlindungi.",
    },
    {
      icon: RotateCcw,
      title: "Garansi & Salah Transfer Ditelusuri",
      detail: "Setiap transaksi otomatis memiliki kode cek unik 8 digit. Jika ada kendala, admin melacak dan menyelesaikan hingga tuntas.",
    },
    {
      icon: MessageSquare,
      title: "Layanan Customer Service Nyata",
      detail: `Hubungi admin langsung via WhatsApp. Kami siap mendampingi Anda di jam operasional ${serviceHours}.`,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FBF7F4]">
      <div className="mx-auto max-w-6xl px-4">
        {/* 1. Statistics Bar (Social Proof Counter) */}
        <div className="mb-14 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-2xl border border-[#EAD6E0] bg-white p-3.5 sm:p-5 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-base min-[380px]:text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#47023B] font-heading tracking-tight leading-snug">
                    {s.value}
                  </span>
                  <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#FAF0F5] border border-[#EAD6E0] text-[#47023B] shrink-0">
                    <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                </div>
                <div className="mt-2 sm:mt-3">
                  <p className="text-xs sm:text-sm font-bold text-[#47023B] leading-tight">{s.label}</p>
                  <p className="text-[10px] sm:text-[11px] text-[#6E3B65] mt-0.5 line-clamp-2 sm:line-clamp-none">{s.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Main Guarantees Section Header */}
        <div className="text-center sm:text-left mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6E3B65]">
            <span>Garansi & Keamanan Pelanggan</span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl text-[#47023B] mv-heading-italic">
            Bebas Risiko Sejak Pesanan Dibuat
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#6E3B65] max-w-xl">
            Kami mengutamakan keamanan akun dan transparansi proses agar Anda dapat top up dengan tenang.
          </p>
        </div>

        {/* 3. Guarantees 3-Column Grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          {guaranteesList.map(({ icon: Icon, title, detail }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-[#EAD6E0] bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#FA3890]/60"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF0F5] border border-[#EAD6E0] text-[#47023B] group-hover:bg-[#47023B] group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-bold text-lg text-[#47023B]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E3B65]">
                  {detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* WhatsApp Consultation Link */}
        {whatsapp && (
          <div className="mt-8 text-center sm:text-left">
            <p className="text-sm text-[#6E3B65]">
              Masih ragu atau butuh panduan top up?{" "}
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Halo My Velora, saya ingin bertanya soal pembelian top up game.")}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#47023B] underline underline-offset-4 hover:text-[#5E074F] transition-colors"
              >
                Konsultasikan langsung dengan admin di WhatsApp →
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
