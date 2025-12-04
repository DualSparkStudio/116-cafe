import { createContext, useContext, useState, useEffect } from 'react'
import { useStore } from '../store/store'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const value = {
    isMenuOpen,
    setIsMenuOpen,
    isScrolled,
    isAuthenticated
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
