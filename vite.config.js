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
        server.middlewares.use('/api/get-config', (req, res) => {
          try {
            const configPath = path.resolve('public/api/site-config.json')
            const data = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {}
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          } catch (e) { res.end('{}') }
        })

        server.middlewares.use('/api/upload-image', (req, res) => {
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

        server.middlewares.use('/api/save-config', (req, res) => {
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

        server.middlewares.use('/api/save-rooms', (req, res) => {
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

        server.middlewares.use('/api/save-post', (req, res) => {
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

        server.middlewares.use('/api/delete-post', (req, res) => {
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
  base: './',
  server: { port: parseInt(process.env.PORT || '5200') }
})
