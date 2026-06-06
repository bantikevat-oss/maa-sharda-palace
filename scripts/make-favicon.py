"""Generate favicon files at multiple sizes from img_logo.png."""
from pathlib import Path
from PIL import Image

src = Path(r"C:\Claude\msp-main\public\images\img_logo.png")
public = Path(r"C:\Claude\msp-main\public")

img = Image.open(src)
if img.mode != "RGBA":
    img = img.convert("RGBA")

# Crop to square if not already (use larger of dimensions, paste centered on transparent)
w, h = img.size
if w != h:
    size = max(w, h)
    square = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    square.paste(img, ((size - w) // 2, (size - h) // 2), img if img.mode == "RGBA" else None)
    img = square

sizes = [16, 32, 48, 64, 128, 192, 256, 512]
imgs = []
for s in sizes:
    resized = img.resize((s, s), Image.LANCZOS)
    out = public / f"favicon-{s}.png"
    resized.save(out, "PNG", optimize=True)
    print(f"OK: favicon-{s}.png  ({out.stat().st_size // 1024} KB)")
    imgs.append(resized)

# Default favicon.png (32x32)
imgs[1].save(public / "favicon.png", "PNG", optimize=True)
print(f"OK: favicon.png  ({(public / 'favicon.png').stat().st_size // 1024} KB)")

# favicon.ico (multi-size)
ico_sizes = [(16, 16), (32, 32), (48, 48)]
img.resize((48, 48), Image.LANCZOS).save(public / "favicon.ico", format="ICO", sizes=ico_sizes)
print(f"OK: favicon.ico  ({(public / 'favicon.ico').stat().st_size // 1024} KB)")
print("DONE")
