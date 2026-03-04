import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware untuk parsing JSON
app.use(express.json())

// Baca data dari file JSON
const todosPath = path.join(__dirname, '..', 'data', 'todos.json')
const todos = JSON.parse(fs.readFileSync(todosPath, 'utf8'))


// Home route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Express on Vercel</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/api-data">API Data</a>
          <a href="/healthz">Health</a>
          <a href="/todos">Todos API</a>
        </nav>
        <h1>Welcome to Express on Vercel 🚀</h1>
        <p>This is a minimal example without a database or forms.</p>
        <p>Check out the <a href="/todos">Todos API</a> endpoint!</p>
        <img src="/logo.png" alt="Logo" width="120" />
      </body>
    </html>
  `)
})

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
})

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
  let filteredTodos = [...todos]
  
  // Filter by completion status
  if (req.query.is_complete !== undefined) {
    const isComplete = req.query.is_complete === 'true'
    filteredTodos = filteredTodos.filter(todo => todo.is_complete === isComplete)
  }
  
  // Filter by category
  if (req.query.category) {
    filteredTodos = filteredTodos.filter(todo => 
      todo.category.toLowerCase() === req.query.category.toLowerCase()
    )
  }
  
  // Filter by priority
  if (req.query.priority) {
    filteredTodos = filteredTodos.filter(todo => 
      todo.priority.toLowerCase() === req.query.priority.toLowerCase()
    )
  }
  
  // Search by title
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase()
    filteredTodos = filteredTodos.filter(todo => 
      todo.title.toLowerCase().includes(searchTerm)
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
})

// Get todo by ID
app.get('/todos/:id', (req, res) => {
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
})

// Get todos statistics
app.get('/todos/stats/summary', (req, res) => {
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.is_complete).length,
    pending: todos.filter(t => !t.is_complete).length,
    by_category: {},
    by_priority: {},
    completion_rate: (todos.filter(t => t.is_complete).length / todos.length * 100).toFixed(2) + '%'
  }
  
  // Count by category
  todos.forEach(todo => {
    if (!stats.by_category[todo.category]) {
      stats.by_category[todo.category] = 0
    }
    stats.by_category[todo.category]++
  })
  
  // Count by priority
  todos.forEach(todo => {
    if (!stats.by_priority[todo.priority]) {
      stats.by_priority[todo.priority] = 0
    }
    stats.by_priority[todo.priority]++
  })
  
  res.json({
    success: true,
    data: stats
  })
})

// Get unique categories
app.get('/todos/meta/categories', (req, res) => {
  const categories = [...new Set(todos.map(todo => todo.category))]
  res.json({
    success: true,
    data: categories
  })
})

// Get unique priorities
app.get('/todos/meta/priorities', (req, res) => {
  const priorities = [...new Set(todos.map(todo => todo.priority))]
  res.json({
    success: true,
    data: priorities
  })
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
