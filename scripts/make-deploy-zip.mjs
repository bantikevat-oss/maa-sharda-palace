// Creates a deployment zip from dist/ with forward-slash paths (Linux hosting compatible)
// Uses Node's built-in zlib + a hand-rolled ZIP writer to avoid extra dependencies.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { deflateRawSync, crc32 } from 'node:zlib'

const SRC = new URL('../dist/', import.meta.url).pathname.replace(/^\//, '')
const OUT = new URL('../dist_upload_latest.zip', import.meta.url).pathname.replace(/^\//, '')

function walk(dir, base = dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full, base))
    else out.push({ full, rel: relative(base, full).replace(/\\/g, '/') })
  }
  return out
}

const files = walk(SRC)
const localParts = []
const central = []
let offset = 0

for (const { full, rel } of files) {
  const data = readFileSync(full)
  const compressed = deflateRawSync(data, { level: 9 })
  const crc = crc32(data)
  const nameBuf = Buffer.from(rel, 'utf8')

  // Local file header
  const local = Buffer.alloc(30)
  local.writeUInt32LE(0x04034b50, 0)
  local.writeUInt16LE(20, 4)        // version
  local.writeUInt16LE(0x800, 6)     // utf8 flag
  local.writeUInt16LE(8, 8)         // method = deflate
  local.writeUInt16LE(0, 10)        // time
  local.writeUInt16LE(0, 12)        // date
  local.writeUInt32LE(crc, 14)
  local.writeUInt32LE(compressed.length, 18)
  local.writeUInt32LE(data.length, 22)
  local.writeUInt16LE(nameBuf.length, 26)
  local.writeUInt16LE(0, 28)
  localParts.push(local, nameBuf, compressed)

  // Central directory entry
  const cd = Buffer.alloc(46)
  cd.writeUInt32LE(0x02014b50, 0)
  cd.writeUInt16LE(20, 4)
  cd.writeUInt16LE(20, 6)
  cd.writeUInt16LE(0x800, 8)
  cd.writeUInt16LE(8, 10)
  cd.writeUInt16LE(0, 12)
  cd.writeUInt16LE(0, 14)
  cd.writeUInt32LE(crc, 16)
  cd.writeUInt32LE(compressed.length, 20)
  cd.writeUInt32LE(data.length, 24)
  cd.writeUInt16LE(nameBuf.length, 28)
  cd.writeUInt16LE(0, 30)
  cd.writeUInt16LE(0, 32)
  cd.writeUInt16LE(0, 34)
  cd.writeUInt16LE(0, 36)
  cd.writeUInt32LE(0, 38)
  cd.writeUInt32LE(offset, 42)
  central.push(cd, nameBuf)

  offset += local.length + nameBuf.length + compressed.length
}

const cdStart = offset
const cdBuf = Buffer.concat(central)
const eocd = Buffer.alloc(22)
eocd.writeUInt32LE(0x06054b50, 0)
eocd.writeUInt16LE(0, 4)
eocd.writeUInt16LE(0, 6)
eocd.writeUInt16LE(files.length, 8)
eocd.writeUInt16LE(files.length, 10)
eocd.writeUInt32LE(cdBuf.length, 12)
eocd.writeUInt32LE(cdStart, 16)
eocd.writeUInt16LE(0, 20)

writeFileSync(OUT, Buffer.concat([...localParts, cdBuf, eocd]))
const sizeMB = (statSync(OUT).size / 1024 / 1024).toFixed(2)
console.log(`ZIP created: ${OUT} (${files.length} files, ${sizeMB} MB)`)
