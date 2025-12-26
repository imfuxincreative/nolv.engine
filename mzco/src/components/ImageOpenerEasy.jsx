import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { RxCross2 } from 'react-icons/rx'

function ImageOpener({ src, rect, onClose }) {
  const handleBackdropClick = () => {
    onClose()
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] h-screen w-screen overflow-hidden"
      initial={{
        opacity: 0,
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(255,255,255,0)',
      }}
      animate={{
        opacity: 1,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,255,255,0.7)',
      }}
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(255,255,255,0)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={handleBackdropClick}   // ✅ outside click
    >
        <button onClick={handleBackdropClick} className="fixed top-5 bg-black  text-white right-5 z-[10000] rounded-full w-7 h-7 flex items-center justify-center "><RxCross2 size={16}/></button>
      <motion.img
        src={src}
        className=" w-screen lg:w-[20vw] object-contain"
        initial={{
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          scale: 1,
        }}
        animate={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          scale: 2.5,
        }}
        exit={{
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          scale: 1,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        onClick={stopPropagation}      // ❌ prevent close when clicking image
        draggable={false}
      />
    </motion.div>,
    document.body
  )
}

export default ImageOpener
