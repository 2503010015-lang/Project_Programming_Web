/* ==========================================================
   katering.js - kalkulator biaya katering (layanan.html)
   Diskon 10% untuk pemesanan 50 porsi atau lebih.
   ========================================================== */

const faza_inputPorsi = faza_$("#faza_porsi");
const faza_pilihPaket = faza_$("#faza_paket");
const faza_batasDiskon = 50;

function faza_hitungKatering() {
  const porsi = Math.max(0, Number(faza_inputPorsi.value) || 0);
  const hargaPaket = Number(faza_pilihPaket.value);
  const dapatDiskon = porsi >= faza_batasDiskon;

  let total = porsi * hargaPaket;
  if (dapatDiskon) total *= 0.9;

  faza_$("#faza_hasil").textContent =
    faza_rp(Math.round(total)) + (dapatDiskon ? " (diskon 10%)" : "");
}

faza_inputPorsi.addEventListener("input", faza_hitungKatering);
faza_pilihPaket.addEventListener("change", faza_hitungKatering);
faza_hitungKatering();
