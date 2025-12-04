import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/store'
import Card from '../components/Card'
import Input from '../components/Input'
import './Menu.css'

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { menuItems } = useStore()

  // Mock menu data
  const categories = ['all', 'Coffee', 'Drinks', 'Breakfast', 'Sandwiches', 'Desserts', 'Specials']
  
  const mockMenuItems = [
    { id: 1, name: 'Espresso', description: 'Rich and bold', price: 4.50, category: 'Coffee', tags: ['Hot'], bestseller: true },
    { id: 2, name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 5.00, category: 'Coffee', tags: ['Hot'], bestseller: true },
    { id: 3, name: 'Latte', description: 'Smooth espresso with velvety milk', price: 5.50, category: 'Coffee', tags: ['Hot'] },
    { id: 4, name: 'Cold Brew', description: 'Slow-steeped for 24 hours', price: 5.00, category: 'Drinks', tags: ['Cold'], bestseller: true },
    { id: 5, name: 'Iced Latte', description: 'Refreshing cold latte', price: 5.50, category: 'Drinks', tags: ['Cold'] },
    { id: 6, name: 'Avocado Toast', description: 'Fresh avocado on artisan sourdough', price: 8.50, category: 'Breakfast', tags: ['Vegan'], bestseller: true },
    { id: 7, name: 'Eggs Benedict', description: 'Poached eggs on English muffin', price: 12.00, category: 'Breakfast', tags: [] },
    { id: 8, name: 'Pancakes', description: 'Fluffy buttermilk pancakes', price: 9.00, category: 'Breakfast', tags: [] },
    { id: 9, name: 'Turkey Club', description: 'Roasted turkey with bacon and avocado', price: 11.00, category: 'Sandwiches', tags: [] },
    { id: 10, name: 'Veggie Wrap', description: 'Fresh vegetables in a whole wheat wrap', price: 8.00, category: 'Sandwiches', tags: ['Vegan'] },
    { id: 11, name: 'Chocolate Cake', description: 'Rich chocolate layer cake', price: 6.50, category: 'Desserts', tags: [], bestseller: true },
    { id: 12, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.00, category: 'Desserts', tags: [] },
    { id: 13, name: 'Seasonal Latte', description: 'Limited edition seasonal flavor', price: 6.00, category: 'Specials', tags: ['Hot', 'New'] },
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
                  <Card key={item.id} className="menu-item-card" hover>
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
                      <span className="menu-item-price">${item.price.toFixed(2)}</span>
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
