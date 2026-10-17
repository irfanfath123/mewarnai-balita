'use strict';
/* Mewarnai Balita v23 — mewarnai saja untuk balita (PWA, 100% orisinal)
   Satu mode: ketuk untuk mengisi warna (flood fill). */

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
const COLORS_VIVID = ['#222222','#E63946','#F4842B','#FFD23F','#2FBF71','#3A86FF','#FF4D8D','#8E44AD'];
const COLORS_PASTEL = ['#FFFFFF','#FFE3E3','#FFE8CC','#FFF6BF','#D9F2D0','#D0E8FF','#FFD6EC','#E8DFF7',
                       '#F1F1F1','#FFCFCF','#FFDDBB','#FFF3AD','#CDEBC9','#BFD9F5','#F5C6DE','#D9C9F2'];
const COLORS = [...COLORS_VIVID, ...COLORS_PASTEL];
const MAX_UNDO = 20, MAX_GALLERY = 30;

/* ---------- State ---------- */


/* ---------- State (hanya mewarnai) ---------- */
let color = COLORS_VIVID[1]; // merah
let currentPage = null;
let CW = 0, CH = 0;
let inkMask = null;
let bgMask = null;   // 1 = kertas latar (tidak bisa diwarnai)
let inkBox = null;
const OPEN_OUTLINE = new Set([
  'angkasa-komet',
  'laut-bintang-laut', 'laut-gurita', 'laut-kuda-laut', 'laut-ubur-ubur',
  'peliharaan-anjing', 'peliharaan-hamster', 'peliharaan-kelinci',
  'peliharaan-kucing', 'peliharaan-landak', 'peliharaan-marmut',
  'peliharaan-parkit',
  'rumah-buku', 'rumah-lampu', 'rumah-rumah', 'rumah-tas',
]);
let undoStack = [];
let soundOn = (localStorage.getItem('mewarnai-sound') !== 'off');
let dirty = false;
let praiseCount = 0;

const $ = id => document.getElementById(id);
const isCatPage = !!document.getElementById('k-grid');
const canvas = $('canvas'), viewCtx = canvas ? canvas.getContext('2d') : null;
const fillCanvas = document.createElement('canvas');
const fillCtx = fillCanvas.getContext('2d', { willReadFrequently: true });
const inkCanvas = document.createElement('canvas');


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

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.add('hidden'), 1800);
}

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

function maybePraise() {
  if (++praiseCount % 4 === 0) speak(PRAISE[Math.random() * PRAISE.length | 0]);
}

function kidConfirm(emoji, text, cb) {
  $('kid-modal-emoji').textContent = emoji;
  $('kid-modal-text').textContent = text;
  kidModalCb = cb;
  $('kid-modal').classList.remove('hidden');
  pop(600, 0.08);
}

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

const PRAISE = ['Hebat!', 'Bagus sekali!', 'Pintar!', 'Warnanya cantik!', 'Keren!', 'Luar biasa!'];

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


/* ---------- Editor: muat gambar (hanya mewarnai) ---------- */
function showLoading(on) {
  $('canvas-loading').classList.toggle('hidden', !on);
}
function openEditor(page) {
  currentPage = page;
  show('screen-editor');
  showLoading(true);
  undoStack = [];
  dirty = false; praiseCount = 0;
  const img = new Image();
  img.onload = () => {
    try {
      CW = img.naturalWidth; CH = img.naturalHeight;
      [canvas, fillCanvas, inkCanvas].forEach(c => { c.width = CW; c.height = CH; });
      fillCtx.clearRect(0, 0, CW, CH);
      buildInk(img);
      requestAnimationFrame(() => {
        fitCanvas(); render(); showLoading(false);
        setTimeout(() => speak('Ketuk gambar untuk mewarnai!'), 400);
      });
    } catch (err) {
      showLoading(false);
      toast('Gagal memuat gambar, coba lagi ya!');
      show('screen-home');
    }
  };
  img.onerror = () => {
    showLoading(false);
    toast('Gagal memuat gambar, coba lagi ya!');
    show('screen-home');
  };
  img.src = page.src;
}


