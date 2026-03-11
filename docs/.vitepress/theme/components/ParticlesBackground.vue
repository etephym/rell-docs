<script setup lang="ts">
// Starfield particles — client-side only, homepage only
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
let initialized = false

async function start() {
  if (initialized) return
  initialized = true

  // Dynamic import — avoids SSR crash
  const { tsParticles } = await import('@tsparticles/engine')
  const { loadSlim }    = await import('@tsparticles/slim')

  await loadSlim(tsParticles)
  await tsParticles.load({
    id: 'tsparticles',
    options: {
      fullScreen:  { enable: true, zIndex: 0 },
      background:  { color: { value: 'transparent' } },
      fpsLimit:    60,
      particles: {
        number:  { value: 130, density: { enable: true, width: 1920 } },
        color:   { value: ['#54a0ff', '#ff6b6b', '#ff9ff3', '#ffffff'] },
        opacity: {
          value:     { min: 0.1, max: 0.55 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        size:  { value: { min: 0.5, max: 1.8 } },
        move: {
          enable:    true,
          speed:     0.25,
          direction: 'none',
          random:    true,
          outModes:  { default: 'out' },
        },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'grab' } },
        modes:  { grab: { distance: 100, links: { opacity: 0.15 } } },
      },
      detectRetina: true,
    },
  })
}

async function stop() {
  if (!initialized) return
  const { tsParticles } = await import('@tsparticles/engine')
  tsParticles.domItem(0)?.destroy()
  document.getElementById('tsparticles')?.remove()
  initialized = false
}

function check() {
  const isHome = route.path === '/' || route.path === '/en/'
  if (isHome) start()
  else stop()
}

onMounted(() => check())
watch(() => route.path, () => check())
onUnmounted(() => stop())
</script>

<template><span /></template>
