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
  const [phase, setPhase] = useState<'idle' | 'loading' | 'complete'>('idle')

  // Trigger GPU-composited CSS transition after initial paint
  useEffect(() => {
    let raf2: number
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setPhase('loading')
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [])

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

  // Smoothly finish bar to 100%, then fade out once both conditions are met
  useEffect(() => {
    if (sceneReady && minTimeElapsed) {
      setPhase('complete')
      const fadeTimer = setTimeout(() => {
        setFadeOut(true)
      }, 320)
      const hideTimer = setTimeout(() => {
        setVisible(false)
        document.body.style.overflow = ''
        onComplete?.()
      }, 1020)
      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [sceneReady, minTimeElapsed, onComplete])

  if (!visible) return null

  const fillPhaseClass =
    phase === 'complete'
      ? styles.progressComplete
      : phase === 'loading'
        ? styles.progressLoading
        : ''

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}>
      <div className={styles.inner}>
        <img
          src="/logo/nolv.png"
          alt=""
          className={styles.logo}
          draggable={false}
        />
        <div className={styles.progressTrack} role="progressbar" aria-label="Loading">
          <div className={`${styles.progressFill} ${fillPhaseClass}`} />
        </div>
      </div>
    </div>
  )
}
