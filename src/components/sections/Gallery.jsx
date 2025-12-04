import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/store'
import './Gallery.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const { galleryImages } = useStore()

  // Mock gallery images
  const images = [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&h=600&fit=crop'
  ]

  return (
    <>
      <section className="gallery section" data-aos="fade-up">
        <div className="container">
          <div className="gallery-header">
            <h2 className="section-heading">Gallery</h2>
            <p className="section-subheading">
              A glimpse into our warm atmosphere and crafted moments
            </p>
          </div>
          <div className="gallery-grid">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                onClick={() => setSelectedImage(image)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                data-cursor="hover"
                data-cursor-label="View"
              >
                <img src={image} alt={`Gallery ${index + 1}`} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span>View</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Gallery"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="gallery-modal-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
