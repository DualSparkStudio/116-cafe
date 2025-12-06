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

  // Extended menu data with detailed information
  const getExtendedItemInfo = (item) => {
    const extendedInfo = {
      1: {
        fullDescription: 'Our signature espresso is crafted from premium Arabica beans, carefully roasted to perfection. This intense, full-bodied coffee delivers a rich crema and bold flavor profile with notes of dark chocolate and caramel. Served in a traditional demitasse cup, it\'s the perfect pick-me-up for coffee connoisseurs.',
        ingredients: ['Premium Arabica Coffee Beans', 'Filtered Water'],
        preparation: 'Brewed using our state-of-the-art espresso machine at 9 bars of pressure, extracting the perfect shot in 25-30 seconds.',
        servingSize: '30ml (1 shot)',
        nutritionalInfo: { calories: 5, caffeine: '95mg', fat: '0g', carbs: '0g', protein: '0g' },
        origin: 'Ethiopian & Colombian Blend',
        flavorProfile: 'Bold, Rich, Intense with notes of dark chocolate and caramel'
      },
      2: {
        fullDescription: 'A perfect harmony of rich espresso and velvety steamed milk, topped with a delicate layer of microfoam. Our cappuccino follows the traditional Italian recipe with equal parts espresso, steamed milk, and foam, creating a balanced and creamy experience.',
        ingredients: ['Espresso', 'Steamed Whole Milk', 'Milk Foam'],
        preparation: 'One shot of espresso combined with steamed milk at 65°C, topped with 1cm of microfoam.',
        servingSize: '180ml (6oz)',
        nutritionalInfo: { calories: 80, caffeine: '95mg', fat: '4g', carbs: '6g', protein: '4g' },
        origin: 'Italian Tradition',
        flavorProfile: 'Creamy, Balanced, Smooth with a hint of sweetness'
      },
      3: {
        fullDescription: 'Smooth and velvety, our latte features a double shot of espresso combined with steamed milk, creating a creamy and indulgent beverage. The milk is carefully steamed to create microfoam, ensuring a silky texture that complements the rich espresso base.',
        ingredients: ['Double Espresso', 'Steamed Whole Milk', 'Milk Foam'],
        preparation: 'Two shots of espresso with steamed milk at 60°C, creating a smooth, creamy texture.',
        servingSize: '240ml (8oz)',
        nutritionalInfo: { calories: 120, caffeine: '190mg', fat: '5g', carbs: '9g', protein: '6g' },
        origin: 'Italian Style',
        flavorProfile: 'Smooth, Velvety, Mild with creamy undertones'
      },
      4: {
        fullDescription: 'Our cold brew is meticulously crafted by steeping coarsely ground coffee beans in cold water for 24 hours. This slow extraction process creates a smooth, naturally sweet coffee with lower acidity and a rich, full-bodied flavor. Served over ice for a refreshing experience.',
        ingredients: ['Premium Coffee Beans', 'Cold Filtered Water', 'Ice'],
        preparation: 'Coarse ground beans steeped in cold water for 24 hours, then filtered and served over ice.',
        servingSize: '300ml (10oz)',
        nutritionalInfo: { calories: 5, caffeine: '200mg', fat: '0g', carbs: '0g', protein: '0g' },
        origin: 'Cold Brew Method',
        flavorProfile: 'Smooth, Sweet, Low Acidity with chocolatey notes'
      },
      5: {
        fullDescription: 'A refreshing twist on the classic latte, served over ice. Our iced latte combines freshly pulled espresso shots with cold milk and ice, creating a cool and invigorating beverage perfect for warm days.',
        ingredients: ['Double Espresso', 'Cold Whole Milk', 'Ice'],
        preparation: 'Two shots of espresso poured over ice, topped with cold milk.',
        servingSize: '350ml (12oz)',
        nutritionalInfo: { calories: 100, caffeine: '190mg', fat: '4g', carbs: '8g', protein: '5g' },
        origin: 'Modern Coffee Culture',
        flavorProfile: 'Refreshing, Smooth, Cool with balanced coffee flavor'
      },
      6: {
        fullDescription: 'A modern breakfast classic featuring perfectly ripe avocado mashed and spread over thick slices of artisan sourdough bread. Topped with cherry tomatoes, red pepper flakes, and a drizzle of extra virgin olive oil. This healthy and satisfying dish is packed with nutrients and flavor.',
        ingredients: ['Ripe Avocado', 'Artisan Sourdough Bread', 'Cherry Tomatoes', 'Red Pepper Flakes', 'Extra Virgin Olive Oil', 'Sea Salt', 'Black Pepper', 'Lemon Juice'],
        preparation: 'Freshly toasted sourdough topped with mashed avocado, sliced tomatoes, and seasonings.',
        servingSize: '2 slices',
        nutritionalInfo: { calories: 320, fat: '22g', carbs: '28g', protein: '8g', fiber: '12g' },
        origin: 'Modern Australian Cuisine',
        flavorProfile: 'Creamy, Fresh, Savory with a hint of spice'
      },
      7: {
        fullDescription: 'A classic brunch favorite featuring perfectly poached eggs resting on toasted English muffins, topped with Canadian bacon and rich hollandaise sauce. Our hollandaise is made fresh daily with butter, egg yolks, and lemon juice, creating a velvety smooth sauce.',
        ingredients: ['Fresh Eggs', 'English Muffins', 'Canadian Bacon', 'Butter', 'Egg Yolks', 'Lemon Juice', 'White Wine Vinegar', 'Cayenne Pepper', 'Chives'],
        preparation: 'Poached eggs on toasted muffins with Canadian bacon, finished with house-made hollandaise.',
        servingSize: '2 eggs with 2 muffins',
        nutritionalInfo: { calories: 580, fat: '38g', carbs: '32g', protein: '28g' },
        origin: 'Classic American Brunch',
        flavorProfile: 'Rich, Creamy, Savory with buttery hollandaise'
      },
      8: {
        fullDescription: 'Fluffy, golden buttermilk pancakes made from scratch using our secret recipe. These light and airy pancakes are cooked to perfection and served with real maple syrup, fresh butter, and your choice of seasonal berries. A breakfast favorite that never disappoints.',
        ingredients: ['All-Purpose Flour', 'Buttermilk', 'Eggs', 'Butter', 'Sugar', 'Baking Powder', 'Vanilla Extract', 'Maple Syrup', 'Fresh Berries'],
        preparation: 'Freshly mixed batter cooked on a griddle until golden brown, served hot.',
        servingSize: '3 pancakes',
        nutritionalInfo: { calories: 420, fat: '12g', carbs: '68g', protein: '12g' },
        origin: 'American Breakfast Tradition',
        flavorProfile: 'Sweet, Fluffy, Buttery with maple sweetness'
      },
      9: {
        fullDescription: 'A hearty sandwich featuring layers of roasted turkey breast, crispy bacon, fresh avocado, lettuce, and tomato, all stacked between three slices of toasted bread. This classic deli favorite is served with a side of our house-made aioli.',
        ingredients: ['Roasted Turkey Breast', 'Bacon', 'Avocado', 'Lettuce', 'Tomato', 'White Bread', 'Mayonnaise', 'House Aioli'],
        preparation: 'Freshly sliced turkey and bacon layered with vegetables on toasted bread.',
        servingSize: '1 sandwich',
        nutritionalInfo: { calories: 680, fat: '32g', carbs: '52g', protein: '42g' },
        origin: 'American Deli Classic',
        flavorProfile: 'Savory, Smoky, Fresh with creamy avocado'
      },
      10: {
        fullDescription: 'A healthy and delicious wrap filled with fresh seasonal vegetables, hummus, and mixed greens, all wrapped in a whole wheat tortilla. Perfect for a light lunch or healthy snack option.',
        ingredients: ['Whole Wheat Tortilla', 'Hummus', 'Mixed Greens', 'Cucumber', 'Carrots', 'Bell Peppers', 'Red Onion', 'Cherry Tomatoes', 'Feta Cheese'],
        preparation: 'Fresh vegetables and hummus wrapped in a whole wheat tortilla.',
        servingSize: '1 wrap',
        nutritionalInfo: { calories: 380, fat: '14g', carbs: '52g', protein: '16g', fiber: '10g' },
        origin: 'Mediterranean Inspired',
        flavorProfile: 'Fresh, Crisp, Healthy with tangy hummus'
      },
      14: {
        fullDescription: 'An authentic Italian pasta dish featuring spaghetti tossed with crispy pancetta, eggs, parmesan cheese, and black pepper. Our carbonara is made using traditional Roman techniques, creating a rich and creamy sauce without any cream.',
        ingredients: ['Spaghetti', 'Pancetta', 'Eggs', 'Parmesan Cheese', 'Black Pepper', 'Garlic', 'Olive Oil', 'Fresh Parsley'],
        preparation: 'Pasta cooked al dente, then tossed with crispy pancetta and a creamy egg and cheese mixture.',
        servingSize: '350g',
        nutritionalInfo: { calories: 650, fat: '28g', carbs: '68g', protein: '32g' },
        origin: 'Roman, Italy',
        flavorProfile: 'Rich, Creamy, Savory with smoky pancetta'
      },
      15: {
        fullDescription: 'A fiery Italian pasta dish featuring penne pasta in a spicy tomato sauce made with garlic, red chili peppers, and fresh herbs. The name "arrabbiata" means "angry" in Italian, referring to the spicy heat of this classic Roman dish.',
        ingredients: ['Penne Pasta', 'Tomato Sauce', 'Garlic', 'Red Chili Peppers', 'Olive Oil', 'Fresh Basil', 'Parmesan Cheese', 'White Wine'],
        preparation: 'Penne cooked al dente and tossed in a spicy tomato sauce with garlic and chili.',
        servingSize: '350g',
        nutritionalInfo: { calories: 520, fat: '18g', carbs: '72g', protein: '18g' },
        origin: 'Roman, Italy',
        flavorProfile: 'Spicy, Tangy, Bold with garlic and chili heat'
      },
      16: {
        fullDescription: 'Creamy fettuccine pasta tossed in a rich Alfredo sauce made with butter, heavy cream, and freshly grated parmesan cheese. This indulgent dish is finished with black pepper and fresh parsley for a classic Italian-American favorite.',
        ingredients: ['Fettuccine Pasta', 'Butter', 'Heavy Cream', 'Parmesan Cheese', 'Garlic', 'Black Pepper', 'Fresh Parsley', 'Nutmeg'],
        preparation: 'Fresh fettuccine tossed in a creamy sauce of butter, cream, and parmesan.',
        servingSize: '350g',
        nutritionalInfo: { calories: 720, fat: '42g', carbs: '64g', protein: '24g' },
        origin: 'Italian-American',
        flavorProfile: 'Creamy, Rich, Buttery with parmesan depth'
      },
      17: {
        fullDescription: 'A classic Italian comfort food featuring layers of pasta, rich meat sauce, creamy béchamel, and melted mozzarella cheese. Our lasagna is baked to perfection, creating a golden, bubbly top and tender, flavorful layers. Served piping hot from the oven.',
        ingredients: ['Lasagna Noodles', 'Ground Beef', 'Italian Sausage', 'Tomato Sauce', 'Béchamel Sauce', 'Mozzarella Cheese', 'Parmesan Cheese', 'Onion', 'Garlic', 'Herbs'],
        preparation: 'Layered pasta, meat sauce, and cheeses baked in the oven until golden and bubbly.',
        servingSize: '400g',
        nutritionalInfo: { calories: 580, fat: '24g', carbs: '52g', protein: '36g' },
        origin: 'Emilia-Romagna, Italy',
        flavorProfile: 'Rich, Hearty, Cheesy with savory meat sauce'
      },
      11: {
        fullDescription: 'A decadent chocolate layer cake made with premium dark chocolate and cocoa powder. Each layer is moist and rich, frosted with smooth chocolate buttercream and finished with chocolate shavings. A true chocolate lover\'s dream.',
        ingredients: ['Dark Chocolate', 'Cocoa Powder', 'All-Purpose Flour', 'Sugar', 'Butter', 'Eggs', 'Buttermilk', 'Vanilla Extract', 'Chocolate Buttercream'],
        preparation: 'Baked in layers, cooled, then frosted with chocolate buttercream and decorated.',
        servingSize: '1 slice (150g)',
        nutritionalInfo: { calories: 420, fat: '22g', carbs: '52g', protein: '6g' },
        origin: 'Classic American Dessert',
        flavorProfile: 'Rich, Decadent, Sweet with deep chocolate flavor'
      },
      12: {
        fullDescription: 'A classic Italian dessert featuring layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder. Our tiramisu is made fresh daily, allowing the flavors to meld perfectly. The name means "pick me up" in Italian, referring to the coffee and cocoa.',
        ingredients: ['Ladyfingers', 'Mascarpone Cheese', 'Espresso', 'Eggs', 'Sugar', 'Cocoa Powder', 'Vanilla Extract', 'Marsala Wine'],
        preparation: 'Layered dessert with coffee-soaked ladyfingers and mascarpone cream, chilled overnight.',
        servingSize: '1 portion (180g)',
        nutritionalInfo: { calories: 380, fat: '24g', carbs: '32g', protein: '8g' },
        origin: 'Veneto, Italy',
        flavorProfile: 'Creamy, Coffee-Infused, Light with cocoa finish'
      },
      13: {
        fullDescription: 'A limited edition seasonal latte featuring our special house blend with seasonal flavorings. Each season brings a new and exciting flavor profile, crafted to celebrate the time of year. Ask your barista about our current seasonal offering.',
        ingredients: ['Espresso', 'Steamed Milk', 'Seasonal Syrup', 'Milk Foam', 'Seasonal Garnish'],
        preparation: 'Espresso combined with steamed milk and seasonal flavoring, topped with foam.',
        servingSize: '240ml (8oz)',
        nutritionalInfo: { calories: 180, caffeine: '95mg', fat: '5g', carbs: '28g', protein: '6g' },
        origin: 'Seasonal Special',
        flavorProfile: 'Varies by season - ask your barista'
      }
    }
    return extendedInfo[item.id] || {
      fullDescription: item.description,
      ingredients: ['Fresh Ingredients'],
      preparation: 'Prepared with care by our expert chefs.',
      servingSize: '1 serving',
      nutritionalInfo: { calories: 'N/A', fat: 'N/A', carbs: 'N/A', protein: 'N/A' },
      origin: 'House Special',
      flavorProfile: 'Delicious and flavorful'
    }
  }

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

  const extendedInfo = getExtendedItemInfo(item)

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
                  {item.tags && item.tags.includes('New') && <span className="detail-badge new">New</span>}
                </div>
                <p className="detail-category">{item.category}</p>
              </div>

              <p className="detail-description-short">{item.description}</p>
              <p className="detail-description-full">{extendedInfo.fullDescription}</p>

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
            </div>
          </motion.div>

          {/* Extended Information Section */}
          <motion.div
            className="detail-extended-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="info-grid">
              <Card className="info-card">
                <h3 className="info-card-title">
                  <span className="info-icon">🍽️</span>
                  Ingredients
                </h3>
                <ul className="info-list">
                  {extendedInfo.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </Card>

              <Card className="info-card">
                <h3 className="info-card-title">
                  <span className="info-icon">👨‍🍳</span>
                  Preparation
                </h3>
                <p className="info-text">{extendedInfo.preparation}</p>
              </Card>

              <Card className="info-card">
                <h3 className="info-card-title">
                  <span className="info-icon">📊</span>
                  Nutritional Information
                </h3>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Calories</span>
                    <span className="nutrition-value">{extendedInfo.nutritionalInfo.calories}</span>
                  </div>
                  {extendedInfo.nutritionalInfo.caffeine && (
                    <div className="nutrition-item">
                      <span className="nutrition-label">Caffeine</span>
                      <span className="nutrition-value">{extendedInfo.nutritionalInfo.caffeine}</span>
                    </div>
                  )}
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fat</span>
                    <span className="nutrition-value">{extendedInfo.nutritionalInfo.fat}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Carbs</span>
                    <span className="nutrition-value">{extendedInfo.nutritionalInfo.carbs}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Protein</span>
                    <span className="nutrition-value">{extendedInfo.nutritionalInfo.protein}</span>
                  </div>
                  {extendedInfo.nutritionalInfo.fiber && (
                    <div className="nutrition-item">
                      <span className="nutrition-label">Fiber</span>
                      <span className="nutrition-value">{extendedInfo.nutritionalInfo.fiber}</span>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="info-card">
                <h3 className="info-card-title">
                  <span className="info-icon">🌍</span>
                  Origin & Details
                </h3>
                <div className="origin-info">
                  <div className="origin-item">
                    <strong>Origin:</strong> {extendedInfo.origin}
                  </div>
                  <div className="origin-item">
                    <strong>Serving Size:</strong> {extendedInfo.servingSize}
                  </div>
                  <div className="origin-item">
                    <strong>Flavor Profile:</strong> {extendedInfo.flavorProfile}
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MenuItemDetail
