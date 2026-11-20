/* ==========================================================
   galeri.js - pratinjau besar (lightbox) pada galeri.html
   Kontrol: klik/Enter buka, panah kiri/kanan ganti, Esc tutup
   ========================================================== */

const faza_lightbox = faza_$("#faza_lightbox");
const faza_semuaUbin = [...document.querySelectorAll(".faza_ubin")];
let faza_ubinAktif = 0;

function faza_bukaPratinjau(indeks) {
  // (indeks + jumlah) % jumlah membuat urutan berputar
  faza_ubinAktif = (indeks + faza_semuaUbin.length) % faza_semuaUbin.length;
  const ubin = faza_semuaUbin[faza_ubinAktif];

  faza_$("#faza_lb_isi").textContent = ubin.textContent;
  faza_$("#faza_lb_cap").textContent = ubin.dataset.cap;
  faza_lightbox.classList.add("faza_buka");
}

function faza_tutupPratinjau() {
  faza_lightbox.classList.remove("faza_buka");
}

// Setiap ubin bisa diklik dan dijangkau keyboard
faza_semuaUbin.forEach((ubin, indeks) => {
  ubin.tabIndex = 0;
  ubin.setAttribute("role", "button");
  ubin.addEventListener("click", () => faza_bukaPratinjau(indeks));
  ubin.addEventListener("keydown", (e) => {
    if (e.key === "Enter") faza_bukaPratinjau(indeks);
  });
});

faza_$("#faza_lb_tutup").addEventListener("click", faza_tutupPratinjau);
faza_$("#faza_lb_prev").addEventListener("click", () => faza_bukaPratinjau(faza_ubinAktif - 1));
faza_$("#faza_lb_next").addEventListener("click", () => faza_bukaPratinjau(faza_ubinAktif + 1));

document.addEventListener("keydown", (e) => {
  if (!faza_lightbox.classList.contains("faza_buka")) return;
  if (e.key === "Escape") faza_tutupPratinjau();
  if (e.key === "ArrowLeft") faza_bukaPratinjau(faza_ubinAktif - 1);
  if (e.key === "ArrowRight") faza_bukaPratinjau(faza_ubinAktif + 1);
});
