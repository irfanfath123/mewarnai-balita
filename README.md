# Mewarnai Balita 🎨

PWA aplikasi menggambar & mewarnai untuk balita — terinspirasi dari genre aplikasi
"Bimi Boo: Kids Color Games" (com.bimiboo.drawing), dengan **seluruh gambar, kode,
dan desain orisinal** (bukan salinan aset mereka).

## Fitur (hasil reverse engineering + implementasi)
- 🖼️ **100 halaman mewarnai orisinal** dalam 10 kategori: 🌊 Hewan Laut, 🚗 Kendaraan, 🐦 Unggas, 🦁 Hewan Liar, 🐶 Hewan Peliharaan, 🌸 Bunga & Tumbuhan, 🍎 Makanan, 🏠 Rumah & Benda, 🦋 Serangga, 🚀 Luar Angkasa (10 gambar per kategori)
- 🪣 Mode isi warna (flood fill — ketuk area untuk mewarnai)
- ✏️ Mode gambar bebas — 4 kuas: biasa, semprot, krayon, spidol + 3 ukuran (coretan otomatis terkunci di dalam garis)
- ✍️ Mode tebalkan (tracing) — menebalkan garis titik-titik
- ✨ Mode ajaib (magic painting) — usap dan warna muncul sendiri
- 🌟 Mode stiker — tempel 12 stiker emoji lucu
- 🏁 Tombol Finish — gambar jadi animasi interaktif (ketuk untuk melompat + hujan bintang)
- 🧽 Penghapus, ↩️ Urungkan (20 langkah), 🗑️ Hapus semua
- 🖍️ Rel krayon vertikal ramah balita + tombol mode besar

## Cara menjalankan
Butuh HTTPS atau localhost agar service worker aktif:

```bash
cd pwa-mewarnai-balita
python3 -m http.server 8000
# buka http://localhost:8000
```

## Cara deploy sebagai PWA sungguhan
Upload seluruh isi folder ini ke hosting statis (Netlify, Vercel, GitHub Pages,
Cloudflare Pages, atau server sendiri). Buka sekali saat online — setelah itu
aplikasi ter-install dan bisa dipakai offline.

## Struktur
```
index.html            — layar beranda, editor, galeri
styles.css            — tampilan ramah anak
app.js                — flood fill, kuas, undo, galeri, PWA
manifest.webmanifest  — metadata install PWA
sw.js                 — cache offline
icons/                — ikon 192 & 512
assets/               — 4 line-art orisinal (shark, cat, dino, car)
```

## Catatan reverse engineering
Analisis dilakukan terhadap `com.bimiboo.drawing` v3.135 (Bimi Boo Kids Learning
Games for Toddlers FZ-LLC) — fitur yang dipelajari: halaman mewarnai per tema,
alat (pensil, kuas, semprot, krayon, spidol, kapur), magic painting, undo, mode
tracing. Implementasi di sini ditulis dari nol; tidak ada kode, gambar, suara,
atau merek milik mereka yang disalin.
