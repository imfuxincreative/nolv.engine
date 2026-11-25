import React, { useEffect, useRef, useState } from 'react'
import { scrollState, interactState } from './scrollState'
import { STORY_SUBTITLES, resolveSubtitleState } from './storySubtitlesData'
import { useTheme } from '../../context/ThemeContext'
import styles from './StorySubtitles.module.css'

// ─── Cinematic Scroll-Synced Subtitles ────────────────────────────────────────
// PERF: Opacity is driven directly via DOM ref in rAF; React state only updates
// when switching to a different subtitle cue.
export default function StorySubtitles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastCueRef = useRef(-1)
  const lastOpacityRef = useRef(-1)
  const [activeCueIndex, setActiveCueIndex] = useState(-1)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    let rafId: ReturnType<typeof requestAnimationFrame>

    const tick = () => {
      const progress = scrollState.progress || 0
      const lp = scrollState.layoutProgress || 0
      const layoutAlpha = Math.pow(1 - lp, 6)
      const isFocused = interactState.focusedIndex !== null

      const { cueIndex, opacity } = resolveSubtitleState(progress)
      const targetOpacity = isFocused ? 0 : opacity * layoutAlpha

      if (cueIndex !== -1 && cueIndex !== lastCueRef.current) {
        lastCueRef.current = cueIndex
        setActiveCueIndex(cueIndex)
      }

      const rounded = Math.round(targetOpacity * 50) / 50
      if (rounded !== lastOpacityRef.current && containerRef.current) {
        lastOpacityRef.current = rounded
        containerRef.current.style.opacity = String(rounded)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const cue = activeCueIndex >= 0 ? STORY_SUBTITLES[activeCueIndex] : null

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      style={{ opacity: 0 }}
      aria-live="polite"
    >
      {cue && (
        <p
          className={`${styles.subtitleText} ${
            isDarkMode ? styles.textDark : styles.textLight
          }`}
        >
          {cue.lines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < cue.lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  )
}

