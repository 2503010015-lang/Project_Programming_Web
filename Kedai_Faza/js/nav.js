/* ==========================================================
   nav.js - menu hamburger (mobile) dan tahun di footer
   ========================================================== */

const faza_tombolNav = faza_$("#faza_tombol_nav");
const faza_daftarNav = faza_$("#faza_menu_nav");

faza_tombolNav.addEventListener("click", () => {
  const terbuka = faza_daftarNav.classList.toggle("faza_buka");
  faza_tombolNav.setAttribute("aria-expanded", terbuka);
});

faza_$("#faza_tahun").textContent = new Date().getFullYear();
