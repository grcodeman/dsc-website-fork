#!/usr/bin/env python3
"""Build the 1200x630 social share card: club photo + branded footer band.

    python3 scripts/create-og-image.py

Writes public/og-image.jpg. Space Grotesk (the site heading font) is fetched
from Google Fonts once and cached in .cache/fonts/.
"""

import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PHOTO = ROOT / "public" / "club-spring-26.webp"
LOGO = ROOT / "public" / "dsaic-logo.png"
OUT = ROOT / "public" / "og-image.jpg"
FONT_DIR = ROOT / ".cache" / "fonts"

FONT_URLS = {
    "SpaceGrotesk-Bold.ttf": "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf",
    "SpaceGrotesk-Medium.ttf": "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUUsj.ttf",
}

W, H = 1200, 630
BAND_H = 150          # footer band height
RULE_H = 5            # violet rule on top of the band
PAD = 52              # left/right padding inside the band
CREAM = (250, 246, 238)
INK = (37, 25, 122)
VIOLET = (114, 67, 193)


def font(name, size):
    path = FONT_DIR / name
    if not path.exists():
        FONT_DIR.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(FONT_URLS[name], path)
    return ImageFont.truetype(str(path), size)


def cover_crop(im, w, h):
    """Center-crop to the target aspect, biased upward to keep heads in frame."""
    target = w / h
    if im.width / im.height > target:
        new_w = round(im.height * target)
        box = ((im.width - new_w) // 2, 0, (im.width - new_w) // 2 + new_w, im.height)
    else:
        new_h = round(im.width / target)
        top = round((im.height - new_h) * 0.15)  # trim mostly from the floor
        box = (0, top, im.width, top + new_h)
    return im.resize((w, h), Image.LANCZOS, box=box)


card = cover_crop(Image.open(PHOTO).convert("RGB"), W, H)
draw = ImageDraw.Draw(card)

band_top = H - BAND_H
draw.rectangle([0, band_top, W, H], fill=CREAM)
draw.rectangle([0, band_top, W, band_top + RULE_H], fill=VIOLET)

logo = Image.open(LOGO).convert("RGBA")
logo_h = 112
logo = logo.resize((round(logo.width * logo_h / logo.height), logo_h), Image.LANCZOS)
logo_y = band_top + RULE_H + (BAND_H - RULE_H - logo_h) // 2
card.paste(logo, (PAD, logo_y), logo)

text_x = PAD + logo.width + 30
title = font("SpaceGrotesk-Bold.ttf", 47)
sub = font("SpaceGrotesk-Medium.ttf", 25)
LINE_GAP = 18  # title baseline to the top of the subtitle's capitals

# Center the two lines on the logo, measured from the title's cap height to
# the subtitle's baseline (descenders hang below, as they do optically).
title_cap = -draw.textbbox((0, 0), "H", font=title, anchor="ls")[1]
sub_cap = -draw.textbbox((0, 0), "H", font=sub, anchor="ls")[1]
block_h = title_cap + LINE_GAP + sub_cap
title_y = round(logo_y + logo_h / 2 - block_h / 2 + title_cap)
sub_y = title_y + LINE_GAP + sub_cap

draw.text((text_x, title_y), "Data Science & AI Club", font=title, fill=INK, anchor="ls")
draw.text((text_x, sub_y), "Western Michigan University  ·  dscwmu.org", font=sub, fill=VIOLET, anchor="ls")

card.save(OUT, quality=88, optimize=True, progressive=True)
print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB) {card.size}")
