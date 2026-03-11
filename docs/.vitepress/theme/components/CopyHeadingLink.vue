<script setup lang="ts">
// Adds a copy-link icon next to every h2/h3 heading in the doc
// On click: copies full URL with hash to clipboard and shows tooltip
import { onMounted, onUnmounted } from 'vue'

let cleanup: (() => void) | null = null

onMounted(() => {
  const handlers: Array<{ el: Element; fn: () => void }> = []

  document.querySelectorAll('.vp-doc h2, .vp-doc h3').forEach(heading => {
    const id = heading.id
    if (!id) return

    // Create icon button
    const btn = document.createElement('span')
    btn.className   = 'copy-heading-btn'
    btn.title       = 'Скопировать ссылку'
    btn.innerHTML   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>`

    const fn = () => {
      const url = `${location.origin}${location.pathname}#${id}`
      navigator.clipboard.writeText(url)

      // Show "Скопировано!" tooltip
      btn.classList.add('copied')
      setTimeout(() => btn.classList.remove('copied'), 1800)
    }

    btn.addEventListener('click', fn)
    handlers.push({ el: btn, fn })
    heading.appendChild(btn)
  })

  // Cleanup on unmount
  cleanup = () => {
    handlers.forEach(({ el, fn }) => el.removeEventListener('click', fn))
    document.querySelectorAll('.copy-heading-btn').forEach(el => el.remove())
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <!-- Renders nothing itself — manipulates DOM directly -->
  <span />
</template>

<style>
/* Not scoped — needs to target dynamically injected elements */
.copy-heading-btn {
  display:        inline-flex;
  align-items:    center;
  margin-left:    8px;
  padding:        2px 4px;
  color:          rgba(84, 160, 255, 0);
  cursor:         pointer;
  border-radius:  4px;
  vertical-align: middle;
  transition:     color 0.2s ease;
  position:       relative;
}

/* Show icon on heading hover */
h2:hover .copy-heading-btn,
h3:hover .copy-heading-btn {
  color: rgba(84, 160, 255, 0.5);
}

.copy-heading-btn:hover {
  color: rgba(84, 160, 255, 1) !important;
}

/* "Скопировано!" tooltip */
.copy-heading-btn::after {
  content:       'Скопировано!';
  position:      absolute;
  top:           -28px;
  left:          50%;
  transform:     translateX(-50%);
  background:    rgba(13, 13, 13, 0.9);
  border:        1px solid rgba(84, 160, 255, 0.3);
  border-radius: 4px;
  padding:       2px 8px;
  font-size:     11px;
  color:         #54a0ff;
  white-space:   nowrap;
  opacity:       0;
  pointer-events: none;
  transition:    opacity 0.2s ease;
}

.copy-heading-btn.copied::after {
  opacity: 1;
}
</style>
