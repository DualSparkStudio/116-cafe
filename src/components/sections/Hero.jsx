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
      // Enhanced heading animation with letter-by-letter reveal
      if (headingRef.current) {
        const text = headingRef.current.textContent
        const words = text.split(' ')
        headingRef.current.innerHTML = words
          .map(word => 
            word.split('')
              .map(char => `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px) rotateX(90deg);">${char}</span>`)
              .join('')
          )
          .join('<span class="char" style="display: inline-block; width: 0.3em;"></span>')
        
        const chars = headingRef.current.querySelectorAll('.char')
        
        // Initial container animation
        gsap.fromTo(
          headingRef.current,
          {
            y: 120,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2
          }
        )
        
        // Letter-by-letter reveal animation
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: {
            amount: 0.8,
            from: "start"
          },
          duration: 0.6,
          ease: 'back.out(1.2)',
          delay: 0.6
        })
        
        // Subtle continuous glow pulse
        gsap.to(headingRef.current, {
          filter: 'brightness(1.1)',
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.5
        })
      }

      // Enhanced subheading animation with fade and slide
      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 1.0
          }
        )
        
        // Add subtle continuous animation
        gsap.to(subheadingRef.current, {
          y: -3,
          duration: 2.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.5
        })
      }

      // Enhanced buttons animation with stagger
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children
        gsap.fromTo(
          buttonsRef.current,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 1.4
          }
        )
        
        gsap.fromTo(
          Array.from(buttons),
          {
            y: 30,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.15,
            delay: 1.5
          }
        )
      }

    }, heroRef)

    return () => ctx.revert()
  }, [siteContent])

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
