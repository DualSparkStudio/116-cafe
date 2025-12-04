import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../Button'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const buttonsRef = useRef(null)
  const { siteContent } = useStore()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(
        headingRef.current,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3
        }
      )

      gsap.fromTo(
        subheadingRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.8
        }
      )

      gsap.fromTo(
        buttonsRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1.2
        }
      )

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-gradient"></div>
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
            <Link to="/menu">
              <Button variant="accent" size="large">View Menu</Button>
            </Link>
            <Link to="/reservations">
              <Button variant="primary" size="large">Reserve a Table</Button>
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
