'use strict';
/* Mewarnai Balita — mewarnai & menggambar untuk balita (PWA, 100% orisinal)
   Mode: isi (flood fill) | gambar (4 kuas) | tebalkan (tracing) | ajaib (magic) | stiker */

const PAGES = [
  { id: 'shark',     name: 'Hiu 🦈',        src: 'assets/shark.png' },
  { id: 'cat',       name: 'Kucing 🐱',     src: 'assets/cat.png' },
  { id: 'dino',      name: 'Dino 🦕',       src: 'assets/dino.png' },
  { id: 'car',       name: 'Mobil 🚗',      src: 'assets/car.png' },
  { id: 'butterfly', name: 'Kupu-kupu 🦋',  src: 'assets/butterfly.png' },
  { id: 'flower',    name: 'Bunga 🌸',      src: 'assets/flower.png' },
  { id: 'ship',      name: 'Kapal ⛵',      src: 'assets/ship.png' },
  { id: 'house',     name: 'Rumah 🏠',      src: 'assets/house.png' },
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
const canvas = $('canvas'), viewCtx = canvas.getContext('2d');
const fillCanvas = document.createElement('canvas');   // lapisan kerja (transparan)
const fillCtx = fillCanvas.getContext('2d', { willReadFrequently: true });
const inkCanvas = document.createElement('canvas');    // garis line-art
const traceCanvas = document.createElement('canvas');  // panduan titik-titik
const magicColorCanvas = document.createElement('canvas'); // gambar berwarna tersembunyi
const magicCoverCanvas = document.createElement('canvas'); // penutup putih
const magicCoverCtx = magicCoverCanvas.getContext('2d', { willReadFrequently: true });

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
function hexToRgb(h) { return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }

/* ---------- Beranda ---------- */
function buildHome() {
  const grid = $('page-grid'); grid.innerHTML = '';
  PAGES.forEach(p => {
    const card = document.createElement('div');
    card.className = 'page-card';
    card.innerHTML = `<img src="${p.src}" alt="${p.name}" loading="lazy"><div class="name">${p.name}</div>`;
    card.onclick = () => { pop(700); openEditor(p); };
    grid.appendChild(card);
  });
  $('btn-sound').textContent = soundOn ? '🔊' : '🔇';
}

/* ---------- Editor: muat halaman ---------- */
function openEditor(page) {
  show('screen-editor');
  undoStack = [];
  const img = new Image(), traceImg = new Image();
  let loaded = 0;
  const ready = () => {
    if (++loaded < 2) return;
    CW = img.naturalWidth; CH = img.naturalHeight;
    [canvas, fillCanvas, inkCanvas, traceCanvas, magicColorCanvas, magicCoverCanvas]
      .forEach(c => { c.width = CW; c.height = CH; });
    fillCtx.clearRect(0, 0, CW, CH);
    buildInk(img);
    traceCanvas.getContext('2d').drawImage(traceImg, 0, 0, CW, CH);
    buildMagicLayer();
    setMode('fill');
    fitCanvas(); render();
  };
  img.onload = ready; traceImg.onload = ready;
  img.src = page.src;
  traceImg.src = 'assets/trace-' + page.id + '.png';
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
    d[i*4] = 30; d[i*4+1] = 30; d[i*4+2] = 30;
    d[i*4+3] = Math.round(a * 255);
    if (lum < 140) inkMask[i] = 1;
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
  const r = $('canvas-wrap').getBoundingClientRect();
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
    viewCtx.drawImage(traceCanvas, 0, 0);
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
function strokeSeg(x0, y0, x1, y1) {
  const c = fillCtx;
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
function strokeDot(x, y) {
  const c = fillCtx;
  if (erasing) {
    c.save(); c.globalCompositeOperation = 'destination-out';
    c.fillStyle = '#000';
    c.beginPath(); c.arc(x, y, brushSize / 2, 0, 7); c.fill(); c.restore();
    return;
  }
  if (brush === 'spray') { sprayStamp(c, x, y, color); return; }
  strokeSeg(x, y, x + 0.1, y + 0.1);
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
  render(); pop(700, 0.07);
}

/* ---------- Interaksi pointer ---------- */
let stroking = false, lastPt = null;
canvas.addEventListener('pointerdown', e => {
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);
  const [x, y] = toCanvas(e);
  if (mode === 'fill') {
    pushUndo();
    if (floodFill(x, y, color)) { render(); pop(520); }
    else { undoStack.pop(); pop(200, 0.15); }
  } else if (mode === 'sticker') {
    placeSticker(x, y);
  } else if (mode === 'magic') {
    pushUndo(); stroking = true; lastPt = [x, y];
    magicErase(x, y, x + 0.1, y + 0.1); render();
  } else { // draw | trace
    pushUndo(); stroking = true; lastPt = [x, y];
    strokeDot(x, y); render();
  }
});
canvas.addEventListener('pointermove', e => {
  if (!stroking) return;
  const [x, y] = toCanvas(e);
  if (mode === 'magic') magicErase(lastPt[0], lastPt[1], x, y);
  else strokeSeg(lastPt[0], lastPt[1], x, y);
  lastPt = [x, y]; render();
});
const endStroke = () => { stroking = false; lastPt = null; };
canvas.addEventListener('pointerup', endStroke);
canvas.addEventListener('pointercancel', endStroke);
canvas.addEventListener('contextmenu', e => e.preventDefault());

/* ---------- Perkakas ---------- */
function buildToolbox() {
  const pal = $('palette'); pal.innerHTML = '';
  COLORS.forEach(c => {
    const s = document.createElement('button');
    s.className = 'swatch' + (c === color ? ' active' : '');
    s.style.background = c; s.title = c; s.setAttribute('aria-label', 'Warna ' + c);
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
  if (m !== 'draw' && m !== 'trace') { erasing = false; $('btn-eraser').classList.remove('active'); }
  MODES.forEach(x => $('mode-' + x).classList.toggle('active', x === m));
  $('palette').style.display = m === 'magic' ? 'none' : 'flex';
  $('sec-sizes').classList.toggle('hidden', !(m === 'draw' || m === 'trace' || m === 'magic'));
  $('sec-types').classList.toggle('hidden', !(m === 'draw' || m === 'trace'));
  $('sec-stickers').classList.toggle('hidden', m !== 'sticker');
  canvas.style.cursor = m === 'fill' || m === 'sticker' ? 'pointer' : 'crosshair';
  render();
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
function doSave(download = true) {
  render();
  const url = canvas.toDataURL('image/png');
  const thumb = document.createElement('canvas');
  const tw = 240, th = Math.round(tw * CH / CW);
  thumb.width = tw; thumb.height = th;
  thumb.getContext('2d').drawImage(canvas, 0, 0, tw, th);
  const g = gallery();
  g.unshift({ id: Date.now(), img: thumb.toDataURL('image/jpeg', 0.72), full: canvas.toDataURL('image/jpeg', 0.9) });
  saveGallery(g);
  pop(880, 0.12); toast('Tersimpan di Karyaku! 🌟');
  if (download) {
    const a = document.createElement('a');
    a.href = url; a.download = 'mewarnai-balita.png'; a.click();
  }
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

/* ---------- Tombol ---------- */
MODES.forEach(m => { $('mode-' + m).onclick = () => { setMode(m); pop(700, 0.06); }; });
$('btn-undo').onclick = doUndo;
$('btn-clear').onclick = () => {
  if (!confirm('Hapus semua?')) return;
  pushUndo();
  workCtx().clearRect(0, 0, CW, CH);
  if (mode === 'magic') { // kembalikan penutup putih
    magicCoverCtx.globalCompositeOperation = 'source-over';
    magicCoverCtx.fillStyle = '#FFFFFF';
    magicCoverCtx.fillRect(0, 0, CW, CH);
  }
  render(); pop(250, 0.12);
};
$('btn-save').onclick = () => doSave(true);
$('btn-back').onclick = () => show('screen-home');
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
  saveGallery(gallery().filter(x => x.id !== viewingId));
  $('viewer').classList.add('hidden'); buildGallery(); toast('Dihapus');
};
$('viewer').addEventListener('click', e => { if (e.target.id === 'viewer') $('viewer').classList.add('hidden'); });

/* ---------- PWA ---------- */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ---------- Mulai ---------- */
buildHome(); buildToolbox();
$('btn-undo').style.opacity = 0.4;
