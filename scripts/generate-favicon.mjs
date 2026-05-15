import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logoPath = path.join(__dirname, '../public/images/raw/logo.jpg')
const publicDir = path.join(__dirname, '../public')

// Generate premium gold-background favicon from B&W logo
// 32x32 favicon.ico equivalent
await sharp(logoPath)
  .resize(32, 32, { fit: 'contain', background: { r: 26, g: 26, b: 46, alpha: 1 } })
  .png()
  .toFile(path.join(publicDir, 'favicon-32.png'))

// 180x180 Apple touch icon
await sharp(logoPath)
  .resize(160, 160, { fit: 'contain', background: { r: 26, g: 26, b: 46, alpha: 1 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 26, g: 26, b: 46, alpha: 1 } })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'))

// 192x192 Android chrome
await sharp(logoPath)
  .resize(160, 160, { fit: 'contain', background: { r: 201, g: 168, b: 76, alpha: 1 } })
  .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 201, g: 168, b: 76, alpha: 1 } })
  .png()
  .toFile(path.join(publicDir, 'favicon-192.png'))

// 512x512 PWA icon
await sharp(logoPath)
  .resize(400, 400, { fit: 'contain', background: { r: 26, g: 26, b: 46, alpha: 1 } })
  .extend({ top: 56, bottom: 56, left: 56, right: 56, background: { r: 26, g: 26, b: 46, alpha: 1 } })
  .png()
  .toFile(path.join(publicDir, 'favicon-512.png'))

// Also copy as favicon.png for browser tab
await sharp(logoPath)
  .resize(48, 48, { fit: 'contain', background: { r: 26, g: 26, b: 46, alpha: 1 } })
  .png()
  .toFile(path.join(publicDir, 'favicon.png'))

console.log('✅ Premium favicons generated (navy background with hotel logo)')
