import { motion } from 'framer-motion'
import './Button.css'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  href,
  className = '',
  ...props
}) => {
  const buttonClasses = `btn btn-${variant} btn-${size} ${className}`

  const buttonContent = (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      data-cursor="hover"
      {...props}
    >
      <span className="btn-text">{children}</span>
      <span className="btn-bg"></span>
    </motion.button>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        data-cursor="hover"
        {...props}
      >
        <span className="btn-text">{children}</span>
        <span className="btn-bg"></span>
      </motion.a>
    )
  }

  return buttonContent
}

export default Button
