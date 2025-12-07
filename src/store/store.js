import { create } from 'zustand'

// Check for existing auth on load
const getStoredAuth = () => {
  const token = localStorage.getItem('adminToken')
  return {
    isAuthenticated: !!token,
    token: token,
    user: token ? { email: 'admin@premiumcafe.com' } : null
  }
}

export const useStore = create((set) => ({
  ...getStoredAuth(),
  
  login: (user, token) => {
    localStorage.setItem('adminToken', token)
    set({ isAuthenticated: true, user, token })
  },
  logout: () => {
    localStorage.removeItem('adminToken')
    set({ isAuthenticated: false, user: null, token: null })
  },
      
      // Menu data
      menuItems: [],
      categories: [],
      
      // Reservations
      reservations: [],
      
      // Gallery
      galleryImages: [],
      
      // Content
      siteContent: {
        heroHeading: 'Brewed Stories, Crafted Moments',
        heroSubheading: 'Where every cup tells a story, and every moment is crafted with care',
        aboutText: 'Our story began with a simple passion for exceptional coffee and warm hospitality...',
        openingHours: {
          monday: '7:00 AM - 6:00 PM',
          tuesday: '7:00 AM - 6:00 PM',
          wednesday: '7:00 AM - 6:00 PM',
          thursday: '7:00 AM - 6:00 PM',
          friday: '7:00 AM - 8:00 PM',
          saturday: '8:00 AM - 8:00 PM',
          sunday: '8:00 AM - 5:00 PM'
        },
        address: '123 Coffee Street, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'hello@premiumcafe.com',
        socialLinks: {
          instagram: 'https://instagram.com/premiumcafe',
          facebook: 'https://facebook.com/premiumcafe',
          whatsapp: 'https://wa.me/15551234567'
        }
      },
      
      // Testimonials
      testimonials: [],
      
      // Settings
      settings: {
        siteTitle: 'Premium Cafe',
        metaDescription: 'Premium cafe offering exceptional coffee and crafted moments',
        showNewsletter: true
      },
      
      // Cart - load from localStorage
      cart: (() => {
        try {
          const stored = localStorage.getItem('cart')
          return stored ? JSON.parse(stored) : []
        } catch {
          return []
      }
      })(),
      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
          let newCart
          if (existingItem) {
            newCart = state.cart.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            )
          } else {
            newCart = [...state.cart, { ...item, quantity }]
          }
          localStorage.setItem('cart', JSON.stringify(newCart))
          return { cart: newCart }
        })
      },
      removeFromCart: (itemId) => {
        set((state) => {
          const newCart = state.cart.filter(item => item.id !== itemId)
          localStorage.setItem('cart', JSON.stringify(newCart))
          return { cart: newCart }
        })
      },
      updateCartQuantity: (itemId, quantity) => {
        set((state) => {
          let newCart
          if (quantity <= 0) {
            newCart = state.cart.filter(item => item.id !== itemId)
          } else {
            newCart = state.cart.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            )
          }
          localStorage.setItem('cart', JSON.stringify(newCart))
          return { cart: newCart }
        })
      },
      clearCart: () => {
        set({ cart: [] })
        localStorage.removeItem('cart')
      },
      getCartTotal: () => {
        const state = useStore.getState()
        return state.cart.reduce((total, item) => {
          return total + (item.price * 83 * item.quantity)
        }, 0)
      },
      getCartItemCount: () => {
        const state = useStore.getState()
        return state.cart.reduce((count, item) => count + item.quantity, 0)
      }
    })
)

// Initialize cart from localStorage
if (typeof window !== 'undefined') {
  try {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      useStore.setState({ cart: parsedCart })
    }
  } catch (e) {
    console.error('Failed to load cart from localStorage', e)
  }
}
