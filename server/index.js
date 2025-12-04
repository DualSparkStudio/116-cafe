import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = 5000
const JWT_SECRET = 'your-secret-key-change-in-production'

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Mock database (in production, use a real database)
let menuItems = [
  { id: 1, name: 'Espresso', description: 'Rich and bold', price: 4.50, category: 'Coffee', tags: ['Hot'], bestseller: true, available: true },
  { id: 2, name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 5.00, category: 'Coffee', tags: ['Hot'], bestseller: true, available: true },
  { id: 3, name: 'Latte', description: 'Smooth espresso with velvety milk', price: 5.50, category: 'Coffee', tags: ['Hot'], available: true },
  { id: 4, name: 'Cold Brew', description: 'Slow-steeped for 24 hours', price: 5.00, category: 'Drinks', tags: ['Cold'], bestseller: true, available: true },
  { id: 5, name: 'Avocado Toast', description: 'Fresh avocado on artisan sourdough', price: 8.50, category: 'Breakfast', tags: ['Vegan'], bestseller: true, available: true },
]

let categories = ['Coffee', 'Drinks', 'Breakfast', 'Sandwiches', 'Desserts', 'Specials']

let reservations = []

let galleryImages = [
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&h=600&fit=crop',
]

let testimonials = [
  { id: 1, name: 'Sarah Johnson', review: 'The best coffee I\'ve ever had!', rating: 5, highlight: true },
  { id: 2, name: 'Michael Chen', review: 'Perfect spot for a morning meeting.', rating: 5, highlight: false },
]

let siteContent = {
  heroHeading: 'Brewed Stories, Crafted Moments',
  heroSubheading: 'Where every cup tells a story, and every moment is crafted with care',
  aboutText: 'Our story began with a simple passion for exceptional coffee and warm hospitality...',
  openingHours: {
    monday: '7:00 AM - 6:00 PM',
    tuesday: '7:00 AM - 6:00 PM',
    wednesday: '7:00 AM - 6:00 PM',
    thursday: '7:00 AM - 6:00 PM',
    friday: '7:00 AM - 8:00 PM',
    saturday: '8:00 AM - 8:00 PM',
    sunday: '8:00 AM - 5:00 PM'
  },
  address: '123 Coffee Street, City, State 12345',
  phone: '+1 (555) 123-4567',
  email: 'hello@premiumcafe.com',
  socialLinks: {
    instagram: 'https://instagram.com/premiumcafe',
    facebook: 'https://facebook.com/premiumcafe',
    whatsapp: 'https://wa.me/15551234567'
  }
}

let settings = {
  siteTitle: 'Premium Cafe',
  metaDescription: 'Premium cafe offering exceptional coffee and crafted moments',
  showNewsletter: true
}

// Mock admin user (in production, store in database with hashed password)
const adminUser = {
  email: 'admin@premiumcafe.com',
  password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqO' // bcrypt hash of 'admin123'
}

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

// Auth Routes
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body

  if (email === adminUser.email) {
    // In production, compare with bcrypt
    // const validPassword = await bcrypt.compare(password, adminUser.password)
    // For demo, simple check
    if (password === 'admin123') {
      const token = jwt.sign({ email: adminUser.email }, JWT_SECRET, { expiresIn: '24h' })
      return res.json({ token, user: { email: adminUser.email } })
    }
  }

  res.status(401).json({ error: 'Invalid credentials' })
})

// Menu Routes
app.get('/api/menu', (req, res) => {
  res.json({ items: menuItems, categories })
})

app.get('/api/menu/:id', (req, res) => {
  const item = menuItems.find(i => i.id === parseInt(req.params.id))
  if (!item) return res.status(404).json({ error: 'Item not found' })
  res.json(item)
})

