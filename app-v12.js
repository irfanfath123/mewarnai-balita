'use strict';
/* Mewarnai Balita — mewarnai & menggambar untuk balita (PWA, 100% orisinal)
   Mode: isi (flood fill) | gambar (4 kuas) | tebalkan (tracing) | ajaib (magic) | stiker */

const CATEGORIES = [
  { id: 'laut', name: 'Hewan Laut', icon: '🌊' },
  { id: 'kendaraan', name: 'Kendaraan', icon: '🚗' },
  { id: 'unggas', name: 'Unggas', icon: '🐦' },
  { id: 'liar', name: 'Hewan Liar', icon: '🦁' },
  { id: 'peliharaan', name: 'Hewan Peliharaan', icon: '🐶' },
  { id: 'bunga', name: 'Bunga & Tumbuhan', icon: '🌸' },
  { id: 'makanan', name: 'Makanan', icon: '🍎' },
  { id: 'rumah', name: 'Rumah & Benda', icon: '🏠' },
  { id: 'serangga', name: 'Serangga', icon: '🦋' },
  { id: 'angkasa', name: 'Luar Angkasa', icon: '🚀' },
];
const PAGES = [
  { id: 'laut-hiu', cat: 'laut', name: 'Hiu 🦈', src: 'assets/laut/hiu.png' },
  { id: 'laut-paus', cat: 'laut', name: 'Paus 🐳', src: 'assets/laut/paus.png' },
  { id: 'laut-gurita', cat: 'laut', name: 'Gurita 🐙', src: 'assets/laut/gurita.png' },
  { id: 'laut-kura-laut', cat: 'laut', name: 'Kura-kura 🐢', src: 'assets/laut/kura-laut.png' },
  { id: 'laut-ikan-badut', cat: 'laut', name: 'Ikan Badut 🐠', src: 'assets/laut/ikan-badut.png' },
  { id: 'laut-kepiting', cat: 'laut', name: 'Kepiting 🦀', src: 'assets/laut/kepiting.png' },
  { id: 'laut-kuda-laut', cat: 'laut', name: 'Kuda Laut', src: 'assets/laut/kuda-laut.png' },
  { id: 'laut-bintang-laut', cat: 'laut', name: 'Bintang Laut ⭐', src: 'assets/laut/bintang-laut.png' },
  { id: 'laut-ubur-ubur', cat: 'laut', name: 'Ubur-ubur', src: 'assets/laut/ubur-ubur.png' },
  { id: 'laut-lumba-lumba', cat: 'laut', name: 'Lumba-lumba 🐬', src: 'assets/laut/lumba-lumba.png' },
  { id: 'kendaraan-mobil', cat: 'kendaraan', name: 'Mobil 🚗', src: 'assets/kendaraan/mobil.png' },
  { id: 'kendaraan-bus', cat: 'kendaraan', name: 'Bus 🚌', src: 'assets/kendaraan/bus.png' },
  { id: 'kendaraan-truk', cat: 'kendaraan', name: 'Truk 🚚', src: 'assets/kendaraan/truk.png' },
  { id: 'kendaraan-kereta', cat: 'kendaraan', name: 'Kereta 🚂', src: 'assets/kendaraan/kereta.png' },
  { id: 'kendaraan-pesawat', cat: 'kendaraan', name: 'Pesawat ✈️', src: 'assets/kendaraan/pesawat.png' },
  { id: 'kendaraan-kapal-layar', cat: 'kendaraan', name: 'Kapal Layar ⛵', src: 'assets/kendaraan/kapal-layar.png' },
  { id: 'kendaraan-sepeda', cat: 'kendaraan', name: 'Sepeda 🚲', src: 'assets/kendaraan/sepeda.png' },
  { id: 'kendaraan-motor', cat: 'kendaraan', name: 'Motor 🏍️', src: 'assets/kendaraan/motor.png' },
  { id: 'kendaraan-ambulans', cat: 'kendaraan', name: 'Ambulans 🚑', src: 'assets/kendaraan/ambulans.png' },
  { id: 'kendaraan-traktor', cat: 'kendaraan', name: 'Traktor 🚜', src: 'assets/kendaraan/traktor.png' },
  { id: 'unggas-ayam', cat: 'unggas', name: 'Ayam 🐔', src: 'assets/unggas/ayam.png' },
  { id: 'unggas-bebek', cat: 'unggas', name: 'Bebek 🦆', src: 'assets/unggas/bebek.png' },
  { id: 'unggas-hantu', cat: 'unggas', name: 'Burung Hantu 🦉', src: 'assets/unggas/hantu.png' },
  { id: 'unggas-merpati', cat: 'unggas', name: 'Merpati 🕊️', src: 'assets/unggas/merpati.png' },
  { id: 'unggas-elang', cat: 'unggas', name: 'Elang 🦅', src: 'assets/unggas/elang.png' },
  { id: 'unggas-flamingo', cat: 'unggas', name: 'Flamingo 🦩', src: 'assets/unggas/flamingo.png' },
  { id: 'unggas-pinguin', cat: 'unggas', name: 'Pinguin 🐧', src: 'assets/unggas/pinguin.png' },
  { id: 'unggas-merak', cat: 'unggas', name: 'Merak 🦚', src: 'assets/unggas/merak.png' },
  { id: 'unggas-beo', cat: 'unggas', name: 'Beo 🦜', src: 'assets/unggas/beo.png' },
  { id: 'unggas-angsa', cat: 'unggas', name: 'Angsa 🦢', src: 'assets/unggas/angsa.png' },
  { id: 'liar-singa', cat: 'liar', name: 'Singa 🦁', src: 'assets/liar/singa.png' },
  { id: 'liar-gajah', cat: 'liar', name: 'Gajah 🐘', src: 'assets/liar/gajah.png' },
  { id: 'liar-jerapah', cat: 'liar', name: 'Jerapah 🦒', src: 'assets/liar/jerapah.png' },
  { id: 'liar-zebra', cat: 'liar', name: 'Zebra 🦓', src: 'assets/liar/zebra.png' },
  { id: 'liar-monyet', cat: 'liar', name: 'Monyet 🐵', src: 'assets/liar/monyet.png' },
  { id: 'liar-harimau', cat: 'liar', name: 'Harimau 🐯', src: 'assets/liar/harimau.png' },
  { id: 'liar-beruang', cat: 'liar', name: 'Beruang 🐻', src: 'assets/liar/beruang.png' },
  { id: 'liar-panda', cat: 'liar', name: 'Panda 🐼', src: 'assets/liar/panda.png' },
  { id: 'liar-dino', cat: 'liar', name: 'Dino 🦕', src: 'assets/liar/dino.png' },
  { id: 'liar-buaya', cat: 'liar', name: 'Buaya 🐊', src: 'assets/liar/buaya.png' },
  { id: 'peliharaan-kucing', cat: 'peliharaan', name: 'Kucing 🐱', src: 'assets/peliharaan/kucing.png' },
  { id: 'peliharaan-anjing', cat: 'peliharaan', name: 'Anjing 🐶', src: 'assets/peliharaan/anjing.png' },
  { id: 'peliharaan-kelinci', cat: 'peliharaan', name: 'Kelinci 🐰', src: 'assets/peliharaan/kelinci.png' },
  { id: 'peliharaan-hamster', cat: 'peliharaan', name: 'Hamster 🐹', src: 'assets/peliharaan/hamster.png' },
  { id: 'peliharaan-marmut', cat: 'peliharaan', name: 'Marmut', src: 'assets/peliharaan/marmut.png' },
  { id: 'peliharaan-kura', cat: 'peliharaan', name: 'Kura-kura 🐢', src: 'assets/peliharaan/kura.png' },
  { id: 'peliharaan-cupang', cat: 'peliharaan', name: 'Ikan Cupang 🐠', src: 'assets/peliharaan/cupang.png' },
  { id: 'peliharaan-parkit', cat: 'peliharaan', name: 'Parkit 🦜', src: 'assets/peliharaan/parkit.png' },
  { id: 'peliharaan-landak', cat: 'peliharaan', name: 'Landak Mini 🦔', src: 'assets/peliharaan/landak.png' },
  { id: 'peliharaan-anak-ayam', cat: 'peliharaan', name: 'Anak Ayam 🐤', src: 'assets/peliharaan/anak-ayam.png' },
  { id: 'bunga-mawar', cat: 'bunga', name: 'Mawar 🌹', src: 'assets/bunga/mawar.png' },
  { id: 'bunga-matahari', cat: 'bunga', name: 'Bunga Matahari 🌻', src: 'assets/bunga/matahari.png' },
  { id: 'bunga-tulip', cat: 'bunga', name: 'Tulip 🌷', src: 'assets/bunga/tulip.png' },
  { id: 'bunga-kaktus', cat: 'bunga', name: 'Kaktus 🌵', src: 'assets/bunga/kaktus.png' },
  { id: 'bunga-pohon-apel', cat: 'bunga', name: 'Pohon Apel 🌳', src: 'assets/bunga/pohon-apel.png' },
  { id: 'bunga-jamur', cat: 'bunga', name: 'Jamur 🍄', src: 'assets/bunga/jamur.png' },
  { id: 'bunga-kelapa', cat: 'bunga', name: 'Pohon Kelapa 🌴', src: 'assets/bunga/kelapa.png' },
  { id: 'bunga-teratai', cat: 'bunga', name: 'Teratai 🪷', src: 'assets/bunga/teratai.png' },
  { id: 'bunga-beri', cat: 'bunga', name: 'Semak Beri 🫐', src: 'assets/bunga/beri.png' },
  { id: 'bunga-monstera', cat: 'bunga', name: 'Daun Monstera 🌿', src: 'assets/bunga/monstera.png' },
  { id: 'makanan-apel', cat: 'makanan', name: 'Apel 🍎', src: 'assets/makanan/apel.png' },
  { id: 'makanan-pisang', cat: 'makanan', name: 'Pisang 🍌', src: 'assets/makanan/pisang.png' },
  { id: 'makanan-semangka', cat: 'makanan', name: 'Semangka 🍉', src: 'assets/makanan/semangka.png' },
  { id: 'makanan-es-krim', cat: 'makanan', name: 'Es Krim 🍦', src: 'assets/makanan/es-krim.png' },
  { id: 'makanan-kue', cat: 'makanan', name: 'Kue Ulang Tahun 🎂', src: 'assets/makanan/kue.png' },
  { id: 'makanan-donat', cat: 'makanan', name: 'Donat 🍩', src: 'assets/makanan/donat.png' },
  { id: 'makanan-stroberi', cat: 'makanan', name: 'Stroberi 🍓', src: 'assets/makanan/stroberi.png' },
  { id: 'makanan-wortel', cat: 'makanan', name: 'Wortel 🥕', src: 'assets/makanan/wortel.png' },
  { id: 'makanan-pizza', cat: 'makanan', name: 'Pizza 🍕', src: 'assets/makanan/pizza.png' },
  { id: 'makanan-susu', cat: 'makanan', name: 'Kotak Susu 🥛', src: 'assets/makanan/susu.png' },
  { id: 'rumah-rumah', cat: 'rumah', name: 'Rumah 🏠', src: 'assets/rumah/rumah.png' },
  { id: 'rumah-kursi', cat: 'rumah', name: 'Kursi 🪑', src: 'assets/rumah/kursi.png' },
  { id: 'rumah-meja', cat: 'rumah', name: 'Meja', src: 'assets/rumah/meja.png' },
  { id: 'rumah-lampu', cat: 'rumah', name: 'Lampu Meja 💡', src: 'assets/rumah/lampu.png' },
  { id: 'rumah-kasur', cat: 'rumah', name: 'Tempat Tidur 🛏️', src: 'assets/rumah/kasur.png' },
  { id: 'rumah-tv', cat: 'rumah', name: 'Televisi 📺', src: 'assets/rumah/tv.png' },
  { id: 'rumah-jam', cat: 'rumah', name: 'Jam Dinding 🕐', src: 'assets/rumah/jam.png' },
  { id: 'rumah-buku', cat: 'rumah', name: 'Buku 📖', src: 'assets/rumah/buku.png' },
  { id: 'rumah-tas', cat: 'rumah', name: 'Tas Sekolah 🎒', src: 'assets/rumah/tas.png' },
  { id: 'rumah-payung', cat: 'rumah', name: 'Payung ☂️', src: 'assets/rumah/payung.png' },
  { id: 'serangga-kupu', cat: 'serangga', name: 'Kupu-kupu 🦋', src: 'assets/serangga/kupu.png' },
  { id: 'serangga-lebah', cat: 'serangga', name: 'Lebah 🐝', src: 'assets/serangga/lebah.png' },
  { id: 'serangga-kepik', cat: 'serangga', name: 'Kepik 🐞', src: 'assets/serangga/kepik.png' },
  { id: 'serangga-semut', cat: 'serangga', name: 'Semut 🐜', src: 'assets/serangga/semut.png' },
  { id: 'serangga-belalang', cat: 'serangga', name: 'Belalang 🦗', src: 'assets/serangga/belalang.png' },
  { id: 'serangga-capung', cat: 'serangga', name: 'Capung', src: 'assets/serangga/capung.png' },
  { id: 'serangga-laba', cat: 'serangga', name: 'Laba-laba 🕷️', src: 'assets/serangga/laba.png' },
  { id: 'serangga-ulat', cat: 'serangga', name: 'Ulat 🐛', src: 'assets/serangga/ulat.png' },
  { id: 'serangga-kumbang', cat: 'serangga', name: 'Kumbang 🪲', src: 'assets/serangga/kumbang.png' },
  { id: 'serangga-jangkrik', cat: 'serangga', name: 'Jangkrik 🦗', src: 'assets/serangga/jangkrik.png' },
  { id: 'angkasa-roket', cat: 'angkasa', name: 'Roket 🚀', src: 'assets/angkasa/roket.png' },
  { id: 'angkasa-saturnus', cat: 'angkasa', name: 'Planet Bercincin 🪐', src: 'assets/angkasa/saturnus.png' },
  { id: 'angkasa-bintang', cat: 'angkasa', name: 'Bintang ⭐', src: 'assets/angkasa/bintang.png' },
  { id: 'angkasa-bulan', cat: 'angkasa', name: 'Bulan Sabit 🌙', src: 'assets/angkasa/bulan.png' },
  { id: 'angkasa-astronaut', cat: 'angkasa', name: 'Astronaut 🧑‍🚀', src: 'assets/angkasa/astronaut.png' },
  { id: 'angkasa-ufo', cat: 'angkasa', name: 'UFO 🛸', src: 'assets/angkasa/ufo.png' },
  { id: 'angkasa-matahari', cat: 'angkasa', name: 'Matahari ☀️', src: 'assets/angkasa/matahari.png' },
  { id: 'angkasa-komet', cat: 'angkasa', name: 'Komet ☄️', src: 'assets/angkasa/komet.png' },
  { id: 'angkasa-teleskop', cat: 'angkasa', name: 'Teleskop 🔭', src: 'assets/angkasa/teleskop.png' },
  { id: 'angkasa-alien', cat: 'angkasa', name: 'Alien Lucu 👽', src: 'assets/angkasa/alien.png' },
];
const COLORS = ['#FF3B30','#FF9500','#FFCC00','#4CD964','#00C7BE','#007AFF',
                '#5856D6','#FF2D55','#A2845E','#5B3A29','#8E8E93','#FFFFFF'];
