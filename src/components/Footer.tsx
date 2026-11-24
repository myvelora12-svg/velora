import Link from "next/link";
import { CloverLogo } from "@/components/ui/CloverLogo";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/#katalog", label: "Katalog Game" },
  { href: "/topup/roblox", label: "Top Up Robux" },
  { href: "/cek-order", label: "Cek Status Order" },
  { href: "/#faq", label: "Bantuan & FAQ" },
];

export function Footer() {
  return (
    <footer className="w-full max-w-full min-w-0 overflow-hidden border-t border-[#243028] bg-[#111613] text-white py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CloverLogo variant="full" />
            <p className="mt-3 max-w-sm text-sm text-zinc-400 leading-relaxed">
              Platform top up game direct seller cepat, aman, & terpercaya: Roblox, Mobile Legends, Free Fire, PUBG Mobile, dan FC Mobile.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-400 transition-colors duration-150 hover:text-[#00b869]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-[#243028] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} cloverbux. Roblox adalah merek dagang Roblox Corporation.</p>
          <p>Direct Seller • Tanpa Password Akun • 100% Aman</p>
        </div>
      </div>
    </footer>
  );
}
