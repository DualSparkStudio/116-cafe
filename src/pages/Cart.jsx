import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/store'
import Button from '../components/Button'
import Card from '../components/Card'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } = useStore()
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateCartQuantity(itemId, newQuantity)
    }
  }

  const handlePlaceOrder = () => {
    setIsOrdering(true)
    // Simulate order placement
    setTimeout(() => {
      setIsOrdering(false)
      setOrderPlaced(true)
      clearCart()
      setTimeout(() => {
        navigate('/menu')
      }, 3000)
    }, 1500)
  }

  const total = getCartTotal()

  if (orderPlaced) {
    return (
      <div className="cart-page">
        <section className="cart-hero section">
          <div className="container">
            <motion.div
              className="order-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="success-icon">✓</div>
              <h1>Order Placed Successfully!</h1>
              <p>Thank you for your order. We'll prepare it right away!</p>
              <Link to="/menu">
                <Button variant="accent" size="large">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <section className="cart-hero section">
          <div className="container">
            <h1 className="page-heading">Your Cart</h1>
            <p className="page-subheading">Your cart is empty</p>
          </div>
        </section>
        <section className="cart-content section">
          <div className="container">
            <div className="cart-empty">
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Link to="/menu">
                <Button variant="accent" size="large">
                  Browse Menu
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <section className="cart-hero section">
        <div className="container">
          <h1 className="page-heading">Your Cart</h1>
          <p className="page-subheading">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      <section className="cart-content section">
        <div className="container">
          <div className="cart-layout">
            <div className="cart-items">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="cart-item-card">
                      <div className="cart-item-content">
                        {item.image && (
                          <div className="cart-item-image">
                            <img src={item.image} alt={item.name} />
                          </div>
                        )}
                        <div className="cart-item-info">
                          <div className="cart-item-header">
                            <h3>{item.name}</h3>
                            <button
                              className="cart-item-remove"
                              onClick={() => removeFromCart(item.id)}
                              data-cursor="hover"
                              aria-label="Remove item"
                            >
                              ×
                            </button>
                          </div>
                          <p className="cart-item-description">{item.description}</p>
                          <div className="cart-item-tags">
                            {item.tags && item.tags.map((tag) => (
                              <span key={tag} className="cart-tag">{tag}</span>
                            ))}
                          </div>
                          <div className="cart-item-footer">
                            <div className="cart-item-quantity">
                              <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                data-cursor="hover"
                              >
                                −
                              </button>
                              <span className="quantity-value">{item.quantity}</span>
                              <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                data-cursor="hover"
                              >
                                +
                              </button>
                            </div>
                            <span className="cart-item-price">
                              ₹{(item.price * 83 * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="cart-summary">
              <Card className="summary-card">
                <h2>Order Summary</h2>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (5%)</span>
                    <span>₹{(total * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{(total * 1.05).toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  variant="accent"
                  size="large"
                  onClick={handlePlaceOrder}
                  disabled={isOrdering}
                  className="checkout-btn"
                  data-cursor="hover"
                >
                  {isOrdering ? 'Placing Order...' : 'Place Order'}
                </Button>
                <Link to="/menu" className="continue-shopping">
                  Continue Shopping
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cart
