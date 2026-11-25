// ─── Multi-Shape Point Cloud Sampler ─────────────────────────────────────────
// Samples the nolv logo + 4 pillar SVG icons onto offscreen canvases and
// resamples every shape to a fixed particle count in coherent row-major order.

import type { ShapeKey } from './pillarsData'

export interface ShapePoint {
  x: number
  y: number
}

export type ShapePointMap = Record<ShapeKey, ShapePoint[]>

interface ShapeSource {
  key: ShapeKey
  src: string
  /** Relative optical scale so pillar icons read clearly without changing the logo */
  opticalScale: number
  /** Optional vertical lift in normalized space so larger icons stay clear of the text */
  yOffset?: number
  /** Preserve original raw logo normalization */
  isPrimaryLogo?: boolean
}

const SHAPE_SOURCES: ShapeSource[] = [
  { key: 'logo', src: '/logo/nolv.png', opticalScale: 1.0, yOffset: 0, isPrimaryLogo: true },
  { key: 'elevation', src: '/shapes/elevation.svg', opticalScale: 0.96, yOffset: 0.22 },
  { key: 'exhibition', src: '/shapes/exhibition.svg', opticalScale: 0.95, yOffset: 0.22 },
  { key: 'evaluation', src: '/shapes/evaluation.svg', opticalScale: 0.98, yOffset: 0.22 },
  { key: 'recognition', src: '/shapes/recognition.svg', opticalScale: 0.96, yOffset: 0.22 },
  { key: 'workspace', src: '/shapes/workspace.svg', opticalScale: 0.98, yOffset: 0.22 },
  { key: 'exchange', src: '/shapes/exchange.svg', opticalScale: 1.0, yOffset: 0.22 },
  { key: 'ecosystem', src: '/shapes/ecosystem.svg', opticalScale: 1.0, yOffset: 0.22 },
]

export const SHAPE_PIVOT_Y: Record<ShapeKey, number> = {
  logo: 0,
  elevation: 0.22,
  exhibition: 0.22,
  evaluation: 0.22,
  recognition: 0.22,
  workspace: 0.22,
  exchange: 0.22,
  ecosystem: 0.22,
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
    img.src = src
  })
}

/**
 * Uniformly resamples an ordered point array to exactly `targetCount` points.
 * Because input points are extracted in row-major (y, x) scan order, uniform
 * index resampling preserves spatial coherence across all shapes.
 */
function resamplePoints(points: ShapePoint[], targetCount: number): ShapePoint[] {
  if (points.length === 0) {
    return Array.from({ length: targetCount }, () => ({ x: 0, y: 0 }))
  }
  if (points.length === targetCount) {
    return points
  }

  const resampled: ShapePoint[] = new Array(targetCount)
  const step = points.length / targetCount

  for (let i = 0; i < targetCount; i++) {
    const idx = Math.min(points.length - 1, Math.floor(i * step))
    resampled[i] = points[idx]
  }
  return resampled
}

function extractPointsFromImage(
  img: HTMLImageElement,
  targetCount: number,
  opticalScale: number,
  isPrimaryLogo: boolean,
  yOffset = 0
): ShapePoint[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return resamplePoints([], targetCount)

  const sampleW = 160
  const aspect = img.naturalHeight && img.naturalWidth
    ? img.naturalHeight / img.naturalWidth
    : 1
  const sampleH = Math.max(1, Math.floor(sampleW * aspect))

  canvas.width = sampleW
  canvas.height = sampleH
  ctx.clearRect(0, 0, sampleW, sampleH)
  ctx.drawImage(img, 0, 0, sampleW, sampleH)

  const data = ctx.getImageData(0, 0, sampleW, sampleH).data
  const rawPoints: ShapePoint[] = []

  // Step 2 keeps extraction fast while yielding dense silhouettes
  for (let y = 0; y < sampleH; y += 2) {
    for (let x = 0; x < sampleW; x += 2) {
      const alpha = data[(y * sampleW + x) * 4 + 3]
      if (alpha > 128) {
        const nx = (x / sampleW) - 0.5
        const ny = -((y / sampleH) - 0.5) * (sampleH / sampleW)
        rawPoints.push({
          x: nx * opticalScale,
          y: ny * opticalScale,
        })
      }
    }
  }

  // Keep original logo's exact framing; center non-logo icons tightly on their bounding box
  if (!isPrimaryLogo && rawPoints.length > 0) {
    let minX = Infinity, maxX = -Infinity
    let minY = Infinity, maxY = -Infinity
    for (let i = 0; i < rawPoints.length; i++) {
      const p = rawPoints[i]
      if (p.x < minX) minX = p.x
      if (p.x > maxX) maxX = p.x
      if (p.y < minY) minY = p.y
      if (p.y > maxY) maxY = p.y
    }
    const cx = (minX + maxX) * 0.5
    const cy = (minY + maxY) * 0.5
    for (let i = 0; i < rawPoints.length; i++) {
      rawPoints[i] = {
        x: rawPoints[i].x - cx,
        y: rawPoints[i].y - cy + yOffset,
      }
    }
  }

  return resamplePoints(rawPoints, targetCount)
}

/**
 * Loads and samples the primary nolv logo and all 4 pillar icons in parallel.
 */
export async function loadAllShapePoints(targetCount: number): Promise<ShapePointMap> {
  const results = await Promise.all(
    SHAPE_SOURCES.map(async (source) => {
      try {
        const img = await loadImage(source.src)
        const points = extractPointsFromImage(
          img,
          targetCount,
          source.opticalScale,
          Boolean(source.isPrimaryLogo),
          source.yOffset || 0
        )
        return [source.key, points] as const
      } catch (err) {
        console.error(`[shapeSampler] Failed to load shape "${source.key}" from ${source.src}`, err)
        return [source.key, resamplePoints([], targetCount)] as const
      }
    })
  )

  return Object.fromEntries(results) as ShapePointMap
}

