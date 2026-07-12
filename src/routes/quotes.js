import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load quotes data
let quotes = []
try {
  quotes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'quotes.json'), 'utf-8'))
} catch (error) {
  console.error('Gagal load quotes.json:', error.message)
}

// GET all quotes with optional filtering
router.get('/', (req, res) => {
  try {
    let filtered = [...quotes]

    if (req.query.category) {
      filtered = filtered.filter(q => q.category && q.category.toLowerCase() === req.query.category.toLowerCase())
    }

    if (req.query.author) {
      filtered = filtered.filter(q => q.author && q.author.toLowerCase().includes(req.query.author.toLowerCase()))
    }

    if (req.query.search) {
      const term = req.query.search.toLowerCase()
      filtered = filtered.filter(q => q.text && q.text.toLowerCase().includes(term))
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const start = (page - 1) * limit
    const end = page * limit
    const paginated = filtered.slice(start, end)

    res.json({
      success: true,
      total: filtered.length,
      page,
      limit,
      total_pages: Math.ceil(filtered.length / limit),
      data: paginated
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing quotes', error: error.message })
  }
})

// GET random quote
router.get('/random', (req, res) => {
  try {
    let pool = [...quotes]

    if (req.query.category) {
      pool = pool.filter(q => q.category && q.category.toLowerCase() === req.query.category.toLowerCase())
    }

    if (req.query.author) {
      pool = pool.filter(q => q.author && q.author.toLowerCase().includes(req.query.author.toLowerCase()))
    }

    if (pool.length === 0) {
      return res.status(404).json({ success: false, message: 'No quotes found for the given filters' })
    }

    const randomIndex = Math.floor(Math.random() * pool.length)
    res.json({ success: true, data: pool[randomIndex] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching random quote', error: error.message })
  }
})

// GET quotes statistics — must be before /:id
router.get('/stats/summary', (req, res) => {
  try {
    const stats = {
      total: quotes.length,
      by_category: {},
      by_author_count: 0
    }

    const authors = new Set()
    quotes.forEach(q => {
      if (q.category) {
        if (!stats.by_category[q.category]) stats.by_category[q.category] = 0
        stats.by_category[q.category]++
      }
      if (q.author) authors.add(q.author)
    })
    stats.by_author_count = authors.size

    res.json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generating statistics', error: error.message })
  }
})

// GET unique categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(quotes.map(q => q.category).filter(Boolean))]
    res.json({ success: true, data: categories })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message })
  }
})

// GET unique authors
router.get('/meta/authors', (req, res) => {
  try {
    const authors = [...new Set(quotes.map(q => q.author).filter(Boolean))]
    res.json({ success: true, data: authors })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching authors', error: error.message })
  }
})

// GET quote by ID — must be after specific routes
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const quote = quotes.find(q => q.id === id)
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found' })
    res.json({ success: true, data: quote })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching quote', error: error.message })
  }
})

export default router
