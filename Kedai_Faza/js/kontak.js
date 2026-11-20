/* ==========================================================
   kontak.js - validasi & pengiriman formulir (kontak.html)
   ========================================================== */

const faza_form = faza_$("#faza_form");

// Aturan validasi: mengembalikan true jika valid, atau teks pesan galat
const faza_aturan = {
  faza_nama: (v) => v.trim().length >= 3 || "Nama minimal 3 huruf.",
  faza_email: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || "Format email belum benar.",
  faza_telp: (v) =>
    v === "" ||
    /^(\+62|0)[0-9]{8,13}$/.test(v) ||
    "Nomor telepon tidak valid (contoh 08123456789).",
  faza_subjek: (v) => v !== "" || "Pilih subjek pesan.",
  faza_pesan: (v) => v.trim().length >= 10 || "Pesan minimal 10 karakter.",
};

// Periksa satu kolom dan tampilkan pesan galatnya
function faza_periksaKolom(id) {
  const hasil = faza_aturan[id](faza_$("#" + id).value);
  faza_$("#" + id + "_err").textContent = hasil === true ? "" : hasil;
  return hasil === true;
}

// Simpan pesan ke localStorage (diam-diam gagal bila diblokir browser)
function faza_simpanPesan(data) {
  try {
    const kotak = JSON.parse(localStorage.getItem("faza_kotak") || "[]");
    kotak.push(data);
    localStorage.setItem("faza_kotak", JSON.stringify(kotak));
  } catch (galat) {
    /* penyimpanan tidak tersedia, abaikan */
  }
}

// Validasi saat kolom ditinggalkan
Object.keys(faza_aturan).forEach((id) => {
  faza_$("#" + id).addEventListener("blur", () => faza_periksaKolom(id));
});

// Kirim formulir
faza_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const semuaValid = Object.keys(faza_aturan).map(faza_periksaKolom).every(Boolean);
  if (!semuaValid) return;

  const data = {
    nama: faza_$("#faza_nama").value,
    email: faza_$("#faza_email").value,
    subjek: faza_$("#faza_subjek").value,
    pesan: faza_$("#faza_pesan").value,
    waktu: new Date().toLocaleString("id-ID"),
  };
  faza_simpanPesan(data);

  const isiPesan = `Nama: ${data.nama}\nEmail: ${data.email}\n\n${data.pesan}`;
  faza_$("#faza_mail").href =
    "mailto:halo@kedaiberkah.example" +
    `?subject=${encodeURIComponent(data.subjek)}` +
    `&body=${encodeURIComponent(isiPesan)}`;
  faza_$("#faza_kirim_wa").href =
    `https://wa.me/${faza_nomorWA}?text=` + encodeURIComponent(data.subjek + "\n" + isiPesan);

  faza_$("#faza_nama_sukses").textContent = data.nama;
  faza_form.style.display = "none";
  faza_$("#faza_sukses").style.display = "block";
});

// Status buka/tutup (jam buka 08.00 - 21.00)
const faza_jam = new Date().getHours();
faza_$("#faza_status").textContent =
  faza_jam >= 8 && faza_jam < 21 ? "Sedang buka" : "Sedang tutup";
