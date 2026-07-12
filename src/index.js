import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import todosRouter from './routes/todos.js'
import usersRouter from './routes/users.js'
import productsRouter from './routes/products.js'
import booksRouter from './routes/books.js'
import quotesRouter from './routes/quotes.js'
import countriesRouter from './routes/countries.js'
import jokesRouter from './routes/jokes.js'
import docsRouter from './routes/docs.js'
import quotesRouter from './routes/quotes.js'
import countriesRouter from './routes/countries.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    return res.status(200).json({})
  }
  next()
})

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')))

// ─── ROUTES ───────────────────────────────────────────────────
app.use('/todos', todosRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/books', booksRouter)
app.use('/quotes', quotesRouter)
app.use('/countries', countriesRouter)
app.use('/jokes', jokesRouter)
app.use('/docs', docsRouter)
app.use('/quotes', quotesRouter)
app.use('/countries', countriesRouter)

app.get('/healthz', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    apis: ['todos', 'users', 'products', 'books', 'quotes', 'countries', 'jokes']
  })
})

// ─── API DATA (placeholder) ───────────────────────────────────
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Naufal Rakha Personal API Hub',
    version: '1.0.0',
    author: 'Naufal Rakha Putra',
    endpoints: {
      todos: '/todos',
      healthz: '/healthz'
    }
  })
})

// ─── ABOUT ────────────────────────────────────────────────────
app.get('/about', (req, res) => {
  const aboutPath = path.join(__dirname, '..', 'components', 'about.htm')
  res.sendFile(aboutPath, (err) => {
    if (err) res.status(404).json({ error: 'About page not found' })
  })
})

// ─── SEO ──────────────────────────────────────────────────────
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: https://naufalrakha.my.id/sitemap.xml
`)
})

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://naufalrakha.my.id/</loc><priority>1.0</priority><changefreq>daily</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs/todos</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs/users</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs/products</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs/books</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs/quotes</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs/countries</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/docs/jokes</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://naufalrakha.my.id/todos</loc><priority>0.7</priority><changefreq>daily</changefreq></url>
  <url><loc>https://naufalrakha.my.id/users</loc><priority>0.7</priority><changefreq>daily</changefreq></url>
  <url><loc>https://naufalrakha.my.id/products</loc><priority>0.6</priority><changefreq>daily</changefreq></url>
  <url><loc>https://naufalrakha.my.id/books</loc><priority>0.6</priority><changefreq>daily</changefreq></url>
  <url><loc>https://naufalrakha.my.id/quotes</loc><priority>0.6</priority><changefreq>daily</changefreq></url>
  <url><loc>https://naufalrakha.my.id/countries</loc><priority>0.6</priority><changefreq>daily</changefreq></url>
  <url><loc>https://naufalrakha.my.id/jokes</loc><priority>0.6</priority><changefreq>daily</changefreq></url>
</urlset>`)
})

