import { useEffect, useRef } from 'react'

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    // Lenis is initialized in App.jsx
    // This component just wraps children for smooth scroll context
  }, [])

  return <div ref={scrollRef}>{children}</div>
}

export default SmoothScroll
