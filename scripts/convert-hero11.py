"""Convert hiro11.png to hero_slide_1.jpg (replace existing)."""
from pathlib import Path
from PIL import Image

src_dir = Path(r"C:\Claude\msp-main\public\images")
src = src_dir / "hiro11.png"
dst = src_dir / "hero_slide_1.jpg"

img = Image.open(src)
if img.mode != "RGB":
    img = img.convert("RGB")
if img.width > 1920:
    ratio = 1920 / img.width
    img = img.resize((1920, int(img.height * ratio)), Image.LANCZOS)
img.save(dst, "JPEG", quality=85, optimize=True, progressive=True)
print(f"OK: hiro11.png ({img.width}x{img.height}) -> hero_slide_1.jpg ({dst.stat().st_size // 1024} KB)")
