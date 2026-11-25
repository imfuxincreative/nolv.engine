// ─── Scroll Timeline & Pillar Manifesto Data ─────────────────────────────────
// 1-to-1 mapping: every single manifesto subtitle has its own dedicated icon
// checkpoint with a crisp ~0.2s hold and a 360° turntable morph between shapes.

export type ShapeKey =
  | 'logo'
  | 'elevation'
  | 'exhibition'
  | 'evaluation'
  | 'recognition'
  | 'workspace'
  | 'exchange'
  | 'ecosystem'

export interface PillarStage {
  id: string
  shapeKey: ShapeKey
  label: string
  title: string
  subtitle: string
  /** Scroll progress where particles begin morphing INTO this stage */
  morphStart: number
  /** Scroll progress where particles finish locking into this stage */
  morphEnd: number
  /** Ideal scroll progress to jump to when clicking this stage indicator */
  holdTarget: number
}

export const TIMELINE = {
  /** Camera finishes traveling from z=-2200 to z=150 (anamorphic logo lock) */
  TUNNEL_END: 0.50,
  /** Image cards start fading to monochrome particles */
  FADE_START: 0.45,
  /** Logo finishes lifting upward to frame the UI overlay */
  LIFT_END: 0.52,
  /** UI overlay begins revealing after the logo lifts */
  UI_REVEAL_START: 0.51,
  /** UI overlay reaches full visibility */
  UI_REVEAL_END: 0.53,
} as const

export const PILLAR_STAGES: PillarStage[] = [
  {
    id: 'intro',
    shapeKey: 'logo',
    label: 'nolv',
    title: 'nolv / No Limit Visual',
    subtitle: 'Introducing “nolv”, a creative engine for visual creatives.',
    morphStart: 0.50,
    morphEnd: 0.52,
    holdTarget: 0.528,
  },
  {
    id: 'elevation',
    shapeKey: 'elevation',
    label: '01',
    title: 'Elevated Creativity',
    subtitle:
      'A new space where creativity is not just shared, but measured, recognized, and elevated.',
    morphStart: 0.535,
    morphEnd: 0.580,
    holdTarget: 0.586,
  },
  {
    id: 'exhibition',
    shapeKey: 'exhibition',
    label: '02',
    title: 'Curated Exhibitions',
    subtitle:
      'Nolv empowers creators to host curated exhibitions across disciplines, defining their own standards of evaluation.',
    morphStart: 0.592,
    morphEnd: 0.637,
    holdTarget: 0.643,
  },
  {
    id: 'evaluation',
    shapeKey: 'evaluation',
    label: '03',
    title: 'Transparent Evaluation',
    subtitle:
      'Submit your visuals, participate in ongoing exhibitions, and have your work evaluated by both the community and curated juries through a transparent scoring system.',
    morphStart: 0.649,
    morphEnd: 0.694,
    holdTarget: 0.700,
  },
  {
    id: 'recognition',
    shapeKey: 'recognition',
    label: '04',
    title: 'Dynamic Recognition',
    subtitle:
      'Our intelligent system continuously identifies the most outstanding visuals, awarding titles like Visual of the Day, Week, and Month.',
    morphStart: 0.706,
    morphEnd: 0.751,
    holdTarget: 0.757,
  },
  {
    id: 'workspace',
    shapeKey: 'workspace',
    label: '05',
    title: 'Private Workspace',
    subtitle:
      'Beyond exhibitions, a private workspace to upload, organize, and manage digital assets seamlessly connected to a Creative Exchange.',
    morphStart: 0.763,
    morphEnd: 0.808,
    holdTarget: 0.814,
  },
  {
    id: 'exchange',
    shapeKey: 'exchange',
    label: '06',
    title: 'Creative Exchange',
    subtitle:
      'Document, showcase, discover, and sell everything from digital resources to fashion and products.',
    morphStart: 0.820,
    morphEnd: 0.865,
    holdTarget: 0.871,
  },
  {
    id: 'ecosystem',
    shapeKey: 'ecosystem',
    label: '07',
    title: 'Unified Ecosystem',
    subtitle:
      'All within a seamless social and discovery experience, connected to a global ranking system that gives creative influence a new dimension.',
    morphStart: 0.877,
    morphEnd: 0.922,
    holdTarget: 0.928,
  },
  {
    id: 'finale',
    shapeKey: 'logo',
    label: 'Join',
    title: 'nolv / No Limit Visual',
    subtitle: 'Together, we set the new standard for visual creators.',
    morphStart: 0.934,
    morphEnd: 0.980,
    holdTarget: 0.992,
  },
]

export interface ActiveMorphState {
  fromShape: ShapeKey
  toShape: ShapeKey
  /** 0 = fully fromShape, 1 = fully toShape */
  morphT: number
  /** Active stage index for UI display */
  uiStageIndex: number
  /** 0..1 opacity of the current stage's text block during morph crossfades */
  uiStageAlpha: number
}

/**
 * Resolves which two shapes should be interpolated and which UI stage is active
 * for any normalized scroll progress in [0, 1].
 */
export function resolveStageState(progress: number): ActiveMorphState {
  if (progress < PILLAR_STAGES[1].morphStart) {
    return {
      fromShape: 'logo',
      toShape: 'logo',
      morphT: 0,
      uiStageIndex: 0,
      uiStageAlpha: 1,
    }
  }

  for (let i = 1; i < PILLAR_STAGES.length; i++) {
    const prev = PILLAR_STAGES[i - 1]
    const curr = PILLAR_STAGES[i]
    const next = PILLAR_STAGES[i + 1]

    if (progress >= curr.morphStart && progress < curr.morphEnd) {
      const m = (progress - curr.morphStart) / (curr.morphEnd - curr.morphStart)
      if (m < 0.5) {
        return {
          fromShape: prev.shapeKey,
          toShape: curr.shapeKey,
          morphT: m,
          uiStageIndex: i - 1,
          uiStageAlpha: 1 - m / 0.5,
        }
      } else {
        return {
          fromShape: prev.shapeKey,
          toShape: curr.shapeKey,
          morphT: m,
          uiStageIndex: i,
          uiStageAlpha: (m - 0.5) / 0.5,
        }
      }
    }

    if (progress >= curr.morphEnd && (!next || progress < next.morphStart)) {
      return {
        fromShape: curr.shapeKey,
        toShape: curr.shapeKey,
        morphT: 1,
        uiStageIndex: i,
        uiStageAlpha: 1,
      }
    }
  }

  const lastIdx = PILLAR_STAGES.length - 1
  const last = PILLAR_STAGES[lastIdx]
  return {
    fromShape: last.shapeKey,
    toShape: last.shapeKey,
    morphT: 1,
    uiStageIndex: lastIdx,
    uiStageAlpha: 1,
  }
}
