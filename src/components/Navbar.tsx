import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { CloverLogo } from "@/components/ui/CloverLogo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-hidden bg-[#111613]/95 backdrop-blur-md text-white border-b border-[#243028] shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between h-13 sm:h-16 px-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center group transition-opacity hover:opacity-95">
          <CloverLogo variant="full" />
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            href="/#katalog"
            className="hidden sm:inline-flex items-center text-sm font-medium text-zinc-300 hover:text-white transition-colors px-2.5 py-1"
          >
            Katalog Game
          </Link>
          <Link
            href="/cek-order"
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 h-8 sm:h-8.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold border border-[#243028] bg-[#161c18] text-zinc-200 hover:bg-[#1e2621] hover:text-white hover:border-[#00b869]/40 transition-colors"
          >
            <Search className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            <span className="hidden min-[380px]:inline">Lacak Order</span>
            <span className="min-[380px]:hidden">Lacak</span>
          </Link>
          <Link
            href="/#katalog"
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 h-8 sm:h-8.5 px-2.5 sm:px-3.5 rounded-lg text-[11px] sm:text-xs font-bold bg-[#00b869] text-[#08100b] hover:bg-[#009e5a] active:scale-95 transition-all shadow-sm shadow-[#00b869]/20"
          >
            <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
            <span>Top Up</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
