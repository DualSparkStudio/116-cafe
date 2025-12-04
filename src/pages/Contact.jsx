import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/store'
import Input from '../components/Input'
import Button from '../components/Button'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { siteContent } = useStore()

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
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Contact error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero section">
        <div className="container">
          <h1 className="page-heading">Get in Touch</h1>
          <p className="page-subheading">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="contact-content section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info" data-aos="fade-right">
              <h2>Contact Information</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <h3>Address</h3>
                  <p>{siteContent.address}</p>
                </div>
                <div className="contact-item">
                  <h3>Phone</h3>
                  <p><a href={`tel:${siteContent.phone}`}>{siteContent.phone}</a></p>
                </div>
                <div className="contact-item">
                  <h3>Email</h3>
                  <p><a href={`mailto:${siteContent.email}`}>{siteContent.email}</a></p>
                </div>
                <div className="contact-item">
                  <h3>Follow Us</h3>
                  <div className="contact-social">
                    <a href={siteContent.socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href={siteContent.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href={siteContent.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper" data-aos="fade-left">
              {isSuccess ? (
                <motion.div
                  className="contact-success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We'll get back to you soon.</p>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Phone (Optional)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                  <div className="input-group">
                    <label htmlFor="message" className="input-label">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`input-field ${errors.message ? 'error' : ''}`}
                      rows="6"
                      required
                    />
                    {errors.message && <span className="input-error">{errors.message}</span>}
                  </div>
                  <Button
                    type="submit"
                    variant="accent"
                    size="large"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
