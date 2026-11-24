import Link from "next/link";
import { CloverIcon } from "@/components/ui/CloverLogo";

const GAME_CARDS = [
  {
    id: "roblox",
    name: "ROBLOX",
    art: "/games/art/roblox.jpg",
    containerBg: "bg-[#131915]",
    imgClass: "h-[84%] w-full object-cover object-bottom",
  },
  {
    id: "mlbb",
    name: "MOBILE LEGENDS",
    art: "/games/art/mlbb.png",
    containerBg: "bg-[#131915]",
    imgClass: "h-[80%] w-full object-cover object-top",
  },
  {
    id: "freefire",
    name: "FREE FIRE",
    art: "/games/art/freefire.webp",
    containerBg: "bg-[#131915]",
    imgClass: "h-[78%] w-full object-cover object-top",
  },
  {
    id: "pubg",
    name: "PUBG MOBILE",
    art: "/games/art/pubg.jpg",
    containerBg: "bg-[#131915]",
    imgClass: "h-[80%] w-full object-cover object-top",
  },
  {
    id: "fcmobile",
    name: "FC MOBILE",
    art: "/games/art/fcmobile.jpg",
    containerBg: "bg-[#131915]",
    imgClass: "h-[82%] w-full object-cover object-[center_32%] scale-[1.28]",
  },
];

export function GameCatalogGrid() {
  return (
    <section
      id="katalog"
      className="py-12 sm:py-16 border-b border-[#243028] bg-[#111613] scroll-mt-16"
      aria-label="Katalog Game"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00b869]">
              <CloverIcon className="h-4 w-4" />
              <span>Katalog Resmi cloverbux</span>
            </div>
            <h2 className="mt-1.5 text-2xl font-black tracking-tight sm:text-4xl text-white font-heading">
              PILIH GAME & TOP UP
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-md">
            Pilih game favoritmu. Proses otomatis 1-3 menit langsung masuk ke akun tanpa antri.
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {GAME_CARDS.map((game) => (
            <Link
              key={game.id}
              href={`/topup/${game.id}`}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl ${game.containerBg} aspect-[3/4.1] shadow-lg border border-[#243028] transition-all duration-300 hover:-translate-y-2 hover:border-[#00b869] cursor-pointer`}
            >
              {/* Character Artwork */}
              <div className="absolute inset-0 h-full w-full overflow-hidden flex items-start justify-center">
                <img
                  src={game.art}
                  alt={game.name}
                  className={`${game.imgClass} transition-transform duration-500 group-hover:scale-105`}
                  loading="lazy"
                />
              </div>

              {/* Compact Bottom Gradient (Does not cover character chest/hoodie) */}
              <div
                className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, #0d1f16 0%, #10291d 42%, rgba(16, 41, 29, 0.75) 70%, rgba(19, 25, 21, 0) 100%)",
                }}
              />

              {/* Curved Dome Aura at Bottom */}
              <div className="absolute -bottom-6 inset-x-0 w-full h-[34%] rounded-t-[100%] bg-gradient-to-t from-[#0b2418] via-[#113825]/95 to-transparent pointer-events-none" />

              {/* Decorative Organic Wave Wisps on Bottom Corners */}
              <svg
                viewBox="0 0 300 120"
                fill="none"
                className="absolute inset-x-0 bottom-0 w-full h-auto pointer-events-none opacity-85"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 120V55C12 75 28 92 55 100C38 85 26 68 24 48C38 72 62 92 98 104C74 96 52 88 38 76C58 95 95 110 140 116L0 120Z"
                  fill="url(#wispLeft)"
                />
                <path
                  d="M300 120V55C288 75 272 92 245 100C262 85 274 68 276 48C262 72 238 92 202 104C226 96 248 88 262 76C242 95 205 110 160 116L300 120Z"
                  fill="url(#wispRight)"
                />
                <defs>
                  <linearGradient id="wispLeft" x1="0" y1="50" x2="110" y2="120" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#34d399" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#0b2418" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="wispRight" x1="300" y1="50" x2="190" y2="120" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#34d399" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#0b2418" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Foreground Content: Uniform Game Name + Circular Seal (No "cloverbux" text) */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end pb-3.5 sm:pb-4 px-2 text-center">
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:text-[#34d399] transition-colors truncate w-full px-1">
                  {game.name}
                </h3>

                {/* Circular White-Ringed Seal */}
                <div className="mt-2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white p-0.5 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-[#00b869] bg-[#111613] text-[#00b869] group-hover:bg-[#00b869] group-hover:text-[#08100b] transition-colors">
                    <CloverIcon className="h-4.5 w-4.5" />
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
