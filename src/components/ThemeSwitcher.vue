<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
      :title="$t('themes.title')"
    >
      <span class="text-xl">{{ currentThemeIcon }}</span>
    </button>
    
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50"
      :style="{ background: 'var(--bg-card)', borderColor: 'var(--border)' }"
    >
      <div class="py-2">
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="setTheme(theme.id)"
          class="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
          :class="{ 'font-semibold': currentTheme === theme.id }"
        >
          <span class="text-xl">{{ theme.icon }}</span>
          <span>{{ $t(`themes.${theme.id}`) }}</span>
        </button>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

const isOpen = ref(false)

// Inject theme state and setter from App.vue
const currentTheme = inject('currentTheme')
const setThemeFromApp = inject('setTheme')

const themes = [
  { id: 'island', icon: '🏝️' },
  { id: 'minecraft', icon: '⛏️' },
  { id: 'modern', icon: '💎' }
]

const currentThemeIcon = computed(() => {
  const theme = themes.find(t => t.id === currentTheme.value)
  return theme ? theme.icon : '🏝️'
})

function setTheme(themeId) {
  setThemeFromApp(themeId)
  isOpen.value = false
}
</script>

<style scoped>
button {
  color: var(--text-primary);
}
</style>