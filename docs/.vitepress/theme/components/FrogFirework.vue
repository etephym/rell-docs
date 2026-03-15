<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const HOLD_DURATION = 2000
const FROG_EMOJI    = '🐸'

const route    = useRoute()
const { site } = useData()

let active     = false
let holdTimer:  ReturnType<typeof setTimeout> | null = null
let retryTimer: ReturnType<typeof setTimeout> | null = null
let target:     HTMLElement | null = null

function checkIsHome(): boolean {
  const base = site.value.base
  return route.path === base || route.path === `${base}en/`
}

// ---------------------------------------------------------------------------
// Get the accurate bounding box of the VISIBLE hero image
// ---------------------------------------------------------------------------

function getImageRect(): DOMRect | null {
  if (!target) return null
  const imgs = target.querySelectorAll<HTMLImageElement>('img.image-src')
  for (const img of imgs) {
    if (window.getComputedStyle(img).display !== 'none') return img.getBoundingClientRect()
  }
  return target.getBoundingClientRect()
}

// ---------------------------------------------------------------------------
// Animate a single frog using rAF for smooth, physics-based motion
// ---------------------------------------------------------------------------

function spawnFrog(
  startX:   number,
  startY:   number,
  velX:     number,
  velY:     number,
  size:     number,
  delay:    number,
): void {
  const frog = document.createElement('span')
  frog.textContent = FROG_EMOJI
  frog.setAttribute('aria-hidden', 'true')

  Object.assign(frog.style, {
    position:      'fixed',
    left:          `${startX}px`,
    top:           `${startY}px`,
    fontSize:      `${size}px`,
    lineHeight:    '1',
    pointerEvents: 'none',
    userSelect:    'none',
    zIndex:        '99999',
    transform:     'translate(-50%, -50%)',
    willChange:    'transform, opacity',
  })

  document.body.appendChild(frog)

  const gravity   = 0.35 + Math.random() * 0.2
  const spin      = (Math.random() - 0.5) * 18   // degrees per frame
  const totalTime = 1400 + Math.random() * 400    // ms
  let   vx        = velX
  let   vy        = velY
  let   x         = startX
  let   y         = startY
  let   rot       = 0
  let   startTime: number | null = null
  let   rafId:     number

  function frame(now: number): void {
    if (startTime === null) startTime = now
    const elapsed = now - startTime

    if (elapsed < delay) {
      rafId = requestAnimationFrame(frame)
      return
    }

    const t = (elapsed - delay) / totalTime
    if (t >= 1) {
      frog.remove()
      return
    }

    // Physics
    vy  += gravity
    vx  *= 0.985   // air resistance
    x   += vx
    y   += vy
    rot += spin

    // Fade out in last 40%
    const opacity = t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4

    frog.style.left    = `${x}px`
    frog.style.top     = `${y}px`
    frog.style.opacity = `${opacity}`
    frog.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${1 - t * 0.4})`

    rafId = requestAnimationFrame(frame)
  }

  rafId = requestAnimationFrame(frame)

  // Safety cleanup
  setTimeout(() => {
    cancelAnimationFrame(rafId)
    frog.remove()
  }, totalTime + delay + 200)
}

// ---------------------------------------------------------------------------
// Launch — 3 waves, frogs spawn from image border and fly far
// ---------------------------------------------------------------------------

function launchFirework(): void {
  const rect = getImageRect()
  if (!rect) return

  const cx = rect.left + rect.width  / 2
  const cy = rect.top  + rect.height / 2
  const rx = rect.width  / 2
  const ry = rect.height / 2

  const WAVES         = 3
  const FROGS_PER_WAVE = 10

  for (let wave = 0; wave < WAVES; wave++) {
    for (let i = 0; i < FROGS_PER_WAVE; i++) {
      // Evenly distributed + slight jitter
      const angle  = (i / FROGS_PER_WAVE) * Math.PI * 2
                   + (wave / WAVES) * (Math.PI / FROGS_PER_WAVE)
                   + (Math.random() - 0.5) * 0.25

      // Spawn exactly on the image border
      const startX = cx + Math.cos(angle) * rx
      const startY = cy + Math.sin(angle) * ry

      // Initial velocity — strong outward burst
      const speed  = 9 + Math.random() * 8
      const velX   = Math.cos(angle) * speed
      const velY   = Math.sin(angle) * speed - (1 + Math.random() * 2) // slight upward boost

      const size   = 20 + Math.random() * 18
      const delay  = wave * 200 + Math.random() * 80

      spawnFrog(startX, startY, velX, velY, size, delay)
    }
  }
}

// ---------------------------------------------------------------------------
// Context menu prevention (hero only)
// ---------------------------------------------------------------------------

const onContextMenu = (e: Event) => e.preventDefault()

// ---------------------------------------------------------------------------
// Hold detection
// ---------------------------------------------------------------------------

function startHold(): void {
  if (!active) return
  if (holdTimer) clearTimeout(holdTimer)
  holdTimer = setTimeout(() => { holdTimer = null; launchFirework() }, HOLD_DURATION)
}

function cancelHold(): void {
  if (holdTimer) { clearTimeout(holdTimer); holdTimer = null }
}

const onMouseDown  = (e: MouseEvent) => { if (e.button === 0) startHold() }
const onMouseUp    = () => cancelHold()
const onMouseLeave = () => cancelHold()
const onTouchStart = (e: TouchEvent) => { e.preventDefault(); startHold() }
const onTouchEnd   = () => cancelHold()

// ---------------------------------------------------------------------------
// Attach / detach
// ---------------------------------------------------------------------------

function attach(): void {
  detach()
  if (!active) return

  function tryAttach(n: number): void {
    const el = document.querySelector<HTMLElement>('.VPHero .image-container')
    if (el) {
      target = el
      target.addEventListener('contextmenu', onContextMenu)
      target.addEventListener('mousedown',   onMouseDown)
      target.addEventListener('mouseup',     onMouseUp)
      target.addEventListener('mouseleave',  onMouseLeave)
      target.addEventListener('touchstart',  onTouchStart, { passive: false })
      target.addEventListener('touchend',    onTouchEnd)
      return
    }
    if (n > 0) retryTimer = setTimeout(() => tryAttach(n - 1), 50)
  }

  tryAttach(20)
}

function detach(): void {
  if (retryTimer) { clearTimeout(retryTimer); retryTimer = null }
  cancelHold()
  if (target) {
    target.removeEventListener('contextmenu', onContextMenu)
    target.removeEventListener('mousedown',   onMouseDown)
    target.removeEventListener('mouseup',     onMouseUp)
    target.removeEventListener('mouseleave',  onMouseLeave)
    target.removeEventListener('touchstart',  onTouchStart)
    target.removeEventListener('touchend',    onTouchEnd)
    target = null
  }
}

function activate(): void {
  active = checkIsHome()
  attach()
}

onMounted(activate)
watch(() => route.path, activate)
onUnmounted(detach)
</script>

<template><span aria-hidden="true" /></template>