const STICKERS = ['⭐','❤️','🎈','🐠','🌸','🦋','🐱','🚗','🌙','🍎','🐝','🌈'];
const MAGIC_BG = '#BDE0FE';
const MAGIC_COLORS = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF9F45','#B983FF',
                      '#FF7BAC','#66D9E8','#F783AC','#A9E34B','#FFC078','#E599F7'];
const MAX_UNDO = 20, MAX_GALLERY = 30;

/* ---------- State ---------- */
let mode = 'fill';              // fill | draw | trace | magic | sticker
let brush = 'normal';           // normal | spray | crayon | marker
let color = COLORS[0];
let brushSize = 22;
let erasing = false;
let currentSticker = STICKERS[0];
let CW = 0, CH = 0;
let inkMask = null;
let undoStack = [];
let soundOn = (localStorage.getItem('mewarnai-sound') !== 'off');

/* ---------- Elemen & kanvas ---------- */
const $ = id => document.getElementById(id);
const isCatPage = !!document.getElementById('k-grid'); // true saat dibuka sebagai kategori.html
const canvas = $('canvas'), viewCtx = canvas ? canvas.getContext('2d') : null;
const fillCanvas = document.createElement('canvas');   // lapisan kerja (transparan)
const fillCtx = fillCanvas.getContext('2d', { willReadFrequently: true });
const inkCanvas = document.createElement('canvas');    // garis line-art
const traceCanvas = document.createElement('canvas');  // panduan titik-titik
const magicColorCanvas = document.createElement('canvas'); // gambar berwarna tersembunyi
const magicCoverCanvas = document.createElement('canvas'); // penutup putih
const magicCoverCtx = magicCoverCanvas.getContext('2d', { willReadFrequently: true });
const scratchCanvas = document.createElement('canvas'); // coretan sementara (untuk klip garis)
const scratchCtx = scratchCanvas.getContext('2d');
let strokeMask = null; // mask region coretan aktif (null = tanpa klip)

