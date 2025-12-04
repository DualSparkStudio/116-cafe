# Quick Start Guide

## Installation & Setup

1. **Install all dependencies:**
```bash
npm install
```

2. **Start the development servers:**

Open two terminal windows:

**Terminal 1 - Frontend:**
```bash
npm run dev
```
This starts the React app on http://localhost:3000

**Terminal 2 - Backend API:**
```bash
npm run server
```
This starts the Express API server on http://localhost:5000

## First Steps

1. **Visit the website:** http://localhost:3000
2. **Access admin panel:** http://localhost:3000/admin/login
   - Email: `admin@premiumcafe.com`
   - Password: `admin123`

## Key Features to Try

### Public Site
- Navigate through all pages (Home, Menu, About, Reservations, Contact)
- Try the menu filtering and search
- Submit a reservation or contact form
- View the gallery with image modal

### Admin Panel
- View dashboard statistics
- Add/edit/delete menu items
- Manage reservations (change status)
- Add gallery images
- Edit site content (hero text, about, contact info, hours)
- Manage testimonials
- Update settings

## Customization Tips

1. **Change colors:** Edit `src/styles/index.css` CSS variables
2. **Update content:** Use the admin panel or edit `src/store/store.js` for default content
3. **Add images:** Replace placeholder URLs with your own image URLs
4. **Modify fonts:** Change Google Fonts in `index.html` and CSS variables

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. The `dist` folder contains the production build

3. For the backend, deploy `server/index.js` to a Node.js hosting service (Heroku, Railway, etc.)

4. Update API endpoints in `src/api/api.js` to point to your production backend

## Troubleshooting

- **Port already in use:** Change ports in `vite.config.js` (frontend) and `server/index.js` (backend)
- **CORS errors:** Ensure backend is running and proxy is configured in `vite.config.js`
- **Admin login fails:** Check that backend server is running on port 5000

Enjoy building your premium cafe website! ☕
