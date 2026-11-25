import { PricingItem, RekeningItem } from "./config";

/** Satu sumber default untuk semua page/action/seed. DB (config) tetap sumber utama. */
export const DEFAULT_PRICING: PricingItem[] = [
  { robux: 2000, price: 35000 },
  { robux: 2450, price: 45000 },
  { robux: 3100, price: 55000 },
  { robux: 3800, price: 65000 },
  { robux: 4400, price: 80000 },
  { robux: 5800, price: 90000 },
  { robux: 6500, price: 100000 },
  { robux: 13250, price: 200000 },
  { robux: 20000, price: 300000 },
  { robux: 26750, price: 400000 },
  { robux: 33500, price: 500000 },
];

export const DEFAULT_REKENING: RekeningItem[] = [
  { bank: "BCA", nomor: "8735123984", atasNama: "MY VELORA STORE" },
  { bank: "BRI", nomor: "019283746519283", atasNama: "MY VELORA STORE" },
  { bank: "DANA", nomor: "081234567890", atasNama: "MY VELORA STORE" },
  { bank: "GoPay", nomor: "081234567890", atasNama: "MY VELORA STORE" },
];

/** Kosong = link WhatsApp disembunyikan sampai admin isi di settings. */
export const DEFAULT_ADMIN_WHATSAPP = "";

export const DEFAULT_SERVICE_HOURS = "09.00–22.00 WIB";

export interface DefaultTestimonialItem {
  name: string;
  quote: string;
  game?: string;
  robux?: number;
  time?: string;
}