/* ---------- Audio mungil ---------- */
let actx = null;
function pop(freq = 520, dur = 0.09) {
  if (!soundOn) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.18, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
    o.connect(g); g.connect(actx.destination);
    o.start(); o.stop(actx.currentTime + dur);
  } catch (e) { /* abaikan */ }
}

/* ---------- Util layar ---------- */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}
function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.add('hidden'), 1800);
}
/* Panduan suara bahasa Indonesia (mengikuti toggle suara) */
function speak(t) {
  if (!soundOn) return;
  try {
    const s = window.speechSynthesis; if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'id-ID'; u.rate = 0.95; u.pitch = 1.15;
    const vs = s.getVoices();
    const idv = vs.find(v => v.lang && v.lang.toLowerCase().startsWith('id'));
    if (idv) u.voice = idv;
    s.speak(u);
  } catch (e) {}
}
const PRAISE = ['Hebat!', 'Bagus sekali!', 'Pintar!', 'Warnanya cantik!', 'Keren!', 'Luar biasa!'];
let praiseCount = 0;
function maybePraise() {
  if (++praiseCount % 4 === 0) speak(PRAISE[Math.random() * PRAISE.length | 0]);
}
/* Dialog konfirmasi ramah anak */
let kidModalCb = null;
function kidConfirm(emoji, text, cb) {
  $('kid-modal-emoji').textContent = emoji;
  $('kid-modal-text').textContent = text;
  kidModalCb = cb;
  $('kid-modal').classList.remove('hidden');
  pop(600, 0.08);
}
/* Bintang berhamburan di titik ketuk */
function starBurst(cx, cy) {
  const frame = $('canvas-frame'), r = frame.getBoundingClientRect();
  for (let i = 0; i < 7; i++) {
    const s = document.createElement('div');
    s.className = 'burst-star';
    s.textContent = ['⭐', '✨', '🌟'][i % 3];
    const ang = (i / 7) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 40 + Math.random() * 55;
    s.style.left = (cx - r.left) + 'px'; s.style.top = (cy - r.top) + 'px';
    s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
    s.style.setProperty('--dy', (Math.sin(ang) * dist - 34) + 'px');
    s.style.fontSize = (18 + Math.random() * 14) + 'px';
    frame.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }
}
function hexToRgb(h) { return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }

/* ---------- Beranda: kartu kategori → kategori.html ---------- */
let greeted = false, deepLinked = false;
function buildHome() {
  const grid = $('cat-grid'); grid.innerHTML = '';
  CATEGORIES.forEach(c => {
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = `<div class="cat-card-ico">${c.icon}</div><div class="cat-card-name">${c.name}</div>`;
    card.onclick = () => { pop(700, 0.06); location.href = 'kategori.html?cat=' + c.id; };
    grid.appendChild(card);
  });
  $('btn-sound').textContent = soundOn ? '🔊' : '🔇';
  if (!greeted && !deepLinked) { greeted = true; setTimeout(() => speak('Halo! Pilih gambar kesukaanmu!'), 600); }
}

