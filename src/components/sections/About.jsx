import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../Button'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const { siteContent } = useStore()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(
        textRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
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
    <section ref={sectionRef} className="about section">
      <div className="container">
        <div className="about-content">
          <div ref={imageRef} className="about-image" data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
              alt="Our cafe"
              loading="lazy"
            />
            <div className="about-image-overlay"></div>
          </div>
          <div ref={textRef} className="about-text" data-aos="fade-left">
            <h2 className="section-heading">Our Story</h2>
            <p className="about-description">
              {siteContent.aboutText}
            </p>
            <p className="about-description">
              We source the finest beans from around the world, roast them to perfection,
              and serve them with a smile. Every cup is a journey, every moment is crafted
              with care, and every visit feels like coming home.
            </p>
            <Link to="/about">
              <Button variant="primary" size="medium">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
