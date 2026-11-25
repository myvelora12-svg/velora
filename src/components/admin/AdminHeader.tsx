"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/auth";
import { MyVeloraLogo } from "@/components/ui/MyVeloraLogo";
import { LayoutDashboard, Settings, LogOut, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminHeader() {
  const pathname = usePathname();

  const isOrdersActive = pathname === "/admin" || pathname.startsWith("/admin/order");
  const isSettingsActive = pathname.startsWith("/admin/settings");

  return (
    <header className="sticky top-0 z-40 border-b border-[#5E074F] bg-[#47023B] text-white shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        {/* Desktop Header (md and up) */}
        <div className="hidden md:flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <MyVeloraLogo variant="icon" size="sm" className="border border-white/15" />
              <div className="flex flex-col">
                <span className="font-heading text-sm font-bold leading-tight tracking-tight text-white">Admin Portal</span>
                <span className="text-[10px] text-[#F5D5E3] font-medium">My Velora</span>
              </div>
            </Link>

            <div className="h-5 w-px bg-white/15" aria-hidden="true" />

            <nav className="flex items-center gap-1.5 text-sm" aria-label="Menu Admin Desktop">
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                  isOrdersActive
                    ? "bg-white/15 text-white shadow-2xs"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Pesanan
              </Link>
              <Link
                href="/admin/settings"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                  isSettingsActive
                    ? "bg-white/15 text-white shadow-2xs"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <Settings className="h-4 w-4" />
                Pengaturan
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 text-white/80 hover:text-white hover:bg-white/10")}
            >
              Lihat web <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <form action={logoutAdminAction}>
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5 border-white/25 bg-white/10 text-white hover:bg-[#FA3890] hover:border-[#FA3890] hover:text-white"
                )}
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Header (< md) */}
        <div className="flex md:hidden flex-col py-2.5 space-y-2.5">
          {/* Top Row: Brand & Actions */}
          <div className="flex items-center justify-between gap-2">
            <Link href="/admin" className="flex items-center gap-2 min-w-0">
              <MyVeloraLogo variant="icon" size="sm" className="border border-white/15 shrink-0" />
              <span className="font-heading text-sm font-bold truncate text-white">My Velora Admin</span>
            </Link>

            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-8 px-2 text-xs text-white/80 hover:text-white hover:bg-white/10 gap-1"
                )}
              >
                <span className="hidden xs:inline">Web</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "h-8 px-2.5 text-xs border-white/25 bg-white/10 text-white hover:bg-[#FA3890] hover:border-[#FA3890] gap-1"
                  )}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Row: Navigation Tabs */}
          <nav className="grid grid-cols-2 gap-1.5 rounded-lg border border-white/15 bg-[#5E074F]/60 p-1" aria-label="Menu Admin Mobile">
            <Link
              href="/admin"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all duration-150",
                isOrdersActive
                  ? "bg-white text-[#47023B] shadow-xs font-semibold"
                  : "text-white/80 hover:text-white"
              )}
            >
              <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />
              <span>Pesanan</span>
            </Link>
            <Link
              href="/admin/settings"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all duration-150",
                isSettingsActive
                  ? "bg-white text-[#47023B] shadow-xs font-semibold"
                  : "text-white/80 hover:text-white"
              )}
            >
              <Settings className="h-3.5 w-3.5 shrink-0" />
              <span>Pengaturan</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
