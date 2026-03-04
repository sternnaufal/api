# 📋 Dokumentasi API Todos

API RESTful untuk manajemen todos yang dibangun dengan Express.js dan dioptimalkan untuk deployment di Vercel.

**Base URL (Local):** `http://localhost:3000`  
**Base URL (Production):** `https://api-three-self-56.vercel.app/`

## 📚 Daftar Isi
- [Endpoint List](#-endpoint-list)
- [Detail Endpoint](#-detail-endpoint)
- [Struktur Data](#-struktur-data)
- [Cara Install](#-cara-install--menjalankan)
- [Deploy ke Vercel](#-deploy-ke-vercel)
- [Struktur Project](#-struktur-project)
- [Kontak](#-kontak--support)

---

## 📌 Endpoint List

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/todos` | Mendapatkan semua todos dengan filter & pagination |
| GET | `/todos/:id` | Mendapatkan detail todo berdasarkan ID |
| GET | `/todos/stats/summary` | Mendapatkan statistik lengkap todos |
| GET | `/todos/meta/categories` | Mendapatkan daftar semua kategori |
| GET | `/todos/meta/priorities` | Mendapatkan daftar semua prioritas |
| GET | `/healthz` | Health check API |

---

## 🔍 Detail Endpoint

### 1. GET All Todos
Mendapatkan daftar todos dengan berbagai opsi filter dan pagination.

**Endpoint:** `GET /todos`

#### Query Parameters

| Parameter | Tipe | Deskripsi | Contoh |
|-----------|------|-----------|--------|
| `is_complete` | boolean | Filter berdasarkan status selesai | `true` / `false` |
| `category` | string | Filter berdasarkan kategori | `Pekerjaan` |
| `priority` | string | Filter berdasarkan prioritas | `Tinggi` |
| `search` | string | Cari berdasarkan judul | `laporan` |
| `page` | number | Halaman (default: 1) | `2` |
| `limit` | number | Data per halaman (default: 10) | `5` |

#### Contoh Request
```bash
# Semua todos (default page=1, limit=10)
GET /todos

# Filter todos yang belum selesai
GET /todos?is_complete=false

# Filter berdasarkan kategori Pekerjaan
GET /todos?category=Pekerjaan

# Filter prioritas Tinggi
GET /todos?priority=Tinggi

# Pencarian judul
GET /todos?search=laporan

# Kombinasi filter + pagination
GET /todos?is_complete=false&category=Pekerjaan&page=2&limit=5
```

#### Response Sukses (200 OK)
```json
{
  "success": true,
  "total": 45,
  "page": 1,
  "limit": 10,
  "total_pages": 5,
  "data": [
    {
      "id": 1,
      "title": "Menyelesaikan laporan proyek",
      "description": "Menyelesaikan laporan bulanan untuk klien",
      "is_complete": false,
      "category": "Pekerjaan",
      "priority": "Tinggi",
      "due_date": "2026-03-10",
      "created_at": "2026-03-01T08:00:00.000Z",
      "updated_at": "2026-03-04T10:30:00.000Z",
      "estimated_hours": 4,
      "tags": ["penting", "proyek"]
    }
  ]
}
```

---

### 2. GET Todo by ID
Mendapatkan detail todo berdasarkan ID.

**Endpoint:** `GET /todos/:id`

#### Contoh Request
```bash
GET /todos/1
```

#### Response Sukses (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Menyelesaikan laporan proyek",
    "description": "Menyelesaikan laporan bulanan untuk klien",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-10",
    "created_at": "2026-03-01T08:00:00.000Z",
    "updated_at": "2026-03-04T10:30:00.000Z",
    "estimated_hours": 4,
    "tags": ["penting", "proyek"]
  }
}
```

#### Response Error (404 Not Found)
```json
{
  "success": false,
  "message": "Todo tidak ditemukan"
}
```

---

### 3. GET Todos Statistics
Mendapatkan statistik lengkap tentang todos.

**Endpoint:** `GET /todos/stats/summary`

#### Contoh Request
```bash
GET /todos/stats/summary
```

#### Response Sukses (200 OK)
```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 4,
    "pending": 6,
    "by_category": {
      "Pekerjaan": 3,
      "Pendidikan": 3,
      "Belanja": 1,
      "Kesehatan": 1,
      "Pribadi": 1,
      "Keuangan": 1
    },
    "by_priority": {
      "Tinggi": 4,
      "Sedang": 3,
      "Rendah": 3
    },
    "completion_rate": "40.00%"
  }
}
```

---

### 4. GET Categories
Mendapatkan daftar semua kategori yang tersedia.

**Endpoint:** `GET /todos/meta/categories`

#### Contoh Request
```bash
GET /todos/meta/categories
```

#### Response Sukses (200 OK)
```json
{
  "success": true,
  "data": [
    "Pekerjaan",
    "Pendidikan",
    "Belanja",
    "Kesehatan",
    "Pribadi",
    "Keuangan"
  ]
}
```

---

### 5. GET Priorities
Mendapatkan daftar semua prioritas yang tersedia.

**Endpoint:** `GET /todos/meta/priorities`

#### Contoh Request
```bash
GET /todos/meta/priorities
```

#### Response Sukses (200 OK)
```json
{
  "success": true,
  "data": [
    "Tinggi",
    "Sedang",
    "Rendah"
  ]
}
```

---

### 6. Health Check
Memeriksa status API.

**Endpoint:** `GET /healthz`

#### Contoh Request
```bash
GET /healthz
```

#### Response Sukses (200 OK)
```json
{
  "status": "ok",
  "timestamp": "2026-03-04T12:34:56.789Z"
}
```

---

## 📊 Struktur Data Todo

| Field | Tipe | Deskripsi | Contoh |
|-------|------|-----------|--------|
| `id` | number | ID unik todo | 1 |
| `title` | string | Judul todo | "Menyelesaikan laporan" |
| `description` | string | Deskripsi detail | "Laporan bulanan klien" |
| `is_complete` | boolean | Status selesai | true / false |
| `category` | string | Kategori | "Pekerjaan" |
| `priority` | string | Prioritas | "Tinggi" / "Sedang" / "Rendah" |
| `due_date` | string | Tenggat waktu (YYYY-MM-DD) | "2026-03-10" |
| `created_at` | string | Waktu dibuat (ISO) | "2026-03-01T08:00:00.000Z" |
| `updated_at` | string | Waktu diupdate (ISO) | "2026-03-04T10:30:00.000Z" |
| `estimated_hours` | number | Estimasi jam | 4 |
| `tags` | array | Label/tags | ["penting", "proyek"] |

---

## ⚙️ Cara Install & Menjalankan

### Prasyarat
- Node.js (v14 atau lebih baru)
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
```bash
git clone https://github.com/username/express-vercel-app.git
cd express-vercel-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan di local**
```bash
npm start
```

4. **Buka di browser**
```
http://localhost:3000
```

### Testing dengan cURL
```bash
# Get all todos
curl http://localhost:3000/todos

# Filter pending todos prioritas Tinggi
curl "http://localhost:3000/todos?is_complete=false&priority=Tinggi"

# Search todos
curl "http://localhost:3000/todos?search=belajar"

# Get todo by ID
curl http://localhost:3000/todos/5

# Get statistics
curl http://localhost:3000/todos/stats/summary
```

---

## 🚀 Deploy ke Vercel

### Metode 1: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Metode 2: Via GitHub
1. Push code ke repository GitHub
2. Kunjungi [vercel.com](https://vercel.com)
3. Import project dari GitHub
4. Deploy otomatis akan berjalan

### Konfigurasi Vercel (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

---

## 📁 Struktur Project

```
express-vercel-app/
├── api/
│   └── index.js          # File utama API
├── data/
│   └── todos.json        # Data todos (opsional)
├── components/
│   └── about.html        # Halaman about
├── public/
│   ├── style.css         # File styling
│   └── logo.png          # Gambar logo
├── package.json          # Dependencies
├── vercel.json           # Konfigurasi Vercel
└── README.md             # Dokumentasi
```

---

## ⚠️ Catatan Penting

1. **Pagination:** Default `page=1` dan `limit=10`
2. **Case Insensitive:** Filter tidak membedakan huruf besar/kecil
3. **Search:** Mencocokkan sebagian judul (partial match)
4. **Data Statis:** API ini bersifat read-only (demo)
5. **ID Unique:** Setiap todo memiliki ID unik
6. **Production:** Ganti base URL dengan domain Vercel kamu

---

## 📞 Kontak & Support

**Naufal Rakha Putra**

- 📧 Email: naufalrakha2712@gmail.com
- 🐙 GitHub: [@sternnaufal](https://github.com/sternnaufal)
- 🌐 Website: [naufalrakha.my.id](https://naufalrakha.my.id)

**Link Repository:** [github.com/sternnaufal/api](https://github.com/sternnaufal/api)

---

**Dibuat dengan ❤️ menggunakan Express.js & Vercel**

© 2026 Naufal Rakha Putra. All Rights Reserved.