/* ---------- Editor: muat halaman ---------- */
let magicBuilt = false;
function showLoading(on) {
  $('canvas-loading').classList.toggle('hidden', !on);
}
function openEditor(page) {
  currentPage = page;
  show('screen-editor');
  $('editor-title').textContent = page.name;
  showLoading(true);
  magicBuilt = false;
  undoStack = [];
  dirty = false; praiseCount = 0;
  const img = new Image(), traceImg = new Image();
  let loaded = 0, failed = false;
  const fail = () => {
    if (failed) return; failed = true;
    showLoading(false);
    toast('Gagal memuat gambar, coba lagi ya!');
    show('screen-home');
  };
  const ready = () => {
    if (failed) return;
    if (++loaded < 2) return;
    try {
      CW = img.naturalWidth; CH = img.naturalHeight;
      [canvas, fillCanvas, inkCanvas, traceCanvas, magicColorCanvas, magicCoverCanvas, scratchCanvas]
        .forEach(c => { c.width = CW; c.height = CH; });
      fillCtx.clearRect(0, 0, CW, CH);
      buildInk(img);
      traceCanvas.getContext('2d').drawImage(traceImg, 0, 0, CW, CH);
      setPhase('trace');
      // tunggu layout selesai, baru ukur + tampilkan garisnya
      requestAnimationFrame(() => {
        if (failed) return;
        fitCanvas(); render(); showLoading(false);
        setTimeout(() => speak('Ikuti garis abu-abunya ya!'), 400);
        // lapisan ajaib dibangun belakangan agar gambar langsung tampil
        setTimeout(() => { try { buildMagicLayer(); magicBuilt = true; } catch (err) {} }, 30);
      });
    } catch (err) { fail(); }
  };
  img.onload = ready; traceImg.onload = ready;
  img.onerror = fail; traceImg.onerror = fail;
  img.src = page.src;
  traceImg.src = page.src.replace(/\/([^/]+)\.png$/, '/trace-$1.png');
}

function buildInk(img) {
  const x = inkCanvas.getContext('2d', { willReadFrequently: true });
  x.clearRect(0, 0, CW, CH);
  x.drawImage(img, 0, 0, CW, CH);
  const im = x.getImageData(0, 0, CW, CH), d = im.data;
  inkMask = new Uint8Array(CW * CH);
  for (let i = 0; i < CW * CH; i++) {
    const lum = 0.299 * d[i*4] + 0.587 * d[i*4+1] + 0.114 * d[i*4+2];
    const a = Math.max(0, Math.min(1, (170 - lum) / 170));
    d[i*4] = 150; d[i*4+1] = 150; d[i*4+2] = 150; // garis abu-abu: panduan untuk ditebalkan
    d[i*4+3] = Math.round(a * 255);
    if (lum < 140) inkMask[i] = 1; // mask batas isi warna: dari gambar asli, tak terpengaruh warna tampil
  }
  x.putImageData(im, 0, 0);
}

/* Magic painting: tiap area tertutup diberi warna cerah (component labeling) */
function buildMagicLayer() {
  const w = CW, h = CH, n = w * h;
  const labels = new Int32Array(n).fill(-1);
  const compSizes = [];
  let compCount = 0;
  const stack = [];
  for (let i = 0; i < n; i++) {
    if (inkMask[i] || labels[i] !== -1) continue;
    let size = 0;
    stack.push(i); labels[i] = compCount;
    while (stack.length) {
      const c = stack.pop(); size++;
      const x = c % w, y = (c / w) | 0;
      if (x > 0   && !inkMask[c-1] && labels[c-1] === -1) { labels[c-1] = compCount; stack.push(c-1); }
      if (x < w-1 && !inkMask[c+1] && labels[c+1] === -1) { labels[c+1] = compCount; stack.push(c+1); }
      if (y > 0   && !inkMask[c-w] && labels[c-w] === -1) { labels[c-w] = compCount; stack.push(c-w); }
      if (y < h-1 && !inkMask[c+w] && labels[c+w] === -1) { labels[c+w] = compCount; stack.push(c+w); }
    }
    compSizes.push(size); compCount++;
  }
  const order = compSizes.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]);
  const compColor = new Array(compCount);
  order.forEach(([, idx], rank) => {
    compColor[idx] = rank === 0 ? MAGIC_BG : MAGIC_COLORS[(rank - 1) % MAGIC_COLORS.length];
  });
  const mx = magicColorCanvas.getContext('2d');
  const img = mx.createImageData(w, h), d = img.data;
  for (let i = 0; i < n; i++) {
    const [r, g, b] = hexToRgb(compColor[labels[i]]);
    d[i*4] = r; d[i*4+1] = g; d[i*4+2] = b; d[i*4+3] = 255;
  }
  mx.putImageData(img, 0, 0);
  magicCoverCtx.globalCompositeOperation = 'source-over';
  magicCoverCtx.fillStyle = '#FFFFFF';
  magicCoverCtx.fillRect(0, 0, w, h);
}

function fitCanvas() {
  const r = $('canvas-frame').getBoundingClientRect();
  const pad = 8, scale = Math.min((r.width - pad) / CW, (r.height - pad) / CH);
  canvas.style.width = Math.floor(CW * scale) + 'px';
  canvas.style.height = Math.floor(CH * scale) + 'px';
}
window.addEventListener('resize', () => { if ($('screen-editor').classList.contains('active')) fitCanvas(); });

function render() {
  viewCtx.fillStyle = '#FFFFFF'; viewCtx.fillRect(0, 0, CW, CH);
  if (mode === 'magic') {
    viewCtx.drawImage(magicColorCanvas, 0, 0);
    viewCtx.drawImage(magicCoverCanvas, 0, 0);
    viewCtx.drawImage(inkCanvas, 0, 0);
  } else if (mode === 'trace') {
    viewCtx.drawImage(inkCanvas, 0, 0); // garis abu-abu sebagai panduan menebalkan
    viewCtx.drawImage(fillCanvas, 0, 0);
  } else {
    viewCtx.drawImage(fillCanvas, 0, 0);
    viewCtx.drawImage(inkCanvas, 0, 0);
  }
}

/* ---------- Undo (mengikuti lapisan aktif) ---------- */
function workCtx() { return mode === 'magic' ? magicCoverCtx : fillCtx; }
function pushUndo() {
  const c = workCtx();
  undoStack.push(c.getImageData(0, 0, CW, CH));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  $('btn-undo').style.opacity = 1;
}
function doUndo() {
  const prev = undoStack.pop();
  if (!prev) { toast('Tidak ada yang diurungkan'); return; }
  workCtx().putImageData(prev, 0, 0); render(); pop(300);
  if (!undoStack.length) $('btn-undo').style.opacity = 0.4;
}

