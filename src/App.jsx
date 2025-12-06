import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { AppProvider } from './context/AppContext'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'

// Public Pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import MenuItemDetail from './pages/MenuItemDetail'
import Cart from './pages/Cart'
import Reservations from './pages/Reservations'
import Contact from './pages/Contact'
import About from './pages/About'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMenu from './pages/admin/AdminMenu'
import AdminReservations from './pages/admin/AdminReservations'
import AdminGallery from './pages/admin/AdminGallery'
import AdminContent from './pages/admin/AdminContent'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminSettings from './pages/admin/AdminSettings'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
    })

    // RAF loop for smooth scrolling
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Refresh ScrollTrigger after a short delay to ensure everything is loaded
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <AppProvider>
      <Router>
        <CustomCursor />
        <SmoothScroll>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/menu" element={
              <>
                <Navbar />
                <Menu />
                <Footer />
              </>
            } />
            <Route path="/menu/:id" element={
              <>
                <Navbar />
                <MenuItemDetail />
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <Cart />
                <Footer />
              </>
            } />
            <Route path="/reservations" element={
              <>
                <Navbar />
                <Reservations />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
              <ProtectedRoute>
                <AdminMenu />
              </ProtectedRoute>
            } />
            <Route path="/admin/reservations" element={
              <ProtectedRoute>
                <AdminReservations />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery" element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <ProtectedRoute>
                <AdminContent />
              </ProtectedRoute>
            } />
            <Route path="/admin/testimonials" element={
              <ProtectedRoute>
                <AdminTestimonials />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } />
          </Routes>
        </SmoothScroll>
      </Router>
    </AppProvider>
  )
}

export default App
