import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load countries data
let countries = []
try {
  countries = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'countries.json'), 'utf-8'))
} catch (error) {
  console.error('Gagal load countries.json:', error.message)
}

// GET all countries with optional filtering
router.get('/', (req, res) => {
  try {
    let filtered = [...countries]

    if (req.query.continent) {
      const continent = req.query.continent.toLowerCase()
      filtered = filtered.filter(c => c.continent.toLowerCase() === continent)
    }

    if (req.query.language) {
      const lang = req.query.language.toLowerCase()
      filtered = filtered.filter(c =>
        c.languages.some(l => l.toLowerCase() === lang)
      )
    }

    if (req.query.search) {
      const term = req.query.search.toLowerCase()
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.capital.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
      )
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
    res.status(500).json({ success: false, message: 'Error processing countries', error: error.message })
  }
})

// GET countries statistics — must be before /:id
router.get('/stats/summary', (req, res) => {
  try {
    const byContinent = {}
    let totalPopulation = 0
    const currencySet = new Set()

    countries.forEach(c => {
      if (c.continent) {
        if (!byContinent[c.continent]) byContinent[c.continent] = 0
        byContinent[c.continent]++
      }
      totalPopulation += c.population || 0
      if (c.currency) currencySet.add(c.currency)
    })

    const stats = {
      total: countries.length,
      by_continent: byContinent,
      total_population: totalPopulation,
      total_currency_count: currencySet.size
    }

    res.json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generating statistics', error: error.message })
  }
})

// GET unique continents
router.get('/meta/continents', (req, res) => {
  try {
    const continents = [...new Set(countries.map(c => c.continent).filter(Boolean))]
    res.json({ success: true, data: continents })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching continents', error: error.message })
  }
})

// GET unique languages (flatten all languages arrays to unique set)
router.get('/meta/languages', (req, res) => {
  try {
    const languages = [...new Set(countries.flatMap(c => c.languages).filter(Boolean))]
    res.json({ success: true, data: languages })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching languages', error: error.message })
  }
})

// GET country by ID — must be after specific routes
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const country = countries.find(c => c.id === id)

    if (!country) {
      return res.status(404).json({ success: false, message: 'Country not found' })
    }

    res.json({ success: true, data: country })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching country', error: error.message })
  }
})

export default router
