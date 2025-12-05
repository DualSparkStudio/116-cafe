import { Link } from 'react-router-dom'
import { useStore } from '../store/store'
import './Footer.css'

const Footer = () => {
  const { siteContent, settings } = useStore()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Premium Cafe</h3>
            <p className="footer-description">
              Crafting exceptional coffee experiences and warm moments since day one.
            </p>
            <div className="footer-social">
              <a
                href={siteContent.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                data-cursor-label="Instagram"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={siteContent.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                data-cursor-label="Facebook"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href={siteContent.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                data-cursor-label="WhatsApp"
                aria-label="WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>{siteContent.address}</li>
              <li><a href={`tel:${siteContent.phone}`}>{siteContent.phone}</a></li>
              <li><a href={`mailto:${siteContent.email}`}>{siteContent.email}</a></li>
            </ul>
          </div>

          {settings.showNewsletter && (
            <div className="footer-section">
              <h4>Newsletter</h4>
              <p className="newsletter-text">Subscribe to get updates on new menu items and special offers.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button" data-cursor="hover">
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Premium Cafe. All rights reserved.</p>
          <p className="footer-credit">
            Designed by{' '}
            <a
              href="https://dualsparkstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
            >
              DualSpark Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
