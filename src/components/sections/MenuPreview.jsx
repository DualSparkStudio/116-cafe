import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../Button'
import './MenuPreview.css'

const MenuPreview = () => {
  const { menuItems } = useStore()

  // Mock menu categories
  const menuCategories = [
    {
      name: 'Coffee',
      items: ['Espresso', 'Cappuccino', 'Latte', 'Americano'],
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop'
    },
    {
      name: 'Breakfast',
      items: ['Avocado Toast', 'Eggs Benedict', 'Pancakes', 'Granola Bowl'],
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop'
    },
    {
      name: 'Desserts',
      items: ['Chocolate Cake', 'Tiramisu', 'Cheesecake', 'Macarons'],
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop'
    },
    {
      name: 'Specials',
      items: ['Seasonal Latte', 'Holiday Blend', 'Limited Edition'],
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop'
    }
  ]

  return (
    <section className="menu-preview section" data-aos="fade-up">
      <div className="container">
        <div className="menu-preview-header">
          <h2 className="section-heading">Our Menu</h2>
          <p className="section-subheading">
            Explore our carefully curated selection of coffees, breakfast items, and sweet treats
          </p>
        </div>
        <div className="menu-preview-grid">
          {menuCategories.map((category, index) => (
            <div
              key={category.name}
              className="menu-preview-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="menu-preview-image">
                <img src={category.image} alt={category.name} loading="lazy" />
                <div className="menu-preview-overlay">
                  <h3>{category.name}</h3>
                </div>
              </div>
              <div className="menu-preview-content">
                <ul className="menu-preview-items">
                  {category.items.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="menu-preview-cta">
          <Link to="/menu">
            <Button variant="accent" size="large">View Full Menu</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MenuPreview
