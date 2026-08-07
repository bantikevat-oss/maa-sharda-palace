import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-api-server',
      configureServer(server) {
        // The production app calls the .php endpoints. In dev we serve the same
        // paths from these middlewares so admin → frontend behaves identically.
        const alias = (base, handler) => {
          server.middlewares.use(base, handler)
          server.middlewares.use(base + '.php', handler)
        }

        alias('/api/list-images', (req, res) => {
          try {
            const dir = path.resolve('public/images')
            const files = fs.existsSync(dir)
              ? fs.readdirSync(dir)
                  .filter(f => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f))
                  .map(f => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
                  .sort((a, b) => b.t - a.t)
                  .map(x => x.f)
              : []
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ images: files }))
          } catch (e) { res.end(JSON.stringify({ images: [] })) }
        })

        // Search-engine verification files (Google Search Console, Bing, Yandex).
        const VERIFY_RE = [
          /^google[a-z0-9]{6,40}\.html$/i,
          /^BingSiteAuth\.xml$/i,
          /^yandex_[a-z0-9]{6,40}\.(html|txt)$/i,
          /^pinterest-[a-z0-9]{4,40}\.html$/i,
          /^[a-z0-9_-]{1,40}-site-verification\.(html|txt)$/i,
        ]
        const okName = n => VERIFY_RE.some(re => re.test(n))
        const verifyRoot = path.resolve('public')
        const listVerify = () => fs.readdirSync(verifyRoot)
          .filter(f => okName(f) && fs.statSync(path.join(verifyRoot, f)).isFile())
          .map(f => ({
            name: f,
            size: fs.statSync(path.join(verifyRoot, f)).size,
            modified: new Date(fs.statSync(path.join(verifyRoot, f)).mtime).toISOString().slice(0, 16).replace('T', ' '),
            content: fs.readFileSync(path.join(verifyRoot, f), 'utf8').slice(0, 300),
          }))

        alias('/api/verify-file', (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          if (req.method === 'GET') { res.end(JSON.stringify({ files: listVerify() })); return }
          if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
          let body = ''
          req.on('data', c => body += c)
          req.on('end', () => {
            try {
              const d = JSON.parse(body)
              const name = path.basename(String(d.filename || ''))
              if (!okName(name)) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'That filename is not a recognised verification file.' })); return
              }
              const target = path.join(verifyRoot, name)
              if (d.delete) {
                if (fs.existsSync(target)) fs.unlinkSync(target)
              } else {
                const content = String(d.content || '')
                if (content.length > 4096 || /<\?php|<\?=|<script/i.test(content)) {
                  res.statusCode = 400
                  res.end(JSON.stringify({ error: 'Invalid verification file content.' })); return
                }
                fs.writeFileSync(target, content)
              }
              res.end(JSON.stringify({ success: true, url: '/' + name, files: listVerify() }))
            } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })) }
          })
        })

        server.middlewares.use('/api/get-config.php', (req, res) => {
          try {
            const configPath = path.resolve('public/api/site-config.json')
            const data = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {}
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          } catch (e) { res.end('{}') }
        })

        server.middlewares.use('/api/get-config', (req, res) => {
          try {
            const configPath = path.resolve('public/api/site-config.json')
            const data = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {}
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          } catch (e) { res.end('{}') }
        })

        alias('/api/upload-image', (req, res) => {
          if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
          let body = ''
          req.on('data', chunk => { body += chunk.toString() })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const filename = path.basename(data.filename)
              if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(filename)) {
                res.statusCode = 400; res.end(JSON.stringify({ error: 'Invalid file type' })); return
              }
              const dir = path.resolve('public/images')
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
              fs.writeFileSync(path.join(dir, filename), Buffer.from(data.base64, 'base64'))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, url: `/images/${filename}` }))
            } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })) }
          })
        })

        alias('/api/save-config', (req, res) => {
          if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
          let body = ''
          req.on('data', chunk => { body += chunk.toString() })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              fs.writeFileSync(path.resolve('public/api/site-config.json'), JSON.stringify(data.config, null, 2))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })) }
          })
        })

        alias('/api/save-rooms', (req, res) => {
          if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
          let body = ''
          req.on('data', c => body += c)
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              fs.writeFileSync(path.resolve('public/api/rooms.json'), JSON.stringify(data.rooms, null, 2))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })) }
          })
        })

        alias('/api/save-post', (req, res) => {
          if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
          let body = ''
          req.on('data', c => body += c)
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const slug = data.slug.replace(/[^a-z0-9-]/g, '')
              const postsDir = path.resolve('public/api/posts')
              if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true })
              data.updatedAt = new Date().toISOString().split('T')[0]
              if (!data.id) data.id = 'post_' + Date.now()
              fs.writeFileSync(path.join(postsDir, `${slug}.json`), JSON.stringify(data, null, 2))
              // Rebuild index
              const allPosts = []
              for (const f of fs.readdirSync(postsDir)) {
                if (f === 'index.json' || !f.endsWith('.json')) continue
                const p = JSON.parse(fs.readFileSync(path.join(postsDir, f), 'utf8'))
                allPosts.push({ id: p.id||'', slug: p.slug||'', title: p.title||'', excerpt: p.excerpt||'', category: p.category||'', tags: p.tags||[], publishedAt: p.publishedAt||'', featuredImage: p.featuredImage||null, readTimeMinutes: p.readTimeMinutes||3, published: p.published!==false })
              }
              allPosts.sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
              const cats = [...new Set(allPosts.map(p=>p.category))]
              fs.writeFileSync(path.join(postsDir, 'index.json'), JSON.stringify({ posts: allPosts, categories: cats, lastUpdated: new Date().toISOString() }, null, 2))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, slug, id: data.id }))
            } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })) }
          })
        })

        alias('/api/delete-post', (req, res) => {
          if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
          let body = ''
          req.on('data', c => body += c)
          req.on('end', () => {
            try {
              const { slug } = JSON.parse(body)
              const postsDir = path.resolve('public/api/posts')
              const f = path.join(postsDir, `${slug}.json`)
              if (fs.existsSync(f)) fs.unlinkSync(f)
              const allPosts = []
              for (const file of fs.readdirSync(postsDir)) {
                if (file === 'index.json' || !file.endsWith('.json')) continue
                const p = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf8'))
                allPosts.push({ id: p.id||'', slug: p.slug||'', title: p.title||'', excerpt: p.excerpt||'', category: p.category||'', tags: p.tags||[], publishedAt: p.publishedAt||'', featuredImage: p.featuredImage||null, readTimeMinutes: p.readTimeMinutes||3, published: p.published!==false })
              }
              allPosts.sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
              const cats = [...new Set(allPosts.map(p=>p.category))]
              fs.writeFileSync(path.join(postsDir, 'index.json'), JSON.stringify({ posts: allPosts, categories: cats, lastUpdated: new Date().toISOString() }, null, 2))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })) }
          })
        })
      }
    }
  ],
  base: '/',
  server: { port: parseInt(process.env.PORT || '5200') }
})