export const DEFAULT_TESTIMONIALS: DefaultTestimonialItem[] = [
  {
    name: "Fajar",
    game: "Roblox (2.000 Robux)",
    robux: 2000,
    time: "2 menit lalu",
    quote: "Gila cepet banget! Cuma 2 menit setelah upload bukti transfer, Robux langsung masuk. Trusted seller!",
  },
  {
    name: "Wahyu Pratama",
    game: "Mobile Legends (1.200 💎)",
    time: "5 menit lalu",
    quote: "Awalnya sempat ragu karena harganya murah, ternyata beneran resmi & aman tanpa minta password. Mantap!",
  },
  {
    name: "x_shadow99",
    game: "Roblox (6.500 Robux)",
    robux: 6500,
    time: "9 menit lalu",
    quote: "Beli 6.500 robux masuk utuh tanpa potongan aneh-aneh. Recommended buat anak Blox Fruits / RoCitizens.",
  },
  {
    name: "Doni Saputra",
    game: "Free Fire (720 💎)",
    time: "14 menit lalu",
    quote: "Udah 4x order di My Velora buat adik, selalu lancar. QRIS langsung kebaca, status order bisa dilacak real-time.",
  },
  {
    name: "alvin.rbx",
    game: "Roblox (3.800 Robux)",
    robux: 3800,
    time: "18 menit lalu",
    quote: "Adminnya fast respon banget pas gw bingung setting gamepass. Top tier service!",
  },
  {
    name: "Bagus",
    game: "PUBG Mobile (1.000 UC)",
    time: "25 menit lalu",
    quote: "UC PUBG mendarat kilat. Langsung bisa gacha skin baru. Makasih My Velora!",
  },
  {
    name: "Arief Rahman",
    game: "FC Mobile (520 FP)",
    time: "31 menit lalu",
    quote: "Top up FC Points prosesnya beneran instan, cuma butuh UID akun tanpa ribet login.",
  },
  {
    name: "kyrie_fn",
    game: "Mobile Legends (Weekly Pass)",
    time: "38 menit lalu",
    quote: "Weekly Diamond Pass langsung aktif, dapet harga promo lagi. Langganan terus ini mah.",
  },
  {
    name: "Tiara",
    game: "Roblox (2.450 Robux)",
    robux: 2450,
    time: "42 menit lalu",
    quote: "Pertama kali beli robux online sendiri, gampang banget alurnya gak bikin pusing.",
  },
  {
    name: "Dinda Maharani",
    game: "Mobile Legends (500 💎)",
    time: "49 menit lalu",
    quote: "Langganan tiap awal season buat borong skin starlight. Aman dan amanah.",
  },
  {
    name: "frostbyte_",
    game: "PUBG Mobile (1.800 UC)",
    time: "1 jam lalu",
    quote: "Rate harga UC paling masuk akal se-Indonesia. Udah order berkali-kali ga pernah mengecewakan.",
  },
  {
    name: "Rian",
    game: "Roblox (13.250 Robux)",
    robux: 13250,
    time: "1 jam lalu",
    quote: "Order nominal gede 13k robux sempat deg-degan, ternyata beres dalam 5 menit. Keren parah.",
  },
  {
    name: "Surya Wijaya",
    game: "Free Fire (1.450 💎)",
    time: "1 jam lalu",
    quote: "Buat para player FF ga usah ragu, diamond langsung masuk via ID Player.",
  },
  {
    name: "zack_mlbb",
    game: "Mobile Legends (750 💎)",
    time: "2 jam lalu",
    quote: "Server dan ID langsung tervalidasi otomatis. Gak pake drama salah kirim.",
  },
  {
    name: "Ilham",
    game: "Roblox (4.400 Robux)",
    robux: 4400,
    time: "2 jam lalu",
    quote: "Top up robux paling sat set. CS di WhatsApp juga ramah kalo mau tanya2.",
  },
  {
    name: "Hendra Gunawan",
    game: "FC Mobile (1.075 FP)",
    time: "2 jam lalu",
    quote: "Beli FC Points buat pack event baru, proses cepat dan pembayaran QRIS praktis.",
  },
  {
    name: "reihan_gaming",
    game: "Roblox (5.800 Robux)",
    robux: 5800,
    time: "3 jam lalu",
    quote: "Pake metode gamepass roblox aman dari banned, grup payout juga lancar jaya.",
  },
  {
    name: "Aldi",
    game: "Free Fire (355 💎)",
    time: "3 jam lalu",
    quote: "Harga bersahabat di kantong pelajar, proses gak pake lama. Bintang lima!",
  },
  {
    name: "Rizky Febrian",
    game: "Mobile Legends (1.000 💎)",
    time: "3 jam lalu",
    quote: "Beli diamond pas event skin, auto dapet skin impian. Mantul My Velora.",
  },
  {
    name: "daniellll_",
    game: "Roblox (20.000 Robux)",
    robux: 20000,
    time: "4 jam lalu",
    quote: "Sultan approved! 20.000 Robux masuk selamat tanpa kendala. Sukses selalu buat My Velora.",
  },
  {
    name: "Bayu",
    game: "PUBG Mobile (600 UC)",
    time: "4 jam lalu",
    quote: "Tracking pesanan di webnya transparan banget, tau progres udah diproses atau belum.",
  },
  {
    name: "Aditya Nugraha",
    game: "Roblox (3.100 Robux)",
    robux: 3100,
    time: "5 jam lalu",
    quote: "Gak perlu nunggu berjam-jam, begitu transfer terverifikasi langsung masuk.",
  },
  {
    name: "bocil_ff",
    game: "Free Fire (Membership)",
    time: "5 jam lalu",
    quote: "Langganan beli membership mingguan disini. Murah dan cepet.",
  },
  {
    name: "Farhan Ramadhan",
    game: "Mobile Legends (250 💎)",
    time: "6 jam lalu",
    quote: "Pelayanan mantap, top up diamond aman tanpa takut akun kenapa-napa.",
  },
  {
    name: "Rendy",
    game: "Roblox (2.000 Robux)",
    robux: 2000,
    time: "6 jam lalu",
    quote: "Beli 2.000 robux buat adik, langsung masuk dalam 3 menit. Terima kasih!",
  },
  {
    name: "hyper_carry",
    game: "Mobile Legends (1.800 💎)",
    time: "7 jam lalu",
    quote: "Gak pernah nyesel beli disini. Selalu jadi pilihan utama buat diamond ML.",
  },
  {
    name: "Anisa Rahma",
    game: "Roblox (2.450 Robux)",
    robux: 2450,
    time: "7 jam lalu",
    quote: "Webnya enteng, tampilan bagus, beli robux jadi ga ribet sama sekali.",
  },
  {
    name: "mr.santai",
    game: "FC Mobile (2.200 FP)",
    time: "8 jam lalu",
    quote: "Sistemnya modern, invoice langsung muncul dan gampang di cek di halaman cek-order.",
  },
  {
    name: "Danu",
    game: "PUBG Mobile (1.200 UC)",
    time: "8 jam lalu",
    quote: "UC masuk kilat, pas banget lagi buru-buru pengen spin crate.",
  },
  {
    name: "Yoga Pratama",
    game: "Roblox (6.500 Robux)",
    robux: 6500,
    time: "9 jam lalu",
    quote: "Udah sering order disini, gapernah ada masalah. Amanah 100%.",
  },
  {
    name: "galang_pro",
    game: "Free Fire (720 💎)",
    time: "9 jam lalu",
    quote: "Top up diamond FF termurah yang pernah gw coba, auto bookmark webnya.",
  },
  {
    name: "Faisal",
    game: "Mobile Legends (1.000 💎)",
    time: "10 jam lalu",
    quote: "1000 Diamond beres gak nyampe 3 menit. Goks abis My Velora!",
  },
  {
    name: "Agung Setiawan",
    game: "Roblox (3.800 Robux)",
    robux: 3800,
    time: "10 jam lalu",
    quote: "Penjelasan cara buat gamepass di webnya jelas banget buat pemula.",
  },
  {
    name: "bima_23",
    game: "Roblox (2.000 Robux)",
    robux: 2000,
    time: "11 jam lalu",
    quote: "Gue rekomendasiin ke temen-temen tongkrongan, pada puas semua belinya disini.",
  },
  {
    name: "Gilang",
    game: "FC Mobile (520 FP)",
    time: "12 jam lalu",
    quote: "Poin FC langsung masuk buat buka pack baru. Mantul pol!",
  },
  {
    name: "Ilham Maulana",
    game: "Mobile Legends (350 💎)",
    time: "12 jam lalu",
    quote: "Fast order, fast delivery. Sukses terus bisnisnya min.",
  },
  {
    name: "kucing_oren99",
    game: "Roblox (4.400 Robux)",
    robux: 4400,
    time: "13 jam lalu",
    quote: "Keren webnya elegan dan bersih gini, transaksinya juga sat set.",
  },
  {
    name: "Tegar",
    game: "Free Fire (210 💎)",
    time: "14 jam lalu",
    quote: "Ga pake login akun, cukup masukin player ID, diamond mendarat mulus.",
  },
  {
    name: "Riko Hermanto",
    game: "PUBG Mobile (3.000 UC)",
    time: "15 jam lalu",
    quote: "Langganan UC PUBG terbaik. Anti pending lama.",
  },
  {
    name: "Satria",
    game: "Roblox (26.750 Robux)",
    robux: 26750,
    time: "16 jam lalu",
    quote: "Order nominal besar 26.750 Robux diproses sangat profesional. Top seller!",
  },
  {
    name: "bang_jago88",
    game: "Mobile Legends (500 💎)",
    time: "17 jam lalu",
    quote: "Beli diamond buat gift skin ke temen mabar, langsung kekirim lancar jaya.",
  },
  {
    name: "Bobby Darmawan",
    game: "Roblox (5.800 Robux)",
    robux: 5800,
    time: "18 jam lalu",
    quote: "Harga kompetitif banget, pelayanan no debat cepetnya.",
  },
  {
    name: "indra_07",
    game: "Free Fire (500 💎)",
    time: "19 jam lalu",
    quote: "Cuma 1 menitan langsung ada notif diamond masuk in-game. Keren!",
  },
  {
    name: "Dimas",
    game: "Roblox (2.000 Robux)",
    robux: 2000,
    time: "20 jam lalu",
    quote: "Paling suka fitur lacak pesanan real-timenya, jadi gak perlu overthinking.",
  },
  {
    name: "Lukman Hakim",
    game: "FC Mobile (100 FP)",
    time: "21 jam lalu",
    quote: "Top up FC mobile ga pake ribet, proses cepat dan terpercaya.",
  },
  {
    name: "zero_one",
    game: "PUBG Mobile (600 UC)",
    time: "22 jam lalu",
    quote: "Seller ramah, harga miring, UC PUBG langsung masuk tanpa delay.",
  },
  {
    name: "Dika Pratama",
    game: "Roblox (6.500 Robux)",
    robux: 6500,
    time: "23 jam lalu",
    quote: "Sudah order ke-6 kali di My Velora. Kualitas pelayanan konsisten cepat.",
  },
  {
    name: "Maya",
    game: "Mobile Legends (250 💎)",
    time: "1 hari lalu",
    quote: "Beli diamond disini gampang banget buat cewek yang ga mau ribet. QRIS langsung beres.",
  },
  {
    name: "Sandi Kurniawan",
    game: "Free Fire (1.000 💎)",
    time: "1 hari lalu",
    quote: "Sangat puas dengan layanannya. Diamond langsung masuk dan harganya terjangkau.",
  },
  {
    name: "Aris",
    game: "Roblox (33.500 Robux)",
    robux: 33500,
    time: "1 hari lalu",
    quote: "Paket 33.500 Robux mendarat aman tanpa kendala sama sekali. Respect buat My Velora!",
  },
];

