import { Navigate } from 'react-router-dom'
import { useStore } from '../store/store'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useStore()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
