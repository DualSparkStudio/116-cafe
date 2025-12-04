import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import { getStats } from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    todayReservations: 0,
    pendingReservations: 0,
    totalReservations: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await getStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Menu Items',
      value: stats.totalMenuItems,
      icon: '☕',
      link: '/admin/menu',
      color: '#8B5A3C'
    },
    {
      title: "Today's Reservations",
      value: stats.todayReservations,
      icon: '📅',
      link: '/admin/reservations',
      color: '#D4A574'
    },
    {
      title: 'Pending Reservations',
      value: stats.pendingReservations,
      icon: '⏳',
      link: '/admin/reservations',
      color: '#8B5A3C'
    },
    {
      title: 'Total Reservations',
      value: stats.totalReservations,
      icon: '📋',
      link: '/admin/reservations',
      color: '#D4A574'
    }
  ]

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Dashboard</h1>
        <p className="admin-subtitle">Overview of your cafe management</p>

        {isLoading ? (
          <div className="admin-loading">Loading...</div>
        ) : (
          <div className="admin-stats-grid">
            {statCards.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className="admin-stat-card"
                style={{ '--card-color': card.color }}
              >
                <div className="stat-icon">{card.icon}</div>
                <div className="stat-content">
                  <h3>{card.title}</h3>
                  <p className="stat-value">{card.value}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="admin-quick-links">
          <h2>Quick Actions</h2>
          <div className="quick-links-grid">
            <Link to="/admin/menu" className="quick-link-card">
              <span className="quick-link-icon">📝</span>
              <h3>Manage Menu</h3>
              <p>Add, edit, or remove menu items</p>
            </Link>
            <Link to="/admin/reservations" className="quick-link-card">
              <span className="quick-link-icon">📅</span>
              <h3>View Reservations</h3>
              <p>Manage table reservations</p>
            </Link>
            <Link to="/admin/gallery" className="quick-link-card">
              <span className="quick-link-icon">🖼️</span>
              <h3>Manage Gallery</h3>
              <p>Update gallery images</p>
            </Link>
            <Link to="/admin/content" className="quick-link-card">
              <span className="quick-link-icon">✏️</span>
              <h3>Edit Content</h3>
              <p>Update site content and information</p>
            </Link>
            <Link to="/admin/testimonials" className="quick-link-card">
              <span className="quick-link-icon">💬</span>
              <h3>Testimonials</h3>
              <p>Manage customer reviews</p>
            </Link>
            <Link to="/admin/settings" className="quick-link-card">
              <span className="quick-link-icon">⚙️</span>
              <h3>Settings</h3>
              <p>Configure site settings</p>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
