import { useState, useEffect } from 'react'
import { getSettings, updateSettings } from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './AdminSettings.css'

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: '',
    metaDescription: '',
    showNewsletter: true
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await getSettings()
      setSettings(data)
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateSettings(settings)
      alert('Settings updated successfully!')
    } catch (error) {
      alert('Failed to update settings: ' + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="admin-settings">
        <div className="admin-header">
          <h1>Settings</h1>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <h2>Site Information</h2>
            <Input
              label="Site Title"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            />
            <div className="input-group">
              <label className="input-label">Meta Description</label>
              <textarea
                name="metaDescription"
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="input-field"
                rows="3"
                placeholder="Brief description for search engines"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Features</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.showNewsletter}
                onChange={(e) => setSettings({ ...settings, showNewsletter: e.target.checked })}
              />
              Show Newsletter Section in Footer
            </label>
          </div>

          <div className="form-actions">
            <Button type="submit" variant="accent" size="large" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings
