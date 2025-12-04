const API_BASE = '/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'API request failed')
  }

  return response.json()
}

// Auth
export const login = (email, password) => {
  return apiCall('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

// Menu
export const getMenu = () => apiCall('/menu')
export const getMenuItem = (id) => apiCall(`/menu/${id}`)
export const createMenuItem = (data) => apiCall('/admin/menu', {
  method: 'POST',
  body: JSON.stringify(data)
})
export const updateMenuItem = (id, data) => apiCall(`/admin/menu/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
})
export const deleteMenuItem = (id) => apiCall(`/admin/menu/${id}`, {
  method: 'DELETE'
})

// Categories
export const getCategories = () => apiCall('/categories')
export const createCategory = (name) => apiCall('/admin/categories', {
  method: 'POST',
  body: JSON.stringify({ name })
})

// Reservations
export const createReservation = (data) => apiCall('/reservations', {
  method: 'POST',
  body: JSON.stringify(data)
})
export const getReservations = () => apiCall('/admin/reservations')
export const updateReservation = (id, data) => apiCall(`/admin/reservations/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
})

// Gallery
export const getGallery = () => apiCall('/gallery')
export const addGalleryImage = (imageUrl) => apiCall('/admin/gallery', {
  method: 'POST',
  body: JSON.stringify({ imageUrl })
})
export const deleteGalleryImage = (index) => apiCall(`/admin/gallery/${index}`, {
  method: 'DELETE'
})

// Content
export const getContent = () => apiCall('/content')
export const updateContent = (data) => apiCall('/admin/content', {
  method: 'PUT',
  body: JSON.stringify(data)
})

// Testimonials
export const getTestimonials = () => apiCall('/testimonials')
export const createTestimonial = (data) => apiCall('/admin/testimonials', {
  method: 'POST',
  body: JSON.stringify(data)
})
export const updateTestimonial = (id, data) => apiCall(`/admin/testimonials/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
})
export const deleteTestimonial = (id) => apiCall(`/admin/testimonials/${id}`, {
  method: 'DELETE'
})

// Settings
export const getSettings = () => apiCall('/settings')
export const updateSettings = (data) => apiCall('/admin/settings', {
  method: 'PUT',
  body: JSON.stringify(data)
})

// Contact
export const submitContact = (data) => apiCall('/contact', {
  method: 'POST',
  body: JSON.stringify(data)
})

// Dashboard
export const getStats = () => apiCall('/admin/stats')
