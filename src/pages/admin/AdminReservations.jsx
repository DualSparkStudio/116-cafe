import { useState, useEffect } from 'react'
import { getReservations, updateReservation } from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import './AdminReservations.css'

const AdminReservations = () => {
  const [reservations, setReservations] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = async () => {
    try {
      const data = await getReservations()
      setReservations(data)
    } catch (error) {
      console.error('Failed to load reservations:', error)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReservation(id, { status: newStatus })
      loadReservations()
    } catch (error) {
      alert('Failed to update reservation: ' + error.message)
    }
  }

  const filteredReservations = reservations.filter(r => {
    if (filter === 'all') return true
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0]
      return r.date === today
    }
    return r.status === filter
  })

  return (
    <AdminLayout>
      <div className="admin-reservations">
        <div className="admin-header">
          <h1>Reservations</h1>
          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'today' ? 'active' : ''}
              onClick={() => setFilter('today')}
            >
              Today
            </button>
            <button
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={filter === 'confirmed' ? 'active' : ''}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
          </div>
        </div>

        <div className="reservations-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                    No reservations found
                  </td>
                </tr>
              ) : (
                filteredReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td><strong>{reservation.name}</strong></td>
                    <td>
                      <div>{reservation.email}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                        {reservation.phone}
                      </div>
                    </td>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.guests}</td>
                    <td>
                      <select
                        value={reservation.status}
                        onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                        className={`status-select status-${reservation.status}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      {reservation.specialRequests && (
                        <div className="special-requests" title={reservation.specialRequests}>
                          📝
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminReservations
