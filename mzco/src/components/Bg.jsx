import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const checkIsMobile = () => typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))

function Bg() {
  const [isMobile] = useState(() => checkIsMobile())
  const { isDarkMode } = useTheme()
  return (
    <div className='fixed top-0 pointer-events-none z-[0] h-screen w-screen bg-white flex justify-center items-center'>
      <div style={{ scale: isDarkMode ? (isMobile ? 6 : 3) : 0 }} className='rounded-full transition-transform duration-1000 h-[50vw] w-[50vw] bg-black'></div>
    </div>
  )
}

export default Bg