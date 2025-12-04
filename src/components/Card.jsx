import { motion } from 'framer-motion'
import './Card.css'

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      className={`card ${className}`}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      data-cursor="hover"
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
