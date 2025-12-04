import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import Button from '../components/Button'
import './Reservations.css'

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (!formData.guests) newErrors.guests = 'Number of guests is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real app, send to API
      // await fetch('/api/reservations', { method: 'POST', body: JSON.stringify(formData) })
      
      setIsSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: ''
      })
    } catch (error) {
      console.error('Reservation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="reservations-page">
        <section className="reservations-hero section">
          <div className="container">
            <motion.div
              className="reservation-success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="success-icon">✓</div>
              <h2>Reservation Confirmed!</h2>
              <p>We've received your reservation request. We'll contact you shortly to confirm the details.</p>
              <Button
                variant="accent"
                size="medium"
                onClick={() => setIsSuccess(false)}
              >
                Make Another Reservation
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="reservations-page">
      <section className="reservations-hero section">
        <div className="container">
          <h1 className="page-heading">Reserve a Table</h1>
          <p className="page-subheading">
            Book your table and experience our warm hospitality
          </p>
        </div>
      </section>

      <section className="reservations-form-section section">
        <div className="container">
          <div className="reservations-form-wrapper">
            <form onSubmit={handleSubmit} className="reservations-form">
              <div className="form-row">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <div className="form-row">
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                <Input
                  label="Time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  error={errors.time}
                  required
                />
              </div>

              <Input
                label="Number of Guests"
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                error={errors.guests}
                required
                min="1"
                max="12"
              />

              <div className="input-group">
                <label htmlFor="specialRequests" className="input-label">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Any dietary restrictions, special occasions, or requests..."
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                size="large"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Reserve Table'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reservations
