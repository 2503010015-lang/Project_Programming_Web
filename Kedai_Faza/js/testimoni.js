/* ==========================================================
   testimoni.js - testimoni yang berganti otomatis (index.html)
   ========================================================== */

const faza_daftarTestimoni = [
  "“Basonya empuk, kuahnya gurih. Anak-anak minta lagi tiap akhir pekan.” — Bu Rina",
  "“Pesan 60 porsi untuk arisan, datang tepat waktu dan masih hangat.” — Pak Hendra",
  "“Jus alpukatnya kental, tidak terlalu manis. Cocok sekali.” — Dina",
];
const faza_kotakTestimoni = faza_$("#faza_testi");
let faza_urutanTestimoni = 0;

function faza_gantiTestimoni() {
  faza_kotakTestimoni.textContent = faza_daftarTestimoni[faza_urutanTestimoni];
  faza_urutanTestimoni = (faza_urutanTestimoni + 1) % faza_daftarTestimoni.length;
}

faza_gantiTestimoni();
setInterval(faza_gantiTestimoni, 4500);
