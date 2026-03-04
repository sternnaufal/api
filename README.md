# 📋 API Todos Documentation

Base URL: `http://localhost:3000` (atau domain Vercel kamu)

## 📚 Daftar Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/todos` | Mendapatkan semua todos (dengan filter & pagination) |
| GET | `/todos/:id` | Mendapatkan todo berdasarkan ID |
| GET | `/todos/stats/summary` | Mendapatkan statistik todos |
| GET | `/todos/meta/categories` | Mendapatkan daftar kategori |
| GET | `/todos/meta/priorities` | Mendapatkan daftar prioritas |
| GET | `/healthz` | Health check API |

---

## 1. GET All Todos

Mendapatkan daftar todos dengan berbagai opsi filter dan pagination.

**Endpoint:** `GET /todos`

### Query Parameters (Opsional)

| Parameter | Tipe | Deskripsi | Contoh |
|-----------|------|-----------|--------|
| `is_complete` | boolean | Filter berdasarkan status selesai | `true` atau `false` |
| `category` | string | Filter berdasarkan kategori | `Pekerjaan` |
| `priority` | string | Filter berdasarkan prioritas | `Tinggi` |
| `search` | string | Cari berdasarkan judul | `laporan` |
| `page` | number | Halaman (default: 1) | `2` |
| `limit` | number | Jumlah data per halaman (default: 10) | `5` |

### Contoh Request

```bash
# Get all todos (default page 1, limit 10)
GET /todos

# Filter by completion status
GET /todos?is_complete=false

# Filter by category
GET /todos?category=Pekerjaan

# Filter by priority
GET /todos?priority=Tinggi

# Search by title
GET /todos?search=laporan

# Kombinasi filter + pagination
GET /todos?is_complete=false&category=Pekerjaan&priority=Tinggi&page=2&limit=5
```

### Response Sukses (200 OK)

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
      "title": "Menyelesaikan laporan proyek 1",
      "description": "Menyelesaikan laporan bulanan untuk klien",
      "is_complete": false,
      "category": "Pekerjaan",
      "priority": "Tinggi",
      "due_date": "2026-03-10",
      "created_at": "2026-03-01T08:00:00.000Z",
      "updated_at": "2026-03-04T10:30:00.000Z",
      "estimated_hours": 4,
      "tags": ["penting", "proyek"]
    },
    {
      "id": 2,
      "title": "Belajar Express.js 2",
      "description": "Mempelajari routing dan middleware Express",
      "is_complete": true,
      "category": "Pendidikan",
      "priority": "Sedang",
      "due_date": "2026-03-05",
      "created_at": "2026-02-28T10:00:00.000Z",
      "updated_at": "2026-03-03T15:20:00.000Z",
      "estimated_hours": 2,
      "tags": ["penting", "coding"]
    }
  ]
}
```

---

## 2. GET Todo by ID

Mendapatkan detail todo berdasarkan ID.

**Endpoint:** `GET /todos/:id`

### Contoh Request

```bash
GET /todos/1
```

### Response Sukses (200 OK)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Menyelesaikan laporan proyek 1",
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

### Response Error (404 Not Found)

```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

## 3. GET Todos Statistics

Mendapatkan statistik lengkap tentang todos.

**Endpoint:** `GET /todos/stats/summary`

### Contoh Request

```bash
GET /todos/stats/summary
```

### Response Sukses (200 OK)

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

## 4. GET Unique Categories

Mendapatkan daftar semua kategori yang tersedia.

**Endpoint:** `GET /todos/meta/categories`

### Contoh Request

```bash
GET /todos/meta/categories
```

### Response Sukses (200 OK)

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

## 5. GET Unique Priorities

Mendapatkan daftar semua prioritas yang tersedia.

**Endpoint:** `GET /todos/meta/priorities`

### Contoh Request

```bash
GET /todos/meta/priorities
```

### Response Sukses (200 OK)

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

## 6. Health Check

Memeriksa status API.

**Endpoint:** `GET /healthz`

### Contoh Request

```bash
GET /healthz
```

### Response Sukses (200 OK)

```json
{
  "status": "ok",
  "timestamp": "2026-03-04T12:34:56.789Z"
}
```

---

## 🔍 Contoh Penggunaan dengan cURL

```bash
# Get all todos
curl http://localhost:3000/todos

# Get pending todos with high priority
curl "http://localhost:3000/todos?is_complete=false&priority=Tinggi"

# Search todos with keyword "belajar"
curl "http://localhost:3000/todos?search=belajar"

# Get todo by ID
curl http://localhost:3000/todos/5

# Get statistics
curl http://localhost:3000/todos/stats/summary

# Get categories list
curl http://localhost:3000/todos/meta/categories
```

---

## 📝 Struktur Data Todo

| Field | Tipe | Deskripsi | Contoh |
|-------|------|-----------|--------|
| `id` | number | ID unik todo | 1 |
| `title` | string | Judul todo | "Menyelesaikan laporan" |
| `description` | string | Deskripsi detail | "Laporan bulanan klien" |
| `is_complete` | boolean | Status selesai | true / false |
| `category` | string | Kategori | "Pekerjaan" |
| `priority` | string | Prioritas | "Tinggi", "Sedang", "Rendah" |
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

### Deploy ke Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

Atau deploy langsung dari GitHub:
- Push code ke GitHub
- Import project di [vercel.com](https://vercel.com)
- Deploy otomatis akan jalan

---

## 📁 Struktur Project

```
express-vercel-app/
├── api/
│   └── index.js          # Main API file
├── data/
│   └── todos.json        # Data todos (optional)
├── components/
│   └── about.htm         # About page
├── public/
│   ├── style.css         # Stylesheet
│   └── logo.png          # Logo image
├── package.json          # Dependencies
├── vercel.json           # Vercel config
└── README.md             # Dokumentasi
```

---

## ⚠️ Catatan Penting

1. **Pagination:** Default `page=1` dan `limit=10`
2. **Filter bersifat case-insensitive** (Pekerjaan = pekerjaan)
3. **Search** mencari berdasarkan judul (partial match)
4. **ID bersifat unique** dan tidak berubah
5. **Data bersifat statis** (read-only, tidak bisa di-create/update/delete)
6. **Untuk production**, ganti `http://localhost:3000` dengan domain Vercel kamu

---

## 📞 Kontak & Support

Jika ada pertanyaan atau masalah, silakan hubungi:
- Email: your-email@example.com
- GitHub: [https://github.com/username/express-vercel-app](https://github.com/username/express-vercel-app)
- Issues: [https://github.com/username/express-vercel-app/issues](https://github.com/username/express-vercel-app/issues)

---

**Selamat mencoba!** 🚀

Dibuat dengan ❤️ menggunakan Express.js dan Vercel