/* ---------- Flood fill scanline ---------- */
function floodFill(sx, sy, hex) {
  sx |= 0; sy |= 0;
  if (sx < 0 || sy < 0 || sx >= CW || sy >= CH) return false;
  const img = fillCtx.getImageData(0, 0, CW, CH), d = img.data;
  const si = sy * CW + sx;
  if (inkMask[si]) return false;
  const [nr, ng, nb] = hexToRgb(hex);
  const tr = d[si*4], tg = d[si*4+1], tb = d[si*4+2], ta = d[si*4+3];
  if (tr === nr && tg === ng && tb === nb && ta === 255) return false;
  const match = i => !inkMask[i] && d[i*4] === tr && d[i*4+1] === tg && d[i*4+2] === tb && d[i*4+3] === ta;
  const stack = [[sx, sy]];
  while (stack.length) {
    const [x, y] = stack.pop();
    let xl = x; while (xl >= 0 && match(y * CW + xl)) xl--; xl++;
    let xr = x; while (xr < CW && match(y * CW + xr)) xr++; xr--;
    for (let xi = xl; xi <= xr; xi++) {
      const o = (y * CW + xi) * 4;
      d[o] = nr; d[o+1] = ng; d[o+2] = nb; d[o+3] = 255;
      if (y > 0    && match((y-1) * CW + xi)) stack.push([xi, y-1]);
      if (y < CH-1 && match((y+1) * CW + xi)) stack.push([xi, y+1]);
    }
  }
  fillCtx.putImageData(img, 0, 0);
  return true;
}

/* Mask region tertutup dari satu titik — coretan diklip agar tak keluar garis */
function buildRegionMask(sx, sy) {
  sx |= 0; sy |= 0;
  if (sx < 0 || sy < 0 || sx >= CW || sy >= CH) return null;
  const si = sy * CW + sx;
  if (inkMask[si]) return null; // mulai tepat di garis → tanpa klip
  const img = fillCtx.getImageData(0, 0, CW, CH), d = img.data;
  const tr = d[si*4], tg = d[si*4+1], tb = d[si*4+2], ta = d[si*4+3];
  const mask = new Uint8Array(CW * CH);
  const match = i => !inkMask[i] && d[i*4] === tr && d[i*4+1] === tg && d[i*4+2] === tb && d[i*4+3] === ta;
  const stack = [si]; mask[si] = 1;
  while (stack.length) {
    const c = stack.pop();
    const x = c % CW, y = (c / CW) | 0;
    if (x > 0    && !mask[c-1] && match(c-1)) { mask[c-1] = 1; stack.push(c-1); }
    if (x < CW-1 && !mask[c+1] && match(c+1)) { mask[c+1] = 1; stack.push(c+1); }
    if (y > 0    && !mask[c-CW] && match(c-CW)) { mask[c-CW] = 1; stack.push(c-CW); }
    if (y < CH-1 && !mask[c+CW] && match(c+CW)) { mask[c+CW] = 1; stack.push(c+CW); }
  }
  const mc = document.createElement('canvas'); mc.width = CW; mc.height = CH;
  const mx = mc.getContext('2d');
  const out = mx.createImageData(CW, CH), od = out.data;
  for (let i = 0; i < CW * CH; i++) if (mask[i]) { od[i*4] = od[i*4+1] = od[i*4+2] = 255; od[i*4+3] = 255; }
  mx.putImageData(out, 0, 0);
  return mc;
}

/* Gambar lewat scratch + klip mask, lalu tempel ke lapisan kerja */
function paintStroke(drawFn) {
  scratchCtx.clearRect(0, 0, CW, CH);
  drawFn(scratchCtx);
  if (strokeMask) {
    scratchCtx.globalCompositeOperation = 'destination-in';
    scratchCtx.drawImage(strokeMask, 0, 0);
    scratchCtx.globalCompositeOperation = 'source-over';
  }
  fillCtx.drawImage(scratchCanvas, 0, 0);
}

/* ---------- Kuas gambar ---------- */
function toCanvas(e) {
  const r = canvas.getBoundingClientRect();
  return [(e.clientX - r.left) / r.width * CW, (e.clientY - r.top) / r.height * CH];
}
function sprayStamp(c, x, y, col) {
  c.fillStyle = col;
  const R = brushSize * 1.4;
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * R;
    c.beginPath();
    c.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 1.5 + Math.random() * 2, 0, 7);
    c.fill();
  }
}
function strokeSeg(c, x0, y0, x1, y1) {
  if (erasing) {
    c.save(); c.globalCompositeOperation = 'destination-out';
    c.strokeStyle = '#000'; c.globalAlpha = 1; c.lineCap = 'round'; c.lineJoin = 'round';
    c.lineWidth = brushSize;
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.restore();
    return;
  }
  if (brush === 'spray') { sprayStamp(c, x1, y1, color); return; }
  c.save();
  c.strokeStyle = color; c.lineCap = 'round'; c.lineJoin = 'round';
  if (brush === 'crayon') {
    for (let k = 0; k < 3; k++) {
      c.globalAlpha = k === 0 ? 0.55 : 0.28;
      c.lineWidth = brushSize * (k === 0 ? 1 : 0.7);
      const ox = (Math.random() - 0.5) * 3, oy = (Math.random() - 0.5) * 3;
      c.beginPath(); c.moveTo(x0 + ox, y0 + oy); c.lineTo(x1 + ox, y1 + oy); c.stroke();
    }
  } else {
    c.globalAlpha = brush === 'marker' ? 0.5 : 1;
    c.lineWidth = brush === 'marker' ? brushSize * 1.7 : brushSize;
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  }
  c.restore();
}
function strokeDot(c, x, y) {
  if (erasing) {
    c.save(); c.globalCompositeOperation = 'destination-out';
    c.fillStyle = '#000';
    c.beginPath(); c.arc(x, y, brushSize / 2, 0, 7); c.fill(); c.restore();
    return;
  }
  if (brush === 'spray') { sprayStamp(c, x, y, color); return; }
  strokeSeg(c, x, y, x + 0.1, y + 0.1);
}

/* ---------- Magic painting ---------- */
function magicErase(x0, y0, x1, y1) {
  const c = magicCoverCtx;
  c.save(); c.globalCompositeOperation = 'destination-out';
  c.strokeStyle = '#000'; c.lineCap = 'round'; c.lineJoin = 'round';
  c.lineWidth = Math.max(brushSize * 2, 24);
  c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.restore();
}

/* ---------- Stiker ---------- */
function placeSticker(x, y) {
  pushUndo();
  const c = fillCtx;
  c.font = Math.round(Math.max(56, brushSize * 3)) + 'px serif';
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(currentSticker, x, y);
  render(); pop(700, 0.07); dirty = true;
}

/* ---------- Interaksi pointer (index.html saja) ---------- */
if (!isCatPage) {
let stroking = false, lastPt = null;
canvas.addEventListener('pointerdown', e => {
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);
  const [x, y] = toCanvas(e);
  if (mode === 'fill') {
    pushUndo();
    if (floodFill(x, y, color)) { render(); pop(520); dirty = true; starBurst(e.clientX, e.clientY); maybePraise(); }
    else { undoStack.pop(); pop(200, 0.15); }
  } else if (mode === 'sticker') {
    placeSticker(x, y);
  } else if (mode === 'magic') {
    pushUndo(); stroking = true; lastPt = [x, y];
    magicErase(x, y, x + 0.1, y + 0.1); render();
  } else { // draw | trace
    pushUndo(); stroking = true; lastPt = [x, y];
    // klip coretan ke dalam garis (mode gambar saja; tracing & penghapus bebas)
    strokeMask = (mode === 'draw' && !erasing) ? buildRegionMask(x, y) : null;
    paintStroke(c => strokeDot(c, x, y)); render();
  }
});
canvas.addEventListener('pointermove', e => {
  if (!stroking) return;
  const [x, y] = toCanvas(e);
  if (mode === 'magic') magicErase(lastPt[0], lastPt[1], x, y);
  else paintStroke(c => strokeSeg(c, lastPt[0], lastPt[1], x, y));
  lastPt = [x, y]; render();
});
const endStroke = () => { if (stroking) dirty = true; stroking = false; lastPt = null; };
canvas.addEventListener('pointerup', endStroke);
canvas.addEventListener('pointercancel', endStroke);
canvas.addEventListener('contextmenu', e => e.preventDefault());
} // end pointer (index.html saja)

