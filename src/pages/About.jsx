import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../store/store'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const { siteContent } = useStore()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-section').forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="about-page">
      <section className="about-hero section">
        <div className="container">
          <h1 className="page-heading">Our Story</h1>
          <p className="page-subheading">
            A journey of passion, craftsmanship, and warm hospitality
          </p>
        </div>
      </section>

      <section ref={sectionRef} className="about-story section">
        <div className="container">
          <div className="about-section">
            <div className="about-story-content">
              <h2>The Beginning</h2>
              <p>
                {siteContent.aboutText}
              </p>
              <p>
                What started as a small dream has grown into a beloved community space where
                people come together to enjoy exceptional coffee, delicious food, and meaningful
                connections.
              </p>
            </div>
            <div className="about-story-image">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
                alt="Our cafe"
                loading="lazy"
              />
            </div>
          </div>

          <div className="about-section">
            <div className="about-story-image">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop"
                alt="Coffee beans"
                loading="lazy"
              />
            </div>
            <div className="about-story-content">
              <h2>Our Craft</h2>
              <p>
                We source the finest coffee beans from around the world, working directly with
                farmers who share our commitment to quality and sustainability. Each batch is
                carefully roasted to bring out unique flavors and aromas.
              </p>
              <p>
                Our baristas are trained in the art of coffee making, ensuring every cup is
                crafted with precision and care. From classic espresso to innovative seasonal
                creations, we're constantly exploring new ways to delight your palate.
              </p>
            </div>
          </div>

          <div className="about-section">
            <div className="about-story-content">
              <h2>Our Community</h2>
              <p>
                More than just a cafe, we're a gathering place for our community. We host events,
                support local artists, and create a welcoming space where everyone feels at home.
              </p>
              <p>
                Whether you're here for your morning coffee, a business meeting, or a quiet
                afternoon with a book, we're here to make your experience memorable.
              </p>
            </div>
            <div className="about-story-image">
              <img
                src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop"
                alt="Community"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
