import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ImageOpener({ src }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.img
        src={src}
        alt=""
        className="w-[35vw] object-cover cursor-pointer"
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.97 }} // 👈 this adds the tap animation
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              src={src}
              alt=""
              className="max-w-[90vw] max-h-[90vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageOpener
