import type { Metadata, Viewport } from "next";
import { Rubik, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { getConfigValue } from "@/services/config";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "cloverbux - Topup Robux & Game Cepat, Aman & Terpercaya",
  description:
    "Beli Robux Roblox dan voucher game favorit via Group Payout & Game Pass langsung ke akun. Proses instan 5-30 menit, harga termurah, aman dan terpercaya.",
  keywords: ["cloverbux", "robux murah", "topup robux", "beli robux", "roblox indonesia", "top up game"],
  icons: {
    icon: "/brand/logo-icon.jpg",
    apple: "/brand/logo-icon.jpg",
  },
};

// Layout baca config dari DB — paksa render per-request supaya nomor WA terbaru selalu ikut.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminWhatsapp = await getConfigValue<string>("admin_whatsapp", "");

  return (
    <html lang="id" className={`${rubik.variable} ${inter.variable}`}>
      <body className="min-h-screen w-full max-w-full min-w-0 overflow-x-hidden bg-background text-foreground antialiased selection:bg-[#00b869] selection:text-[#08100b]">
        {children}
        <FloatingWhatsApp whatsapp={adminWhatsapp} />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
