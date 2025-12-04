import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect } from 'react'
import Button from '../Button'
import './ReservationCTA.css'

gsap.registerPlugin(ScrollTrigger)

const ReservationCTA = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
    <section ref={sectionRef} className="reservation-cta section">
      <div className="reservation-cta-background"></div>
      <div className="container">
        <div ref={textRef} className="reservation-cta-content">
          <h2 className="reservation-cta-heading">Book Your Table</h2>
          <p className="reservation-cta-text">
            Experience our warm hospitality and exceptional service. Reserve your table today
            and let us create a memorable moment for you.
          </p>
          <Link to="/reservations">
            <Button variant="accent" size="large">Reserve Now</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ReservationCTA
