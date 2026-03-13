<script setup lang="ts">
import { useData } from 'vitepress'
const { page } = useData()
</script>

<template>
  <div class="copyright-block" v-if="page.filePath">
    <div class="copyright-inner">
      <span>
        <a href="https://github.com/etephym/shindo">Shindo Life Docs</a>
        © 2024–2026 by
        <a href="https://github.com/ezrqq">ezrqq / lewisky</a>
        is licensed under
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.copyright-block {
  margin-top:    48px;
  padding-top:   20px;
  border-top:    1px solid var(--vp-c-divider);
}
.copyright-inner {
  font-size:  13px;
  color:      var(--vp-c-text-2);
  line-height: 1.6;
}
.copyright-inner a {
  color:           var(--vp-c-text-2);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.copyright-inner a:hover {
  color: var(--vp-c-brand);
}
.copyright-inner img {
  display:      inline-block;
  max-width:    1em;
  max-height:   1em;
  margin-left:  .2em;
  vertical-align: middle;
  opacity:      0.7;
}
</style>
