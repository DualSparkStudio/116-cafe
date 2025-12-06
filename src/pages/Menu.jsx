import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/store'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import './Menu.css'

const Menu = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { menuItems, addToCart } = useStore()
  const [addedItems, setAddedItems] = useState({})

  // Mock menu data
  const categories = ['all', 'Coffee', 'Drinks', 'Breakfast', 'Sandwiches', 'Pasta', 'Desserts', 'Specials']
  
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

  const items = menuItems.length > 0 ? menuItems : mockMenuItems

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [items, activeCategory, searchQuery])

  const handleCardClick = (itemId) => {
    navigate(`/menu/${itemId}`)
  }

  const handleAddToCart = (e, item) => {
    e.stopPropagation()
    addToCart(item, 1)
    setAddedItems(prev => ({ ...prev, [item.id]: true }))
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }))
    }, 2000)
  }

  return (
    <div className="menu-page">
      <section className="menu-hero section">
        <div className="container">
          <h1 className="page-heading">Our Menu</h1>
          <p className="page-subheading">
            Discover our carefully crafted selection of coffees, breakfast items, and sweet treats
          </p>
        </div>
      </section>

      <section className="menu-content section">
        <div className="container">
          <div className="menu-filters">
            <div className="menu-search">
              <Input
                type="text"
                name="search"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="menu-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  data-cursor="hover"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className="menu-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Card 
                    key={item.id} 
                    className="menu-item-card" 
                    hover
                    onClick={() => handleCardClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.image && (
                      <div className="menu-item-image">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                    )}
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <h3>{item.name}</h3>
                        {item.bestseller && <span className="menu-badge bestseller">Bestseller</span>}
                        {item.tags.includes('New') && <span className="menu-badge new">New</span>}
                      </div>
                      <p className="menu-item-description">{item.description}</p>
                      <div className="menu-item-footer">
                        <div className="menu-item-tags">
                          {item.tags.filter(tag => tag !== 'New').map((tag) => (
                            <span key={tag} className="menu-tag">{tag}</span>
                          ))}
                        </div>
                        <span className="menu-item-price">₹{(item.price * 83).toFixed(2)}</span>
                      </div>
                      <div className="menu-item-actions">
                        <Button
                          variant="accent"
                          size="small"
                          onClick={(e) => handleAddToCart(e, item)}
                          className="menu-add-to-cart-btn"
                          data-cursor="hover"
                        >
                          {addedItems[item.id] ? '✓ Added!' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="menu-empty">
                  <p>No items found. Try a different search or category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Menu
