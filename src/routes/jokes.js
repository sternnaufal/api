import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load jokes data
let jokes = []
try {
  jokes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'jokes.json'), 'utf-8'))
} catch (error) {
  console.error('Gagal load jokes.json:', error.message)
}

// GET / — list with optional filters
router.get('/', (req, res) => {
  try {
    let filtered = [...jokes]

    if (req.query.category) {
      const cat = req.query.category.toLowerCase()
      filtered = filtered.filter(j => j.category.toLowerCase() === cat)
    }

    if (req.query.min_rating) {
      const min = parseFloat(req.query.min_rating)
      if (!isNaN(min)) {
        filtered = filtered.filter(j => j.rating >= min)
      }
    }

    if (req.query.search) {
      const q = req.query.search.toLowerCase()
      filtered = filtered.filter(j => j.text.toLowerCase().includes(q))
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    res.json({
      success: true,
      total: filtered.length,
      page,
      limit,
      total_pages: Math.ceil(filtered.length / limit),
      data: paginated
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing jokes',
      error: error.message
    })
  }
})

// GET /stats/summary — total, by_category, avg_rating, top_rated_count
router.get('/stats/summary', (req, res) => {
  try {
    const total = jokes.length
    const by_category = {}
    let ratingSum = 0

    jokes.forEach(j => {
      if (!by_category[j.category]) by_category[j.category] = 0
      by_category[j.category]++
      ratingSum += j.rating
    })

    const avg_rating = total ? parseFloat((ratingSum / total).toFixed(2)) : 0
    const top_rated = jokes.filter(j => j.rating === 5).length

    res.json({
      success: true,
      data: {
        total,
        by_category,
        avg_rating,
        top_rated_count: top_rated
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating statistics',
      error: error.message
    })
  }
})

// GET /random — random joke (BEFORE /:id)
router.get('/random', (req, res) => {
  try {
    if (!jokes.length) {
      return res.status(404).json({
        success: false,
        message: 'No jokes available'
      })
    }

    const random = jokes[Math.floor(Math.random() * jokes.length)]

    res.json({
      success: true,
      data: random
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching random joke',
      error: error.message
    })
  }
})

// GET /meta/categories — unique categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(jokes.map(j => j.category).filter(Boolean))]
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

// GET /:id — single joke (must be after specific routes)
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const joke = jokes.find(j => j.id === id)

    if (!joke) {
      return res.status(404).json({
        success: false,
        message: 'Joke not found'
      })
    }

    res.json({
      success: true,
      data: joke
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching joke',
      error: error.message
    })
  }
})

export default router
