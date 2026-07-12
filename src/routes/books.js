import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load books data
let books = []
try {
  books = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf-8'))
} catch (error) {
  console.error('Gagal load books.json:', error.message)
}

// GET all books with optional filtering
router.get('/', (req, res) => {
  try {
    let filteredBooks = [...books]

    if (req.query.genre) {
      filteredBooks = filteredBooks.filter(book =>
        book.genre && book.genre.toLowerCase() === req.query.genre.toLowerCase()
      )
    }

    if (req.query.author) {
      filteredBooks = filteredBooks.filter(book =>
        book.author && book.author.toLowerCase().includes(req.query.author.toLowerCase())
      )
    }

    if (req.query.min_rating) {
      const minRating = parseFloat(req.query.min_rating)
      if (!isNaN(minRating)) {
        filteredBooks = filteredBooks.filter(book => book.rating >= minRating)
      }
    }

    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase()
      filteredBooks = filteredBooks.filter(book =>
        book.title && book.title.toLowerCase().includes(searchTerm)
      )
    }

    if (req.query.language) {
      filteredBooks = filteredBooks.filter(book =>
        book.language && book.language.toLowerCase() === req.query.language.toLowerCase()
      )
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex)

    res.json({
      success: true,
      total: filteredBooks.length,
      page,
      limit,
      total_pages: Math.ceil(filteredBooks.length / limit),
      data: paginatedBooks
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing books',
      error: error.message
    })
  }
})

// GET books statistics — must be before /:id
router.get('/stats/summary', (req, res) => {
  try {
    const byGenre = {}
    let totalRating = 0
    let totalPages = 0

    books.forEach(book => {
      if (book.genre) {
        if (!byGenre[book.genre]) {
          byGenre[book.genre] = 0
        }
        byGenre[book.genre]++
      }
      totalRating += book.rating
      totalPages += book.pages
    })

    const stats = {
      total: books.length,
      by_genre: byGenre,
      avg_rating: books.length ? parseFloat((totalRating / books.length).toFixed(2)) : 0,
      total_pages: totalPages
    }

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

// GET unique genres
router.get('/meta/genres', (req, res) => {
  try {
    const genres = [...new Set(books.map(book => book.genre).filter(Boolean))]
    res.json({
      success: true,
      data: genres
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching genres',
      error: error.message
    })
  }
})

// GET unique authors
router.get('/meta/author', (req, res) => {
  try {
    const authors = [...new Set(books.map(book => book.author).filter(Boolean))]
    res.json({
      success: true,
      data: authors
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching authors',
      error: error.message
    })
  }
})

// GET book by ID — must be after specific routes
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const book = books.find(b => b.id === id)

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      })
    }

    res.json({
      success: true,
      data: book
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message
    })
  }
})

export default router
