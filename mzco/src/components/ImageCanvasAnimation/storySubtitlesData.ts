// ─── Scroll-Synced Opening Story Subtitles ───────────────────────────────────
// Shown exclusively during the 3D visual tunnel (0.00 -> 0.445).
// Once the nolv logo forms at 0.45, the manifesto continues directly under
// the logo and pillar icons inside FinalUIOverlay so there is never duplicate text.

export interface SubtitleCue {
  id: string
  /** Normalized scroll progress [0..1] where this line fades in */
  start: number
  /** Normalized scroll progress [0..1] where this line fades out */
  end: number
  /** Lines to render (each entry renders on its own line) */
  lines: string[]
  /** Optional future audio sync window (in seconds) */
  audioStartSec?: number
  audioEndSec?: number
}

export const STORY_SUBTITLES: SubtitleCue[] = [
  {
    id: 'opening-1',
    start: 0.01,
    end: 0.135,
    lines: [
      '“ Not everything great is popular.',
      'And not everything popular is great ”',
    ],
  },
  {
    id: 'opening-2',
    start: 0.14,
    end: 0.26,
    lines: [
      'We’ve built a digital world around',
      'views, likes, and algorithms. ',
    ],
  },
  {
    id: 'opening-3',
    start: 0.265,
    end: 0.38,
    lines: [' But creativity deserves something more meaningful. '],
  },
  {
    id: 'opening-4',
    start: 0.385,
    end: 0.495,
    lines: [' A space where the quality of your work matters. '],
  },
]

export interface ActiveSubtitleState {
  cueIndex: number
  /** Smooth 0..1 opacity for the active cue */
  opacity: number
}

/**
 * Finds the active opening subtitle cue and its smooth fade-in / fade-out opacity
 * for a given normalized scroll progress in [0, 1].
 */
export function resolveSubtitleState(progress: number): ActiveSubtitleState {
  for (let i = 0; i < STORY_SUBTITLES.length; i++) {
    const cue = STORY_SUBTITLES[i]
    if (progress >= cue.start && progress <= cue.end) {
      const span = Math.max(0.0001, cue.end - cue.start)
      const fadeLen = Math.min(0.012, span * 0.22)

      const fadeIn = Math.min(1, (progress - cue.start) / fadeLen)
      const fadeOut = Math.min(1, (cue.end - progress) / fadeLen)

      return {
        cueIndex: i,
        opacity: Math.max(0, Math.min(1, Math.min(fadeIn, fadeOut))),
      }
    }
  }

  return { cueIndex: -1, opacity: 0 }
}
