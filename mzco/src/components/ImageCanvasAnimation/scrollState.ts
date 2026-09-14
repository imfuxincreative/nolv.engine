// ─── Shared Scroll State ──────────────────────────────────────────────────────
// Updated ONCE per frame by ScrollUpdater inside the Canvas.
// All components read from this object instead of hitting the DOM individually.
// This eliminates 1200+ redundant DOM reads per frame.

export interface ScrollState {
  progress: number;
  scrollY: number;
  scrollMax: number;
  scrollVelocity: number;
  layoutProgress: number;
  introOffset: number;
  introStartTime: number | null;
}

export const scrollState: ScrollState = {
  progress: 0,
  scrollY: 0,
  scrollMax: 1,
  scrollVelocity: 0,
  layoutProgress: 0,
  introOffset: 0,
  introStartTime: null,
}

export interface InteractState {
  focusedIndex: number | null;
}

export function updateScrollState(): void {
  const prevY = scrollState.scrollY
  scrollState.scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  const newScrollY = window.scrollY

  if (interactState.focusedIndex !== null) {
    if (Math.abs(newScrollY - scrollState.scrollY) > 5) {
      interactState.focusedIndex = null;
    }
  }

  scrollState.scrollY = newScrollY
  scrollState.progress = Math.min(1, Math.max(0, scrollState.scrollY / scrollState.scrollMax))
  scrollState.scrollVelocity = newScrollY - prevY
}

export const interactState: InteractState = {
  focusedIndex: null
}
