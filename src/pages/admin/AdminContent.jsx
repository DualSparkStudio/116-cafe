import { useState, useEffect } from 'react'
import { getContent, updateContent } from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './AdminContent.css'

const AdminContent = () => {
  const [content, setContent] = useState({
    heroHeading: '',
    heroSubheading: '',
    aboutText: '',
    address: '',
    phone: '',
    email: '',
    openingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    socialLinks: {
      instagram: '',
      facebook: '',
      whatsapp: ''
    }
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const data = await getContent()
      setContent(data)
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setContent(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setContent(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateContent(content)
      alert('Content updated successfully!')
    } catch (error) {
      alert('Failed to update content: ' + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="admin-content">
        <div className="admin-header">
          <h1>Content Management</h1>
        </div>

        <form onSubmit={handleSubmit} className="content-form">
          <div className="content-section">
            <h2>Hero Section</h2>
            <Input
              label="Hero Heading"
              name="heroHeading"
              value={content.heroHeading}
              onChange={(e) => handleChange('heroHeading', e.target.value)}
            />
            <Input
              label="Hero Subheading"
              name="heroSubheading"
              value={content.heroSubheading}
              onChange={(e) => handleChange('heroSubheading', e.target.value)}
            />
          </div>

          <div className="content-section">
            <h2>About Section</h2>
            <div className="input-group">
              <label className="input-label">About Text</label>
              <textarea
                name="aboutText"
                value={content.aboutText}
                onChange={(e) => handleChange('aboutText', e.target.value)}
                className="input-field"
                rows="5"
              />
            </div>
          </div>

          <div className="content-section">
            <h2>Contact Information</h2>
            <Input
              label="Address"
              name="address"
              value={content.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            <Input
              label="Phone"
              name="phone"
              value={content.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={content.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="content-section">
            <h2>Opening Hours</h2>
            {Object.keys(content.openingHours).map((day) => (
              <Input
                key={day}
                label={day.charAt(0).toUpperCase() + day.slice(1)}
                name={`openingHours.${day}`}
                value={content.openingHours[day]}
                onChange={(e) => handleChange(`openingHours.${day}`, e.target.value)}
                placeholder="9:00 AM - 6:00 PM"
              />
            ))}
          </div>

          <div className="content-section">
            <h2>Social Links</h2>
            <Input
              label="Instagram URL"
              name="socialLinks.instagram"
              value={content.socialLinks.instagram}
              onChange={(e) => handleChange('socialLinks.instagram', e.target.value)}
            />
            <Input
              label="Facebook URL"
              name="socialLinks.facebook"
              value={content.socialLinks.facebook}
              onChange={(e) => handleChange('socialLinks.facebook', e.target.value)}
            />
            <Input
              label="WhatsApp URL"
              name="socialLinks.whatsapp"
              value={content.socialLinks.whatsapp}
              onChange={(e) => handleChange('socialLinks.whatsapp', e.target.value)}
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="accent" size="large" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminContent
