<script setup lang="ts">
// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CLICKS_NEEDED = 7     // clicks on the hero image required to trigger
const RESET_DELAY   = 10000 // ms — counter resets after this idle period
const TARGET_URL    = 'https://youtu.be/dQw4w9WgXcQ?si=3-SKpSMGFYWdsQlA'

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

const route = useRoute()

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let count      = 0
let resetTimer: ReturnType<typeof setTimeout> | null = null
let active     = false // true only when on a home page

// ---------------------------------------------------------------------------
// Document-level click handler (event delegation)
//
// Instead of querying a specific element (which may be hidden or not yet
// rendered), we listen on document and check whether the click originated
// inside .VPHero. This works regardless of DOM structure, theme, or timing.
// ---------------------------------------------------------------------------

function onDocumentClick(e: MouseEvent): void {
  if (!active) return
  // Only count clicks that land inside the hero section
  if (!(e.target as Element).closest('.VPHero')) return

  count++
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { count = 0 }, RESET_DELAY)

  if (count >= CLICKS_NEEDED) {
    count = 0
    window.open(TARGET_URL, '_blank', 'noopener,noreferrer')
  }
}

// ---------------------------------------------------------------------------
// Activate / deactivate based on current route
// ---------------------------------------------------------------------------

function activate(): void {
  const isHome = route.path === '/' || route.path === '/en/'
  active       = isHome
  if (!isHome) {
    // Reset counter when leaving home so it starts fresh on return
    count = 0
    if (resetTimer) { clearTimeout(resetTimer); resetTimer = null }
  }
}

// ---------------------------------------------------------------------------
// Lifecycle — single document listener, always attached, activation toggled
// ---------------------------------------------------------------------------

onMounted(() => {
  activate()
  document.addEventListener('click', onDocumentClick)
})

watch(() => route.path, activate)

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<!-- Render nothing visible — behaviour only -->
<template><span aria-hidden="true" /></template>
