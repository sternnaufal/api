import express from 'express'

const router = express.Router()

// Shared docs template
function renderDocs(title, icon, color, baseUrl, description, sections) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} Docs • Naufal API Hub</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>"/>
  <style>
    :root{--bg:#0a0a0f;--card:#12121a;--card2:#16161f;--border:#1e1e2e;--text:#e4e4e7;--muted:#71717a;--accent:${color};--green:#22c55e;--orange:#f59e0b;--red:#ef4444;--blue:#6366f1}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
    body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(99,102,241,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0}
    .wrap{max-width:860px;margin:0 auto;padding:0 20px;position:relative;z-index:1}

    nav{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:1px solid var(--border)}
    .logo{font-size:1.1rem;font-weight:700;letter-spacing:-.5px;color:var(--text);text-decoration:none}
    .logo span{color:var(--accent)}
    .nav-links{display:flex;gap:20px}
    .nav-links a{color:var(--muted);text-decoration:none;font-size:.85rem;transition:color .2s}
    .nav-links a:hover{color:var(--text)}

    .hero{padding:48px 0 32px;display:flex;align-items:center;gap:16px}
    .hero-icon{font-size:2.5rem}
    .hero h1{font-size:2rem;font-weight:800;letter-spacing:-1px}
    .hero p{color:var(--muted);font-size:.95rem}
    .hero-tag{display:inline-block;padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:600;background:rgba(255,255,255,.06);color:var(--muted);margin-left:8px;vertical-align:middle}

    .section{margin-bottom:48px}
    .section-title{font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:var(--muted);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--border)}

    .endpoint{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:16px;transition:border-color .2s}
    .endpoint:hover{border-color:rgba(255,255,255,.1)}
    .ep-header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
    .ep-method{font-family:'JetBrains Mono',monospace;font-size:.75rem;font-weight:700;padding:4px 10px;border-radius:6px;text-transform:uppercase}
    .ep-method.get{background:rgba(34,197,94,.12);color:#22c55e}
    .ep-method.post{background:rgba(99,102,241,.12);color:#6366f1}
    .ep-method.put{background:rgba(245,158,11,.12);color:#f59e0b}
    .ep-method.delete{background:rgba(239,68,68,.12);color:#ef4444}
    .ep-path{font-family:'JetBrains Mono',monospace;font-size:.9rem;color:var(--text)}
    .ep-desc{color:var(--muted);font-size:.9rem;margin-bottom:16px}

    table{width:100%;border-collapse:collapse;font-size:.85rem;margin-bottom:16px}
    th{text-align:left;padding:8px 12px;background:var(--card2);color:var(--muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid var(--border)}
    td{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:top}
    tr:last-child td{border-bottom:none}
    .mono{font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--accent)}
    .type{font-family:'JetBrains Mono',monospace;font-size:.75rem;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,.06);color:var(--muted)}
    .required{color:var(--red);font-size:.7rem;font-weight:600}
    .optional{color:var(--muted);font-size:.7rem}

    .code{background:#09090b;border:1px solid var(--border);border-radius:8px;padding:16px;font-family:'JetBrains Mono',monospace;font-size:.8rem;line-height:1.7;overflow-x:auto;color:#a1a1aa;margin-bottom:8px;position:relative}
    .code .method{color:var(--green);font-weight:700}
    .code .str{color:var(--green)}
    .code .num{color:var(--orange)}
    .code .bool{color:var(--blue)}
    .code .key{color:var(--muted)}
    .code .comment{color:#52525b}
    .code-label{position:absolute;top:8px;right:12px;font-size:.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px}

    .data-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
    .data-card{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:12px 16px}
    .data-card .label{font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
    .data-card .value{font-size:1.4rem;font-weight:800;color:var(--accent)}

    .schema{display:grid;gap:2px}
    .schema-row{display:grid;grid-template-columns:140px 80px 1fr;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.03);font-size:.85rem}
    .schema-row:last-child{border-bottom:none}
    .schema-field{font-family:'JetBrains Mono',monospace;color:var(--text)}

    @media(max-width:600px){
      .data-grid{grid-template-columns:1fr}
      .schema-row{grid-template-columns:100px 70px 1fr}
      .ep-header{flex-wrap:wrap}
    }
  </style>
</head>
<body>
<div class="wrap">
  <nav>
    <a href="/" class="logo">naufal<span>rakha</span></a>
    <div class="nav-links">
      <a href="/docs">Docs</a>
      <a href="/">APIs</a>
      <a href="https://github.com/sternnaufal/api" target="_blank">GitHub</a>
    </div>
  </nav>

  <div class="hero">
    <div class="hero-icon">${icon}</div>
    <div>
      <h1>${title}<span class="hero-tag">v1.0</span></h1>
      <p>${description}</p>
    </div>
  </div>

  ${sections.join('\n\n')}
</div>
</body>
</html>`
}

// ─── /docs/todos ───────────────────────────────────────────────
router.get('/todos', (req, res) => {
  const baseUrl = ''
  const sections = [
    // Stats overview
    `<div class="section">
      <div class="section-title">Overview</div>
      <div class="data-grid">
        <div class="data-card"><div class="label">Base URL</div><div class="value" style="font-size:1rem">/todos</div></div>
        <div class="data-card"><div class="label">Data</div><div class="value">100</div></div>
        <div class="data-card"><div class="label">Endpoints</div><div class="value">5</div></div>
        <div class="data-card"><div class="label">Auth</div><div class="value" style="color:#22c55e">None</div></div>
      </div>
    </div>`,

    // Endpoint: GET /todos
    `<div class="section">
      <div class="section-title">Endpoints</div>

      <div class="endpoint">
        <div class="ep-header">
          <span class="ep-method get">GET</span>
          <span class="ep-path">/todos</span>
        </div>
        <div class="ep-desc">Mendapatkan daftar todos dengan filter, search, dan pagination.</div>
        <table>
          <tr><th>Parameter</th><th>Tipe</th><th>Default</th><th>Deskripsi</th></tr>
          <tr><td class="mono">is_complete</td><td><span class="type">boolean</span></td><td><span class="optional">-</span></td><td>Filter status selesai (<code>true</code> / <code>false</code>)</td></tr>
          <tr><td class="mono">category</td><td><span class="type">string</span></td><td><span class="optional">-</span></td><td>Filter by kategori (case-insensitive)</td></tr>
          <tr><td class="mono">priority</td><td><span class="type">string</span></td><td><span class="optional">-</span></td><td>Filter: <code>Tinggi</code>, <code>Sedang</code>, <code>Rendah</code></td></tr>
          <tr><td class="mono">search</td><td><span class="type">string</span></td><td><span class="optional">-</span></td><td>Partial match pencarian judul</td></tr>
          <tr><td class="mono">page</td><td><span class="type">number</span></td><td><code>1</code></td><td>Nomor halaman</td></tr>
          <tr><td class="mono">limit</td><td><span class="type">number</span></td><td><code>10</code></td><td>Data per halaman</td></tr>
        </table>
        <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /todos?is_complete=false&priority=Tinggi&page=1&limit=5</div>
        <div class="code">{
  <span class="key">"success"</span>: <span class="bool">true</span>,
  <span class="key">"total"</span>: <span class="num">20</span>,
  <span class="key">"page"</span>: <span class="num">1</span>,
  <span class="key">"limit"</span>: <span class="num">5</span>,
  <span class="key">"total_pages"</span>: <span class="num">4</span>,
  <span class="key">"data"</span>: [ ... ]
}</div>
      </div>

      <div class="endpoint">
        <div class="ep-header">
          <span class="ep-method get">GET</span>
          <span class="ep-path">/todos/:id</span>
        </div>
        <div class="ep-desc">Detail satu todo berdasarkan ID.</div>
        <table>
          <tr><th>Parameter</th><th>Tipe</th><th>Wajib</th><th>Deskripsi</th></tr>
          <tr><td class="mono">id</td><td><span class="type">number</span></td><td><span class="required">ya</span></td><td>ID todo (1–100)</td></tr>
        </table>
        <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /todos/1</div>
        <div class="code">{
  <span class="key">"success"</span>: <span class="bool">true</span>,
  <span class="key">"data"</span>: {
    <span class="key">"id"</span>: <span class="num">1</span>,
    <span class="key">"title"</span>: <span class="str">"Menyelesaikan laporan proyek 1"</span>,
    <span class="key">"category"</span>: <span class="str">"Pekerjaan"</span>,
    <span class="key">"priority"</span>: <span class="str">"Tinggi"</span>,
    <span class="key">"is_complete"</span>: <span class="bool">false</span>,
    ...
  }
}</div>
      </div>

      <div class="endpoint">
        <div class="ep-header">
          <span class="ep-method get">GET</span>
          <span class="ep-path">/todos/stats/summary</span>
        </div>
        <div class="ep-desc">Statistik lengkap: total, completed, pending, per kategori, per prioritas, completion rate.</div>
        <div class="code">{
  <span class="key">"success"</span>: <span class="bool">true</span>,
  <span class="key">"data"</span>: {
    <span class="key">"total"</span>: <span class="num">100</span>,
    <span class="key">"completed"</span>: <span class="num">28</span>,
    <span class="key">"pending"</span>: <span class="num">72</span>,
    <span class="key">"by_category"</span>: { <span class="str">"Pekerjaan"</span>: <span class="num">27</span>, ... },
    <span class="key">"by_priority"</span>: { <span class="str">"Tinggi"</span>: <span class="num">20</span>, ... },
    <span class="key">"completion_rate"</span>: <span class="str">"28.00%"</span>
  }
}</div>
      </div>

      <div class="endpoint">
        <div class="ep-header">
          <span class="ep-method get">GET</span>
          <span class="ep-path">/todos/meta/categories</span>
        </div>
        <div class="ep-desc">Daftar semua kategori yang tersedia.</div>
        <div class="code">{ <span class="key">"success"</span>: <span class="bool">true</span>, <span class="key">"data"</span>: [<span class="str">"Pekerjaan"</span>, <span class="str">"Pendidikan"</span>, <span class="str">"Belanja"</span>, ...] }</div>
      </div>

      <div class="endpoint">
        <div class="ep-header">
          <span class="ep-method get">GET</span>
          <span class="ep-path">/todos/meta/priorities</span>
        </div>
        <div class="ep-desc">Daftar semua level prioritas.</div>
        <div class="code">{ <span class="key">"success"</span>: <span class="bool">true</span>, <span class="key">"data"</span>: [<span class="str">"Tinggi"</span>, <span class="str">"Sedang"</span>, <span class="str">"Rendah"</span>] }</div>
      </div>
    </div>`,

    // Data schema
    `<div class="section">
      <div class="section-title">Data Structure — Todo</div>
      <div class="endpoint" style="margin:0">
        <div class="schema">
          <div class="schema-row" style="border-bottom:1px solid var(--border);padding-bottom:8px;margin-bottom:4px">
            <div style="font-weight:600;font-size:.75rem;color:var(--muted);text-transform:uppercase">Field</div>
            <div style="font-weight:600;font-size:.75rem;color:var(--muted);text-transform:uppercase">Tipe</div>
            <div style="font-weight:600;font-size:.75rem;color:var(--muted);text-transform:uppercase">Deskripsi</div>
          </div>
          <div class="schema-row"><div class="schema-field">id</div><div><span class="type">number</span></div><div style="color:var(--muted)">ID unik (1–100)</div></div>
          <div class="schema-row"><div class="schema-field">title</div><div><span class="type">string</span></div><div style="color:var(--muted)">Judul todo</div></div>
          <div class="schema-row"><div class="schema-field">description</div><div><span class="type">string</span></div><div style="color:var(--muted)">Deskripsi detail</div></div>
          <div class="schema-row"><div class="schema-field">is_complete</div><div><span class="type">boolean</span></div><div style="color:var(--muted)">Status selesai</div></div>
          <div class="schema-row"><div class="schema-field">category</div><div><span class="type">string</span></div><div style="color:var(--muted)">Pekerjaan, Pendidikan, Belanja, dll</div></div>
          <div class="schema-row"><div class="schema-field">priority</div><div><span class="type">string</span></div><div style="color:var(--muted)">Tinggi / Sedang / Rendah</div></div>
          <div class="schema-row"><div class="schema-field">due_date</div><div><span class="type">string</span></div><div style="color:var(--muted)">YYYY-MM-DD</div></div>
          <div class="schema-row"><div class="schema-field">created_at</div><div><span class="type">string</span></div><div style="color:var(--muted)">ISO 8601 timestamp</div></div>
          <div class="schema-row"><div class="schema-field">updated_at</div><div><span class="type">string</span></div><div style="color:var(--muted)">ISO 8601 timestamp</div></div>
          <div class="schema-row"><div class="schema-field">estimated_hours</div><div><span class="type">number</span></div><div style="color:var(--muted)">Estimasi jam pengerjaan</div></div>
          <div class="schema-row"><div class="schema-field">tags</div><div><span class="type">array</span></div><div style="color:var(--muted)">Label/tag strings</div></div>
        </div>
      </div>
    </div>`,

    // Categories detail
    `<div class="section">
      <div class="section-title">Available Categories</div>
      <div class="data-grid" style="grid-template-columns:repeat(4,1fr)">
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Pekerjaan</div></div>
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Pendidikan</div></div>
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Belanja</div></div>
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Kesehatan</div></div>
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Pribadi</div></div>
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Keuangan</div></div>
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Perjalanan</div></div>
        <div class="data-card"><div class="label">Kategori</div><div class="value" style="font-size:.9rem">Hobi</div></div>
      </div>
    </div>`
  ]

  res.type('html').send(renderDocs('Todos', '📋', '#22c55e', '/todos',
    '100 todos Indonesia dengan filter, search, pagination, dan statistik.', sections))
})

// ─── /docs/users (placeholder) ────────────────────────────────
router.get('/users', (req, res) => {
  const sections = [
    `<div class="section"><div class="section-title">Overview</div><div class="data-grid">
      <div class="data-card"><div class="label">Base URL</div><div class="value" style="font-size:1rem">/users</div></div>
      <div class="data-card"><div class="label">Data</div><div class="value">53</div></div>
      <div class="data-card"><div class="label">Endpoints</div><div class="value">5</div></div>
      <div class="data-card"><div class="label">Auth</div><div class="value" style="color:#22c55e">None</div></div>
    </div></div>`,
    `<div class="section"><div class="section-title">Endpoints</div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/users</span></div>
      <div class="ep-desc">Daftar users dengan filter role, location, is_active, skill, search, pagination.</div>
      <table><tr><th>Parameter</th><th>Tipe</th><th>Default</th><th>Deskripsi</th></tr>
      <tr><td class="mono">role</td><td><span class="type">string</span></td><td><span class="optional">-</span></td><td>Filter pekerjaan (case-insensitive)</td></tr>
      <tr><td class="mono">location</td><td><span class="type">string</span></td><td><span class="optional">-</span></td><td>Filter kota (case-insensitive)</td></tr>
      <tr><td class="mono">is_active</td><td><span class="type">boolean</span></td><td><span class="optional">-</span></td><td>Filter status aktif</td></tr>
      <tr><td class="mono">skill</td><td><span class="type">string</span></td><td><span class="optional">-</span></td><td>Filter by skill (case-insensitive)</td></tr>
      <tr><td class="mono">search</td><td><span class="type">string</span></td><td><span class="optional">-</span></td><td>Partial match name/username</td></tr>
      <tr><td class="mono">page</td><td><span class="type">number</span></td><td><code>1</code></td><td>Halaman</td></tr>
      <tr><td class="mono">limit</td><td><span class="type">number</span></td><td><code>10</code></td><td>Per halaman</td></tr></table>
      <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /users?role=Frontend%20Developer&location=Jakarta</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/users/:id</span></div><div class="ep-desc">Detail user lengkap by ID.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/users/stats/summary</span></div><div class="ep-desc">Statistik: total, active, by_role, by_location, top_skills.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/users/meta/roles</span></div><div class="ep-desc">Semua role unik.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/users/meta/locations</span></div><div class="ep-desc">Semua lokasi unik.</div></div>
    </div>`
  ]
  res.type('html').send(renderDocs('Users', '👥', '#f59e0b', '/users', '53 user Indonesia — profile, role, skill, dan social links.', sections))
})

// ─── /docs/products ──────────────────────────────────────────
router.get('/products', (req, res) => {
  const sections = [
    `<div class="section"><div class="section-title">Overview</div><div class="data-grid">
      <div class="data-card"><div class="label">Base URL</div><div class="value" style="font-size:1rem">/products</div></div>
      <div class="data-card"><div class="label">Data</div><div class="value">30</div></div>
      <div class="data-card"><div class="label">Endpoints</div><div class="value">4</div></div>
      <div class="data-card"><div class="label">Auth</div><div class="value" style="color:#22c55e">None</div></div>
    </div></div>`,
    `<div class="section"><div class="section-title">Endpoints</div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/products</span></div>
      <div class="ep-desc">Daftar produk dengan filter kategori, harga, rating, search, pagination.</div>
      <table><tr><th>Parameter</th><th>Tipe</th><th>Deskripsi</th></tr>
      <tr><td class="mono">category</td><td><span class="type">string</span></td><td>Filter kategori</td></tr>
      <tr><td class="mono">min_price</td><td><span class="type">number</span></td><td>Harga minimum</td></tr>
      <tr><td class="mono">max_price</td><td><span class="type">number</span></td><td>Harga maksimum</td></tr>
      <tr><td class="mono">min_rating</td><td><span class="type">number</span></td><td>Rating minimum (1-5)</td></tr>
      <tr><td class="mono">search</td><td><span class="type">string</span></td><td>Pencarian nama produk</td></tr>
      <tr><td class="mono">page</td><td><span class="type">number</span></td><td>Halaman</td></tr>
      <tr><td class="mono">limit</td><td><span class="type">number</span></td><td>Per halaman</td></tr></table>
      <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /products?category=Elektronik&max_price=10000000</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/products/stats/summary</span></div><div class="ep-desc">Statistik: by_category, avg_price, avg_rating, in/out of stock.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/products/meta/categories</span></div><div class="ep-desc">Semua kategori produk.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/products/:id</span></div><div class="ep-desc">Detail produk by ID.</div></div>
    </div>`
  ]
  res.type('html').send(renderDocs('Products', '🛍️', '#ec4899', '/products', '30 produk dengan filter harga, rating, kategori, dan stock.', sections))
})

// ─── /docs/books ─────────────────────────────────────────────
router.get('/books', (req, res) => {
  const sections = [
    `<div class="section"><div class="section-title">Overview</div><div class="data-grid">
      <div class="data-card"><div class="label">Base URL</div><div class="value" style="font-size:1rem">/books</div></div>
      <div class="data-card"><div class="label">Data</div><div class="value">25</div></div>
      <div class="data-card"><div class="label">Endpoints</div><div class="value">5</div></div>
      <div class="data-card"><div class="label">Auth</div><div class="value" style="color:#22c55e">None</div></div>
    </div></div>`,
    `<div class="section"><div class="section-title">Endpoints</div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/books</span></div>
      <div class="ep-desc">Daftar buku dengan filter genre, author, rating, bahasa, search.</div>
      <table><tr><th>Parameter</th><th>Tipe</th><th>Deskripsi</th></tr>
      <tr><td class="mono">genre</td><td><span class="type">string</span></td><td>Programming, Self-Help, Fiksi, Bisnis, Sains</td></tr>
      <tr><td class="mono">author</td><td><span class="type">string</span></td><td>Filter by author</td></tr>
      <tr><td class="mono">min_rating</td><td><span class="type">number</span></td><td>Rating minimal</td></tr>
      <tr><td class="mono">language</td><td><span class="type">string</span></td><td>Indonesia / Inggris</td></tr>
      <tr><td class="mono">search</td><td><span class="type">string</span></td><td>Pencarian judul buku</td></tr>
      <tr><td class="mono">page</td><td><span class="type">number</span></td><td>Halaman</td></tr>
      <tr><td class="mono">limit</td><td><span class="type">number</span></td><td>Per halaman</td></tr></table>
      <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /books?genre=Programming&min_rating=4</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/books/stats/summary</span></div><div class="ep-desc">Statistik: by_genre, avg_rating, total_pages.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/books/meta/genres</span></div><div class="ep-desc">Semua genre unik.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/books/meta/authors</span></div><div class="ep-desc">Semua author unik.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/books/:id</span></div><div class="ep-desc">Detail buku by ID.</div></div>
    </div>`
  ]
  res.type('html').send(renderDocs('Books', '📚', '#a855f7', '/books', '25 buku — programming, self-help, fiksi, bisnis, sains.', sections))
})

// ─── /docs/quotes ────────────────────────────────────────────
router.get('/quotes', (req, res) => {
  const sections = [
    `<div class="section"><div class="section-title">Overview</div><div class="data-grid">
      <div class="data-card"><div class="label">Base URL</div><div class="value" style="font-size:1rem">/quotes</div></div>
      <div class="data-card"><div class="label">Data</div><div class="value">30</div></div>
      <div class="data-card"><div class="label">Endpoints</div><div class="value">6</div></div>
      <div class="data-card"><div class="label">Auth</div><div class="value" style="color:#22c55e">None</div></div>
    </div></div>`,
    `<div class="section"><div class="section-title">Endpoints</div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/quotes</span></div>
      <div class="ep-desc">Daftar quotes dengan filter kategori, author, search.</div>
      <table><tr><th>Parameter</th><th>Tipe</th><th>Deskripsi</th></tr>
      <tr><td class="mono">category</td><td><span class="type">string</span></td><td>Motivasi, Teknologi, Kehidupan, Cinta, Lucu, Programming, Pendidikan</td></tr>
      <tr><td class="mono">author</td><td><span class="type">string</span></td><td>Filter by author</td></tr>
      <tr><td class="mono">search</td><td><span class="type">string</span></td><td>Pencarian teks quote</td></tr>
      <tr><td class="mono">page</td><td><span class="type">number</span></td><td>Halaman</td></tr>
      <tr><td class="mono">limit</td><td><span class="type">number</span></td><td>Per halaman</td></tr></table>
      <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /quotes?category=Programming</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/quotes/random</span></div><div class="ep-desc">Quote acak. Opsional filter ?category=.</div>
      <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /quotes/random?category=Motivasi</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/quotes/stats/summary</span></div><div class="ep-desc">Statistik: by_category, unique authors.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/quotes/meta/categories</span></div><div class="ep-desc">Semua kategori quotes.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/quotes/meta/authors</span></div><div class="ep-desc">Semua author quotes.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/quotes/:id</span></div><div class="ep-desc">Detail quote by ID.</div></div>
    </div>`
  ]
  res.type('html').send(renderDocs('Quotes', '💬', '#22c55e', '/quotes', '30 kutipan — motivasi, teknologi, cinta, lucu, programming.', sections))
})

// ─── /docs/countries ─────────────────────────────────────────
router.get('/countries', (req, res) => {
  const sections = [
    `<div class="section"><div class="section-title">Overview</div><div class="data-grid">
      <div class="data-card"><div class="label">Base URL</div><div class="value" style="font-size:1rem">/countries</div></div>
      <div class="data-card"><div class="label">Data</div><div class="value">25</div></div>
      <div class="data-card"><div class="label">Endpoints</div><div class="value">5</div></div>
      <div class="data-card"><div class="label">Auth</div><div class="value" style="color:#22c55e">None</div></div>
    </div></div>`,
    `<div class="section"><div class="section-title">Endpoints</div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/countries</span></div>
      <div class="ep-desc">Daftar negara dengan filter continent, language, search.</div>
      <table><tr><th>Parameter</th><th>Tipe</th><th>Deskripsi</th></tr>
      <tr><td class="mono">continent</td><td><span class="type">string</span></td><td>Asia, Eropa, Afrika, Amerika, Oseania</td></tr>
      <tr><td class="mono">language</td><td><span class="type">string</span></td><td>Filter by bahasa (case-insensitive)</td></tr>
      <tr><td class="mono">search</td><td><span class="type">string</span></td><td>Pencarian nama negara</td></tr>
      <tr><td class="mono">page</td><td><span class="type">number</span></td><td>Halaman</td></tr>
      <tr><td class="mono">limit</td><td><span class="type">number</span></td><td>Per halaman</td></tr></table>
      <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /countries?continent=Asia</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/countries/stats/summary</span></div><div class="ep-desc">Statistik: by_continent, total_population, total_currency_count.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/countries/meta/continents</span></div><div class="ep-desc">Semua benua unik.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/countries/meta/languages</span></div><div class="ep-desc">Semua bahasa unik.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/countries/:id</span></div><div class="ep-desc">Detail negara by ID.</div></div>
    </div>`
  ]
  res.type('html').send(renderDocs('Countries', '🌍', '#06b6d4', '/countries', '25 negara — population, capital, currencies, languages.', sections))
})

// ─── /docs/jokes ─────────────────────────────────────────────
router.get('/jokes', (req, res) => {
  const sections = [
    `<div class="section"><div class="section-title">Overview</div><div class="data-grid">
      <div class="data-card"><div class="label">Base URL</div><div class="value" style="font-size:1rem">/jokes</div></div>
      <div class="data-card"><div class="label">Data</div><div class="value">25</div></div>
      <div class="data-card"><div class="label">Endpoints</div><div class="value">5</div></div>
      <div class="data-card"><div class="label">Auth</div><div class="value" style="color:#22c55e">None</div></div>
    </div></div>`,
    `<div class="section"><div class="section-title">Endpoints</div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/jokes</span></div>
      <div class="ep-desc">Daftar jokes dengan filter kategori, rating, search.</div>
      <table><tr><th>Parameter</th><th>Tipe</th><th>Deskripsi</th></tr>
      <tr><td class="mono">category</td><td><span class="type">string</span></td><td>Programming, Puns, Dad Jokes, Teknologi, Lucu, Coding</td></tr>
      <tr><td class="mono">min_rating</td><td><span class="type">number</span></td><td>Rating minimum</td></tr>
      <tr><td class="mono">search</td><td><span class="type">string</span></td><td>Pencarian teks joke</td></tr>
      <tr><td class="mono">page</td><td><span class="type">number</span></td><td>Halaman</td></tr>
      <tr><td class="mono">limit</td><td><span class="type">number</span></td><td>Per halaman</td></tr></table>
      <div class="code"><span class="code-label">Example</span><span class="method">GET</span> /jokes?category=Programming</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/jokes/random</span></div><div class="ep-desc">Joke acak.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/jokes/stats/summary</span></div><div class="ep-desc">Statistik: by_category, avg_rating, top_rated.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/jokes/meta/categories</span></div><div class="ep-desc">Semua kategori jokes.</div></div>
      <div class="endpoint"><div class="ep-header"><span class="ep-method get">GET</span><span class="ep-path">/jokes/:id</span></div><div class="ep-desc">Detail joke by ID.</div></div>
    </div>`
  ]
  res.type('html').send(renderDocs('Jokes', '😂', '#f59e0b', '/jokes', '25 jokes — programming, puns, dad jokes, lucu Indonesia.', sections))
})

// ─── Docs index ────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>API Docs • Naufal API Hub</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>"/>
  <style>
    :root{--bg:#0a0a0f;--card:#12121a;--border:#1e1e2e;--text:#e4e4e7;--muted:#71717a;--accent:#6366f1;--accent2:#a855f7}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text)}
    body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(99,102,241,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0}
    .wrap{max-width:700px;margin:0 auto;padding:0 20px;position:relative;z-index:1}
    nav{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:1px solid var(--border)}
    .logo{font-size:1.1rem;font-weight:700;color:var(--text);text-decoration:none}
    .logo span{color:var(--accent)}
    .nav-links{display:flex;gap:20px}
    .nav-links a{color:var(--muted);text-decoration:none;font-size:.85rem;transition:color .2s}
    .nav-links a:hover{color:var(--text)}
    h1{font-size:2rem;font-weight:800;letter-spacing:-1px;padding:48px 0 8px}
    .sub{color:var(--muted);font-size:.95rem;margin-bottom:40px}
    .card{display:flex;align-items:center;gap:16px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin-bottom:12px;text-decoration:none;color:inherit;transition:all .2s}
    .card:hover{border-color:var(--accent);transform:translateY(-1px)}
    .card-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0}
    .card-info{flex:1}
    .card-name{font-weight:600;font-size:1rem;margin-bottom:2px}
    .card-desc{font-size:.85rem;color:var(--muted)}
    .card-tag{font-family:'JetBrains Mono',monospace;font-size:.75rem;padding:4px 10px;border-radius:6px;background:rgba(99,102,241,.1);color:var(--accent);white-space:nowrap}
    .icon-green{background:rgba(34,197,94,.1);color:#22c55e}
    .icon-orange{background:rgba(245,158,11,.1);color:#f59e0b}
    .icon-pink{background:rgba(236,72,153,.1);color:#ec4899}
    .icon-purple{background:rgba(168,85,247,.1);color:#a855f7}
    .icon-cyan{background:rgba(6,182,212,.1);color:#06b6d4}
    footer{border-top:1px solid var(--border);padding:32px 0;text-align:center;color:var(--muted);font-size:.8rem}
    footer a{color:var(--accent);text-decoration:none}
  </style>
</head>
<body>
<div class="wrap">
  <nav>
    <a href="/" class="logo">naufal<span>rakha</span></a>
    <div class="nav-links">
      <a href="/docs">Docs</a>
      <a href="/">APIs</a>
      <a href="https://github.com/sternnaufal/api" target="_blank">GitHub</a>
    </div>
  </nav>
  <h1>API Documentation</h1>
  <p class="sub">Endpoint list, query parameters, response structure, dan contoh request.</p>

  <a href="/docs/todos" class="card">
    <div class="card-icon icon-green">📋</div>
    <div class="card-info">
      <div class="card-name">Todos</div>
      <div class="card-desc">100 todos — filter, search, pagination, stats</div>
    </div>
    <span class="card-tag">/todos</span>
  </a>

  <a href="/docs/users" class="card">
    <div class="card-icon icon-orange">👥</div>
    <div class="card-info">
      <div class="card-name">Users</div>
      <div class="card-desc">53 users — profile, role, skill, social</div>
    </div>
    <span class="card-tag">/users</span>
  </a>

  <a href="/docs/products" class="card">
    <div class="card-icon icon-pink">🛍️</div>
    <div class="card-info">
      <div class="card-name">Products</div>
      <div class="card-desc">30 produk — filter kategori, harga, rating</div>
    </div>
    <span class="card-tag">/products</span>
  </a>

  <a href="/docs/books" class="card">
    <div class="card-icon icon-purple">📚</div>
    <div class="card-info">
      <div class="card-name">Books</div>
      <div class="card-desc">25 buku — programming, fiksi, bisnis, sains</div>
    </div>
    <span class="card-tag">/books</span>
  </a>

  <a href="/docs/quotes" class="card">
    <div class="card-icon icon-green">💬</div>
    <div class="card-info">
      <div class="card-name">Quotes</div>
      <div class="card-desc">30 quotes — motivasi, teknologi, cinta, lucu</div>
    </div>
    <span class="card-tag">/quotes</span>
  </a>

  <a href="/docs/countries" class="card">
    <div class="card-icon icon-cyan">🌍</div>
    <div class="card-info">
      <div class="card-name">Countries</div>
      <div class="card-desc">25 negara — population, capital, languages</div>
    </div>
    <span class="card-tag">/countries</span>
  </a>

  <a href="/docs/jokes" class="card">
    <div class="card-icon icon-orange">😂</div>
    <div class="card-info">
      <div class="card-name">Jokes</div>
      <div class="card-desc">25 jokes — programming, puns, dad jokes</div>
    </div>
    <span class="card-tag">/jokes</span>
  </a>

  <footer>
    Dibuat oleh <a href="https://github.com/sternnaufal">Naufal Rakha Putra</a> &middot; 2026
  </footer>
</div>
</body>
</html>`)
})

export default router
