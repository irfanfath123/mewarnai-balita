#!/usr/bin/env python3
"""Gambar satuan -> halaman 800x533 + trace. Pakai: python3 build_single.py <file.png> <kategori> <nama>"""
from PIL import Image, ImageDraw
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_pages import clean, make_trace

ASSETS = os.path.dirname(os.path.abspath(__file__)) + '/../assets'

def letterbox(img, TW=800, TH=533):
    W, H = img.size; s = min(TW/W, TH/H)
    img = img.resize((int(W*s), int(H*s)), Image.LANCZOS)
    out = Image.new('RGB', (TW, TH), (255, 255, 255))
    out.paste(img, ((TW-img.width)//2, (TH-img.height)//2))
    return out

src, cat, name = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(f'{ASSETS}/{cat}', exist_ok=True)
page = clean(letterbox(Image.open(src).convert('RGB')))
page.save(f'{ASSETS}/{cat}/{name}.png')
make_trace(page).save(f'{ASSETS}/{cat}/trace-{name}.png')
print('OK', name)
