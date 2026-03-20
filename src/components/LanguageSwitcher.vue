<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
      :title="$t('language.title')"
    >
      <span class="text-xl">🌐</span>
    </button>
    
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg border z-50"
      :style="{ background: 'var(--bg-card)', borderColor: 'var(--border)' }"
    >
      <div class="py-2">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="setLanguage(lang.code)"
          class="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
          :class="{ 'font-semibold': currentLocale === lang.code }"
        >
          <span>{{ lang.flag }}</span>
          <span>{{ $t(`language.${lang.code}`) }}</span>
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
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isOpen = ref(false)
const currentLocale = ref('en')

const languages = [
  { code: 'en', flag: '🇺🇸' },
  { code: 'de', flag: '🇩🇪' },
  { code: 'zh-TW', flag: '🇹🇼' }
]

function setLanguage(langCode) {
  currentLocale.value = langCode
  locale.value = langCode
  localStorage.setItem('locale', langCode)
  isOpen.value = false
}

onMounted(() => {
  const savedLocale = localStorage.getItem('locale') || 'en'
  currentLocale.value = savedLocale
  locale.value = savedLocale
})
</script>

<style scoped>
button {
  color: var(--text-primary);
}
</style>