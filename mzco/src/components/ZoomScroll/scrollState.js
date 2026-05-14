// ─── Shared Scroll State ──────────────────────────────────────────────────────
// Updated ONCE per frame by ScrollUpdater inside the Canvas.
// All components read from this object instead of hitting the DOM individually.
// This eliminates 1200+ redundant DOM reads per frame.

export const scrollState = {
  progress: 0,
  scrollY: 0,
  scrollMax: 1,
}

export function updateScrollState() {
  scrollState.scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  const newScrollY = window.scrollY
  
  if (interactState.focusedIndex !== null) {
    if (Math.abs(newScrollY - scrollState.scrollY) > 5) {
      interactState.focusedIndex = null;
    }
  }

  scrollState.scrollY = newScrollY
  scrollState.progress = Math.min(1, Math.max(0, scrollState.scrollY / scrollState.scrollMax))
}

export const interactState = {
  focusedIndex: null
}

