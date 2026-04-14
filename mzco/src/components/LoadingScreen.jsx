import { useState, useEffect, useRef } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ sceneReady, onComplete }) {
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
      const timer = setTimeout(() => {
        setVisible(false)
        document.body.style.overflow = ''
        onComplete?.()
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [sceneReady, minTimeElapsed])

  if (!visible) return null

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen--fade' : ''}`}>
      <div className="loading-screen__inner">
        <img
          src="/nolv.png"
          alt=""
          className="loading-screen__logo w-4"
          draggable={false}
        />
        <svg className="loading-screen__spinner" viewBox="0 0 50 50">
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