/* ---------- Perkakas ---------- */
function buildToolbox() {
  const pal = $('palette'); pal.innerHTML = '';
  COLORS.forEach(c => {
    const s = document.createElement('button');
    s.className = 'swatch crayon' + (c === color ? ' active' : '');
    s.style.setProperty('--c', c); s.title = c; s.setAttribute('aria-label', 'Warna ' + c);
    s.onclick = () => {
      color = c;
      pal.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
      s.classList.add('active'); pop(800, 0.06);
    };
    pal.appendChild(s);
  });
  document.querySelectorAll('.brush-size').forEach(b => {
    b.onclick = () => {
      brushSize = +b.dataset.size;
      document.querySelectorAll('.brush-size').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); pop(650, 0.06);
    };
  });
  document.querySelectorAll('.brush-type').forEach(b => {
    b.onclick = () => {
      brush = b.dataset.brush; erasing = false;
      $('btn-eraser').classList.remove('active');
      document.querySelectorAll('.brush-type').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); pop(650, 0.06);
    };
  });
  $('btn-eraser').onclick = () => {
    erasing = !erasing;
    $('btn-eraser').classList.toggle('active', erasing);
    pop(400, 0.06);
  };
  const bar = $('sticker-bar'); bar.innerHTML = '';
  STICKERS.forEach(s => {
    const b = document.createElement('button');
    b.className = 'sticker-btn' + (s === currentSticker ? ' active' : '');
    b.textContent = s;
    b.onclick = () => {
      currentSticker = s;
      bar.querySelectorAll('.sticker-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); pop(750, 0.06);
    };
    bar.appendChild(b);
  });
}

const MODES = ['fill', 'draw', 'trace', 'magic', 'sticker'];
function setMode(m) {
  mode = m;
  if (m === 'magic' && !magicBuilt) { try { buildMagicLayer(); magicBuilt = true; } catch (err) {} }
  if (m !== 'draw' && m !== 'trace') { erasing = false; $('btn-eraser').classList.remove('active'); }
  MODES.forEach(x => {
    const b = document.querySelector(`.drawer-btn[data-dmode="${x}"]`);
    if (b) b.classList.toggle('active', x === m);
  });
  $('crayon-rail').style.display = m === 'magic' ? 'none' : 'flex';
  $('sec-sizes').classList.toggle('hidden', !(m === 'draw' || m === 'trace' || m === 'magic'));
  $('sec-types').classList.toggle('hidden', !(m === 'draw' || m === 'trace'));
  $('sec-stickers').classList.toggle('hidden', m !== 'sticker');
  canvas.style.cursor = m === 'fill' || m === 'sticker' ? 'pointer' : 'crosshair';
  render();
}
/* ---------- Fase: tebalkan dulu, baru warnai ---------- */
let phase = 'trace';
function setPhase(p) {
  phase = p;
  const tracing = p === 'trace';
  $('btn-tools').classList.toggle('hidden', tracing);
  $('btn-finish').classList.toggle('hidden', tracing);
  $('btn-done').classList.toggle('hidden', !tracing);
  setMode(tracing ? 'trace' : 'fill');
}

/* ---------- Simpan & galeri ---------- */
function gallery() { try { return JSON.parse(localStorage.getItem('mewarnai-gallery') || '[]'); } catch { return []; } }
function saveGallery(g) {
  const arr = g.slice(0, MAX_GALLERY);
  while (true) {
    try { localStorage.setItem('mewarnai-gallery', JSON.stringify(arr)); return; }
    catch (e) {
      if (arr.length <= 1) { try { localStorage.setItem('mewarnai-gallery', '[]'); } catch (e2) {} return; }
      arr.pop();
    }
  }
}
let dirty = false; // ada coretan yang belum tersimpan otomatis
function autoSave() {
  if (!dirty) return;
  render();
  const thumb = document.createElement('canvas');
  const tw = 240, th = Math.round(tw * CH / CW);
  thumb.width = tw; thumb.height = th;
  thumb.getContext('2d').drawImage(canvas, 0, 0, tw, th);
  const g = gallery();
  g.unshift({ id: Date.now(), img: thumb.toDataURL('image/jpeg', 0.72), full: canvas.toDataURL('image/jpeg', 0.9) });
  saveGallery(g);
  dirty = false;
}
function buildGallery() {
  const grid = $('gallery-grid'); grid.innerHTML = '';
  const g = gallery();
  $('gallery-empty').style.display = g.length ? 'none' : 'block';
  g.forEach(item => {
    const d = document.createElement('div');
    d.className = 'gallery-item';
    d.innerHTML = `<img src="${item.img}" alt="Karya" loading="lazy">`;
    d.onclick = () => openViewer(item);
    grid.appendChild(d);
  });
}
let viewingId = null;
function openViewer(item) {
  viewingId = item.id;
  $('viewer-img').src = item.full;
  $('viewer').classList.remove('hidden');
}

