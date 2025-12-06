import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card from '../Card'
import { useStore } from '../../store/store'
import './Signature.css'

gsap.registerPlugin(ScrollTrigger)

const Signature = () => {
  const sectionRef = useRef(null)
  const { menuItems } = useStore()

  // Mock signature items - in real app, these would come from the store/API
  const signatureItems = [
    {
      id: 1,
      name: 'Artisan Espresso',
      description: 'Our signature blend, roasted to perfection',
      price: '₹373.50',
      tags: ['Hot', 'Bestseller'],
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Craft Latte',
      description: 'Smooth espresso with velvety steamed milk',
      price: '₹456.50',
      tags: ['Hot', 'Bestseller'],
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Cold Brew Delight',
      description: 'Slow-steeped for 24 hours, smooth and refreshing',
      price: '₹415.00',
      tags: ['Cold', 'Bestseller'],
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Avocado Toast',
      description: 'Fresh avocado on artisan sourdough',
      price: '₹705.50',
      tags: ['Vegan', 'Bestseller'],
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Chocolate Croissant',
      description: 'Buttery, flaky pastry with rich chocolate',
      price: '₹332.00',
      tags: ['Bestseller'],
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Matcha Latte',
      description: 'Premium matcha with steamed oat milk',
      price: '₹498.00',
      tags: ['Hot', 'Vegan'],
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.signature-card',
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="signature section">
      <div className="container">
        <div className="signature-header" data-aos="fade-up">
          <h2 className="section-heading">Our Signature</h2>
          <p className="section-subheading">
            Discover our most beloved creations, crafted with passion and the finest ingredients
          </p>
        </div>
        <div className="signature-grid">
          {signatureItems.map((item, index) => (
            <Card key={item.id} className="signature-card" hover>
              <div className="signature-card-image">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="signature-card-overlay"></div>
              </div>
              <div className="signature-card-content">
                <div className="signature-card-header">
                  <h3>{item.name}</h3>
                  <span className="signature-card-price">{item.price}</span>
                </div>
                <p className="signature-card-description">{item.description}</p>
                <div className="signature-card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Signature