export interface UniversalGamePackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  popular?: boolean;
}

export const DEFAULT_MLBB_PACKAGES: UniversalGamePackage[] = [
  { id: "mlbb-250", name: "250 Diamonds", amount: 250, price: 50000 },
  { id: "mlbb-350", name: "350 Diamonds", amount: 350, price: 75000 },
  { id: "mlbb-500", name: "500 Diamonds", amount: 500, price: 100000, popular: true },
  { id: "mlbb-750", name: "750 Diamonds", amount: 750, price: 200000 },
  { id: "mlbb-1000", name: "1.000 Diamonds", amount: 1000, price: 300000 },
  { id: "mlbb-1200", name: "1.200 Diamonds", amount: 1200, price: 400000 },
  { id: "mlbb-1800", name: "1.800 Diamonds", amount: 1800, price: 500000 },
];

export const DEFAULT_PUBG_PACKAGES: UniversalGamePackage[] = [
  { id: "pubg-1000", name: "1.000 UC", amount: 1000, price: 35000 },
  { id: "pubg-1200", name: "1.200 UC", amount: 1200, price: 45000 },
  { id: "pubg-1700", name: "1.700 UC", amount: 1700, price: 55000 },
  { id: "pubg-2100", name: "2.100 UC", amount: 2100, price: 80000 },
  { id: "pubg-2600", name: "2.600 UC", amount: 2600, price: 100000, popular: true },
  { id: "pubg-3600", name: "3.600 UC", amount: 3600, price: 200000 },
  { id: "pubg-4200", name: "4.200 UC", amount: 4200, price: 300000 },
  { id: "pubg-5300", name: "5.300 UC", amount: 5300, price: 400000 },
  { id: "pubg-6100", name: "6.100 UC", amount: 6100, price: 500000 },
];

