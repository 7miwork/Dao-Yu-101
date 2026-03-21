<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <!-- Ocean Background -->
    <div class="fixed inset-0 -z-10" style="background: var(--bg)">
      <div class="absolute inset-0 opacity-10">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="py-16 relative z-10">
      <div class="max-w-screen-xl mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg" style="color: var(--text)">
          {{ $t('home.title') }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style="color: var(--text-secondary)">
          {{ $t('home.subtitle') }}
        </p>
        <router-link 
          to="/archipelago/programming" 
          class="btn-primary inline-block font-semibold px-8 py-4 rounded-full text-lg"
        >
          {{ $t('home.start_button') }}
        </router-link>
      </div>
    </section>

    <!-- Archipelagos Preview Section -->
    <section class="py-16 relative z-10">
      <div class="max-w-screen-xl mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 drop-shadow-lg" style="color: var(--text)">
          {{ $t('home.archipelagos.title') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="archipelago in archipelagos"
            :key="archipelago.id"
            class="floating-island"
          >
            <router-link 
              :to="`/archipelago/${archipelago.id}`"
              class="block group"
            >
              <div class="card rounded-2xl p-6">
                <div class="text-5xl mb-4">{{ archipelago.icon }}</div>
                <h3 class="text-xl font-bold mb-2" style="color: var(--text)">
                  {{ archipelago.name }}
                </h3>
                <p class="text-sm mb-4 line-clamp-2" style="color: var(--text-secondary)">
                  {{ archipelago.description }}
                </p>
                <div class="flex items-center gap-2 text-sm" style="color: var(--text-secondary)">
                  <span>🏝️</span>
                  <span>{{ archipelago.islandCount }} {{ $t('archipelago.islands') }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 relative z-10">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-center" style="color: var(--text)">
            {{ $t('home.about_title') }}
          </h2>
          <p class="text-lg leading-relaxed text-center" style="color: var(--text-secondary)">
            {{ $t('home.about') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Static imports for all archipelago data
import programming from '@/content/archipelagos/programming.json'
import mathematics from '@/content/archipelagos/mathematics.json'
import science from '@/content/archipelagos/science.json'
import languages from '@/content/archipelagos/languages.json'
import arts from '@/content/archipelagos/arts.json'
import history from '@/content/archipelagos/history.json'

// Map icon for each archipelago
const iconMap = {
  programming: '💻',
  mathematics: '📐',
  science: '🔬',
  languages: '🌍',
  arts: '🎨',
  history: '📜'
}

// Create archipelagos array from static imports
const archipelagos = ref([
  programming,
  mathematics,
  science,
  languages,
  arts,
  history
].map(data => ({
  id: data.id,
  icon: iconMap[data.id] || '📚',
  name: data.title,
  description: data.description,
  islandCount: data.islands ? data.islands.length : 0
})))
</script>

<style scoped>
/* Simplified wave animations */
.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  border-radius: 40%;
  animation: wave 25s infinite linear;
}

.wave-1 {
  top: -150%;
  left: -50%;
  background: rgba(255, 255, 255, 0.08);
  animation-duration: 25s;
}

.wave-2 {
  top: -145%;
  left: -45%;
  background: rgba(255, 255, 255, 0.05);
  animation-duration: 30s;
  animation-direction: reverse;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Floating island animation */
.floating-island {
  animation: float 6s ease-in-out infinite;
}

.floating-island:nth-child(even) {
  animation-delay: -3s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>