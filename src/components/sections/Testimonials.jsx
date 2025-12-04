import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/store'
import './Testimonials.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { testimonials } = useStore()

  // Mock testimonials
  const mockTestimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      review: 'The best coffee I\'ve ever had! The atmosphere is warm and inviting, and the staff is incredibly friendly.',
      rating: 5,
      highlight: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      review: 'Perfect spot for a morning meeting. Great coffee, delicious pastries, and excellent service.',
      rating: 5,
      highlight: false
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      review: 'I love coming here every weekend. The cold brew is amazing, and the avocado toast is to die for!',
      rating: 5,
      highlight: true
    },
    {
      id: 4,
      name: 'David Thompson',
      review: 'A hidden gem in the city. The attention to detail in every cup is remarkable. Highly recommended!',
      rating: 5,
      highlight: false
    }
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : mockTestimonials

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [displayTestimonials.length])

  return (
    <section className="testimonials section" data-aos="fade-up">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="section-heading">What Our Customers Say</h2>
          <p className="section-subheading">
            Real experiences from our valued guests
          </p>
        </div>
        <div className="testimonials-slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-rating">
                {[...Array(displayTestimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="testimonial-review">"{displayTestimonials[currentIndex].review}"</p>
              <p className="testimonial-name">— {displayTestimonials[currentIndex].name}</p>
            </motion.div>
          </AnimatePresence>
          <div className="testimonials-dots">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
