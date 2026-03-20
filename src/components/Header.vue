<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 border-b">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <span class="text-2xl">🏝️</span>
          <span class="font-bold text-xl">Dao-Yu-101</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link 
            to="/" 
            class="hover:opacity-80 transition-opacity"
            active-class="font-semibold"
          >
            {{ $t('nav.home') }}
          </router-link>
          <router-link 
            to="/about" 
            class="hover:opacity-80 transition-opacity"
            active-class="font-semibold"
          >
            {{ $t('nav.about') }}
          </router-link>
          <router-link 
            to="/shop" 
            class="hover:opacity-80 transition-opacity"
            active-class="font-semibold"
          >
            {{ $t('nav.shop') }}
          </router-link>
        </nav>

        <!-- Controls -->
        <div class="flex items-center space-x-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
          
          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!mobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <nav 
        v-if="mobileMenuOpen"
        class="md:hidden py-4 border-t"
      >
        <div class="flex flex-col space-y-4">
          <router-link 
            to="/" 
            class="hover:opacity-80 transition-opacity"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.home') }}
          </router-link>
          <router-link 
            to="/about" 
            class="hover:opacity-80 transition-opacity"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.about') }}
          </router-link>
          <router-link 
            to="/shop" 
            class="hover:opacity-80 transition-opacity"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.shop') }}
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
header {
  background: var(--bg-primary);
  border-color: var(--border);
}

a {
  color: var(--text-primary);
}
</style>