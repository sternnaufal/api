import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load users data
let users = []
try {
  users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'))
} catch (error) {
  console.error('Gagal load users.json:', error.message)
}

// GET all users with optional filtering
router.get('/', (req, res) => {
  try {
    let filtered = [...users]

    if (req.query.role) {
      filtered = filtered.filter(u => u.role && u.role.toLowerCase() === req.query.role.toLowerCase())
    }

    if (req.query.location) {
      filtered = filtered.filter(u => u.location && u.location.toLowerCase() === req.query.location.toLowerCase())
    }

    if (req.query.is_active !== undefined) {
      const isActive = req.query.is_active === 'true'
      filtered = filtered.filter(u => u.is_active === isActive)
    }

    if (req.query.skill) {
      filtered = filtered.filter(u => u.skills && u.skills.some(s => s.toLowerCase() === req.query.skill.toLowerCase()))
    }

    if (req.query.search) {
      const term = req.query.search.toLowerCase()
      filtered = filtered.filter(u =>
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.username && u.username.toLowerCase().includes(term))
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
    res.status(500).json({ success: false, message: 'Error processing users', error: error.message })
  }
})

// GET user by ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message })
  }
})

// GET users statistics — must be before /:id
router.get('/stats/summary', (req, res) => {
  try {
    const active = users.filter(u => u.is_active).length
    const stats = {
      total: users.length,
      active,
      inactive: users.length - active,
      by_role: {},
      by_location: {},
      top_skills: {},
      active_rate: users.length ? ((active / users.length) * 100).toFixed(2) + '%' : '0%'
    }

    users.forEach(u => {
      if (u.role) {
        if (!stats.by_role[u.role]) stats.by_role[u.role] = 0
        stats.by_role[u.role]++
      }
      if (u.location) {
        if (!stats.by_location[u.location]) stats.by_location[u.location] = 0
        stats.by_location[u.location]++
      }
      if (u.skills) {
        u.skills.forEach(s => {
          if (!stats.top_skills[s]) stats.top_skills[s] = 0
          stats.top_skills[s]++
        })
      }
    })

    res.json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generating statistics', error: error.message })
  }
})

// GET unique roles
router.get('/meta/roles', (req, res) => {
  try {
    const roles = [...new Set(users.map(u => u.role).filter(Boolean))]
    res.json({ success: true, data: roles })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching roles', error: error.message })
  }
})

// GET unique locations
router.get('/meta/locations', (req, res) => {
  try {
    const locations = [...new Set(users.map(u => u.location).filter(Boolean))]
    res.json({ success: true, data: locations })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching locations', error: error.message })
  }
})

export default router
