import { AnimatePresence , motion } from 'framer-motion'
import React from 'react'

const PageAnimation = ({
  children , keyValue , initial = {opacity: 0}, animate = {opacity: 1}, transition = {duration: 2},className
}) => {
  return (
    <AnimatePresence>
      <motion.div
      key = {keyValue}
      initial = {initial}
      animate = {animate}
      transition = {transition}
      className = {className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageAnimation