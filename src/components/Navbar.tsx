import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { MyVeloraLogo } from "@/components/ui/MyVeloraLogo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-hidden bg-[#47023B] text-white border-b border-[#5E074F] shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between h-14 sm:h-16 px-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center group transition-opacity hover:opacity-95">
          <MyVeloraLogo variant="full" surface="dark" />
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Link
            href="/#katalog"
            className="hidden sm:inline-flex items-center text-sm font-medium text-white/85 hover:text-white transition-colors px-2.5 py-1"
          >
            Katalog Game
          </Link>
          <Link
            href="/cek-order"
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 h-8.5 sm:h-9 px-2.5 sm:px-3.5 rounded-lg text-[11px] sm:text-xs font-semibold border border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-[#FA3890]/60 transition-colors"
          >
            <Search className="h-3.5 w-3.5 shrink-0 text-[#FA3890]" />
            <span className="hidden min-[380px]:inline">Lacak Order</span>
            <span className="min-[380px]:hidden">Lacak</span>
          </Link>
          <Link
            href="/#katalog"
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 h-8.5 sm:h-9 px-3 sm:px-4 rounded-lg text-[11px] sm:text-xs font-bold bg-[#FA3890] text-white hover:bg-[#e12b7e] transition-colors shadow-sm"
          >
            <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
            <span>Top Up</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
