<template>
  <div :class="['min-h-screen', themeClass]">
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import MainLayout from './layouts/MainLayout.vue'

const themeClass = computed(() => {
  const theme = localStorage.getItem('theme') || 'island'
  return `theme-${theme}`
})

onMounted(() => {
  // Apply saved theme on mount
  const savedTheme = localStorage.getItem('theme') || 'island'
  document.body.className = `theme-${savedTheme}`
})
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Theme transitions */
.theme-island,
.theme-minecraft,
.theme-modern {
  transition: all 0.3s ease;
}
</style>