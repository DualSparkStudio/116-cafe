import { useState, useEffect } from 'react'
import { getGallery, addGalleryImage, deleteGalleryImage } from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './AdminGallery.css'

const AdminGallery = () => {
  const [images, setImages] = useState([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      const data = await getGallery()
      setImages(data)
    } catch (error) {
      console.error('Failed to load gallery:', error)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newImageUrl.trim()) return

    setIsLoading(true)
    try {
      await addGalleryImage(newImageUrl)
      setNewImageUrl('')
      loadGallery()
    } catch (error) {
      alert('Failed to add image: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (index) => {
    if (!confirm('Are you sure you want to remove this image?')) return
    try {
      await deleteGalleryImage(index)
      loadGallery()
    } catch (error) {
      alert('Failed to delete image: ' + error.message)
    }
  }

  return (
    <AdminLayout>
      <div className="admin-gallery">
        <div className="admin-header">
          <h1>Gallery Management</h1>
        </div>

        <div className="gallery-add-form">
          <form onSubmit={handleAdd}>
            <Input
              label="Image URL"
              name="imageUrl"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <Button type="submit" variant="accent" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Image'}
            </Button>
          </form>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`Gallery ${index + 1}`} />
              <button
                className="gallery-delete-btn"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminGallery
