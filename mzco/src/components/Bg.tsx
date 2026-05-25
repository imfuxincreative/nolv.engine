import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import styles from './Bg.module.css'

const checkIsMobile = () => typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))

function Bg() {
  const [isMobile] = useState(() => checkIsMobile())
  const { isDarkMode } = useTheme()
  return (
    <div className={styles.bgContainer}>
      <div style={{ scale: isDarkMode ? (isMobile ? 6 : 3) : 0 }} className={styles.bgInner}></div>
    </div>
  )
}

export default Bg