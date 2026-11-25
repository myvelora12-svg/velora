import Link from "next/link";
import { MyVeloraLogo } from "@/components/ui/MyVeloraLogo";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/#katalog", label: "Katalog Game" },
  { href: "/topup/roblox", label: "Top Up Robux" },
  { href: "/cek-order", label: "Cek Status Order" },
  { href: "/#faq", label: "Bantuan & FAQ" },
];

export function Footer() {
  return (
    <footer className="w-full max-w-full min-w-0 overflow-hidden border-t border-[#5E074F] bg-[#47023B] text-white py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <MyVeloraLogo variant="full" surface="dark" />
            <p className="mt-3 max-w-sm text-sm text-white/75 leading-relaxed">
              Platform top up game direct seller cepat, aman, & terpercaya: Roblox, Mobile Legends, Free Fire, PUBG Mobile, dan FC Mobile.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/75 transition-colors duration-150 hover:text-[#FA3890]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/65">
          <p>© {new Date().getFullYear()} My Velora. Roblox adalah merek dagang Roblox Corporation.</p>
          <p>Direct Seller • Tanpa Password Akun • 100% Aman</p>
        </div>
      </div>
    </footer>
  );
}
