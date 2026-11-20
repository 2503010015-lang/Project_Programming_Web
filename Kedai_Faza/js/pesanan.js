/* ==========================================================
   pesanan.js - kartu menu, filter, pencarian, dan struk pesanan
   Dipakai di: index.html dan menu.html
   ========================================================== */

const faza_grid = faza_$("#faza_grid");
const faza_pesanan = {}; // { indeksMenu: jumlah }

// Tampilkan kartu menu sesuai kategori dan kata kunci
function faza_tampilkanMenu(kategori = "semua", kataKunci = "") {
  const batas = Number(faza_grid.dataset.batas) || faza_menu.length;

  const hasil = faza_menu
    .map((menu, indeks) => ({ menu, indeks }))
    .filter(({ menu }) => kategori === "semua" || menu.c === kategori)
    .filter(({ menu }) => menu.n.toLowerCase().includes(kataKunci))
    .slice(0, batas);

  if (hasil.length === 0) {
    faza_grid.innerHTML = "<p>Menu tidak ditemukan.</p>";
    return;
  }

  faza_grid.innerHTML = hasil
    .map(
      ({ menu, indeks }) => `
        <article class="faza_kartu">
          <span class="faza_ikon">${menu.i}</span>
          <h3>${menu.n}</h3>
          <p class="faza_harga">${faza_rp(menu.p)}</p>
          <button class="faza_tombol faza_tombol_alt" data-tambah="${indeks}">Tambah</button>
        </article>`,
    )
    .join("");
}

// Perbarui isi struk, total, dan tautan WhatsApp
function faza_tampilkanStruk() {
  const daftar = faza_$("#faza_struk_isi");
  const indeksDipesan = Object.keys(faza_pesanan);
  let total = 0;
  const baris = [];

  if (indeksDipesan.length === 0) {
    daftar.innerHTML = "<li>Belum ada pesanan</li>";
  } else {
    daftar.innerHTML = indeksDipesan
      .map((indeks) => {
        const menu = faza_menu[indeks];
        const jumlah = faza_pesanan[indeks];
        total += menu.p * jumlah;
        baris.push(`- ${menu.n} x${jumlah}`);
        return `
          <li>
            <span>${menu.n} x${jumlah}</span>
            <span>
              <button class="faza_kecil" data-kurang="${indeks}" aria-label="Kurangi ${menu.n}">-</button>
              ${faza_rp(menu.p * jumlah)}
            </span>
          </li>`;
      })
      .join("");
  }

  faza_$("#faza_struk_total").textContent = faza_rp(total);

  const pesanWA =
    "Halo Kedai Berkah, saya mau pesan:\n" + baris.join("\n") + "\nTotal: " + faza_rp(total);
  faza_$("#faza_wa").href = `https://wa.me/${faza_nomorWA}?text=` + encodeURIComponent(pesanWA);
}

// Tombol Tambah (+) dan Kurang (-) pada struk
document.addEventListener("click", (e) => {
  const { tambah, kurang } = e.target.dataset;

  if (tambah !== undefined) {
    faza_pesanan[tambah] = (faza_pesanan[tambah] || 0) + 1;
    faza_tampilkanStruk();
  }
  if (kurang !== undefined) {
    faza_pesanan[kurang] -= 1;
    if (faza_pesanan[kurang] <= 0) delete faza_pesanan[kurang];
    faza_tampilkanStruk();
  }
});

// Inisialisasi halaman
let faza_kategoriAktif = "semua";
let faza_kataKunci = "";

faza_tampilkanMenu();
faza_tampilkanStruk();

// Filter kategori (hanya ada di halaman Menu)
document.querySelectorAll("[data-kat]").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    faza_kategoriAktif = tombol.dataset.kat;
    document.querySelectorAll("[data-kat]").forEach((t) => {
      t.classList.toggle("faza_aktif", t === tombol);
    });
    faza_tampilkanMenu(faza_kategoriAktif, faza_kataKunci);
  });
});

// Kolom pencarian (hanya ada di halaman Menu)
const faza_kolomCari = faza_$("#faza_cari");
if (faza_kolomCari) {
  faza_kolomCari.addEventListener("input", () => {
    faza_kataKunci = faza_kolomCari.value.toLowerCase();
    faza_tampilkanMenu(faza_kategoriAktif, faza_kataKunci);
  });
}
