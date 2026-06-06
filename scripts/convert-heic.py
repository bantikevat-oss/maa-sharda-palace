"""Convert uploaded HEIC files to JPG."""
from pathlib import Path
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

src_dir = Path(r"C:\Claude\msp-main\public\images")
mapping = {
    # Executive Room (already done)
    "Executive Room1 (1).HEIC": "room_executive.jpg",
    "Executive Room1 (2).HEIC": "room_executive_2.jpg",
    "Executive Room1 (3).HEIC": "room_executive_3.jpg",
    # Executive Deluxe Room (= super-executive id in code)
    "Executive Deluxe Room-1 (1).HEIC": "room_super_executive.jpg",
    "Executive Deluxe Room-1 (2).HEIC": "room_super_executive_2.jpg",
    "Executive Deluxe Room-1 (3).HEIC": "room_super_executive_3.jpg",
    # Superior Room (= deluxe id in code)
    "Superior Room-1 (1).HEIC": "room_deluxe.jpg",
    "Superior Room-1 (2).HEIC": "room_deluxe_2.jpg",
    "Superior Room-1 (3).HEIC": "room_deluxe_3.jpg",
    # Superior Deluxe Room (= super-deluxe id in code)
    "Superior Deluxe Room-1 (1).HEIC": "room_super_deluxe.jpg",
    "Superior Deluxe Room-1 (2).HEIC": "room_super_deluxe_2.jpg",
    "Superior Deluxe Room-1 (3).HEIC": "room_super_deluxe_3.jpg",
    # Banquet Hall
    "Banquet Hall-1 (1).HEIC": "banquet_hall_1.jpg",
    "Banquet Hall-1 (2).HEIC": "banquet_hall_2.jpg",
    "Banquet Hall-1 (3).HEIC": "banquet_hall_3.jpg",
}

for heic_name, jpg_name in mapping.items():
    src = src_dir / heic_name
    dst = src_dir / jpg_name
    if not src.exists():
        print(f"MISSING: {src.name}")
        continue
    img = Image.open(src)
    if img.mode != "RGB":
        img = img.convert("RGB")
    if img.width > 1920:
        ratio = 1920 / img.width
        img = img.resize((1920, int(img.height * ratio)), Image.LANCZOS)
    img.save(dst, "JPEG", quality=85, optimize=True)
    print(f"OK: {heic_name} -> {jpg_name} ({dst.stat().st_size // 1024} KB)")

print("DONE")
