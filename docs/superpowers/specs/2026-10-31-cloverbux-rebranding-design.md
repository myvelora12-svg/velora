# Design Specification: Rebranding Total to CloverBux (Emerald Charcoal)

- **Date:** 2026-10-31
- **Status:** Proposed (Awaiting User Review)
- **Topic:** Full Brand Identity Revamp from BlackRedRoblox to **cloverbux** with Emerald Charcoal Color Accent System

---

## 1. Background & Goals

Aplikasi web top-up sebelumnya menggunakan identitas **BlackRedRoblox** dengan tema visual dominan hitam pekat dan aksen merah menyala (`red-500` / `red-600`).
Kini platform beralih sepenuhnya menjadi **cloverbux** dengan identitas visual baru:
- **Logo Resmi:** Geometrik 4-leaf clover emerald dengan tipografi tegas modern (`clover` hitam/charcoal + `bux` hijau emerald).
- **Nuansa Warna:** **Emerald Charcoal** — kombinasi elegan antara *Deep Charcoal Slate* (abu-abu arang gelap bertekstur matte) dan aksen *Vivid Emerald Green* (hijau zamrud keberuntungan).
- **Target:** Memberikan impresi visual yang terpercaya, modern, sleek, premium, dan ramah bagi gamer.

---

## 2. Color Palette & Token Architecture

### 2.1 Color Tokens
| Peran | Hex Code / Tailwind Token | Penggunaan |
| :--- | :--- | :--- |
| **Charcoal Base (Background)** | `#0f1311` / `#121614` | Background utama halaman web |
| **Charcoal Card (Surface)** | `#171c19` / `#1c231f` | Background card paket, card katalog, container wizard |
| **Charcoal Muted (Input/Sub)**| `#232b26` | Background input form, badge netral, hover background |
| **Charcoal Border** | `#28332c` | Border pemisah tipis, outline kartu yang subtle |
| **Primary Emerald** | `#00B869` / `#10B981` (emerald-500) | Aksen utama: Tombol CTA aktif, border kartu terpilih, icon semanggi, teks `bux` |
| **Emerald Hover / Focus** | `#009E5A` / `#059669` (emerald-600) | State hover tombol CTA, active step wizard |
| **Emerald Glow / Ambient** | `rgba(0, 184, 105, 0.15)` | Shadow glow pada kartu aktif, halo effect hero banner |
| **Text Primary** | `#FFFFFF` / `#F3F4F6` | Heading dan teks utama |
| **Text Muted** | `#9CA3AF` / `#A1A1AA` | Label sekunder, deskripsi bantuan |
| **Text Emerald Accent** | `#34D399` / `#00B869` | Highlight harga, badge "Populer", status sukses |

### 2.2 Global CSS Updates (`src/app/globals.css`)
- Update CSS variables:
  - `--background`: `#121614`
  - `--foreground`: `#f3f4f6`
  - `--card`: `#171c19`
  - `--card-foreground`: `#f3f4f6`
  - `--primary`: `#00b869`
  - `--primary-foreground`: `#0f1311`
  - `--secondary`: `#1c231f`
  - `--secondary-foreground`: `#e5e7eb`
  - `--muted`: `#232b26`
  - `--muted-foreground`: `#9ca3af`
  - `--accent`: `#1c231f`
  - `--accent-foreground`: `#00b869`
  - `--border`: `#28332c`
  - `--ring`: `#00b869`
  - `--success`: `#00b869`

---

## 3. Brand Assets & Logo Implementation

### 3.1 Asset Files
- `public/brand/logo-full.jpg` (Logo horizontal lengkap: Simbol Clover + Wordmark "cloverbux")
- `public/brand/logo-icon.jpg` (Simbol 4-leaf clover geometrik pada background charcoal)

