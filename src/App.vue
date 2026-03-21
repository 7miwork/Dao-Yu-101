<template>
  <div :class="['min-h-screen', themeClass]">
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import MainLayout from './layouts/MainLayout.vue'

// Reactive theme state
const currentTheme = ref(localStorage.getItem('theme') || 'island')

// Computed theme class
const themeClass = computed(() => `theme-${currentTheme.value}`)

// Function to update theme
function setTheme(themeId) {
  currentTheme.value = themeId
  localStorage.setItem('theme', themeId)
  document.body.className = `theme-${themeId}`
}

// Provide theme state and setter to child components
provide('currentTheme', currentTheme)
provide('setTheme', setTheme)

onMounted(() => {
  // Apply saved theme on mount
  document.body.className = `theme-${currentTheme.value}`
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