app.post('/api/admin/menu', authenticateToken, (req, res) => {
  const newItem = {
    id: menuItems.length > 0 ? Math.max(...menuItems.map(i => i.id)) + 1 : 1,
    ...req.body,
    available: req.body.available !== undefined ? req.body.available : true
  }
  menuItems.push(newItem)
  res.json(newItem)
})

app.put('/api/admin/menu/:id', authenticateToken, (req, res) => {
  const index = menuItems.findIndex(i => i.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Item not found' })
  menuItems[index] = { ...menuItems[index], ...req.body }
  res.json(menuItems[index])
})

app.delete('/api/admin/menu/:id', authenticateToken, (req, res) => {
  const index = menuItems.findIndex(i => i.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Item not found' })
  menuItems.splice(index, 1)
  res.json({ success: true })
})

// Categories Routes
app.get('/api/categories', (req, res) => {
  res.json(categories)
})

app.post('/api/admin/categories', authenticateToken, (req, res) => {
  const { name } = req.body
  if (!categories.includes(name)) {
    categories.push(name)
  }
  res.json(categories)
})

// Reservations Routes
app.get('/api/admin/reservations', authenticateToken, (req, res) => {
  res.json(reservations)
})

app.post('/api/reservations', (req, res) => {
  const newReservation = {
    id: reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  reservations.push(newReservation)
  res.json(newReservation)
})

app.put('/api/admin/reservations/:id', authenticateToken, (req, res) => {
  const index = reservations.findIndex(r => r.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Reservation not found' })
  reservations[index] = { ...reservations[index], ...req.body }
  res.json(reservations[index])
})

// Gallery Routes
app.get('/api/gallery', (req, res) => {
  res.json(galleryImages)
})

app.post('/api/admin/gallery', authenticateToken, (req, res) => {
  const { imageUrl } = req.body
  galleryImages.push(imageUrl)
  res.json(galleryImages)
})

app.delete('/api/admin/gallery/:index', authenticateToken, (req, res) => {
  const index = parseInt(req.params.index)
  if (index >= 0 && index < galleryImages.length) {
    galleryImages.splice(index, 1)
  }
  res.json(galleryImages)
})

// Content Routes
app.get('/api/content', (req, res) => {
  res.json(siteContent)
})

app.put('/api/admin/content', authenticateToken, (req, res) => {
  siteContent = { ...siteContent, ...req.body }
  res.json(siteContent)
})

// Testimonials Routes
app.get('/api/testimonials', (req, res) => {
  res.json(testimonials)
})

app.post('/api/admin/testimonials', authenticateToken, (req, res) => {
  const newTestimonial = {
    id: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1,
    ...req.body
  }
  testimonials.push(newTestimonial)
  res.json(newTestimonial)
})

app.put('/api/admin/testimonials/:id', authenticateToken, (req, res) => {
  const index = testimonials.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Testimonial not found' })
  testimonials[index] = { ...testimonials[index], ...req.body }
  res.json(testimonials[index])
})

app.delete('/api/admin/testimonials/:id', authenticateToken, (req, res) => {
  const index = testimonials.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Testimonial not found' })
  testimonials.splice(index, 1)
  res.json({ success: true })
})

// Settings Routes
app.get('/api/settings', (req, res) => {
  res.json(settings)
})

app.put('/api/admin/settings', authenticateToken, (req, res) => {
  settings = { ...settings, ...req.body }
  res.json(settings)
})

// Contact Form
app.post('/api/contact', (req, res) => {
  // In production, save to database or send email
  console.log('Contact form submission:', req.body)
  res.json({ success: true, message: 'Thank you for your message. We\'ll get back to you soon.' })
})

// Dashboard Stats
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  const today = new Date().toISOString().split('T')[0]
  const todayReservations = reservations.filter(r => r.date === today)
  
  res.json({
    totalMenuItems: menuItems.length,
    todayReservations: todayReservations.length,
    pendingReservations: reservations.filter(r => r.status === 'pending').length,
    totalReservations: reservations.length
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
