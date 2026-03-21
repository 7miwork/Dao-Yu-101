<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <!-- Ocean Background -->
    <div class="fixed inset-0 -z-10" style="background: var(--bg)">
      <div class="absolute inset-0 opacity-10">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
      </div>
    </div>

    <!-- Header Section -->
    <section class="py-12 relative z-10">
      <div class="max-w-screen-xl mx-auto px-6">
        <!-- Back Button -->
        <router-link 
          to="/" 
          class="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
          style="background: var(--card-bg); color: var(--text)"
        >
          <span>←</span>
          <span>{{ $t('common.back') }}</span>
        </router-link>

        <!-- Header Content -->
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg" style="color: var(--text)">
            <span class="mr-3">{{ archipelagoData.icon }}</span>
            <span>{{ archipelagoData.name }}</span>
          </h1>
          <p class="text-lg md:text-xl max-w-2xl mx-auto" style="color: var(--text-secondary)">
            {{ archipelagoData.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Islands Section -->
    <section class="py-12 relative z-10">
      <div class="max-w-screen-xl mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-12" style="color: var(--text)">
          {{ $t('archipelago.islands') }}
        </h2>

        <div class="flex flex-wrap justify-center gap-10">
          <div
            v-for="island in islands"
            :key="island.id"
            class="w-full max-w-xs"
          >
            <!-- Unlocked Island -->
            <router-link
              v-if="isIslandUnlocked(island.id)"
              :to="`/island/${island.id}`"
              class="block card rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div class="text-center mb-4">
                <div class="text-5xl mb-2">{{ island.icon }}</div>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-bold mb-2" style="color: var(--text)">
                  {{ island.name }}
                </h3>
                <p class="text-sm mb-4" style="color: var(--text-secondary)">
                  {{ island.description }}
                </p>
                <div class="flex items-center justify-center gap-2 text-sm" style="color: var(--text-secondary)">
                  <span>📖</span>
                  <span>{{ island.lessonCount }} {{ $t('archipelago.lessons') }}</span>
                </div>
              </div>
            </router-link>

            <!-- Locked Island -->
            <div
              v-else
              class="card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105"
              @click="handleLockedIslandClick(island)"
            >
              <div class="text-center mb-4">
                <div class="text-5xl mb-2">🔒</div>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-bold mb-2" style="color: var(--text)">
                  {{ island.name }}
                </h3>
                <p class="text-sm" style="color: var(--text-secondary)">
                  {{ $t('island.locked') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Progress Section -->
    <section class="py-12 relative z-10">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="max-w-2xl mx-auto">
          <div class="rounded-full h-3 overflow-hidden" style="background: var(--card-bg)">
            <div
              class="h-full rounded-full transition-all duration-500"
              :style="{ width: progressPercentage + '%', background: 'var(--primary)' }"
            ></div>
          </div>
          <p class="text-center mt-4" style="color: var(--text-secondary)">
            {{ unlockedCount }} / {{ islands.length }}
            {{ $t('archipelago.islands') }}
            {{ $t('archipelago.unlocked') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isIslandUnlocked } from '../../utils/auth.js'

import programming from '@/content/archipelagos/programming.json'
import mathematics from '@/content/archipelagos/mathematics.json'
import science from '@/content/archipelagos/science.json'
import languages from '@/content/archipelagos/languages.json'
import arts from '@/content/archipelagos/arts.json'
import history from '@/content/archipelagos/history.json'

import minecraftBasics from '@/content/islands/minecraft-basics.json'
import algebra from '@/content/islands/algebra.json'
import physics from '@/content/islands/physics.json'
import english from '@/content/islands/english.json'
import drawing from '@/content/islands/drawing.json'
import ancient from '@/content/islands/ancient.json'

const route = useRoute()
const router = useRouter()

const archipelagoMap = {
  programming,
  mathematics,
  science,
  languages,
  arts,
  history
}

const islandMap = {
  'minecraft-basics': minecraftBasics,
  algebra,
  physics,
  english,
  drawing,
  ancient
}

const archipelagoIconMap = {
  programming: '💻',
  mathematics: '📐',
  science: '🔬',
  languages: '🌍',
  arts: '🎨',
  history: '📜'
}

const islandIconMap = {
  'minecraft-basics': '⛏️',
  algebra: '➕',
  physics: '⚛️',
  english: '🇬🇧',
  drawing: '✏️',
  ancient: '🏛️'
}

const archipelagoId = computed(() => route.params.id)

const archipelagoData = computed(() => {
  const data = archipelagoMap[archipelagoId.value]
  if (data) {
    return {
      id: data.id,
      icon: archipelagoIconMap[data.id] || '📚',
      name: data.title,
      description: data.description,
      islands: data.islands || []
    }
  }
  return {
    id: archipelagoId.value,
    icon: '📚',
    name: 'Not found',
    description: '',
    islands: []
  }
})

const islands = computed(() => {
  return archipelagoData.value.islands
    .map(id => {
      const data = islandMap[id]
      if (!data) return null
      return {
        id: data.id,
        icon: islandIconMap[data.id] || '📚',
        name: data.title,
        description: data.description,
        lessonCount: data.lessons?.length || 0
      }
    })
    .filter(Boolean)
})

const unlockedCount = computed(() =>
  islands.value.filter(i => isIslandUnlocked(i.id)).length
)

const progressPercentage = computed(() => {
  if (!islands.value.length) return 0
  return (unlockedCount.value / islands.value.length) * 100
})

function handleLockedIslandClick(island) {
  router.push(`/island/${island.id}`)
}
</script>

<style scoped>
/* Wave animations */
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
</style>
