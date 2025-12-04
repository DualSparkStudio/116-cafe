import { useEffect, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e) => {
      const element = e.target
      if (
        element.tagName === 'BUTTON' ||
        element.tagName === 'A' ||
        element.closest('button') ||
        element.closest('a') ||
        element.closest('[data-cursor="hover"]')
      ) {
        setIsHovering(true)
        const cursorLabel = element.getAttribute('data-cursor-label') || 
                          element.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') || ''
        setLabel(cursorLabel)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setLabel('')
    }

    window.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}

export default CustomCursor