/* ---------- Finish: gambar jadi HIDUP ---------- */
let animImg = null, animRAF = 0, animCtx = null;
let particles = [], popT = 0, hopY = 0, hopV = 0;
let currentPage = null, finishScene = null, sceneParts = [];
/* Dunia tiap kategori: ikan berenang, burung terbang, roket meluncur ... */
const SCENES = {
  laut:     { g1: '#2AA9E0', g2: '#0A5C8C', wave: 13, waveSpeed: 7,   bob: 12, part: 'bubble',   say: 'Lihat! Ikannya berenang!' },
  unggas:   { g1: '#C4ECFF', g2: '#7FCDF0', wave: 6,  waveSpeed: 4.5, bob: 18, part: 'cloud',    say: 'Burungnya terbang tinggi!' },
  serangga: { g1: '#DFF7B4', g2: '#8FD18A', wave: 8,  waveSpeed: 11,  bob: 10, part: 'pollen',   say: 'Kupu-kupunya terbang!' },
  angkasa:  { g1: '#232C52', g2: '#0B0F24', wave: 4,  waveSpeed: 2,   bob: 14, part: 'twinkle',  say: 'Roketnya meluncur ke bintang!' },
  default:  { g1: '#FFF3BF', g2: '#FFD8A8', wave: 7,  waveSpeed: 5,   bob: 10, part: 'confetti', say: 'Lihat gambarmu! Ketuk gambarnya!' },
};
function sceneFor(page) { return SCENES[(page && page.cat) || ''] || SCENES.default; }
function newScenePart(W, H, type) {
  if (type === 'bubble') return { type, x: Math.random() * W, y: H + 20, r: 4 + Math.random() * 10, vy: -(40 + Math.random() * 70), wob: Math.random() * 6.28 };
  if (type === 'cloud') return { type, x: -150, y: Math.random() * H * 0.5, s: 0.6 + Math.random() * 0.9, vx: 18 + Math.random() * 26 };
  if (type === 'pollen') return { type, x: Math.random() * W, y: H + 10, r: 2 + Math.random() * 3.5, vy: -(25 + Math.random() * 40), wob: Math.random() * 6.28 };
  if (type === 'twinkle') return { type, x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2.2, ph: Math.random() * 6.28, sp: 1 + Math.random() * 2 };
  return { type: 'confetti', ch: ['✨','⭐','🌟','💫','🎈'][Math.random() * 5 | 0], x: Math.random() * W, y: -24,
    vx: (Math.random() - 0.5) * 50, vy: 60 + Math.random() * 90, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 4,
    size: 14 + Math.random() * 18, life: 2.5 + Math.random() * 2, max: 4 };
}
/* Gambar bergelombang seperti berenang: iris vertikal digeser gelombang sinus */
function drawSwimmer(c, time, dw, dh, sc) {
  const STRIPS = 42, sw = dw / STRIPS, srcW = animImg.width / STRIPS;
  const top = -dh / 2;
  for (let i = 0; i < STRIPS; i++) {
    const nx = i / (STRIPS - 1);
    const env = 0.35 + 0.65 * nx; // bagian ekor bergoyang lebih besar
    const dy = Math.sin(nx * 6 - time * sc.waveSpeed) * sc.wave * env;
    c.drawImage(animImg, i * srcW, 0, srcW + 0.6, animImg.height,
      -dw / 2 + i * sw, top + dy, sw + 0.7, dh);
  }
}

function openFinish() {
  render();
  stopAnim();
  finishScene = sceneFor(currentPage);
  animImg = new Image();
  animImg.onload = () => { show('screen-finish'); sizeAnimCanvas(); startAnim(); pop(880, 0.15); setTimeout(() => speak(finishScene.say), 500); };
  animImg.src = canvas.toDataURL('image/png');
}
function stopAnim() { cancelAnimationFrame(animRAF); animRAF = 0; }
function sizeAnimCanvas() {
  const ac = $('anim-canvas'), r = $('finish-wrap').getBoundingClientRect();
  ac.width = Math.max(300, Math.floor(r.width));
  ac.height = Math.max(300, Math.floor(r.height));
  animCtx = ac.getContext('2d');
}
function newSparkle(W, H, burst, bx, by) {
  if (burst) {
    const a = Math.random() * Math.PI * 2, sp = 80 + Math.random() * 170;
    return { ch: ['⭐','✨','🌟'][Math.random() * 3 | 0], x: bx, y: by,
      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 70,
      rot: 0, vr: (Math.random() - 0.5) * 8, size: 16 + Math.random() * 16,
      life: 1.1, max: 1.1 };
  }
  return { ch: ['✨','⭐','🌟','💫'][Math.random() * 4 | 0], x: Math.random() * W, y: -24,
    vx: (Math.random() - 0.5) * 50, vy: 60 + Math.random() * 90,
    rot: Math.random() * 6, vr: (Math.random() - 0.5) * 4, size: 14 + Math.random() * 18,
    life: 2.5 + Math.random() * 2, max: 4 };
}
function startAnim() {
  particles = []; sceneParts = []; popT = 0; hopY = 0; hopV = 0;
  let last = performance.now();
  const loop = t => {
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    drawAnim(t / 1000, dt);
    animRAF = requestAnimationFrame(loop);
  };
  animRAF = requestAnimationFrame(loop);
}
function drawAnim(time, dt) {
  const c = animCtx, W = $('anim-canvas').width, H = $('anim-canvas').height;
  const sc = finishScene;
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, sc.g1); g.addColorStop(1, sc.g2);
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  // fisika lompatan
  hopV += 1100 * dt; hopY += hopV * dt;
  if (hopY > 0) { hopY = 0; hopV = 0; }
  const iw = animImg.width, ih = animImg.height;
  const s = Math.min(W * 0.82 / iw, H * 0.6 / ih);
  const dw = iw * s, dh = ih * s;
  const bob = Math.sin(time * 2.2) * sc.bob;
  const cx = W / 2, cy = H * 0.44 + bob + hopY;
  if (popT > 0) popT -= dt;
  const popS = popT > 0 ? 1 + 0.16 * Math.sin(popT * 20) * (popT / 0.4) : 1;
  c.save();
  c.translate(cx, cy); c.scale(popS, popS);
  c.fillStyle = 'rgba(0,0,0,0.12)';
  c.beginPath(); c.ellipse(0, dh / 2 + 20 + hopY * 0.25, dw * 0.4, 13, 0, 0, 7); c.fill();
  drawSwimmer(c, time, dw, dh, sc);
  c.restore();
  // partikel dunia sesuai kategori
  if (Math.random() < 0.35 && sceneParts.length < 40) sceneParts.push(newScenePart(W, H, sc.part));
  c.textAlign = 'center'; c.textBaseline = 'middle';
  sceneParts = sceneParts.filter(p => p.life === undefined || p.life > 0);
  for (const p of sceneParts) {
    if (p.type === 'bubble' || p.type === 'pollen') {
      p.wob += dt * 3; p.y += p.vy * dt; p.x += Math.sin(p.wob) * 20 * dt;
      if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
      if (p.type === 'bubble') {
        c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 2;
        c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.stroke();
        c.fillStyle = 'rgba(255,255,255,.35)';
        c.beginPath(); c.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.35, 0, 7); c.fill();
      } else {
        c.fillStyle = 'rgba(255,245,180,.9)';
        c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fill();
      }
    } else if (p.type === 'cloud') {
      p.x += p.vx * dt; if (p.x > W + 150) p.x = -150;
      c.fillStyle = 'rgba(255,255,255,.92)';
      const cs = p.s;
      c.beginPath();
      c.ellipse(p.x, p.y, 52 * cs, 20 * cs, 0, 0, 7);
      c.ellipse(p.x - 30 * cs, p.y + 6 * cs, 30 * cs, 15 * cs, 0, 0, 7);
      c.ellipse(p.x + 32 * cs, p.y + 5 * cs, 32 * cs, 16 * cs, 0, 0, 7);
      c.fill();
    } else if (p.type === 'twinkle') {
      const a = 0.35 + 0.65 * Math.abs(Math.sin(time * p.sp + p.ph));
      c.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')';
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fill();
      p.y -= 4 * dt; if (p.y < -5) p.y = H + 5;
    } else { // confetti bintang jatuh
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 70 * dt; p.life -= dt; p.rot += p.vr * dt;
      if (p.life <= 0 || p.y > H + 30) { p.life = 0; continue; }
      c.save();
      c.globalAlpha = Math.max(0, Math.min(1, p.life / p.max));
      c.translate(p.x, p.y); c.rotate(p.rot);
      c.font = Math.round(p.size) + 'px serif';
      c.fillText(p.ch, 0, 0);
      c.restore();
    }
  }
  // ledakan bintang saat gambar diketuk
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 70 * dt; p.life -= dt; p.rot += p.vr * dt;
    c.save();
    c.globalAlpha = Math.max(0, Math.min(1, p.life / p.max));
    c.translate(p.x, p.y); c.rotate(p.rot);
    c.font = Math.round(p.size) + 'px serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(p.ch, 0, 0);
    c.restore();
  }
}

