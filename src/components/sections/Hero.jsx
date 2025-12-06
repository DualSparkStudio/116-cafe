import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../Button'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const buttonsRef = useRef(null)
  const { siteContent } = useStore()

  useEffect(() => {
    // Ensure content is visible before animation
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, visibility: 'visible' })
    }
    if (subheadingRef.current) {
      gsap.set(subheadingRef.current, { opacity: 1, visibility: 'visible' })
    }
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, { opacity: 1, visibility: 'visible' })
    }

    const ctx = gsap.context(() => {
      // Text reveal animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            y: 100,
            opacity: 1
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
          }
        )
      }

      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
          {
            y: 50,
            opacity: 1
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.8
          }
        )
      }

      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current,
          {
            y: 30,
            opacity: 1
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.2
          }
        )
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-background">
        <div className="hero-image"></div>
      </div>
      <div className="hero-content">
        <div className="container">
          <h1 ref={headingRef} className="hero-heading">
            {siteContent.heroHeading}
          </h1>
          <p ref={subheadingRef} className="hero-subheading">
            {siteContent.heroSubheading}
          </p>
          <div ref={buttonsRef} className="hero-buttons">
            <Link to="/menu" className="hero-btn-link">
              <Button variant="accent" size="large" className="hero-btn">View Menu</Button>
            </Link>
            <Link to="/reservations" className="hero-btn-link">
              <Button variant="primary" size="large" className="hero-btn hero-btn-outline">Reserve a Table</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
