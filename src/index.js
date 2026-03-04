import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const todos = [
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
  },
  {
    "id": 3,
    "title": "Membeli bahan makanan 3",
    "description": "Beli beras, sayur, dan lauk pauk",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Sedang",
    "due_date": "2026-03-06",
    "created_at": "2026-03-02T07:30:00.000Z",
    "updated_at": "2026-03-04T09:15:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 4,
    "title": "Olahraga pagi 4",
    "description": "Jogging selama 30 menit",
    "is_complete": true,
    "category": "Kesehatan",
    "priority": "Rendah",
    "due_date": "2026-03-04",
    "created_at": "2026-03-03T05:00:00.000Z",
    "updated_at": "2026-03-04T06:30:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 5,
    "title": "Membaca buku 5",
    "description": "Baca buku Clean Code bab 3-4",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Sedang",
    "due_date": "2026-03-08",
    "created_at": "2026-03-01T20:00:00.000Z",
    "updated_at": "2026-03-04T11:00:00.000Z",
    "estimated_hours": 3,
    "tags": ["penting", "proyek"]
  },
  {
    "id": 6,
    "title": "Meeting dengan tim 6",
    "description": "Sprint planning untuk minggu depan",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-07",
    "created_at": "2026-03-02T09:00:00.000Z",
    "updated_at": "2026-03-04T08:45:00.000Z",
    "estimated_hours": 2,
    "tags": ["penting", "mendesak"]
  },
  {
    "id": 7,
    "title": "Mengerjakan tugas kuliah 7",
    "description": "Tugas akhir semester",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Tinggi",
    "due_date": "2026-03-15",
    "created_at": "2026-02-25T14:00:00.000Z",
    "updated_at": "2026-03-04T13:20:00.000Z",
    "estimated_hours": 8,
    "tags": ["penting", "mendesak", "proyek"]
  },
  {
    "id": 8,
    "title": "Membersihkan rumah 8",
    "description": "Vacuum dan pel lantai",
    "is_complete": true,
    "category": "Pribadi",
    "priority": "Rendah",
    "due_date": "2026-03-03",
    "created_at": "2026-03-02T10:00:00.000Z",
    "updated_at": "2026-03-03T16:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  },
  {
    "id": 9,
    "title": "Membayar tagihan 9",
    "description": "Tagihan listrik dan internet",
    "is_complete": false,
    "category": "Keuangan",
    "priority": "Tinggi",
    "due_date": "2026-03-09",
    "created_at": "2026-03-01T11:30:00.000Z",
    "updated_at": "2026-03-04T12:00:00.000Z",
    "estimated_hours": 1,
    "tags": ["penting"]
  },
  {
    "id": 10,
    "title": "Membalas email 10",
    "description": "Balas email dari klien dan rekan kerja",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T08:00:00.000Z",
    "updated_at": "2026-03-04T10:00:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 11,
    "title": "Membuat kopi 11",
    "description": "Beli kopi robusta dan seduh untuk meeting",
    "is_complete": true,
    "category": "Pribadi",
    "priority": "Rendah",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T07:00:00.000Z",
    "updated_at": "2026-03-04T08:30:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 12,
    "title": "Menyiram tanaman 12",
    "description": "Siram tanaman hias di halaman dan dalam rumah",
    "is_complete": false,
    "category": "Pribadi",
    "priority": "Rendah",
    "due_date": "2026-03-05",
    "created_at": "2026-03-04T09:00:00.000Z",
    "updated_at": "2026-03-04T09:15:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 13,
    "title": "Mencuci mobil 13",
    "description": "Cuci mobil di tempat cuci langganan",
    "is_complete": false,
    "category": "Pribadi",
    "priority": "Rendah",
    "due_date": "2026-03-07",
    "created_at": "2026-03-03T14:00:00.000Z",
    "updated_at": "2026-03-04T10:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  },
  {
    "id": 14,
    "title": "Membeli kado ulang tahun 14",
    "description": "Beli kado untuk teman yang ultah minggu depan",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Sedang",
    "due_date": "2026-03-08",
    "created_at": "2026-03-02T16:30:00.000Z",
    "updated_at": "2026-03-04T11:45:00.000Z",
    "estimated_hours": 2,
    "tags": ["penting"]
  },
  {
    "id": 15,
    "title": "Membuat rencana liburan 15",
    "description": "Rencanakan liburan ke Bali bersama keluarga",
    "is_complete": false,
    "category": "Perjalanan",
    "priority": "Sedang",
    "due_date": "2026-03-20",
    "created_at": "2026-03-01T19:00:00.000Z",
    "updated_at": "2026-03-04T12:30:00.000Z",
    "estimated_hours": 5,
    "tags": ["proyek"]
  },
  {
    "id": 16,
    "title": "Belajar bahasa Inggris 16",
    "description": "Les bahasa Inggris online via Zoom",
    "is_complete": true,
    "category": "Pendidikan",
    "priority": "Sedang",
    "due_date": "2026-03-03",
    "created_at": "2026-02-28T18:00:00.000Z",
    "updated_at": "2026-03-03T20:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  },
  {
    "id": 17,
    "title": "Mengikuti webinar 17",
    "description": "Webinar tentang AI untuk developer",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Sedang",
    "due_date": "2026-03-09",
    "created_at": "2026-03-02T10:00:00.000Z",
    "updated_at": "2026-03-04T13:00:00.000Z",
    "estimated_hours": 3,
    "tags": ["penting"]
  },
  {
    "id": 18,
    "title": "Membuat website portfolio 18",
    "description": "Buat website portfolio pribadi dengan React",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-25",
    "created_at": "2026-03-01T09:30:00.000Z",
    "updated_at": "2026-03-04T14:15:00.000Z",
    "estimated_hours": 8,
    "tags": ["penting", "proyek"]
  },
  {
    "id": 19,
    "title": "Mengecek media sosial 19",
    "description": "Update Instagram dan LinkedIn",
    "is_complete": true,
    "category": "Pribadi",
    "priority": "Rendah",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T08:00:00.000Z",
    "updated_at": "2026-03-04T09:00:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 20,
    "title": "Mendengarkan podcast 20",
    "description": "Dengerin podcast tentang produktivitas",
    "is_complete": false,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-05",
    "created_at": "2026-03-04T07:30:00.000Z",
    "updated_at": "2026-03-04T15:00:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 21,
    "title": "Menulis jurnal 21",
    "description": "Tulis jurnal harian tentang aktivitas hari ini",
    "is_complete": false,
    "category": "Pribadi",
    "priority": "Rendah",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T20:00:00.000Z",
    "updated_at": "2026-03-04T20:30:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 22,
    "title": "Membuat video YouTube 22",
    "description": "Rekam dan edit video tutorial coding",
    "is_complete": false,
    "category": "Hobi",
    "priority": "Sedang",
    "due_date": "2026-03-12",
    "created_at": "2026-03-02T13:00:00.000Z",
    "updated_at": "2026-03-04T16:45:00.000Z",
    "estimated_hours": 6,
    "tags": ["proyek"]
  },
  {
    "id": 23,
    "title": "Mengedit foto 23",
    "description": "Edit foto liburan untuk diupload ke Instagram",
    "is_complete": true,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-02",
    "created_at": "2026-03-01T15:00:00.000Z",
    "updated_at": "2026-03-02T18:00:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 24,
    "title": "Memasak makan malam 24",
    "description": "Masak ayam bakar dan sayur for keluarga",
    "is_complete": true,
    "category": "Pribadi",
    "priority": "Sedang",
    "due_date": "2026-03-03",
    "created_at": "2026-03-03T16:00:00.000Z",
    "updated_at": "2026-03-03T19:30:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  },
  {
    "id": 25,
    "title": "Bermain game 25",
    "description": "Main game Valorant sama teman-teman",
    "is_complete": true,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-02",
    "created_at": "2026-03-02T20:00:00.000Z",
    "updated_at": "2026-03-02T23:00:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 26,
    "title": "Menonton film 26",
    "description": "Nonton film Dune 2 di bioskop",
    "is_complete": false,
    "category": "Hobi",
    "priority": "Sedang",
    "due_date": "2026-03-08",
    "created_at": "2026-03-04T12:00:00.000Z",
    "updated_at": "2026-03-04T17:00:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 27,
    "title": "Mengunjungi keluarga 27",
    "description": "Jenguk orang tua di rumah sakit",
    "is_complete": false,
    "category": "Pribadi",
    "priority": "Tinggi",
    "due_date": "2026-03-05",
    "created_at": "2026-03-04T08:30:00.000Z",
    "updated_at": "2026-03-04T09:45:00.000Z",
    "estimated_hours": 4,
    "tags": ["penting", "mendesak"]
  },
  {
    "id": 28,
    "title": "Berbelanja online 28",
    "description": "Beli baju baru di Shopee",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Rendah",
    "due_date": "2026-03-06",
    "created_at": "2026-03-03T10:00:00.000Z",
    "updated_at": "2026-03-04T18:15:00.000Z",
    "estimated_hours": 1,
    "tags": []
  },
  {
    "id": 29,
    "title": "Membuat skripsi 29",
    "description": "Bab 3 metodologi penelitian",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Tinggi",
    "due_date": "2026-03-30",
    "created_at": "2026-03-01T08:00:00.000Z",
    "updated_at": "2026-03-04T14:30:00.000Z",
    "estimated_hours": 8,
    "tags": ["penting", "proyek"]
  },
  {
    "id": 30,
    "title": "Mempersiapkan presentasi 30",
    "description": "Buat slide presentasi untuk meeting klien",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-07",
    "created_at": "2026-03-03T09:00:00.000Z",
    "updated_at": "2026-03-04T19:00:00.000Z",
    "estimated_hours": 5,
    "tags": ["penting", "mendesak"]
  },
  {
    "id": 31,
    "title": "Membuat database 31",
    "description": "Desain database untuk aplikasi baru",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-02",
    "created_at": "2026-02-28T11:00:00.000Z",
    "updated_at": "2026-03-02T16:00:00.000Z",
    "estimated_hours": 4,
    "tags": ["proyek"]
  },
  {
    "id": 32,
    "title": "Mendesain UI/UX 32",
    "description": "Buat mockup Figma untuk mobile app",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-10",
    "created_at": "2026-03-04T10:00:00.000Z",
    "updated_at": "2026-03-04T20:00:00.000Z",
    "estimated_hours": 6,
    "tags": ["proyek"]
  },
  {
    "id": 33,
    "title": "Testing aplikasi 33",
    "description": "Uji coba fitur baru sebelum rilis",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-08",
    "created_at": "2026-03-04T13:00:00.000Z",
    "updated_at": "2026-03-04T21:30:00.000Z",
    "estimated_hours": 3,
    "tags": ["penting"]
  },
  {
    "id": 34,
    "title": "Deploy website 34",
    "description": "Deploy aplikasi ke Vercel",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-03",
    "created_at": "2026-03-02T14:00:00.000Z",
    "updated_at": "2026-03-03T17:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["penting", "mendesak"]
  },
  {
    "id": 35,
    "title": "Maintenance server 35",
    "description": "Update security patch server",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-06",
    "created_at": "2026-03-04T09:00:00.000Z",
    "updated_at": "2026-03-04T22:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["penting"]
  },
  {
    "id": 36,
    "title": "Membuat dokumentasi 36",
    "description": "Tulis dokumentasi API untuk tim",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-09",
    "created_at": "2026-03-03T15:00:00.000Z",
    "updated_at": "2026-03-04T23:15:00.000Z",
    "estimated_hours": 4,
    "tags": ["proyek"]
  },
  {
    "id": 37,
    "title": "Code review 37",
    "description": "Review pull request dari tim",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T10:30:00.000Z",
    "updated_at": "2026-03-04T12:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  },
  {
    "id": 38,
    "title": "Sprint planning 38",
    "description": "Planning sprint ke-5 bersama tim",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-07",
    "created_at": "2026-03-02T08:00:00.000Z",
    "updated_at": "2026-03-05T08:00:00.000Z",
    "estimated_hours": 3,
    "tags": ["penting"]
  },
  {
    "id": 39,
    "title": "Daily standup 39",
    "description": "Meeting standup pagi dengan tim",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T08:45:00.000Z",
    "updated_at": "2026-03-04T09:15:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 40,
    "title": "Retrospective meeting 40",
    "description": "Evaluasi sprint sebelumnya",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-08",
    "created_at": "2026-03-03T13:00:00.000Z",
    "updated_at": "2026-03-05T09:30:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 41,
    "title": "Membuat mockup 41",
    "description": "Buat mockup aplikasi mobile",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-09",
    "created_at": "2026-03-04T11:00:00.000Z",
    "updated_at": "2026-03-05T10:00:00.000Z",
    "estimated_hours": 5,
    "tags": ["proyek"]
  },
  {
    "id": 42,
    "title": "User research 42",
    "description": "Wawancara user untuk riset",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-12",
    "created_at": "2026-03-02T09:30:00.000Z",
    "updated_at": "2026-03-05T11:15:00.000Z",
    "estimated_hours": 6,
    "tags": ["proyek"]
  },
  {
    "id": 43,
    "title": "A/B testing 43",
    "description": "Lakukan A/B testing untuk landing page",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Rendah",
    "due_date": "2026-03-15",
    "created_at": "2026-03-01T14:00:00.000Z",
    "updated_at": "2026-03-05T12:30:00.000Z",
    "estimated_hours": 4,
    "tags": []
  },
  {
    "id": 44,
    "title": "Analytics review 44",
    "description": "Review Google Analytics bulanan",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-03",
    "created_at": "2026-03-01T10:00:00.000Z",
    "updated_at": "2026-03-03T15:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  },
  {
    "id": 45,
    "title": "Content writing 45",
    "description": "Tulis artikel blog tentang JavaScript",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-10",
    "created_at": "2026-03-04T09:15:00.000Z",
    "updated_at": "2026-03-05T13:45:00.000Z",
    "estimated_hours": 4,
    "tags": ["proyek"]
  },
  {
    "id": 46,
    "title": "SEO optimization 46",
    "description": "Optimasi SEO website perusahaan",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-11",
    "created_at": "2026-03-03T11:30:00.000Z",
    "updated_at": "2026-03-05T14:00:00.000Z",
    "estimated_hours": 5,
    "tags": ["penting"]
  },
  {
    "id": 47,
    "title": "Social media posting 47",
    "description": "Buat jadwal posting Instagram",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Rendah",
    "due_date": "2026-03-02",
    "created_at": "2026-03-01T13:00:00.000Z",
    "updated_at": "2026-03-02T16:30:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 48,
    "title": "Email marketing 48",
    "description": "Kirim newsletter ke subscriber",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-06",
    "created_at": "2026-03-04T10:45:00.000Z",
    "updated_at": "2026-03-05T15:30:00.000Z",
    "estimated_hours": 3,
    "tags": ["rutin"]
  },
  {
    "id": 49,
    "title": "Customer support 49",
    "description": "Balas tiket customer",
    "is_complete": true,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T08:00:00.000Z",
    "updated_at": "2026-03-04T12:00:00.000Z",
    "estimated_hours": 3,
    "tags": ["rutin"]
  },
  {
    "id": 50,
    "title": "Product demo 50",
    "description": "Demo produk ke calon klien",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Tinggi",
    "due_date": "2026-03-07",
    "created_at": "2026-03-03T14:30:00.000Z",
    "updated_at": "2026-03-05T16:15:00.000Z",
    "estimated_hours": 2,
    "tags": ["penting", "mendesak"]
  },
  {
    "id": 51,
    "title": "Sales call 51",
    "description": "Call dengan prospek dari LinkedIn",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Sedang",
    "due_date": "2026-03-05",
    "created_at": "2026-03-04T15:00:00.000Z",
    "updated_at": "2026-03-05T17:00:00.000Z",
    "estimated_hours": 1,
    "tags": []
  },
  {
    "id": 52,
    "title": "Networking event 52",
    "description": "Hadiri meetup developer Jakarta",
    "is_complete": false,
    "category": "Pekerjaan",
    "priority": "Rendah",
    "due_date": "2026-03-14",
    "created_at": "2026-03-01T16:00:00.000Z",
    "updated_at": "2026-03-05T18:30:00.000Z",
    "estimated_hours": 4,
    "tags": []
  },
  {
    "id": 53,
    "title": "Belajar React Native 53",
    "description": "Ikut kursus React Native online",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Sedang",
    "due_date": "2026-03-18",
    "created_at": "2026-03-02T08:00:00.000Z",
    "updated_at": "2026-03-05T19:00:00.000Z",
    "estimated_hours": 8,
    "tags": ["penting"]
  },
  {
    "id": 54,
    "title": "Membaca buku atomic habits 54",
    "description": "Baca buku Atomic Habits bab 5-6",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-09",
    "created_at": "2026-03-03T20:00:00.000Z",
    "updated_at": "2026-03-05T20:15:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 55,
    "title": "Belajar public speaking 55",
    "description": "Latihan pidato di depan cermin",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-10",
    "created_at": "2026-03-04T19:00:00.000Z",
    "updated_at": "2026-03-05T21:00:00.000Z",
    "estimated_hours": 1,
    "tags": []
  },
  {
    "id": 56,
    "title": "Ikut bootcamp coding 56",
    "description": "Daftar bootcamp fullstack developer",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Tinggi",
    "due_date": "2026-03-15",
    "created_at": "2026-03-01T09:00:00.000Z",
    "updated_at": "2026-03-05T22:30:00.000Z",
    "estimated_hours": 40,
    "tags": ["penting", "proyek"]
  },
  {
    "id": 57,
    "title": "Belajar machine learning 57",
    "description": "Mulai kursus ML di Coursera",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Sedang",
    "due_date": "2026-03-20",
    "created_at": "2026-03-02T11:00:00.000Z",
    "updated_at": "2026-03-05T23:45:00.000Z",
    "estimated_hours": 10,
    "tags": ["proyek"]
  },
  {
    "id": 58,
    "title": "Baca dokumentasi Next.js 58",
    "description": "Pelajari fitur terbaru Next.js 14",
    "is_complete": true,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-03",
    "created_at": "2026-03-01T21:00:00.000Z",
    "updated_at": "2026-03-03T23:00:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 59,
    "title": "Belajar TypeScript 59",
    "description": "Praktik TypeScript di project pribadi",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Sedang",
    "due_date": "2026-03-12",
    "created_at": "2026-03-04T14:00:00.000Z",
    "updated_at": "2026-03-06T08:00:00.000Z",
    "estimated_hours": 5,
    "tags": ["penting"]
  },
  {
    "id": 60,
    "title": "Ikut seminar AI 60",
    "description": "Seminar tentang AI di UI",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Sedang",
    "due_date": "2026-03-16",
    "created_at": "2026-03-03T10:00:00.000Z",
    "updated_at": "2026-03-06T09:15:00.000Z",
    "estimated_hours": 5,
    "tags": []
  },
  {
    "id": 61,
    "title": "Belajar Python 61",
    "description": "Tutorial Python untuk data science",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-22",
    "created_at": "2026-03-02T16:30:00.000Z",
    "updated_at": "2026-03-06T10:30:00.000Z",
    "estimated_hours": 6,
    "tags": []
  },
  {
    "id": 62,
    "title": "Belajar SEO 62",
    "description": "Kursus SEO di Udemy",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-19",
    "created_at": "2026-03-01T12:00:00.000Z",
    "updated_at": "2026-03-06T11:45:00.000Z",
    "estimated_hours": 5,
    "tags": []
  },
  {
    "id": 63,
    "title": "Baca buku psychology of money 63",
    "description": "Baca buku tentang psikologi keuangan",
    "is_complete": true,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-02",
    "created_at": "2026-02-28T18:30:00.000Z",
    "updated_at": "2026-03-02T20:00:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 64,
    "title": "Belajar digital marketing 64",
    "description": "Kursus digital marketing online",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-17",
    "created_at": "2026-03-03T14:00:00.000Z",
    "updated_at": "2026-03-06T13:00:00.000Z",
    "estimated_hours": 4,
    "tags": []
  },
  {
    "id": 65,
    "title": "Belajar desain grafis 65",
    "description": "Tutorial Photoshop dan Illustrator",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-14",
    "created_at": "2026-03-04T15:30:00.000Z",
    "updated_at": "2026-03-06T14:15:00.000Z",
    "estimated_hours": 5,
    "tags": []
  },
  {
    "id": 66,
    "title": "Belajar video editing 66",
    "description": "Tutorial Premiere Pro",
    "is_complete": false,
    "category": "Pendidikan",
    "priority": "Rendah",
    "due_date": "2026-03-21",
    "created_at": "2026-03-02T09:45:00.000Z",
    "updated_at": "2026-03-06T15:30:00.000Z",
    "estimated_hours": 6,
    "tags": []
  },
  {
    "id": 67,
    "title": "Belajar fotografi 67",
    "description": "Praktik foto dengan kamera mirrorless",
    "is_complete": false,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-13",
    "created_at": "2026-03-01T17:00:00.000Z",
    "updated_at": "2026-03-06T16:45:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 68,
    "title": "Main gitar 68",
    "description": "Latihan chord gitar lagu baru",
    "is_complete": false,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-08",
    "created_at": "2026-03-04T18:00:00.000Z",
    "updated_at": "2026-03-06T18:00:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 69,
    "title": "Melukis 69",
    "description": "Lukis pemandangan dengan cat air",
    "is_complete": false,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-18",
    "created_at": "2026-03-02T13:15:00.000Z",
    "updated_at": "2026-03-06T19:15:00.000Z",
    "estimated_hours": 4,
    "tags": []
  },
  {
    "id": 70,
    "title": "Berkebun 70",
    "description": "Tanam bibit cabai di pot",
    "is_complete": true,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-03",
    "created_at": "2026-03-01T08:30:00.000Z",
    "updated_at": "2026-03-03T10:00:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 71,
    "title": "Memancing 71",
    "description": "Mancing di Waduk Pluit",
    "is_complete": false,
    "category": "Hobi",
    "priority": "Rendah",
    "due_date": "2026-03-12",
    "created_at": "2026-03-03T06:00:00.000Z",
    "updated_at": "2026-03-06T20:30:00.000Z",
    "estimated_hours": 5,
    "tags": []
  },
  {
    "id": 72,
    "title": "Bersepeda 72",
    "description": "Gowes keliling kota",
    "is_complete": true,
    "category": "Kesehatan",
    "priority": "Rendah",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T06:30:00.000Z",
    "updated_at": "2026-03-04T09:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  },
  {
    "id": 73,
    "title": "Yoga 73",
    "description": "Yoga pagi selama 30 menit",
    "is_complete": false,
    "category": "Kesehatan",
    "priority": "Rendah",
    "due_date": "2026-03-05",
    "created_at": "2026-03-04T05:45:00.000Z",
    "updated_at": "2026-03-06T21:45:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 74,
    "title": "Checkup kesehatan 74",
    "description": "Cek kesehatan rutin ke dokter",
    "is_complete": false,
    "category": "Kesehatan",
    "priority": "Sedang",
    "due_date": "2026-03-09",
    "created_at": "2026-03-02T09:00:00.000Z",
    "updated_at": "2026-03-06T22:30:00.000Z",
    "estimated_hours": 3,
    "tags": ["penting"]
  },
  {
    "id": 75,
    "title": "Minum vitamin 75",
    "description": "Beli dan konsumsi vitamin harian",
    "is_complete": true,
    "category": "Kesehatan",
    "priority": "Rendah",
    "due_date": "2026-03-04",
    "created_at": "2026-03-04T07:15:00.000Z",
    "updated_at": "2026-03-04T08:00:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 76,
    "title": "Diet sehat 76",
    "description": "Mulai program diet sehat",
    "is_complete": false,
    "category": "Kesehatan",
    "priority": "Sedang",
    "due_date": "2026-03-30",
    "created_at": "2026-03-01T10:00:00.000Z",
    "updated_at": "2026-03-06T23:15:00.000Z",
    "estimated_hours": 30,
    "tags": ["proyek"]
  },
  {
    "id": 77,
    "title": "Meditasi 77",
    "description": "Meditasi 10 menit sebelum tidur",
    "is_complete": true,
    "category": "Kesehatan",
    "priority": "Rendah",
    "due_date": "2026-03-03",
    "created_at": "2026-03-03T22:00:00.000Z",
    "updated_at": "2026-03-03T22:15:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 78,
    "title": "Pijat refleksi 78",
    "description": "Pijat refleksi di tempat langganan",
    "is_complete": false,
    "category": "Kesehatan",
    "priority": "Rendah",
    "due_date": "2026-03-11",
    "created_at": "2026-03-04T16:30:00.000Z",
    "updated_at": "2026-03-07T08:00:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 79,
    "title": "Beli obat 79",
    "description": "Beli obat batuk di apotek",
    "is_complete": true,
    "category": "Kesehatan",
    "priority": "Tinggi",
    "due_date": "2026-03-02",
    "created_at": "2026-03-01T18:00:00.000Z",
    "updated_at": "2026-03-02T19:30:00.000Z",
    "estimated_hours": 1,
    "tags": ["mendesak"]
  },
  {
    "id": 80,
    "title": "Tidur cukup 80",
    "description": "Tidur minimal 7 jam per hari",
    "is_complete": false,
    "category": "Kesehatan",
    "priority": "Sedang",
    "due_date": "2026-03-31",
    "created_at": "2026-03-01T23:00:00.000Z",
    "updated_at": "2026-03-07T09:30:00.000Z",
    "estimated_hours": 210,
    "tags": ["rutin"]
  },
  {
    "id": 81,
    "title": "Buat anggaran bulanan 81",
    "description": "Buat budget untuk bulan Maret",
    "is_complete": false,
    "category": "Keuangan",
    "priority": "Tinggi",
    "due_date": "2026-03-05",
    "created_at": "2026-03-02T20:00:00.000Z",
    "updated_at": "2026-03-07T10:45:00.000Z",
    "estimated_hours": 2,
    "tags": ["penting"]
  },
  {
    "id": 82,
    "title": "Investasi saham 82",
    "description": "Beli saham perusahaan teknologi",
    "is_complete": false,
    "category": "Keuangan",
    "priority": "Sedang",
    "due_date": "2026-03-08",
    "created_at": "2026-03-03T09:30:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 83,
    "title": "Bayar pajak 83",
    "description": "Bayar pajak kendaraan",
    "is_complete": false,
    "category": "Keuangan",
    "priority": "Tinggi",
    "due_date": "2026-03-15",
    "created_at": "2026-03-01T13:30:00.000Z",
    "updated_at": "2026-03-07T13:15:00.000Z",
    "estimated_hours": 1,
    "tags": ["penting"]
  },
  {
    "id": 84,
    "title": "Cicilan rumah 84",
    "description": "Bayar cicilan KPR",
    "is_complete": true,
    "category": "Keuangan",
    "priority": "Tinggi",
    "due_date": "2026-03-03",
    "created_at": "2026-03-01T08:00:00.000Z",
    "updated_at": "2026-03-03T10:30:00.000Z",
    "estimated_hours": 1,
    "tags": ["penting", "rutin"]
  },
  {
    "id": 85,
    "title": "Tabungan darurat 85",
    "description": "Transfer ke tabungan darurat",
    "is_complete": false,
    "category": "Keuangan",
    "priority": "Sedang",
    "due_date": "2026-03-10",
    "created_at": "2026-03-02T12:00:00.000Z",
    "updated_at": "2026-03-07T14:30:00.000Z",
    "estimated_hours": 1,
    "tags": ["penting"]
  },
  {
    "id": 86,
    "title": "Asuransi kesehatan 86",
    "description": "Perpanjang asuransi kesehatan",
    "is_complete": false,
    "category": "Keuangan",
    "priority": "Tinggi",
    "due_date": "2026-03-12",
    "created_at": "2026-03-03T15:00:00.000Z",
    "updated_at": "2026-03-07T15:45:00.000Z",
    "estimated_hours": 1,
    "tags": ["penting"]
  },
  {
    "id": 87,
    "title": "Reksadana 87",
    "description": "Investasi reksadana bulanan",
    "is_complete": true,
    "category": "Keuangan",
    "priority": "Sedang",
    "due_date": "2026-03-02",
    "created_at": "2026-03-01T09:15:00.000Z",
    "updated_at": "2026-03-02T11:00:00.000Z",
    "estimated_hours": 1,
    "tags": ["rutin"]
  },
  {
    "id": 88,
    "title": "Cek credit score 88",
    "description": "Cek skor kredit di OJK",
    "is_complete": false,
    "category": "Keuangan",
    "priority": "Rendah",
    "due_date": "2026-03-18",
    "created_at": "2026-03-04T11:15:00.000Z",
    "updated_at": "2026-03-07T17:00:00.000Z",
    "estimated_hours": 1,
    "tags": []
  },
  {
    "id": 89,
    "title": "Traveling ke Jogja 89",
    "description": "Liburan 3 hari ke Jogja",
    "is_complete": false,
    "category": "Perjalanan",
    "priority": "Sedang",
    "due_date": "2026-03-20",
    "created_at": "2026-03-01T19:30:00.000Z",
    "updated_at": "2026-03-07T18:30:00.000Z",
    "estimated_hours": 72,
    "tags": ["proyek"]
  },
  {
    "id": 90,
    "title": "Booking hotel 90",
    "description": "Booking hotel untuk liburan",
    "is_complete": false,
    "category": "Perjalanan",
    "priority": "Sedang",
    "due_date": "2026-03-10",
    "created_at": "2026-03-03T20:00:00.000Z",
    "updated_at": "2026-03-07T19:45:00.000Z",
    "estimated_hours": 1,
    "tags": ["penting"]
  },
  {
    "id": 91,
    "title": "Beli tiket pesawat 91",
    "description": "Tiket pesawat ke Bali",
    "is_complete": true,
    "category": "Perjalanan",
    "priority": "Tinggi",
    "due_date": "2026-03-01",
    "created_at": "2026-02-28T14:00:00.000Z",
    "updated_at": "2026-03-01T16:00:00.000Z",
    "estimated_hours": 1,
    "tags": ["penting", "mendesak"]
  },
  {
    "id": 92,
    "title": "Buat itinerary 92",
    "description": "Buat rencana perjalanan detail",
    "is_complete": false,
    "category": "Perjalanan",
    "priority": "Rendah",
    "due_date": "2026-03-12",
    "created_at": "2026-03-04T21:00:00.000Z",
    "updated_at": "2026-03-07T21:00:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 93,
    "title": "Visa application 93",
    "description": "Urus visa ke Jepang",
    "is_complete": false,
    "category": "Perjalanan",
    "priority": "Tinggi",
    "due_date": "2026-03-25",
    "created_at": "2026-03-02T10:30:00.000Z",
    "updated_at": "2026-03-07T22:15:00.000Z",
    "estimated_hours": 5,
    "tags": ["penting", "proyek"]
  },
  {
    "id": 94,
    "title": "Packing 94",
    "description": "Siapkan koper untuk liburan",
    "is_complete": false,
    "category": "Perjalanan",
    "priority": "Rendah",
    "due_date": "2026-03-18",
    "created_at": "2026-03-03T18:30:00.000Z",
    "updated_at": "2026-03-07T23:30:00.000Z",
    "estimated_hours": 3,
    "tags": []
  },
  {
    "id": 95,
    "title": "Cari oleh-oleh 95",
    "description": "Beli oleh-oleh khas Bandung",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Rendah",
    "due_date": "2026-03-15",
    "created_at": "2026-03-04T12:45:00.000Z",
    "updated_at": "2026-03-08T08:00:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 96,
    "title": "Beli laptop baru 96",
    "description": "Research dan beli laptop untuk coding",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Sedang",
    "due_date": "2026-03-20",
    "created_at": "2026-03-01T15:45:00.000Z",
    "updated_at": "2026-03-08T09:30:00.000Z",
    "estimated_hours": 5,
    "tags": ["penting"]
  },
  {
    "id": 97,
    "title": "Beli buku 97",
    "description": "Beli buku programming di Gramedia",
    "is_complete": true,
    "category": "Belanja",
    "priority": "Rendah",
    "due_date": "2026-03-02",
    "created_at": "2026-03-01T11:00:00.000Z",
    "updated_at": "2026-03-02T14:30:00.000Z",
    "estimated_hours": 2,
    "tags": []
  },
  {
    "id": 98,
    "title": "Beli perlengkapan olahraga 98",
    "description": "Beli sepatu lari baru",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Rendah",
    "due_date": "2026-03-09",
    "created_at": "2026-03-03T16:15:00.000Z",
    "updated_at": "2026-03-08T10:45:00.000Z",
    "estimated_hours": 1,
    "tags": []
  },
  {
    "id": 99,
    "title": "Beli kado wedding 99",
    "description": "Beli kado untuk teman yang nikah",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Sedang",
    "due_date": "2026-03-14",
    "created_at": "2026-03-04T14:30:00.000Z",
    "updated_at": "2026-03-08T12:00:00.000Z",
    "estimated_hours": 2,
    "tags": ["penting"]
  },
  {
    "id": 100,
    "title": "Beli sembako 100",
    "description": "Belanja bulanan di supermarket",
    "is_complete": false,
    "category": "Belanja",
    "priority": "Sedang",
    "due_date": "2026-03-07",
    "created_at": "2026-03-04T09:45:00.000Z",
    "updated_at": "2026-03-08T13:30:00.000Z",
    "estimated_hours": 2,
    "tags": ["rutin"]
  }
]


// Middleware untuk parsing JSON
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    return res.status(200).json({});
  }
  next();
});
// Home route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    <!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Naufal Rakha Putra • Todos API</title>
    <link rel="stylesheet" href="/style.css" />
    <style>
      /* Tambahan styling biar lebih personal */
      .name-highlight {
        color: #667eea;
        font-weight: bold;
        font-size: 1.2em;
      }
      .badge {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.9em;
        display: inline-block;
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/api-data">API Data</a>
      <a href="/healthz">Health</a>
      <a href="/todos">Todos API</a>
      <a href="https://github.com/naufalrakha" target="_blank">GitHub</a>
    </nav>
    
    <div style="text-align: center; padding: 20px;">
      <span class="badge">🚀 Personal Project</span>
    </div>
    
    <h1>👋 Halo, saya <span class="name-highlight">Naufal Rakha Putra</span></h1>
    
    <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin: 30px 0;">
      <p style="font-size: 1.3em; margin-bottom: 20px;">Selamat datang di <strong>Personal API Server</strong> saya!</p>
      
      <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin: 40px 0;">
        <div style="background: white; color: #333; padding: 20px; border-radius: 10px; min-width: 200px;">
          <h3 style="color: #667eea;">📋 Total Todos</h3>
          <p style="font-size: 2em; font-weight: bold;" id="total-todos">100+</p>
        </div>
        <div style="background: white; color: #333; padding: 20px; border-radius: 10px; min-width: 200px;">
          <h3 style="color: #667eea;">📁 Kategori</h3>
          <p style="font-size: 2em; font-weight: bold;" id="total-categories">8</p>
        </div>
        <div style="background: white; color: #333; padding: 20px; border-radius: 10px; min-width: 200px;">
          <h3 style="color: #667eea;">⚡ Endpoints</h3>
          <p style="font-size: 2em; font-weight: bold;" id="total-endpoints">6</p>
        </div>
      </div>
      
      <div style="text-align: left; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px;">
        <h3>📌 API Endpoints Tersedia:</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin: 10px 0;">🔹 <code style="background: #333; padding: 4px 8px; border-radius: 4px;">GET /todos</code> - Lihat semua todos</li>
          <li style="margin: 10px 0;">🔹 <code style="background: #333; padding: 4px 8px; border-radius: 4px;">GET /todos/:id</code> - Cari todo by ID</li>
          <li style="margin: 10px 0;">🔹 <code style="background: #333; padding: 4px 8px; border-radius: 4px;">GET /todos/stats/summary</code> - Statistik todos</li>
          <li style="margin: 10px 0;">🔹 <code style="background: #333; padding: 4px 8px; border-radius: 4px;">GET /todos/meta/categories</code> - Daftar kategori</li>
          <li style="margin: 10px 0;">🔹 <code style="background: #333; padding: 4px 8px; border-radius: 4px;">GET /todos/meta/priorities</code> - Daftar prioritas</li>
        </ul>
      </div>
      
      <div style="margin-top: 40px;">
        <p>Coba langsung akses endpoint pertama:</p>
        <a href="/todos" style="display: inline-block; background: white; color: #667eea; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px;">🚀 GET /todos</a>
        <a href="/todos/stats/summary" style="display: inline-block; background: transparent; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; border: 2px solid white; margin: 10px;">📊 GET /stats</a>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 50px; padding: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
      <p>Dibuat dengan ❤️ oleh <strong>Naufal Rakha Putra</strong> | © 2026</p>
      <p style="font-size: 0.9em; opacity: 0.8;">Express.js • Vercel • Todos API • 100+ Data</p>
    </div>
    
    <img src="/logo.png" alt="Logo" width="120" style="display: block; margin: 30px auto;" />
    
    <script>
      // Fetch data buat nampilin statistik real-time
      fetch('/todos/stats/summary')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            document.getElementById('total-todos').textContent = data.data.total;
            
            const categories = Object.keys(data.data.by_category).length;
            document.getElementById('total-categories').textContent = categories;
          }
        })
        .catch(err => console.log('Gagal fetch stats'));
    </script>
  </body>
</html>
  `)
})

app.get('/about', function (req, res) {
  try {
    res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
  } catch (error) {
    res.status(404).send('About page not found')
  }
})

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '..', 'public')))

// Example API endpoint - JSON
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry'],
  })
})

// TODOS API ENDPOINTS

// Get all todos with optional filtering
app.get('/todos', (req, res) => {
  try {
    let filteredTodos = [...todos]
    
    // Filter by completion status
    if (req.query.is_complete !== undefined) {
      const isComplete = req.query.is_complete === 'true'
      filteredTodos = filteredTodos.filter(todo => todo.is_complete === isComplete)
    }
    
    // Filter by category
    if (req.query.category) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.category && todo.category.toLowerCase() === req.query.category.toLowerCase()
      )
    }
    
    // Filter by priority
    if (req.query.priority) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.priority && todo.priority.toLowerCase() === req.query.priority.toLowerCase()
      )
    }
    
    // Search by title
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase()
      filteredTodos = filteredTodos.filter(todo => 
        todo.title && todo.title.toLowerCase().includes(searchTerm)
      )
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedTodos = filteredTodos.slice(startIndex, endIndex)
    
    res.json({
      success: true,
      total: filteredTodos.length,
      page,
      limit,
      total_pages: Math.ceil(filteredTodos.length / limit),
      data: paginatedTodos
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing todos',
      error: error.message
    })
  }
})

// Get todo by ID
app.get('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id)
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }
    
    res.json({
      success: true,
      data: todo
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    })
  }
})

// Get todos statistics
app.get('/todos/stats/summary', (req, res) => {
  try {
    const stats = {
      total: todos.length,
      completed: todos.filter(t => t.is_complete).length,
      pending: todos.filter(t => !t.is_complete).length,
      by_category: {},
      by_priority: {},
      completion_rate: todos.length ? (todos.filter(t => t.is_complete).length / todos.length * 100).toFixed(2) + '%' : '0%'
    }
    
    // Count by category
    todos.forEach(todo => {
      if (todo.category) {
        if (!stats.by_category[todo.category]) {
          stats.by_category[todo.category] = 0
        }
        stats.by_category[todo.category]++
      }
    })
    
    // Count by priority
    todos.forEach(todo => {
      if (todo.priority) {
        if (!stats.by_priority[todo.priority]) {
          stats.by_priority[todo.priority] = 0
        }
        stats.by_priority[todo.priority]++
      }
    })
    
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating statistics',
      error: error.message
    })
  }
})

// Get unique categories
app.get('/todos/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(todos.map(todo => todo.category).filter(Boolean))]
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    })
  }
})

// Get unique priorities
app.get('/todos/meta/priorities', (req, res) => {
  try {
    const priorities = [...new Set(todos.map(todo => todo.priority).filter(Boolean))]
    res.json({
      success: true,
      data: priorities
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching priorities',
      error: error.message
    })
  }
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    todos_count: todos.length
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

export default app
