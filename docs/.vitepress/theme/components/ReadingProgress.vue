<script setup lang="ts">
// Tracks scroll position and shows reading progress in bottom-right corner
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const visible  = ref(false)

function update() {
  const doc    = document.documentElement
  const total  = doc.scrollHeight - doc.clientHeight
  const current = window.scrollY

  progress.value = total > 0 ? Math.round((current / total) * 100) : 0
  visible.value  = current > 200
}

onMounted(()  => window.addEventListener('scroll', update, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <Transition name="progress-fade">
    <div v-if="visible" class="reading-progress">
      {{ progress }}%
    </div>
  </Transition>
</template>

<style scoped>
.reading-progress {
  position:      fixed;
  bottom:        28px;
  right:         28px;
  z-index:       100;
  width:         48px;
  height:        48px;
  display:       flex;
  align-items:   center;
  justify-content: center;
  font-size:     12px;
  font-weight:   600;
  color:         #54a0ff;
  background:    rgba(13, 13, 13, 0.85);
  border:        1px solid rgba(84, 160, 255, 0.25);
  border-radius: 50%;
  backdrop-filter: blur(8px);
  box-shadow:    0 0 12px rgba(84, 160, 255, 0.15);
  cursor:        pointer;
  transition:    box-shadow 0.2s ease, border-color 0.2s ease;
}

.reading-progress:hover {
  border-color: rgba(84, 160, 255, 0.6);
  box-shadow:   0 0 20px rgba(84, 160, 255, 0.3);
}

/* Fade in/out transition */
.progress-fade-enter-active,
.progress-fade-leave-active { transition: opacity 0.3s ease; }
.progress-fade-enter-from,
.progress-fade-leave-to     { opacity: 0; }
</style>
