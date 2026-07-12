import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load todos data
let todos = []
try {
  todos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'todos.json'), 'utf-8'))
} catch (error) {
  console.error('Gagal load todos.json:', error.message)
}

// GET all todos with optional filtering
router.get('/', (req, res) => {
  try {
    let filteredTodos = [...todos]
    
    if (req.query.is_complete !== undefined) {
      const isComplete = req.query.is_complete === 'true'
      filteredTodos = filteredTodos.filter(todo => todo.is_complete === isComplete)
    }
    
    if (req.query.category) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.category && todo.category.toLowerCase() === req.query.category.toLowerCase()
      )
    }
    
    if (req.query.priority) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.priority && todo.priority.toLowerCase() === req.query.priority.toLowerCase()
      )
    }
    
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase()
      filteredTodos = filteredTodos.filter(todo => 
        todo.title && todo.title.toLowerCase().includes(searchTerm)
      )
    }
    
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

// GET todos statistics — must be before /:id
router.get('/stats/summary', (req, res) => {
  try {
    const stats = {
      total: todos.length,
      completed: todos.filter(t => t.is_complete).length,
      pending: todos.filter(t => !t.is_complete).length,
      by_category: {},
      by_priority: {},
      completion_rate: todos.length ? (todos.filter(t => t.is_complete).length / todos.length * 100).toFixed(2) + '%' : '0%'
    }
    
    todos.forEach(todo => {
      if (todo.category) {
        if (!stats.by_category[todo.category]) {
          stats.by_category[todo.category] = 0
        }
        stats.by_category[todo.category]++
      }
    })
    
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

// GET unique categories
router.get('/meta/categories', (req, res) => {
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

// GET unique priorities
router.get('/meta/priorities', (req, res) => {
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

// GET todo by ID — must be after specific routes
router.get('/:id', (req, res) => {
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

export default router