/* ---------- Tombol (index.html saja) ---------- */
if (!isCatPage) {
/* Laci alat (pengganti mode-bar agar layar sederhana untuk balita) */
const MODE_VOICE = { fill: 'Isi warna!', draw: 'Menggambar bebas!', trace: 'Tebalkan garisnya!', magic: 'Ajaib! Gosok gambarnya!', sticker: 'Tempel stiker!' };
const closeDrawer = () => $('drawer').classList.add('hidden');
$('btn-tools').onclick = () => { pop(700, 0.06); $('drawer').classList.remove('hidden'); };
$('drawer-close').onclick = closeDrawer;
$('drawer').addEventListener('click', e => { if (e.target.id === 'drawer') closeDrawer(); });
document.querySelectorAll('.drawer-btn[data-dmode]').forEach(b => {
  b.onclick = () => { setMode(b.dataset.dmode); pop(700, 0.06); speak(MODE_VOICE[b.dataset.dmode]); closeDrawer(); };
});
$('drawer-clear').onclick = () => {
  closeDrawer();
  kidConfirm('🗑️', 'Hapus semua warna?', () => {
    pushUndo();
    workCtx().clearRect(0, 0, CW, CH);
    if (mode === 'magic') { // kembalikan penutup putih
      magicCoverCtx.globalCompositeOperation = 'source-over';
      magicCoverCtx.fillStyle = '#FFFFFF';
      magicCoverCtx.fillRect(0, 0, CW, CH);
    }
    render(); pop(250, 0.12);
  });
};
/* Dialog anak */
$('kid-modal-yes').onclick = () => { $('kid-modal').classList.add('hidden'); if (kidModalCb) kidModalCb(); pop(700, 0.08); };
$('kid-modal-no').onclick = () => { $('kid-modal').classList.add('hidden'); pop(400, 0.08); };
$('btn-undo').onclick = doUndo;
$('btn-finish').onclick = () => { pop(880, 0.1); autoSave(); openFinish(); };
$('btn-done').onclick = () => {
  kidConfirm('✏️', 'Sudah selesai menggambar?', () => {
    setPhase('color');
    pop(880, 0.12);
    setTimeout(() => speak('Hebat! Sekarang warnai gambarmu!'), 300);
  });
};
$('btn-finish-back').onclick = () => { stopAnim(); show('screen-editor'); fitCanvas(); };
$('btn-finish-home').onclick = () => { stopAnim(); location.href = 'index.html'; };
$('btn-finish-gallery').onclick = () => { stopAnim(); buildGallery(); show('screen-gallery'); speak('Lihat karyamu!'); };
/* Ketuk gambar animasi → lompat + ledakan bintang + bunyi ceria */
$('anim-canvas').addEventListener('pointerdown', e => {
  const r = e.target.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  for (let i = 0; i < 12; i++) particles.push(newSparkle(0, 0, true, x, y));
  hopV = -560; popT = 0.4;
  [660, 830, 990, 1320].forEach((f, i) => setTimeout(() => pop(f, 0.12), i * 85));
});
$('btn-back').onclick = () => { autoSave(); location.href = 'kategori.html?cat=' + (currentPage ? currentPage.cat : CATEGORIES[0].id); };
$('btn-back2').onclick = () => show('screen-home');
$('btn-gallery').onclick = () => { buildGallery(); show('screen-gallery'); pop(700, 0.06); };
$('btn-sound').onclick = () => {
  soundOn = !soundOn;
  localStorage.setItem('mewarnai-sound', soundOn ? 'on' : 'off');
  $('btn-sound').textContent = soundOn ? '🔊' : '🔇';
  pop(700, 0.06);
};
$('viewer-close').onclick = () => $('viewer').classList.add('hidden');
$('viewer-delete').onclick = () => {
  kidConfirm('🗑️', 'Hapus gambar ini?', () => {
    saveGallery(gallery().filter(x => x.id !== viewingId));
    $('viewer').classList.add('hidden'); buildGallery();
  });
};
$('viewer-download').onclick = () => {
  const g = gallery().find(x => x.id === viewingId);
  if (!g) return;
  const a = document.createElement('a');
  a.href = g.full; a.download = 'mewarnai-balita.jpg'; a.click();
  pop(880, 0.1);
};
$('viewer').addEventListener('click', e => { if (e.target.id === 'viewer') $('viewer').classList.add('hidden'); });

} // end tombol (index.html saja)

/* ---------- PWA ---------- */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw-v12.js').catch(() => {}));
}

/* ---------- Mulai ---------- */
function initApp() {
  let openPid = null;
  try { openPid = sessionStorage.getItem('mewarnai-open'); sessionStorage.removeItem('mewarnai-open'); } catch (e) {}
  deepLinked = !!openPid;
  buildHome(); buildToolbox();
  $('btn-undo').style.opacity = 0.4;
  if (openPid) {
    const pg = PAGES.find(p => p.id === openPid);
    if (pg) setTimeout(() => openEditor(pg), 60);
  }
}
function initCatPage() {
  const q = new URLSearchParams(location.search).get('cat');
  const c = CATEGORIES.find(x => x.id === q) || CATEGORIES[0];
  $('k-title').textContent = c.icon + ' ' + c.name;
  const grid = $('k-grid');
  PAGES.filter(p => p.cat === c.id).forEach(p => {
    const card = document.createElement('div');
    card.className = 'page-card';
    card.innerHTML = `<img src="${p.src}" alt="${p.name}" loading="lazy"><div class="name">${p.name}</div>`;
    card.onclick = () => {
      pop(700);
      try { sessionStorage.setItem('mewarnai-open', p.id); } catch (e) {}
      location.href = 'index.html';
    };
    grid.appendChild(card);
  });
  const snd = $('k-sound');
  snd.textContent = soundOn ? '🔊' : '🔇';
  snd.onclick = () => {
    soundOn = !soundOn;
    try { localStorage.setItem('mewarnai-sound', soundOn ? 'on' : 'off'); } catch (e) {}
    snd.textContent = soundOn ? '🔊' : '🔇';
    pop(700, 0.06);
  };
  $('k-back').onclick = () => { pop(600, 0.06); location.href = 'index.html'; };
  setTimeout(() => speak('Pilih gambar!'), 500);
}
if (isCatPage) initCatPage(); else initApp();
