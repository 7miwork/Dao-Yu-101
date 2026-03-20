<template>
  <div class="island-map-container">
    <!-- Ocean Background -->
    <div class="ocean-background">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
    </div>

    <!-- Header -->
    <div class="map-header">
      <router-link to="/" class="back-button">
        <span class="back-icon">←</span>
        <span class="back-text">{{ $t('common.back') }}</span>
      </router-link>

      <div class="header-content">
        <h1 class="archipelago-title">
          <span class="title-icon">{{ archipelagoData.icon }}</span>
          <span class="title-text">{{ archipelagoData.name }}</span>
        </h1>
        <p class="archipelago-description">
          {{ archipelagoData.description }}
        </p>
      </div>
    </div>

    <!-- Islands -->
    <section class="islands-section">
      <h2 class="section-title">
        {{ $t('archipelago.islands') }}
      </h2>

      <div class="islands-grid">
        <div
          v-for="island in islands"
          :key="island.id"
          class="island-card"
          :class="{
            unlocked: isIslandUnlocked(island.id),
            locked: !isIslandUnlocked(island.id)
          }"
        >
          <!-- Unlocked -->
          <router-link
            v-if="isIslandUnlocked(island.id)"
            :to="`/island/${island.id}`"
            class="island-link"
          >
            <div class="island-visual">
              <div class="island-base"></div>
              <div class="island-icon">{{ island.icon }}</div>
              <div class="island-pulse"></div>
            </div>

            <div class="island-info">
              <h3 class="island-name">{{ island.name }}</h3>
              <p class="island-description">{{ island.description }}</p>

              <div class="island-stats">
                <span class="stat">
                  📖 {{ island.lessonCount }} {{ $t('archipelago.lessons') }}
                </span>
              </div>
            </div>
          </router-link>

          <!-- Locked -->
          <div
            v-else
            class="island-locked"
            @click="handleLockedIslandClick(island)"
          >
            <div class="island-visual locked">
              <div class="island-base"></div>
              <div class="island-icon">🔒</div>
              <div class="lock-overlay"></div>
            </div>

            <div class="island-info">
              <h3 class="island-name">{{ island.name }}</h3>
              <p class="island-description">{{ $t('island.locked') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Progress -->
    <div class="progress-section">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      <p class="progress-text">
        {{ unlockedCount }} / {{ islands.length }}
        {{ $t('archipelago.islands') }}
        {{ $t('archipelago.unlocked') }}
      </p>
    </div>
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

<style>
.island-map-container {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Ocean */
.ocean-background {
  position: fixed;
  inset: 0;
  background: linear-gradient(#87ceeb, #4682b4, #2e5a7e);
  z-index: -1;
}

/* Header */
.map-header {
  padding: 2rem;
  display: flex;
  gap: 2rem;
}

.archipelago-title {
  font-size: 2.5rem;
  color: white;
}

/* SECTION */
.islands-section {
  padding: 2rem;
}

/* FLEXBASIERTER RESPONSIVER CONTAINER */
.islands-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  width: 100%;
}

/* CARD */
.island-card {
  width: 100%;
  max-width: 220px;
  position: static;
  transition: 0.3s;
}

.island-card:hover {
  transform: scale(1.05);
}

/* SIMPLE CARD STYLE */
.island-link,
.island-locked {
  display: block;
  padding: 1rem;
  border-radius: 20px;
  background: rgba(255,255,255,0.2);
}

/* VISUAL */
.island-visual {
  text-align: center;
  font-size: 2rem;
}

/* INFO */
.island-info {
  text-align: center;
  background: white;
  border-radius: 12px;
  padding: 1rem;
}

/* PROGRESS */
.progress-section {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
}

.progress-bar {
  height: 10px;
  background: #ccc;
}

.progress-fill {
  height: 100%;
  background: #4ade80;
}
</style>