// ─── LANDING PAGE ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Naufal Rakha Putra • API Hub</title>
  <meta name="description" content="Personal REST API hub by Naufal Rakha — Todos, Users, Products, Books, Quotes, Countries, Jokes. Free, read-only dummy data for learning, prototyping, and frontend testing." />
  <meta name="keywords" content="api, rest api, todos api, users api, products api, books api, quotes api, indonesia, dummy data, free api, naufal rakha" />
  <meta name="author" content="Naufal Rakha Putra" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://naufalrakha.my.id" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Naufal Rakha API Hub" />
  <meta property="og:title" content="Naufal Rakha Putra • API Hub" />
  <meta property="og:description" content="Personal REST API hub — Todos, Users, Products, Books, Quotes, Countries, Jokes. Free dummy data for learning and frontend testing." />
  <meta property="og:url" content="https://naufalrakha.my.id" />
  <meta property="og:locale" content="id_ID" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Naufal Rakha Putra • API Hub" />
  <meta name="twitter:description" content="Personal REST API hub — Todos, Users, Products, Books, Quotes, Countries, Jokes. Free dummy data for learning and frontend testing." />

  <!-- Structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Naufal Rakha API Hub",
    "url": "https://naufalrakha.my.id",
    "author": {
      "@type": "Person",
      "name": "Naufal Rakha Putra",
      "url": "https://naufalrakha.my.id"
    },
    "description": "Personal REST API hub with free dummy data for learning and testing.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://naufalrakha.my.id/docs"
    }
  }
  </script>

  <style>
    :root {
      --bg: #0a0a0f;
      --card: #12121a;
      --card-hover: #1a1a25;
      --border: #1e1e2e;
      --text: #e4e4e7;
      --muted: #71717a;
      --accent: #6366f1;
      --accent2: #a855f7;
      --green: #22c55e;
      --orange: #f59e0b;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Grid background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: 
        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 0;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }

    /* ─── NAV ─── */
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0;
      border-bottom: 1px solid var(--border);
    }
    .logo {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--text);
      text-decoration: none;
    }
    .logo span { color: var(--accent); }
    .nav-links { display: flex; gap: 24px; }
    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text); }

    /* ─── HERO ─── */
    .hero {
      padding: 80px 0 60px;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 999px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      color: var(--accent);
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 24px;
    }
    .hero h1 {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.1;
      margin-bottom: 16px;
    }
    .hero h1 .gradient {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero p {
      color: var(--muted);
      font-size: 1.1rem;
      max-width: 500px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }
    .hero-url {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      padding: 10px 20px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--muted);
      text-decoration: none;
      transition: all 0.2s;
    }
    .hero-url:hover {
      border-color: var(--accent);
      color: var(--text);
    }

    /* ─── STATS ─── */
    .stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin: 48px 0;
    }
    .stat { text-align: center; }
    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .stat-label {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 4px;
    }

    /* ─── API CARDS ─── */
    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
      margin-bottom: 20px;
    }

    .api-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-bottom: 60px;
    }

    .api-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
    }
    .api-card:hover {
      background: var(--card-hover);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .api-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }
    .api-info { flex: 1; }
    .api-name {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 4px;
    }
    .api-desc {
      font-size: 0.85rem;
      color: var(--muted);
      line-height: 1.4;
    }
    .api-endpoint {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(99, 102, 241, 0.1);
      color: var(--accent);
      white-space: nowrap;
    }

    .api-icon.green { background: rgba(34, 197, 94, 0.1); color: var(--green); }
    .api-icon.orange { background: rgba(245, 158, 11, 0.1); color: var(--orange); }
    .api-icon.purple { background: rgba(168, 85, 247, 0.1); color: var(--accent2); }
    .api-icon.blue { background: rgba(99, 102, 241, 0.1); color: var(--accent); }
    .api-icon.pink { background: rgba(236, 72, 153, 0.1); color: #ec4899; }
    .api-icon.cyan { background: rgba(6, 182, 212, 0.1); color: #06b6d4; }

    .coming-soon {
      opacity: 0.45;
      pointer-events: none;
    }
    .coming-soon .api-endpoint {
      background: rgba(113, 113, 122, 0.1);
      color: var(--muted);
    }

    /* ─── QUICK START ─── */
    .quickstart {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 60px;
    }
    .quickstart h3 {
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .code-block {
      background: #09090b;
      border-radius: 8px;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      line-height: 1.7;
      overflow-x: auto;
      color: #a1a1aa;
    }
    .code-block .comment { color: #52525b; }
    .code-block .string { color: #22c55e; }
    .code-block .url { color: #6366f1; }

    /* ─── FOOTER ─── */
    footer {
      border-top: 1px solid var(--border);
      padding: 32px 0;
      text-align: center;
      color: var(--muted);
      font-size: 0.8rem;
    }
    footer a {
      color: var(--accent);
      text-decoration: none;
    }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 600px) {
      .stats { gap: 24px; }
      .api-card { flex-direction: column; align-items: flex-start; gap: 10px; }
      .api-endpoint { align-self: flex-start; }
    }
  </style>
</head>
<body>
  <div class="container">
    <nav>
      <a href="/" class="logo">naufal<span>rakha</span></a>
      <div class="nav-links">
        <a href="/docs">Docs</a>
        <a href="/todos">Todos</a>
        <a href="/healthz">Health</a>
        <a href="https://github.com/sternnaufal/api" target="_blank">GitHub</a>
      </div>
    </nav>

    <section class="hero">
      <div class="badge">Personal API Hub</div>
      <h1>
        API Playground<br/>
        by <span class="gradient">Naufal Rakha</span>
      </h1>
      <p>REST API gratis buat belajar, testing, dan eksperimen. Semua data in-memory, no database needed.</p>
      <a href="https://naufalrakha.my.id" class="hero-url">naufalrakha.my.id</a>
    </section>

    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="stat-apis">7</div>
        <div class="stat-label">Live APIs</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-endpoints">45</div>
        <div class="stat-label">Endpoints</div>
      </div>
      <div class="stat">
        <div class="stat-value">100%</div>
        <div class="stat-label">Free</div>
      </div>
    </div>

    <div class="section-title">Available APIs</div>
    <div class="api-grid">

      <a href="/todos" class="api-card">
        <div class="api-icon green">📋</div>
        <div class="api-info">
          <div class="api-name">Todos</div>
          <div class="api-desc">100 todos dengan filter, search, pagination, dan statistik</div>
        </div>
        <span class="api-endpoint">/todos</span>
      </a>

      <a href="/users" class="api-card">
        <div class="api-icon orange">👥</div>
        <div class="api-info">
          <div class="api-name">Users</div>
          <div class="api-desc">53 user Indonesia — profile, role, skill, dan social links</div>
        </div>
        <span class="api-endpoint">/users</span>
      </a>

      <a href="/products" class="api-card">
        <div class="api-icon pink">🛍️</div>
        <div class="api-info">
          <div class="api-name">Products</div>
          <div class="api-desc">30 produk — filter kategori, harga, rating, dan stock</div>
        </div>
        <span class="api-endpoint">/products</span>
      </a>

      <a href="/books" class="api-card">
        <div class="api-icon purple">📚</div>
        <div class="api-info">
          <div class="api-name">Books</div>
          <div class="api-desc">25 buku — programming, self-help, fiksi, bisnis, sains</div>
        </div>
        <span class="api-endpoint">/books</span>
      </a>

      <a href="/quotes" class="api-card">
        <div class="api-icon green">💬</div>
        <div class="api-info">
          <div class="api-name">Quotes</div>
          <div class="api-desc">30 kutipan motivasi, teknologi, cinta, lucu, dan programming</div>
        </div>
        <span class="api-endpoint">/quotes</span>
      </a>

      <a href="/countries" class="api-card">
        <div class="api-icon cyan">🌍</div>
        <div class="api-info">
          <div class="api-name">Countries</div>
          <div class="api-desc">25 negara — population, capital, currencies, dan languages</div>
        </div>
        <span class="api-endpoint">/countries</span>
      </a>

      <a href="/jokes" class="api-card">
        <div class="api-icon orange">😂</div>
        <div class="api-info">
          <div class="api-name">Jokes</div>
          <div class="api-desc">25 jokes — programming, puns, dad jokes, lucu Indonesia</div>
        </div>
        <span class="api-endpoint">/jokes</span>
      </a>

      <a href="/healthz" class="api-card">
        <div class="api-icon blue">💚</div>
        <div class="api-info">
          <div class="api-name">Health Check</div>
          <div class="api-desc">Status server, uptime, versi, dan daftar API live</div>
        </div>
        <span class="api-endpoint">/healthz</span>
      </a>
    </div> 

    <div class="section-title">Quick Start</div>
    <div class="quickstart">
      <h3>Coba sekarang</h3>
      <div class="code-block">
<span class="comment"># Get all todos</span>
<span class="url">GET</span> /todos

<span class="comment"># Get all users</span>
<span class="url">GET</span> /users

<span class="comment"># Get products under 100rb</span>
<span class="url">GET</span> /products?max_price=100000

<span class="comment"># Get random quote</span>
<span class="url">GET</span> /quotes/random

<span class="comment"># Get country info</span>
<span class="url">GET</span> /countries?continent=Asia

<span class="comment"># Health check</span>
<span class="url">GET</span> /healthz
      </div>
    </div>

    <footer>
      Dibuat dengan ❤️ oleh <a href="https://github.com/sternnaufal">Naufal Rakha Putra</a> &middot; 2026<br/>
      <span style="opacity:0.6">Express.js &middot; Vercel &middot; REST API</span>
    </footer>
  </div>

  <script>
    fetch('/todos/stats/summary')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          document.getElementById('stat-endpoints').textContent = '12'
        }
      })
      .catch(() => {})
  </script>
</body>
</html>`)
})

// ─── 404 ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    docs: '/',
    available: ['/todos', '/users', '/products', '/books', '/quotes', '/countries', '/jokes', '/healthz', '/about', '/api-data', '/docs']
  })
})

// ─── ERROR HANDLER ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// ─── START SERVER (local only) ────────────────────────────────
const PORT = process.env.PORT || 3000
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 API Hub running on http://localhost:${PORT}`)
  })
}

export default app
