# Premium Cafe Website

A stunning, modern, premium website for cafe owners with a full admin panel for managing all dynamic content. Built with React, featuring smooth animations, premium UI/UX, and a complete content management system.

## Features

### Public Website
- **Home Page** with hero section, signature items, about section, menu preview, gallery, testimonials, and location/hours
- **Full Menu Page** with filtering, search, and category navigation
- **Reservations Page** with booking form
- **Contact Page** with contact form and information
- **About Page** with storytelling sections

### Admin Panel
- **Authentication** - Secure login system
- **Dashboard** - Overview with statistics
- **Menu Management** - Full CRUD for menu items and categories
- **Reservations Management** - View and manage table reservations
- **Gallery Management** - Add/remove gallery images
- **Content Management** - Edit all site content (hero, about, contact info, hours, social links)
- **Testimonials Management** - Add/edit/delete customer reviews
- **Settings** - Configure site settings and SEO

### Premium Features
- Smooth scrolling with Lenis
- GSAP ScrollTrigger animations
- AOS scroll-in animations
- Framer Motion for transitions
- Custom magnetic cursor
- Fully responsive design
- Premium typography and spacing
- Modern UI with warm, neutral color scheme

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS Modules
- **Animations**: GSAP, AOS, Framer Motion
- **Smooth Scroll**: Lenis
- **State Management**: Zustand
- **Routing**: React Router
- **Backend**: Express.js
- **Authentication**: JWT

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend API
npm run server
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Admin Login

- **URL**: http://localhost:3000/admin/login
- **Email**: admin@premiumcafe.com
- **Password**: admin123

## Project Structure

```
premium-cafe-website/
├── src/
│   ├── components/          # Reusable components
│   │   ├── admin/           # Admin-specific components
│   │   └── sections/        # Home page sections
│   ├── pages/               # Page components
│   │   └── admin/           # Admin pages
│   ├── api/                 # API functions
│   ├── context/             # React context
│   ├── store/               # Zustand store
│   └── styles/              # Global styles
├── server/                  # Express backend
│   └── index.js             # API server
└── public/                  # Static assets
```

## API Endpoints

### Public Endpoints
- `GET /api/menu` - Get all menu items
- `GET /api/categories` - Get all categories
- `GET /api/gallery` - Get gallery images
- `GET /api/content` - Get site content
- `GET /api/testimonials` - Get testimonials
- `GET /api/settings` - Get settings
- `POST /api/reservations` - Create reservation
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Require Authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/reservations` - Get all reservations
- `PUT /api/admin/reservations/:id` - Update reservation
- `POST /api/admin/menu` - Create menu item
- `PUT /api/admin/menu/:id` - Update menu item
- `DELETE /api/admin/menu/:id` - Delete menu item
- `POST /api/admin/gallery` - Add gallery image
- `DELETE /api/admin/gallery/:index` - Delete gallery image
- `PUT /api/admin/content` - Update site content
- `POST /api/admin/testimonials` - Create testimonial
- `PUT /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial
- `PUT /api/admin/settings` - Update settings

## Customization

### Colors
Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --color-primary: #8B5A3C;
  --color-accent: #D4A574;
  --color-text: #111111;
  --color-bg: #FAF8F5;
  /* ... */
}
```

### Fonts
Fonts are loaded from Google Fonts in `index.html`. Change the font families in the CSS variables.

### Images
Replace placeholder images with your own. The gallery and menu items use image URLs - you can upload to a service like Cloudinary or use local images.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Notes

- The backend uses in-memory storage for demo purposes. For production, connect to a real database (MongoDB, PostgreSQL, etc.)
- JWT secret should be changed in production
- Image uploads are currently URL-based. For production, implement file upload handling
- The admin password is hardcoded for demo. Use proper password hashing and storage in production

## License

This project is open source and available for use.

## Support

For issues or questions, please open an issue on the repository.
