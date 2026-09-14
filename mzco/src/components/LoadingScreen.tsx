import { useState, useEffect } from 'react'
import styles from './LoadingScreen.module.css'

interface LoadingScreenProps {
  sceneReady: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ sceneReady, onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // Minimum display time
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Lock scroll while loading
  useEffect(() => {
    if (visible && !fadeOut) {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [visible, fadeOut])

  // Fade out once both conditions are met
  useEffect(() => {
    if (sceneReady && minTimeElapsed) {
      setFadeOut(true)
      onComplete?.()
      const timer = setTimeout(() => {
        setVisible(false)
        document.body.style.overflow = ''
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [sceneReady, minTimeElapsed])

  if (!visible) return null

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}>
      <div className={styles.inner}>
        <img
          src="/logo/nolv.png"
          alt=""
          className={styles.logo}
          draggable={false}
        />
        <svg className={styles.spinner} viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="22"
            fill="none"
            stroke="rgba(0,0,0,0.45)"
            strokeWidth="1"
            strokeDasharray="69.11"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          <circle
            cx="25"
            cy="25"
            r="22"
            fill="none"
            stroke="rgba(0,0,0,0.45)"
            strokeWidth="1"
            strokeDasharray="69.11"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
