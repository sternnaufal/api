import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load products data
let products = []
try {
  products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))
} catch (error) {
  console.error('Gagal load products.json:', error.message)
}

// GET all products with optional filtering
router.get('/', (req, res) => {
  try {
    let filteredProducts = [...products]

    if (req.query.category) {
      filteredProducts = filteredProducts.filter(p =>
        p.category.toLowerCase() === req.query.category.toLowerCase()
      )
    }

    if (req.query.min_price) {
      const minPrice = parseFloat(req.query.min_price)
      if (!isNaN(minPrice)) {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice)
      }
    }

    if (req.query.max_price) {
      const maxPrice = parseFloat(req.query.max_price)
      if (!isNaN(maxPrice)) {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice)
      }
    }

    if (req.query.min_rating) {
      const minRating = parseFloat(req.query.min_rating)
      if (!isNaN(minRating)) {
        filteredProducts = filteredProducts.filter(p => p.rating >= minRating)
      }
    }

    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.name && p.name.toLowerCase().includes(searchTerm)
      )
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    res.json({
      success: true,
      total: filteredProducts.length,
      page,
      limit,
      total_pages: Math.ceil(filteredProducts.length / limit),
      data: paginatedProducts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing products',
      error: error.message
    })
  }
})

// GET products statistics — must be before /:id
router.get('/stats/summary', (req, res) => {
  try {
    const inStock = products.filter(p => p.stock > 0 && p.is_available).length
    const outOfStock = products.filter(p => p.stock === 0 || !p.is_available).length

    const stats = {
      total: products.length,
      by_category: {},
      avg_rating: products.length
        ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(2)
        : '0.00',
      avg_price: products.length
        ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
        : '0.00',
      in_stock: inStock,
      out_of_stock: outOfStock
    }

    products.forEach(p => {
      if (p.category) {
        if (!stats.by_category[p.category]) {
          stats.by_category[p.category] = 0
        }
        stats.by_category[p.category]++
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

// GET unique categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
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

// GET product by ID — must be after specific routes
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const product = products.find(p => p.id === id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    })
  }
})

export default router
