/* ==========================================================
   data.js - data menu & fungsi bantu yang dipakai semua halaman
   ========================================================== */

// Daftar menu: n = nama, c = kategori, p = harga, i = ikon
const faza_menu = [
  { n: "Baso Tahu Komplit", c: "basotahu", p: 15000, i: "🍢" },
  { n: "Siomay Porsi (5 pcs)", c: "basotahu", p: 12000, i: "🥟" },
  { n: "Mie Yamin Baso", c: "mie", p: 18000, i: "🍜" },
  { n: "Mie Kuah Pedas", c: "mie", p: 15000, i: "🌶️" },
  { n: "Jus Alpukat", c: "jus", p: 10000, i: "🥑" },
  { n: "Jus Mangga", c: "jus", p: 8000, i: "🥭" },
  { n: "Es Teh Manis", c: "sachet", p: 4000, i: "🍹" },
  { n: "Kopi Hitam", c: "sachet", p: 5000, i: "☕" },
];

// Nomor WhatsApp pemilik (kode negara tanpa +). Ganti dengan nomor asli.
const faza_nomorWA = "6281234567890";

// Format angka menjadi rupiah, contoh: 15000 -> "Rp 15.000"
const faza_rp = (angka) => "Rp " + angka.toLocaleString("id-ID");

// Singkatan untuk document.querySelector
const faza_$ = (selector) => document.querySelector(selector);
