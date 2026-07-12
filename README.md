# Naufal Rakha API Hub

REST API playground pribadi — 7 API tematik dengan dummy data Indonesia, filter, pagination, dan statistik. Dibangun dengan Express.js, di-deploy di Vercel.

**Deploy URL:** [https://api-jazbh3cif-sternnaufals-projects.vercel.app](https://api-jazbh3cif-sternnaufals-projects.vercel.app)  
**Dokumentasi:** `/docs`

---

## API List

| API | Data | Endpoint | Docs |
|-----|------|----------|------|
| 📋 **Todos** | 100 todos | `/todos` | `/docs/todos` |
| 👥 **Users** | 53 user | `/users` | `/docs/users` |
| 🛍️ **Products** | 30 produk | `/products` | `/docs/products` |
| 📚 **Books** | 25 buku | `/books` | `/docs/books` |
| 💬 **Quotes** | 30 kutipan | `/quotes` | `/docs/quotes` |
| 🌍 **Countries** | 25 negara | `/countries` | `/docs/countries` |
| 😂 **Jokes** | 25 jokes | `/jokes` | `/docs/jokes` |

Semua endpoint mendukung filter, search, pagination (`page` & `limit`), dan statistik (`/stats/summary`).

---

## Struktur Project

```
api/
├── src/
│   ├── index.js            # Entry point (Express)
│   ├── data/               # Data JSON (7 file)
│   │   ├── todos.json
│   │   ├── users.json
│   │   ├── products.json
│   │   ├── books.json
│   │   ├── quotes.json
│   │   ├── countries.json
│   │   └── jokes.json
│   └── routes/             # Express Router per API
│       ├── todos.js
│       ├── users.js
│       ├── products.js
│       ├── books.js
│       ├── quotes.js
│       ├── countries.js
│       ├── jokes.js
│       └── docs.js
├── public/                 # Static assets
├── components/             # About page
├── vercel.json             # Vercel config
└── package.json
```

Setiap router mengikuti pola yang sama:
- `GET /` — list + filter + pagination
- `GET /:id` — detail (wajib setelah route spesifik)
- `GET /stats/summary` — statistik
- `GET /meta/...` — metadata

---

## Mulai Cepat

```bash
git clone https://github.com/sternnaufal/api.git
cd api
npm install
npm start
```

Buka `http://localhost:3000` atau langsung coba:

```bash
curl http://localhost:3000/healthz
curl http://localhost:3000/quotes/random
curl http://localhost:3000/products?max_price=50000
curl http://localhost:3000/users?role=Frontend%20Developer
curl http://localhost:3000/countries?continent=Asia
```

---

## Deploy ke Vercel

```bash
npx vercel --prod
```

Atau import dari GitHub di [vercel.com](https://vercel.com).

---

## SEO & Robots

| Route | Fungsi |
|-------|--------|
| `/robots.txt` | Allow all + sitemap |
| `/sitemap.xml` | 17 URL endpoints |
| `/docs` | Index dokumentasi |
| `/docs/:api` | Detail dokumentasi per API |

Landing page dilengkapi meta tags, Open Graph, Twitter Card, dan JSON-LD structured data.

---

## Tech Stack

- **Runtime:** Node.js 24
- **Framework:** Express.js 4
- **Deploy:** Vercel (`@vercel/node`)
- **Dependencies:** express, @types/express (dev)

---

## Author

**Naufal Rakha Putra**

- 🌐 [naufalrakha.my.id](https://naufalrakha.my.id)
- 🐙 [@sternnaufal](https://github.com/sternnaufal)
- 📧 naufalrakha2712@gmail.com

---

© 2026 Naufal Rakha Putra
