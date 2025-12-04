import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../Button'
import './AdminLayout.css'

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useStore()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/menu', label: 'Menu', icon: '☕' },
    { path: '/admin/reservations', label: 'Reservations', icon: '📅' },
    { path: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/admin/content', label: 'Content', icon: '✏️' },
    { path: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-logo">
            <h2>Premium Cafe</h2>
            <p>Admin Panel</p>
          </Link>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item">
            <span className="nav-icon">🏠</span>
            <span className="nav-label">View Site</span>
          </Link>
          <Button variant="ghost" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
