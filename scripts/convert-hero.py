"""Convert hero PNG files to optimised JPG, with image #4 first per user request."""
from pathlib import Path
from PIL import Image

src_dir = Path(r"C:\Claude\msp-main\public\images")
# User wants hiro (4) first, then 1, 2, 3
mapping = [
    ("hiro (4).png", "hero_slide_1.jpg"),
    ("hiro (1).png", "hero_slide_2.jpg"),
    ("hiro (2).png", "hero_slide_3.jpg"),
    ("hiro (3).png", "hero_slide_4.jpg"),
]

for src_name, dst_name in mapping:
    src = src_dir / src_name
    dst = src_dir / dst_name
    if not src.exists():
        print(f"MISSING: {src_name}")
        continue
    img = Image.open(src)
    if img.mode != "RGB":
        img = img.convert("RGB")
    # Hero target: 1920px wide for crisp full-HD display
    target_w = 1920
    if img.width > target_w:
        ratio = target_w / img.width
        img = img.resize((target_w, int(img.height * ratio)), Image.LANCZOS)
    img.save(dst, "JPEG", quality=85, optimize=True, progressive=True)
    size_kb = dst.stat().st_size // 1024
    print(f"OK: {src_name} ({img.width}x{img.height}) -> {dst_name} ({size_kb} KB)")

print("DONE")