function buildInk(img) {
  const x = inkCanvas.getContext('2d', { willReadFrequently: true });
  x.clearRect(0, 0, CW, CH);
  x.drawImage(img, 0, 0, CW, CH);
  const im = x.getImageData(0, 0, CW, CH), d = im.data;
  inkMask = new Uint8Array(CW * CH);
  let x0 = CW, y0 = CH, x1 = -1, y1 = -1;
  for (let i = 0; i < CW * CH; i++) {
    const lum = 0.299 * d[i*4] + 0.587 * d[i*4+1] + 0.114 * d[i*4+2];
    const a = Math.max(0, Math.min(1, (170 - lum) / 170));
    d[i*4] = 30; d[i*4+1] = 30; d[i*4+2] = 30; // garis hitam buku mewarnai
    d[i*4+3] = Math.round(a * 255);
    if (lum < 140) {
      inkMask[i] = 1;
      const px = i % CW, py = (i / CW) | 0;
      if (px < x0) x0 = px; if (px > x1) x1 = px;
      if (py < y0) y0 = py; if (py > y1) y1 = py;
    }
  }
  inkBox = x1 >= 0 ? [x0, y0, x1, y1] : [0, 0, CW - 1, CH - 1];
  x.putImageData(im, 0, 0);
  buildBgMask();
}

function buildBgMask() {
  const n = CW * CH;
  bgMask = new Uint8Array(n);
  const stack = [];
  const push = i => { if (!inkMask[i] && !bgMask[i]) { bgMask[i] = 1; stack.push(i); } };
  for (let x = 0; x < CW; x++) { push(x); push((CH - 1) * CW + x); }
  for (let y = 0; y < CH; y++) { push(y * CW); push(y * CW + CW - 1); }
  while (stack.length) {
    const c = stack.pop();
    const x = c % CW, y = (c / CW) | 0;
    if (x > 0    && !inkMask[c-1]  && !bgMask[c-1])  { bgMask[c-1] = 1;  stack.push(c-1); }
    if (x < CW-1 && !inkMask[c+1]  && !bgMask[c+1])  { bgMask[c+1] = 1;  stack.push(c+1); }
    if (y > 0    && !inkMask[c-CW] && !bgMask[c-CW]) { bgMask[c-CW] = 1; stack.push(c-CW); }
    if (y < CH-1 && !inkMask[c+CW] && !bgMask[c+CW]) { bgMask[c+CW] = 1; stack.push(c+CW); }
  }
  // Garis terbuka: subjek menyatu dengan kertas — kunci hanya kertas
  // di luar kotak gambar (+margin) agar subjek tidak ikut terkunci.
  if (currentPage && OPEN_OUTLINE.has(currentPage.id)) {
    const m = Math.round(Math.max(CW, CH) * 0.04);
    const bx0 = inkBox[0] - m, by0 = inkBox[1] - m;
    const bx1 = inkBox[2] + m, by1 = inkBox[3] + m;
    for (let y = 0; y < CH; y++)
      for (let x = 0; x < CW; x++)
        if (x >= bx0 && x <= bx1 && y >= by0 && y <= by1) bgMask[y * CW + x] = 0;
  }
}

function isBg(x, y) {
  x |= 0; y |= 0;
  if (!bgMask || x < 0 || y < 0 || x >= CW || y >= CH) return false;
  return !!bgMask[y * CW + x];
}

function fitCanvas() {
  const r = $('canvas-frame').getBoundingClientRect();
  const pad = 8, scale = Math.min((r.width - pad) / CW, (r.height - pad) / CH);
  canvas.style.width = Math.floor(CW * scale) + 'px';
  canvas.style.height = Math.floor(CH * scale) + 'px';
}

function render() {
  viewCtx.fillStyle = '#FFFFFF'; viewCtx.fillRect(0, 0, CW, CH);
  viewCtx.drawImage(fillCanvas, 0, 0);
  viewCtx.drawImage(inkCanvas, 0, 0);
}

function pushUndo() {
  undoStack.push(fillCtx.getImageData(0, 0, CW, CH));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  $('btn-undo').style.opacity = 1;
}

function doUndo() {
  const prev = undoStack.pop();
  if (!prev) { toast('Tidak ada yang diurungkan'); return; }
  fillCtx.putImageData(prev, 0, 0); render(); pop(300);
  if (!undoStack.length) $('btn-undo').style.opacity = 0.4;
}

