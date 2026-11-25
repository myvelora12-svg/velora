import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GAME_CARDS = [
  {
    id: "roblox",
    name: "ROBLOX",
    art: "/games/art/roblox.jpg",
    containerBg: "bg-[#2C0225]",
    imgClass: "h-[84%] w-full object-cover object-bottom",
  },
  {
    id: "mlbb",
    name: "MOBILE LEGENDS",
    art: "/games/art/mlbb.png",
    containerBg: "bg-[#2C0225]",
    imgClass: "h-[80%] w-full object-cover object-top",
  },
  {
    id: "freefire",
    name: "FREE FIRE",
    art: "/games/art/freefire.webp",
    containerBg: "bg-[#2C0225]",
    imgClass: "h-[78%] w-full object-cover object-top",
  },
  {
    id: "pubg",
    name: "PUBG MOBILE",
    art: "/games/art/pubg.jpg",
    containerBg: "bg-[#2C0225]",
    imgClass: "h-[80%] w-full object-cover object-top",
  },
  {
    id: "fcmobile",
    name: "FC MOBILE",
    art: "/games/art/fcmobile.jpg",
    containerBg: "bg-[#2C0225]",
    imgClass: "h-[82%] w-full object-cover object-[center_32%] scale-[1.28]",
  },
];

export function GameCatalogGrid() {
  return (
    <section
      id="katalog"
      className="py-12 sm:py-16 border-b border-[#EAD6E0] bg-[#FBF7F4] scroll-mt-16"
      aria-label="Katalog Game"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6E3B65]">
              <span>Katalog Resmi My Velora</span>
            </div>
            <h2 className="mt-1.5 text-2xl sm:text-4xl text-[#47023B] mv-heading-italic">
              Pilih Game & Top Up
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6E3B65] font-medium max-w-md">
            Pilih game favoritmu. Proses otomatis 1-3 menit langsung masuk ke akun tanpa antri.
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {GAME_CARDS.map((game) => (
            <Link
              key={game.id}
              href={`/topup/${game.id}`}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl ${game.containerBg} aspect-[3/4.1] shadow-md border border-[#EAD6E0] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FA3890] cursor-pointer`}
            >
              {/* Corner brackets accent */}
              <span className="pointer-events-none absolute top-2 left-2 z-20 h-3 w-3 border-t-2 border-l-2 border-[#FA3890]/80" />
              <span className="pointer-events-none absolute bottom-2 right-2 z-20 h-3 w-3 border-r-2 border-b-2 border-[#FA3890]/80" />

              {/* Character Artwork */}
              <div className="absolute inset-0 h-full w-full overflow-hidden flex items-start justify-center">
                <img
                  src={game.art}
                  alt={game.name}
                  className={`${game.imgClass} transition-transform duration-500 group-hover:scale-105`}
                  loading="lazy"
                />
              </div>

              {/* Compact Bottom Gradient (Deep Plum) */}
              <div
                className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, #36012D 0%, #47023B 45%, rgba(71, 2, 59, 0.78) 72%, rgba(71, 2, 59, 0) 100%)",
                }}
              />

              {/* Curved Dome Aura at Bottom */}
              <div className="absolute -bottom-6 inset-x-0 w-full h-[34%] rounded-t-[100%] bg-gradient-to-t from-[#47023B] via-[#5E074F]/95 to-transparent pointer-events-none" />

              {/* Decorative Organic Wave Wisps on Bottom Corners */}
              <svg
                viewBox="0 0 300 120"
                fill="none"
                className="absolute inset-x-0 bottom-0 w-full h-auto pointer-events-none opacity-85"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 120V55C12 75 28 92 55 100C38 85 26 68 24 48C38 72 62 92 98 104C74 96 52 88 38 76C58 95 95 110 140 116L0 120Z"
                  fill="url(#wispLeftMv)"
                />
                <path
                  d="M300 120V55C288 75 272 92 245 100C262 85 274 68 276 48C262 72 238 92 202 104C226 96 248 88 262 76C242 95 205 110 160 116L300 120Z"
                  fill="url(#wispRightMv)"
                />
                <defs>
                  <linearGradient id="wispLeftMv" x1="0" y1="50" x2="110" y2="120" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FA3890" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#47023B" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="wispRightMv" x1="300" y1="50" x2="190" y2="120" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FA3890" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#47023B" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Foreground Content: Uniform Game Name + Circular Seal */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end pb-3.5 sm:pb-4 px-2 text-center">
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:text-[#F5D5E3] transition-colors truncate w-full px-1">
                  {game.name}
                </h3>

                {/* Circular Action Arrow */}
                <div className="mt-2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white p-0.5 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-[#FA3890] bg-[#47023B] text-white group-hover:bg-[#FA3890] transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
