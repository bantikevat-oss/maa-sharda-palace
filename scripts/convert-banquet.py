"""Convert 3 separate Banquet Halls — Hall 1 (HEIC), Hall 2 & 3 (PNG)."""
from pathlib import Path
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

src_dir = Path(r"C:\Claude\msp-main\public\images")

# Each hall: main + 2 gallery photos
mapping = [
    # Hall 1 (HEIC)
    ("Banquet Hall-1 (1).HEIC", "banquet_hall_1.jpg"),
    ("Banquet Hall-1 (2).HEIC", "banquet_hall_1_2.jpg"),
    ("Banquet Hall-1 (3).HEIC", "banquet_hall_1_3.jpg"),
    # Hall 2 (PNG)
    ("Banquet Hall-2 (1).png", "banquet_hall_2.jpg"),
    ("Banquet Hall-2 (2).png", "banquet_hall_2_2.jpg"),
    ("Banquet Hall-2 (3).png", "banquet_hall_2_3.jpg"),
    # Hall 3 (PNG, only 2 photos available)
    ("Banquet Hall-3 (1).png", "banquet_hall_3.jpg"),
    ("Banquet Hall-3 (2).png", "banquet_hall_3_2.jpg"),
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
    if img.width > 1920:
        ratio = 1920 / img.width
        img = img.resize((1920, int(img.height * ratio)), Image.LANCZOS)
    img.save(dst, "JPEG", quality=85, optimize=True, progressive=True)
    print(f"OK: {src_name} -> {dst_name} ({dst.stat().st_size // 1024} KB)")

print("DONE")
