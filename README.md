# cloverbux - Platform Topup Robux & Game Direct Seller

Platform penjualan Robux Roblox dan game favorit langsung (*direct seller*) bertema **Emerald Charcoal** dengan verifikasi transfer aman, pengiriman Robux via Group Payout & Game Pass, notifikasi bot Telegram otomatis, dan panel admin lengkap.

## 🚀 Fitur Utama

- **Landing Page Eksklusif (`/`):** Tampilan bertema *Emerald Charcoal* premium, katalog game lengkap (Roblox, MLBB, PUBG, Free Fire, FC Mobile), tombol beli cepat, dan FAQ.
- **5-Step Checkout Wizard:**
  1. Pilih Paket Item / Denominasi
  2. Input Data User (Nama, ID Akun / Username, Nomor WhatsApp)
  3. Instruksi Pembayaran Rekening / QRIS + 3 Digit Nominal Unik
  4. Upload Screenshot Bukti Transfer (Validasi max 5MB JPG/PNG/WEBP)
  5. Konfirmasi Selesai + Auto-generated Order ID & Kode Unik 8 Karakter
- **Lacak Pesanan Real-time (`/cek-order`):** Status tracking interaktif (Menunggu Bayar $\rightarrow$ Verifikasi Admin $\rightarrow$ Approved $\rightarrow$ Pengiriman $\rightarrow$ Selesai).
- **Notifikasi Bot Telegram:** Admin menerima foto struk transfer beserta rincian pesanan seketika di Telegram.
- **Admin Panel Terproteksi (`/admin`):**
  - Autentikasi Admin (Password bcrypt & session JWT)
  - Dashboard statistik omset dan tabel transaksi dengan filter status
  - Detail Pesanan (`/admin/order/[id]`) lengkap dengan preview bukti transfer, tombol update status, catatan admin, dan link WhatsApp langsung ke nomor pembeli
  - Pengaturan Toko (`/admin/settings`) untuk ubah harga paket Robux & game, tambah rekening transfer, QRIS, dan ubah token bot Telegram.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Lucide Icons (Tema Emerald Charcoal)
- **Database & ORM:** Drizzle ORM + SQLite / PostgreSQL
- **Keamanan:** Jose (JWT Cookie Session) + Bcryptjs
- **Deployment:** Docker / Coolify

## 📦 Menjalankan Proyek Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Push schema database & jalankan seed
npx drizzle-kit push
npx tsx src/db/seed.ts

# 3. Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Akun Admin Default:
- **URL Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Username:** `admin`
- **Password:** `admin123`
