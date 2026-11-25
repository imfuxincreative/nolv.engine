import React, { useRef, useEffect, useState, useCallback } from 'react'
import { scrollState, interactState } from './scrollState'
import { TIMELINE, PILLAR_STAGES, resolveStageState } from './pillarsData'
import { useTheme } from '../../context/ThemeContext'
import { useSmoothScroll } from '../../context/LenisContext'
import styles from './FinalUIOverlay.module.css'

// ─── Final UI Overlay (Multi-Stage Manifesto & Pillars) ───────────────────────
// PERF: Per-frame opacity and mask wipes are applied directly via DOM refs.
// React state only updates when crossing into a new stage.
export default function FinalUIOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)

  const lastContainerRounded = useRef(-1)
  const lastStageAlpha = useRef(-1)
  const lastStageIndex = useRef(0)

  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const { isDarkMode } = useTheme()
  const lenisRef = useSmoothScroll()

  const handleJumpToStage = useCallback(
    (holdTarget: number) => {
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const targetY = holdTarget * scrollMax
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetY, { duration: 1.3 })
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' })
      }
    },
    [lenisRef]
  )

  useEffect(() => {
    let rafId: ReturnType<typeof requestAnimationFrame>

    const tick = () => {
      const scrollProgress = scrollState.progress || 0

      // Initial reveal after the logo finishes lifting into position
      const revealRange = TIMELINE.UI_REVEAL_END - TIMELINE.UI_REVEAL_START
      const introFade = Math.max(
        0,
        Math.min(1, (scrollProgress - TIMELINE.UI_REVEAL_START) / revealRange)
      )

      // Only show overlay when deeply inside 3D mode (layoutProgress near 0)
      const lp = scrollState.layoutProgress || 0
      const layoutAlpha = Math.pow(1 - lp, 8)

      const isFocused = interactState.focusedIndex !== null
      const containerFade = isFocused ? 0 : introFade * layoutAlpha

      // 1. Update overall container mask wipe & pointer events
      const roundedContainer = Math.round(containerFade * 50) / 50
      if (roundedContainer !== lastContainerRounded.current && overlayRef.current) {
        lastContainerRounded.current = roundedContainer
        const X = containerFade * 150 - 50
        const Y = X + 50
        overlayRef.current.style.webkitMaskImage = `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`
        overlayRef.current.style.maskImage = `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`
        overlayRef.current.style.pointerEvents = containerFade > 0.85 ? 'auto' : 'none'
      }

      // 2. Resolve active stage (1-to-1 icon & subtitle)
      const stage = resolveStageState(scrollProgress)
      if (stage.uiStageIndex !== lastStageIndex.current) {
        lastStageIndex.current = stage.uiStageIndex
        setActiveStageIndex(stage.uiStageIndex)
      }

      // Opacity-only crossfade for stage block
      const stageAlphaRounded = Math.round(stage.uiStageAlpha * 50) / 50
      if (stageAlphaRounded !== lastStageAlpha.current && textBlockRef.current) {
        lastStageAlpha.current = stageAlphaRounded
        textBlockRef.current.style.opacity = String(stageAlphaRounded)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const currentStage = PILLAR_STAGES[activeStageIndex] || PILLAR_STAGES[0]
  const textColorClass = isDarkMode ? styles.textWhite : styles.textBlack

  return (
    <div
      ref={overlayRef}
      className={styles.container}
      style={{ opacity: 1 }}
    >
      <div className={styles.inner} style={{ fontFamily: 'sans-serif' }}>
        {/* Dynamic stage title + manifesto subtitle synced 1-to-1 with particle morphs */}
        <div ref={textBlockRef} className={styles.stageTextBlock}>
          <h3 className={`${styles.title} ${textColorClass}`}>
            {currentStage.title}
          </h3>

          <p className={`${styles.subtitle} ${textColorClass}`}>
            {currentStage.subtitle}
          </p>
        </div>

        {/* Persistent CTA */}
        <button
          onClick={() => window.open('https://nolv.club/signup', '_self')}
          className={`${styles.btn} ${isDarkMode ? styles.btnDark : styles.btnLight}`}
        >
          Join now
        </button>

        {/* Minimal clickable stage navigation pills */}
        <nav
          className={styles.stageNav}
          aria-label="Platform pillars navigation"
        >
          {PILLAR_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleJumpToStage(stage.holdTarget)}
                className={`${styles.stagePill} ${textColorClass} ${
                  isActive ? styles.stagePillActive : ''
                }`}
                aria-current={isActive ? 'step' : undefined}
                title={stage.title}
              >
                <span className={styles.stageLabel}>{stage.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
