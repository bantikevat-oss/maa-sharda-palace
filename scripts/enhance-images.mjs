import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const INPUT_DIR = path.join(__dirname, '../public/images/raw')
const OUTPUT_DIR = path.join(__dirname, '../public/images')

const presets = {
  hero_bg:              { width: 1920, height: 1080, brightness: 1.05, saturation: 1.05, quality: 85 },
  hero_bg_2:            { width: 1920, height: 1080, brightness: 1.05, saturation: 1.05, quality: 85 },
  lobby:                { width: 1200, height: 800,  brightness: 1.12, saturation: 0.95, quality: 82 },
  lobby_2:              { width: 1200, height: 800,  brightness: 1.12, saturation: 0.95, quality: 82 },
  reception:            { width: 1200, height: 800,  brightness: 1.08, saturation: 0.95, quality: 82 },
  reception_2:          { width: 1200, height: 800,  brightness: 1.08, saturation: 0.95, quality: 82 },
  pool:                 { width: 1200, height: 800,  brightness: 1.15, saturation: 1.10, quality: 85 },
  pool_2:               { width: 1200, height: 800,  brightness: 1.15, saturation: 1.10, quality: 85 },
  pool_3:               { width: 1200, height: 800,  brightness: 1.15, saturation: 1.10, quality: 85 },
  pool_4:               { width: 1200, height: 800,  brightness: 1.15, saturation: 1.10, quality: 85 },
  banquet_1:            { width: 1200, height: 800,  brightness: 1.18, saturation: 0.95, quality: 82 },
  banquet_2:            { width: 1200, height: 800,  brightness: 1.18, saturation: 0.95, quality: 82 },
  banquet_3:            { width: 1200, height: 800,  brightness: 1.18, saturation: 0.95, quality: 82 },
  banquet_4:            { width: 1200, height: 800,  brightness: 1.18, saturation: 0.95, quality: 82 },
  banquet_5:            { width: 1200, height: 800,  brightness: 1.18, saturation: 0.95, quality: 82 },
  banquet_6:            { width: 1200, height: 800,  brightness: 1.18, saturation: 0.95, quality: 82 },
  room_deluxe:          { width: 900,  height: 600,  brightness: 1.12, saturation: 1.00, quality: 82 },
  room_deluxe_2:        { width: 900,  height: 600,  brightness: 1.12, saturation: 1.00, quality: 82 },
  room_super_deluxe:    { width: 900,  height: 600,  brightness: 1.12, saturation: 1.00, quality: 82 },
  room_super_deluxe_2:  { width: 900,  height: 600,  brightness: 1.12, saturation: 1.00, quality: 82 },
  room_executive:       { width: 900,  height: 600,  brightness: 1.12, saturation: 1.00, quality: 82 },
  room_executive_2:     { width: 900,  height: 600,  brightness: 1.12, saturation: 1.00, quality: 82 },
  room_executive_3:     { width: 900,  height: 600,  brightness: 1.12, saturation: 1.00, quality: 82 },
  room_super_executive: { width: 900,  height: 600,  brightness: 1.15, saturation: 1.00, quality: 85 },
  room_super_executive_2:{ width: 900, height: 600,  brightness: 1.15, saturation: 1.00, quality: 85 },
  room_super_executive_3:{ width: 900, height: 600,  brightness: 1.15, saturation: 1.00, quality: 85 },
  logo:                 { width: 400,  height: 400,  brightness: 1.00, saturation: 1.00, quality: 90 },
  default:              { width: 1200, height: 800,  brightness: 1.10, saturation: 1.00, quality: 82 },
}

await mkdir(OUTPUT_DIR, { recursive: true })
const files = await readdir(INPUT_DIR).catch(() => [])

for (const file of files) {
  if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue
  const slotKey = file.replace(/\.[^.]+$/, '')
  const preset = presets[slotKey] || presets.default
  const inputPath = path.join(INPUT_DIR, file)
  const outputPath = path.join(OUTPUT_DIR, file)

  try {
    await sharp(inputPath)
      .resize(preset.width, preset.height, { fit: 'cover', position: 'centre' })
      .modulate({ brightness: preset.brightness, saturation: preset.saturation })
      .jpeg({ quality: preset.quality, progressive: true })
      .toFile(outputPath)
    console.log(`✅ ${file} → ${preset.width}x${preset.height} @ q${preset.quality}`)
  } catch (e) {
    console.error(`❌ Failed: ${file} — ${e.message}`)
  }
}
console.log('\n🎨 Image enhancement complete!')
