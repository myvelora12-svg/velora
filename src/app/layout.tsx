import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { getConfigValue } from "@/services/config";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#47023B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "My Velora - Topup Robux & Game Cepat, Aman & Terpercaya",
  description:
    "Beli Robux Roblox dan voucher game favorit via Group Payout & Game Pass langsung ke akun. Proses instan 5-30 menit, harga termurah, aman dan terpercaya.",
  keywords: ["my velora", "myvelora", "robux murah", "topup robux", "beli robux", "roblox indonesia", "top up game"],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
    <html lang="id" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="min-h-screen w-full max-w-full min-w-0 overflow-x-hidden bg-background text-foreground antialiased selection:bg-[#FA3890]/20 selection:text-[#47023B]">
        {children}
        <FloatingWhatsApp whatsapp={adminWhatsapp} />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
