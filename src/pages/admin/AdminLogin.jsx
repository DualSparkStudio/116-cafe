import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/store'
import { login } from '../../api/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import './AdminLogin.css'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login: loginStore } = useStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await login(email, password)
      localStorage.setItem('adminToken', response.token)
      loginStore(response.user, response.token)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          <p className="admin-login-subtitle">Sign in to manage your cafe</p>
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && <div className="admin-error">{error}</div>}
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button
              type="submit"
              variant="accent"
              size="large"
              className="admin-login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="admin-login-note">
            <p>Demo credentials:</p>
            <p>Email: admin@premiumcafe.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