export const DEFAULT_FREEFIRE_PACKAGES: UniversalGamePackage[] = [
  { id: "ff-140", name: "140 Diamonds", amount: 140, price: 20000 },
  { id: "ff-355", name: "355 Diamonds", amount: 355, price: 50000 },
  { id: "ff-720", name: "720 Diamonds", amount: 720, price: 100000, popular: true },
  { id: "ff-1450", name: "1.450 Diamonds", amount: 1450, price: 200000 },
  { id: "ff-2180", name: "2.180 Diamonds", amount: 2180, price: 300000 },
  { id: "ff-3640", name: "3.640 Diamonds", amount: 3640, price: 500000 },
];

export const DEFAULT_FCMOBILE_PACKAGES: UniversalGamePackage[] = [
  { id: "fc-40", name: "40 FC Points", amount: 40, price: 8000 },
  { id: "fc-100", name: "100 FC Points", amount: 100, price: 20000 },
  { id: "fc-520", name: "520 FC Points", amount: 520, price: 100000, popular: true },
  { id: "fc-1075", name: "1.075 FC Points", amount: 1075, price: 200000 },
  { id: "fc-2200", name: "2.200 FC Points", amount: 2200, price: 400000 },
  { id: "fc-5700", name: "5.700 FC Points", amount: 5700, price: 1000000 },
];

export function getDefaultPackagesForGame(gameId: string): UniversalGamePackage[] {
  switch (gameId.toLowerCase()) {
    case "mlbb":
      return DEFAULT_MLBB_PACKAGES;
    case "pubg":
      return DEFAULT_PUBG_PACKAGES;
    case "freefire":
      return DEFAULT_FREEFIRE_PACKAGES;
    case "fcmobile":
      return DEFAULT_FCMOBILE_PACKAGES;
    case "roblox":
    default:
      return DEFAULT_PRICING.map((p) => ({
        id: `rbx-${p.robux}`,
        name: `${p.robux.toLocaleString("id-ID")} Robux`,
        amount: p.robux,
        price: p.price,
      }));
  }
}