### 3.2 Logo Component (`src/components/ui/CloverLogo.tsx`)
Membuat reusable component vektor SVG presisi untuk Clover geometrik:
- Menggambar 4 kelopak chamfered octagon + tangkai daun bersudut presisi sesuai logo asli.
- Ringan, tajam di semua resolusi, mendukung dark/light mode tanpa artifact kompresi gambar.
- Mendukung varian:
  - `variant="full"`: Icon clover + teks `clover` (putih/charcoal) + `bux` (emerald).
  - `variant="icon"`: Hanya simbol clover geometrik untuk favicon, mobile navbar, dan avatar.

---

## 4. Perubahan Komponen & Tampilan (Component Revamp)

### 4.1 Navbar (`src/components/Navbar.tsx`)
- Ganti teks lama `BlackRedRoblox` dan badge `R$` dengan `<CloverLogo />`.
- Ganti border merah (`border-t-red-600 border-b-red-600`) menjadi border arang elegan dengan aksen garis tipis emerald (`border-b border-[#28332c]`).
- Tombol CTA `Top Up`: Ubah dari `bg-red-600` ke `bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold`.

### 4.2 Hero Section (`src/components/HeroSection.tsx`)
- Tagline & badge disesuaikan: *"Platform Top Up Robux & Game Direct Seller"* dengan aksen emerald.
- Efek glowing merah diganti dengan emerald ambient aura.

### 4.3 Game Catalog Grid & Pricing Grid
- Ubah kartu game agar menggunakan background Charcoal (`bg-[#171c19]`) dengan border `#28332c`.
- Hover state: Border berubah lembut menjadi `emerald-500/50` dengan shadow hijau halus.
- Label kategori & badge diskon/populer menggunakan warna emerald.

### 4.4 Checkout Wizard (`src/components/checkout/DynamicCheckoutWizard.tsx` & Step Components)
- Step bar indikator: Ganti warna merah dengan emerald (`bg-emerald-500`).
- Card pilihan nominal: State terpilih diberi border emerald bercahaya (`border-emerald-500 ring-1 ring-emerald-500/50`).
- Tombol "Lanjut ke Pembayaran" & "Kirim Bukti Transfer": Emerald gaming CTA button.
- Kotak informasi dan peringatan: Ganti merah pekat menjadi charcoal dengan aksen emerald/amber yang elegan.

### 4.5 Order Tracker & Aktivasi (`/cek-order`, `/order/[id]`, `/aktivasi`)
- Status progress tracker (Menunggu $\rightarrow$ Verifikasi $\rightarrow$ Selesai): Titik aktif dan bar progres beralih ke warna emerald.
- Copywriting pesan konfirmasi dialihkan ke **cloverbux**.

### 4.6 Footer (`src/components/Footer.tsx`)
- Logo cloverbux baru di footer.
- Update copyright teks: `© 2026 cloverbux. Roblox adalah merek dagang Roblox Corporation...`

### 4.7 Admin Dashboard & Header (`src/components/admin/AdminHeader.tsx`, `/admin/login`)
- Logo dan label di panel admin berganti dari `BlackRedRoblox` menjadi `cloverbux Admin`.
- Aksen status order dan tombol admin selaras dengan palet Emerald Charcoal.

### 4.8 Notifikasi & Metadata
- `src/app/layout.tsx`: Update Title `cloverbux - Topup Robux Roblox Cepat, Murah & Terpercaya` & deskripsi SEO.
- Pesan WhatsApp & notifikasi bot Telegram: Mengubah sapaan brand menjadi **cloverbux**.

---

## 5. Kriteria Keberhasilan (Verification & Acceptance)
1. Tidak ada lagi sisa nama `BlackRedRoblox` atau `BlackRed` di tampilan publik maupun admin.
2. Tidak ada lagi warna merah dominan (`red-600` / `red-500`) pada elemen utama tema; seluruhnya berganti ke Emerald & Charcoal.
3. Logo cloverbux tampil jernih, tajam, dan responsif di mobile maupun desktop.
4. Build aplikasi (`npm run build`) berjalan bersih tanpa error TypeScript atau CSS.

