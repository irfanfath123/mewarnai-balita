#!/usr/bin/env python3
"""Potong grid 3x3 -> halaman mewarnai 800x533 + trace PNG.
Pakai: python3 build_pages.py <file-grid.png> <kategori> <nama1> <nama2> ... <nama9>
Bingkai panel dideteksi otomatis via connected-components (9 terbesar).
"""
from PIL import Image, ImageDraw
import numpy as np, json, sys, os
from collections import deque

ASSETS = os.path.dirname(os.path.abspath(__file__)) + '/../assets'

def find_frames(path):
    img = Image.open(path).convert('L')
    a = np.array(img); H, W = a.shape
    dark = a < 100
    seen = np.zeros_like(dark, dtype=bool)
    cands = []
    for y in range(H):
        for x in range(W):
            if dark[y, x] and not seen[y, x]:
                q = deque([(x, y)]); seen[y, x] = True
                minx, maxx, miny, maxy = x, x, y, y; n = 0
                while q:
                    cx, cy = q.popleft(); n += 1
                    minx = min(minx, cx); maxx = max(maxx, cx)
                    miny = min(miny, cy); maxy = max(maxy, cy)
                    for nx, ny in ((cx-1,cy),(cx+1,cy),(cx,cy-1),(cx,cy+1)):
                        if 0 <= nx < W and 0 <= ny < H and dark[ny, nx] and not seen[ny, nx]:
                            seen[ny, nx] = True; q.append((nx, ny))
                bw, bh = maxx-minx+1, maxy-miny+1
                area = bw*bh
                if area > W*H*0.008 and n/area < 0.18 and bw > W*0.12 and bh > H*0.12:
                    cands.append((area, (minx, miny, maxx, maxy)))
    cands.sort(reverse=True)
    frames = [b for _, b in cands[:9]]
    rows = []
    for f in frames:
        for r in rows:
            if abs(r[0][1]-f[1]) < H*0.06:
                r.append(f); break
        else:
            rows.append([f])
    rows.sort(key=lambda r: r[0][1])
    out = []
    for r in rows:
        r.sort(key=lambda b: b[0]); out.extend(r)
    return out

def valid_grid(frames, W, H):
    """9 kotak harus membentuk 3x3 rapi, kalau tidak -> fallback"""
    if len(frames) != 9:
        return False
    cxs = sorted((x0+x1)/2 for x0, y0, x1, y1 in frames)
    cys = sorted((y0+y1)/2 for x0, y0, x1, y1 in frames)
    def groups(v, dim):
        gaps = sorted([(v[i+1]-v[i], i) for i in range(8)], reverse=True)
        cuts = sorted(g[1] for g in gaps[:2])
        gs = [v[:cuts[0]+1], v[cuts[0]+1:cuts[1]+1], v[cuts[1]+1:]]
        if not all(len(g) == 3 for g in gs):
            return None
        means = [sum(g)/3 for g in gs]
        if max(means)-min(means) < dim*0.5:
            return None
        if any(g[-1]-g[0] > dim*0.15 for g in gs):
            return None
        return True
    return bool(groups(cxs, W) and groups(cys, H))

def clean(img):
    return img.convert('L').point(lambda v: 0 if v < 140 else 255, mode='L').convert('RGB')

def thirds_boxes(W, H, m=0.02):
    boxes = []
    for i in range(9):
        r, c = i//3, i%3
        boxes.append((int(c*W/3+W*m), int(r*H/3+H*m),
                      int((c+1)*W/3-W*m), int((r+1)*H/3-H*m)))
    return boxes

def to_3x2(img, TW=800, TH=533):
    W, H = img.size; t = TW/TH
    if W/H > t:
        nw = int(H*t); x0 = (W-nw)//2; img = img.crop((x0, 0, x0+nw, H))
    else:
        nh = int(W/t); y0 = (H-nh)//2; img = img.crop((0, y0, W, y0+nh))
    return img.resize((TW, TH), Image.LANCZOS)

def make_trace(page):
    W, H = page.size
    px = page.convert('L').load()
    tr = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(tr)
    step, r = 9, 3
    for y in range(0, H, step):
        for x in range(0, W, step):
            ink = any(px[x+dx, y+dy] < 140
                      for dy in range(min(step, H-y)) for dx in range(min(step, W-x)))
            if ink:
                cx, cy = x+step//2, y+step//2
                d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(0, 0, 0))
    return tr

def main():
    grid_path, cat = sys.argv[1], sys.argv[2]
    names = sys.argv[3:12]
    assert len(names) == 9, 'butuh tepat 9 nama'
    outdir = f'{ASSETS}/{cat}'
    os.makedirs(outdir, exist_ok=True)
    grid = Image.open(grid_path).convert('RGB')
    W, H = grid.size
    frames = find_frames(grid_path)
    if valid_grid(frames, W, H):
        boxes = [(x0+10, y0+10, x1-10, y1-10) for x0, y0, x1, y1 in frames]
        print('mode: deteksi bingkai')
    else:
        boxes = thirds_boxes(W, H)
        print('mode: fallback potong-3 (tanpa bingkai)')
    assert len(boxes) == 9
    for (x0, y0, x1, y1), name in zip(boxes, names):
        page = clean(to_3x2(grid.crop((x0, y0, x1, y1))))
        page.save(f'{outdir}/{name}.png')
        make_trace(page).save(f'{outdir}/trace-{name}.png')
        print('OK', name)

if __name__ == '__main__':
    main()
