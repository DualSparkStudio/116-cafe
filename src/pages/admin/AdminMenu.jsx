import { useState, useEffect } from 'react'
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem, getCategories, createCategory } from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './AdminMenu.css'

const AdminMenu = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: '',
    bestseller: false,
    available: true
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [menuData, categoriesData] = await Promise.all([
        getMenu(),
        getCategories()
      ])
      setItems(menuData.items)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Failed to load menu:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      }

      if (editingItem) {
        await updateMenuItem(editingItem.id, itemData)
      } else {
        await createMenuItem(itemData)
      }

      setIsModalOpen(false)
      setEditingItem(null)
      resetForm()
      loadData()
    } catch (error) {
      alert('Failed to save item: ' + error.message)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      tags: item.tags.join(', '),
      bestseller: item.bestseller || false,
      available: item.available !== false
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      await deleteMenuItem(id)
      loadData()
    } catch (error) {
      alert('Failed to delete item: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      tags: '',
      bestseller: false,
      available: true
    })
  }

  return (
    <AdminLayout>
      <div className="admin-menu">
        <div className="admin-header">
          <h1>Menu Management</h1>
          <Button
            variant="accent"
            onClick={() => {
              resetForm()
              setEditingItem(null)
              setIsModalOpen(true)
            }}
          >
            + Add Item
          </Button>
        </div>

        <div className="admin-menu-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    {item.bestseller && <span className="badge bestseller">Bestseller</span>}
                  </td>
                  <td>{item.category}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.tags.join(', ')}</td>
                  <td>
                    <span className={`status ${item.available ? 'available' : 'unavailable'}`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
              <form onSubmit={handleSubmit}>
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <div className="input-group">
                  <label className="input-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                    rows="3"
                    required
                  />
                </div>
                <Input
                  label="Price"
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                <div className="input-group">
                  <label className="input-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Tags (comma-separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Hot, Cold, Vegan, Bestseller"
                />
                <div className="form-checkboxes">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.bestseller}
                      onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    />
                    Bestseller
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    />
                    Available
                  </label>
                </div>
                <div className="modal-actions">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="accent">
                    {editingItem ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminMenu
