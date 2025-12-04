import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import Signature from '../components/sections/Signature'
import About from '../components/sections/About'
import MenuPreview from '../components/sections/MenuPreview'
import ReservationCTA from '../components/sections/ReservationCTA'
import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials'
import LocationHours from '../components/sections/LocationHours'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Signature />
      <About />
      <MenuPreview />
      <ReservationCTA />
      <Gallery />
      <Testimonials />
      <LocationHours />
    </div>
  )
}

export default Home