function floodFill(sx, sy, hex) {
  sx |= 0; sy |= 0;
  if (sx < 0 || sy < 0 || sx >= CW || sy >= CH) return false;
  const img = fillCtx.getImageData(0, 0, CW, CH), d = img.data;
  const si = sy * CW + sx;
  if (inkMask[si]) return false;
  if (bgMask && bgMask[si]) return false; // kertas latar tidak bisa diwarnai
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

// Warnai otomatis dengan warna asli objek
function autoColor() {
  if (!currentPage) return;
  const fills = (typeof AUTO_COLORS !== 'undefined' && AUTO_COLORS[currentPage.id]) || [];
  if (!fills.length) { toast('Belum ada warna otomatis untuk gambar ini'); return; }
  pushUndo();
  let n = 0;
  for (const [x, y, col] of fills) {
    if (floodFill(x, y, col)) n++;
  }
  render(); dirty = true; pop(500);
  speak('Wah, sudah jadi! Bagus sekali!');
  toast('✨ Sudah diwarnai otomatis!');
}

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

function openViewer(item) {
  viewingId = item.id;
  $('viewer-img').src = item.full;
  $('viewer').classList.remove('hidden');
}

/* ---------- Palet warna (selalu terlihat) ---------- */
const COLOR_NAMES = {
  '#222222':'hitam', '#E63946':'merah', '#F4842B':'oranye', '#FFD23F':'kuning',
  '#2FBF71':'hijau', '#3A86FF':'biru', '#FF4D8D':'pink', '#8E44AD':'ungu',
  '#FFFFFF':'putih',
};
function buildPalette() {
  const vv = $('color-vivid'); vv.innerHTML = '';
  COLORS_VIVID.forEach(c => {
    const s = document.createElement('button');
    s.className = 'swatch-dot' + (c === color ? ' active' : '');
    s.style.background = c;
    s.setAttribute('aria-label', COLOR_NAMES[c] || c);
    s.onclick = () => {
      color = c;
      document.querySelectorAll('.swatch-dot').forEach(x => x.classList.remove('active'));
      s.classList.add('active'); pop(800, 0.06);
      const nm = COLOR_NAMES[c];
      if (nm) speak(nm);
    };
    vv.appendChild(s);
  });
  const pp = $('color-pastel'); pp.innerHTML = '';
  COLORS_PASTEL.forEach(c => {
    const s = document.createElement('button');
    s.className = 'swatch-dot' + (c === color ? ' active' : '');
    s.style.background = c;
    s.setAttribute('aria-label', 'warna pastel');
    s.onclick = () => {
      color = c;
      document.querySelectorAll('.swatch-dot').forEach(x => x.classList.remove('active'));
      s.classList.add('active'); pop(800, 0.06);
    };
    pp.appendChild(s);
  });
}

/* ---------- Ketuk untuk mewarnai ---------- */
function toCanvas(e) {
  const r = canvas.getBoundingClientRect();
  return [(e.clientX - r.left) * CW / r.width, (e.clientY - r.top) * CH / r.height];
}
if (!isCatPage) {
canvas.addEventListener('pointerdown', e => {
  e.preventDefault();
  const [x, y] = toCanvas(e);
  pushUndo();
  if (floodFill(x, y, color)) {
    render(); pop(520); dirty = true;
    starBurst(e.clientX, e.clientY); maybePraise();
  } else {
    undoStack.pop(); pop(200, 0.15);
  }
});
canvas.addEventListener('contextmenu', e => e.preventDefault());
} // end pointer (index.html saja)

/* ---------- Tombol ---------- */
function wireButtons() {
  $('btn-back').onclick = () => { autoSave(); pop(600, 0.06); show('screen-home'); };
  $('btn-undo').onclick = () => { doUndo(); };
  $('btn-auto').onclick = () => { autoColor(); };
  $('btn-clear').onclick = () => {
    kidConfirm('🗑', 'Hapus semua warna?', () => {
      pushUndo();
      fillCtx.clearRect(0, 0, CW, CH);
      render(); dirty = true; pop(400, 0.12);
    });
  };
  $('btn-finish').onclick = () => { autoSave(); openFinish(); };
  $('btn-sound').onclick = () => {
    soundOn = !soundOn;
    try { localStorage.setItem('mewarnai-sound', soundOn ? 'on' : 'off'); } catch (e) {}
    $('btn-sound').textContent = soundOn ? '🔊' : '🔇';
    pop(700, 0.06);
  };
  $('btn-gallery').onclick = () => { pop(700, 0.06); buildGallery(); show('screen-gallery'); };
  $('btn-back2').onclick = () => { pop(600, 0.06); show('screen-home'); };
  $('viewer-close').onclick = () => { $('viewer').classList.add('hidden'); };
  $('viewer-download').onclick = () => {
    const a = document.createElement('a');
    a.href = $('viewer-img').src; a.download = 'mewarnai-balita.png'; a.click();
    pop(700, 0.08);
  };
  $('viewer-delete').onclick = () => {
    kidConfirm('🗑', 'Hapus karya ini?', () => {
      const g = gallery().filter(x => x.id !== viewingId);
      saveGallery(g); buildGallery();
      $('viewer').classList.add('hidden'); pop(400, 0.12);
    });
  };
  $('kid-modal-no').onclick = () => { $('kid-modal').classList.add('hidden'); kidModalCb = null; pop(300, 0.08); };
  $('kid-modal-yes').onclick = () => {
    $('kid-modal').classList.add('hidden');
    const cb = kidModalCb; kidModalCb = null;
    if (cb) cb();
  };
  $('btn-finish-back').onclick = () => { pop(600, 0.06); show('screen-editor'); };
  $('btn-finish-recolor').onclick = () => {
    pop(700, 0.08);
    pushUndo(); fillCtx.clearRect(0, 0, CW, CH); render(); dirty = true;
    show('screen-editor');
  };
  $('btn-finish-home').onclick = () => { pop(600, 0.06); show('screen-home'); };
}

/* ---------- Finish: meriah dengan animasi ---------- */
const FINISH_EMOJI = {
  laut:       ['🐠','🐟','🐙','🦀','🫧','🌊'],
  kendaraan:  ['🚌','🚗','🚙','🚦','🛣️'],
  unggas:     ['🐦','🦆','🕊️','☁️'],
  liar:       ['🦁','🐘','🦒','🌴'],
  peliharaan: ['🐶','🐱','🐰','🐹'],
  bunga:      ['🌸','🌼','🌷','🦋'],
  makanan:    ['🍎','🍩','🍕','🧁'],
  rumah:      ['🏠','💡','📚','🪑'],
  serangga:   ['🦋','🐝','🐞','🌼'],
  angkasa:    ['🚀','⭐','🌙','🪐'],
};
const CONFETTI_COLORS = ['#E63946','#F4842B','#FFD23F','#2FBF71','#3A86FF','#FF4D8D','#8E44AD'];
function buildFinishBg() {
  const bg = $('finish-bg');
  bg.innerHTML = '';
  const cat = (currentPage && currentPage.cat) || '';
  const emojis = FINISH_EMOJI[cat] || FINISH_EMOJI['makanan'];
  // Objek relevan kategori: melayang/berenang
  emojis.forEach((em, i) => {
    const s = document.createElement('span');
    s.className = 'finish-emoji';
    s.textContent = em;
    s.style.left = (5 + Math.random() * 85) + '%';
    s.style.top = (8 + Math.random() * 70) + '%';
    s.style.fontSize = (34 + Math.random() * 30) + 'px';
    s.style.animationDuration = (3 + Math.random() * 4) + 's';
    s.style.animationDelay = (Math.random() * 3) + 's';
    bg.appendChild(s);
  });
  // Konfeti meriah
  for (let i = 0; i < 28; i++) {
    const c = document.createElement('span');
    c.className = 'finish-confetti';
    c.style.left = (Math.random() * 100) + '%';
    c.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    c.style.animationDuration = (2.5 + Math.random() * 3) + 's';
    c.style.animationDelay = (Math.random() * 4) + 's';
    if (Math.random() < 0.5) c.style.borderRadius = '50%';
    bg.appendChild(c);
  }
}
function openFinish() {
  show('screen-finish');
  try {
    render();
    $('finish-img').src = canvas.toDataURL('image/jpeg', 0.85);
  } catch (e) {}
  buildFinishBg();
  speak('Hebat! Warnanya cantik!');
  pop(880, 0.15);
  setTimeout(() => pop(660, 0.15), 150);
  setTimeout(() => pop(880, 0.2), 300);
}

/* ---------- Init ---------- */
let greeted = false, deepLinked = false;
function initApp() {
  let openPid = null;
  try { openPid = sessionStorage.getItem('mewarnai-open'); sessionStorage.removeItem('mewarnai-open'); } catch (e) {}
  deepLinked = !!openPid;
  buildHome(); buildPalette(); wireButtons();
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

// Service worker
if (!isCatPage) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw-v23.js').catch(() => {}));
}
