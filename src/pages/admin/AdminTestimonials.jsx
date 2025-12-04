import { useState, useEffect } from 'react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './AdminTestimonials.css'

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5,
    highlight: false
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error('Failed to load testimonials:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, formData)
      } else {
        await createTestimonial(formData)
      }
      setIsModalOpen(false)
      setEditingTestimonial(null)
      resetForm()
      loadTestimonials()
    } catch (error) {
      alert('Failed to save testimonial: ' + error.message)
    }
  }

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      review: testimonial.review,
      rating: testimonial.rating,
      highlight: testimonial.highlight || false
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    try {
      await deleteTestimonial(id)
      loadTestimonials()
    } catch (error) {
      alert('Failed to delete testimonial: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      review: '',
      rating: 5,
      highlight: false
    })
  }

  return (
    <AdminLayout>
      <div className="admin-testimonials">
        <div className="admin-header">
          <h1>Testimonials</h1>
          <Button
            variant="accent"
            onClick={() => {
              resetForm()
              setEditingTestimonial(null)
              setIsModalOpen(true)
            }}
          >
            + Add Testimonial
          </Button>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div>
                  <h3>{testimonial.name}</h3>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                {testimonial.highlight && <span className="badge highlight">Featured</span>}
              </div>
              <p className="testimonial-review">"{testimonial.review}"</p>
              <div className="testimonial-actions">
                <button onClick={() => handleEdit(testimonial)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(testimonial.id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <h2>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
              <form onSubmit={handleSubmit}>
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <div className="input-group">
                  <label className="input-label">Review</label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    className="input-field"
                    rows="4"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="input-field"
                    required
                  />
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.highlight}
                    onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                  />
                  Highlight / Featured
                </label>
                <div className="modal-actions">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="accent">
                    {editingTestimonial ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminTestimonials
