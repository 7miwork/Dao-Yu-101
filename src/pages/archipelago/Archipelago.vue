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
        <p class="archipelago-description">{{ archipelagoData.description }}</p>
      </div>
    </div>

    <!-- Islands Map -->
    <section class="islands-section">
      <h2 class="section-title">
        {{ $t('archipelago.islands') }}
      </h2>
      
      <div class="islands-grid">
        <!-- Islands -->
        <div 
          v-for="(island, index) in islands"
          :key="island.id"
          class="island-card"
          :class="{ 
            'unlocked': isIslandUnlocked(island.id),
            'locked': !isIslandUnlocked(island.id),
            'offset-up': index % 3 === 1,
            'offset-down': index % 3 === 2
          }"
        >
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
                  <span class="stat-icon">📖</span>
                  {{ island.lessonCount }} {{ $t('archipelago.lessons') }}
                </span>
              </div>
            </div>
          </router-link>
          
          <div v-else class="island-locked" @click="handleLockedIslandClick(island)">
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

    <!-- Progress Indicator -->
    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <p class="progress-text">
        {{ unlockedCount }} / {{ islands.length }} {{ $t('archipelago.islands') }} {{ $t('archipelago.unlocked') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isIslandUnlocked } from '../../utils/auth.js'

// Static imports for all archipelago data
import programming from '@/content/archipelagos/programming.json'
import mathematics from '@/content/archipelagos/mathematics.json'
import science from '@/content/archipelagos/science.json'
import languages from '@/content/archipelagos/languages.json'
import arts from '@/content/archipelagos/arts.json'
import history from '@/content/archipelagos/history.json'

// Static imports for all island data
import minecraftBasics from '@/content/islands/minecraft-basics.json'
import algebra from '@/content/islands/algebra.json'
import physics from '@/content/islands/physics.json'
import english from '@/content/islands/english.json'
import drawing from '@/content/islands/drawing.json'
import ancient from '@/content/islands/ancient.json'

const route = useRoute()
const router = useRouter()

// Map archipelago data by ID
const archipelagoMap = {
  programming,
  mathematics,
  science,
  languages,
  arts,
  history
}

// Map island data by ID
const islandMap = {
  'minecraft-basics': minecraftBasics,
  algebra,
  physics,
  english,
  drawing,
  ancient
}

// Map icons for archipelagos
const archipelagoIconMap = {
  programming: '💻',
  mathematics: '📐',
  science: '🔬',
  languages: '🌍',
  arts: '🎨',
  history: '📜'
}

// Map icons for islands
const islandIconMap = {
  'minecraft-basics': '⛏️',
  algebra: '➕',
  physics: '⚛️',
  english: '🇬🇧',
  drawing: '✏️',
  ancient: '🏛️'
}

const archipelagoId = computed(() => route.params.id)

// Get archipelago data from static imports
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
    name: 'Archipelago Not Found',
    description: 'This archipelago could not be loaded',
    islands: []
  }
})

// Get islands data from static imports
const islands = computed(() => {
  return archipelagoData.value.islands.map(islandId => {
    const islandData = islandMap[islandId]
    if (islandData) {
      return {
        id: islandData.id,
        icon: islandIconMap[islandData.id] || '📚',
        name: islandData.title,
        description: islandData.description,
        lessonCount: islandData.lessons ? islandData.lessons.length : 0,
        password: islandData.password
      }
    }
    return null
  }).filter(island => island !== null)
})

const unlockedCount = computed(() => {
  return islands.value.filter(island => isIslandUnlocked(island.id)).length
})

const progressPercentage = computed(() => {
  if (islands.value.length === 0) return 0
  return (unlockedCount.value / islands.value.length) * 100
})

function handleLockedIslandClick(island) {
  router.push(`/island/${island.id}`)
}
</script>

<style scoped>
.island-map-container {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Ocean Background */
.ocean-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, 
    var(--ocean-light, #87CEEB) 0%, 
    var(--ocean-medium, #4682B4) 50%, 
    var(--ocean-dark, #2E5A7E) 100%);
  z-index: -2;
}

.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  background: transparent;
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
  top: -140%;
  left: -40%;
  background: rgba(255, 255, 255, 0.05);
  animation-duration: 30s;
  animation-direction: reverse;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Header */
.map-header {
  position: relative;
  z-index: 10;
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-primary, #fff);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  background: var(--bg-card, rgba(255, 255, 255, 0.9));
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  transform: translateX(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.back-icon {
  font-size: 1.25rem;
}

.back-text {
  font-weight: 600;
}

.header-content {
  flex: 1;
}

.archipelago-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--text-primary, #fff);
}

.title-icon {
  font-size: 3rem;
}

.archipelago-description {
  font-size: 1.25rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: var(--text-primary, #fff);
}

/* Islands Section */
.islands-section {
  position: relative;
  z-index: 5;
  padding: 2rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--text-primary, #fff);
}

/* Islands Grid Layout */
.islands-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Island Card */
.island-card {
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.island-card.offset-up {
  transform: translateY(-1rem);
}

.island-card.offset-down {
  transform: translateY(1rem);
}

.island-card.unlocked {
  z-index: 10;
}

.island-card.locked {
  z-index: 5;
  opacity: 0.7;
}

.island-link,
.island-locked {
  display: block;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.island-link:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.island-locked:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Island Visual */
.island-visual {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
}

.island-base {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 30px;
  background: var(--bg-card, rgba(255, 255, 255, 0.9));
  border-radius: 50%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.island-visual .island-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  z-index: 2;
}

.island-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--accent, #4ade80);
  opacity: 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.island-visual.locked .island-base {
  background: var(--bg-secondary, rgba(200, 200, 200, 0.9));
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}

/* Island Info */
.island-info {
  text-align: center;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border-radius: 15px;
  padding: 1.25rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.island-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary, #166534);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.island-description {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-bottom: 0.75rem;
  color: var(--text-secondary, #15803d);
  line-height: 1.4;
  font-weight: 500;
}

.island-stats {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.7;
  color: var(--text-secondary, #15803d);
}

.stat-icon {
  font-size: 0.9rem;
}

/* Progress Section */
.progress-section {
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: var(--bg-secondary, rgba(255, 255, 255, 0.3));
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent, #4ade80), var(--accent-hover, #22c55e));
  border-radius: 6px;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px var(--accent, #4ade80);
}

.progress-text {
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary, #fff);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (min-width: 768px) {
  .islands-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
  
  .island-card {
    max-width: 300px;
  }
  
  .island-visual {
    width: 110px;
    height: 110px;
  }
  
  .island-base {
    width: 90px;
    height: 35px;
  }
  
  .island-visual .island-icon {
    font-size: 2.8rem;
  }
  
  .island-pulse {
    width: 70px;
    height: 70px;
  }
}

@media (min-width: 1024px) {
  .islands-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
  
  .island-card {
    max-width: 320px;
  }
  
  .island-visual {
    width: 120px;
    height: 120px;
  }
  
  .island-base {
    width: 100px;
    height: 40px;
  }
  
  .island-visual .island-icon {
    font-size: 3rem;
  }
  
  .island-pulse {
    width: 80px;
    height: 80px;
  }
  
  .archipelago-title {
    font-size: 3rem;
  }
  
  .title-icon {
    font-size: 3.5rem;
  }
}

@media (max-width: 480px) {
  .islands-grid {
    gap: 1.5rem;
    padding: 0.5rem;
  }
  
  .island-card {
    max-width: 260px;
  }
  
  .back-button {
    padding: 0.5rem 1rem;
  }
  
  .back-text {
    display: none;
  }
  
  .archipelago-title {
    font-size: 1.5rem;
    flex-direction: column;
    text-align: center;
  }
  
  .title-icon {
    font-size: 2.5rem;
  }
  
  .island-visual {
    width: 80px;
    height: 80px;
  }
  
  .island-base {
    width: 60px;
    height: 25px;
  }
  
  .island-visual .island-icon {
    font-size: 2rem;
  }
  
  .island-pulse {
    width: 50px;
    height: 50px;
  }
  
  .island-info {
    padding: 1rem;
  }
  
  .island-name {
    font-size: 1rem;
  }
  
  .island-description {
    font-size: 0.75rem;
  }
}
</style>