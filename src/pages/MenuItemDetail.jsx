import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../store/store'
import Button from '../components/Button'
import Card from '../components/Card'
import './MenuItemDetail.css'

const MenuItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { menuItems, addToCart } = useStore()
  const [item, setItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  // Mock menu data (same as Menu.jsx)
  const mockMenuItems = [
    { id: 1, name: 'Espresso', description: 'Rich and bold', price: 4.50, category: 'Coffee', tags: ['Hot'], bestseller: true, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop' },
    { id: 2, name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 5.00, category: 'Coffee', tags: ['Hot'], bestseller: true, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop' },
    { id: 3, name: 'Latte', description: 'Smooth espresso with velvety milk', price: 5.50, category: 'Coffee', tags: ['Hot'], image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' },
    { id: 4, name: 'Cold Brew', description: 'Slow-steeped for 24 hours', price: 5.00, category: 'Drinks', tags: ['Cold'], bestseller: true, image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop' },
    { id: 5, name: 'Iced Latte', description: 'Refreshing cold latte', price: 5.50, category: 'Drinks', tags: ['Cold'], image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop' },
    { id: 6, name: 'Avocado Toast', description: 'Fresh avocado on artisan sourdough', price: 8.50, category: 'Breakfast', tags: ['Vegan'], bestseller: true, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop' },
    { id: 7, name: 'Eggs Benedict', description: 'Poached eggs on English muffin', price: 12.00, category: 'Breakfast', tags: [], image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop' },
    { id: 8, name: 'Pancakes', description: 'Fluffy buttermilk pancakes', price: 9.00, category: 'Breakfast', tags: [], image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop' },
    { id: 9, name: 'Turkey Club', description: 'Roasted turkey with bacon and avocado', price: 11.00, category: 'Sandwiches', tags: [], image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop&q=80' },
    { id: 10, name: 'Veggie Wrap', description: 'Fresh vegetables in a whole wheat wrap', price: 8.00, category: 'Sandwiches', tags: ['Vegan'], image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop' },
    { id: 14, name: 'Spaghetti Carbonara', description: 'Classic Italian pasta with bacon and creamy sauce', price: 14.50, category: 'Pasta', tags: [], bestseller: true, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop&q=80' },
    { id: 15, name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with garlic and red peppers', price: 13.00, category: 'Pasta', tags: ['Spicy'], image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop&q=80' },
    { id: 16, name: 'Fettuccine Alfredo', description: 'Creamy parmesan sauce with fettuccine', price: 15.00, category: 'Pasta', tags: [], image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop&q=80' },
    { id: 17, name: 'Lasagna', description: 'Layered pasta with meat sauce and cheese', price: 16.50, category: 'Pasta', tags: [], bestseller: true, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop&q=80' },
    { id: 11, name: 'Chocolate Cake', description: 'Rich chocolate layer cake', price: 6.50, category: 'Desserts', tags: [], bestseller: true, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop' },
    { id: 12, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.00, category: 'Desserts', tags: [], image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
    { id: 13, name: 'Seasonal Latte', description: 'Limited edition seasonal flavor', price: 6.00, category: 'Specials', tags: ['Hot', 'New'], image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop' },
  ]

  useEffect(() => {
    const allItems = menuItems.length > 0 ? menuItems : mockMenuItems
    const foundItem = allItems.find(i => i.id === parseInt(id))
    if (foundItem) {
      setItem(foundItem)
    } else {
      navigate('/menu')
    }
  }, [id, menuItems, navigate])

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)))
  }

  if (!item) {
    return (
      <div className="menu-item-detail-page">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-item-detail-page">
      <section className="detail-hero section">
        <div className="container">
          <Link to="/menu" className="back-link" data-cursor="hover">
            ← Back to Menu
          </Link>
        </div>
      </section>

      <section className="detail-content section">
        <div className="container">
          <motion.div
            className="detail-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="detail-image-wrapper">
              <Card className="detail-image-card">
                {item.image && (
                  <img src={item.image} alt={item.name} className="detail-image" />
                )}
              </Card>
            </div>

            <div className="detail-info">
              <div className="detail-header">
                <div className="detail-title-row">
                  <h1 className="detail-title">{item.name}</h1>
                  {item.bestseller && <span className="detail-badge bestseller">Bestseller</span>}
                  {item.tags.includes('New') && <span className="detail-badge new">New</span>}
                </div>
                <p className="detail-category">{item.category}</p>
              </div>

              <p className="detail-description">{item.description}</p>

              {item.tags && item.tags.length > 0 && (
                <div className="detail-tags">
                  {item.tags.filter(tag => tag !== 'New').map((tag) => (
                    <span key={tag} className="detail-tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="detail-price-section">
                <span className="detail-price">₹{(item.price * 83).toFixed(2)}</span>
                <span className="detail-price-note">per serving</span>
              </div>

              <div className="detail-actions">
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    data-cursor="hover"
                  >
                    −
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    data-cursor="hover"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="accent"
                  size="large"
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                  data-cursor="hover"
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                </Button>
              </div>

              <div className="detail-meta">
                <div className="meta-item">
                  <strong>Category:</strong> {item.category}
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="meta-item">
                    <strong>Tags:</strong> {item.tags.filter(tag => tag !== 'New').join(', ') || 'None'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MenuItemDetail
