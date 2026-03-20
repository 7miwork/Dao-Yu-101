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
      
      <div class="islands-container">
        <!-- Connection Lines SVG -->
        <svg class="connection-lines" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          <path 
            v-for="(connection, index) in connections"
            :key="index"
            :d="connection.path"
            class="connection-path"
            :class="{ 'unlocked': connection.unlocked }"
          />
        </svg>

        <!-- Islands -->
        <div 
          v-for="(island, index) in islands"
          :key="island.id"
          class="island-node"
          :class="{ 
            'unlocked': isIslandUnlocked(island.id),
            'locked': !isIslandUnlocked(island.id)
          }"
          :style="getIslandPosition(index)"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isIslandUnlocked } from '../../utils/auth.js'

const route = useRoute()
const router = useRouter()

const archipelagoData = ref({
  id: '',
  icon: '💻',
  name: 'Archipelago',
  description: 'A learning archipelago',
  islands: []
})
const islands = ref([])

const archipelagoId = computed(() => route.params.id)

// Load archipelago data from JSON files
async function loadArchipelagoData() {
  try {
    const response = await fetch(`/src/content/archipelagos/${archipelagoId.value}.json`)
    if (response.ok) {
      const data = await response.json()
      archipelagoData.value = {
        id: data.id,
        icon: '💻',
        name: data.title,
        description: data.description,
        islands: data.islands || []
      }
      
      // Load island data for each island ID
      const islandPromises = data.islands.map(async (islandId) => {
        const islandResponse = await fetch(`/src/content/islands/${islandId}.json`)
        if (islandResponse.ok) {
          const islandData = await islandResponse.json()
          return {
            id: islandData.id,
            icon: '⛏️',
            name: islandData.title,
            description: islandData.description,
            lessonCount: islandData.lessons ? islandData.lessons.length : 0,
            password: islandData.password
          }
        }
        return null
      })
      
      const loadedIslands = await Promise.all(islandPromises)
      islands.value = loadedIslands.filter(island => island !== null)
    } else {
      archipelagoData.value = {
        id: archipelagoId.value,
        icon: '💻',
        name: 'Archipelago Not Found',
        description: 'This archipelago could not be loaded',
        islands: []
      }
      islands.value = []
    }
  } catch (error) {
    console.error('Error loading archipelago:', error)
    archipelagoData.value = {
      id: archipelagoId.value,
      icon: '💻',
      name: 'Error Loading Archipelago',
      description: 'There was an error loading this archipelago',
      islands: []
    }
    islands.value = []
  }
}

// Load archipelago data when component mounts or archipelago ID changes
onMounted(() => {
  loadArchipelagoData()
})

watch(archipelagoId, () => {
  loadArchipelagoData()
})

const unlockedCount = computed(() => {
  return islands.value.filter(island => isIslandUnlocked(island.id)).length
})

const progressPercentage = computed(() => {
  if (islands.value.length === 0) return 0
  return (unlockedCount.value / islands.value.length) * 100
})

const connections = computed(() => {
  const islandPositions = getIslandPositions()
  const connections = []
  
  for (let i = 0; i < islandPositions.length - 1; i++) {
    const current = islandPositions[i]
    const next = islandPositions[i + 1]
    const currentIsland = islands.value[i]
    const nextIsland = islands.value[i + 1]
    
    const path = `M ${current.x} ${current.y} Q ${(current.x + next.x) / 2} ${Math.min(current.y, next.y) - 50} ${next.x} ${next.y}`
    
    connections.push({
      path,
      unlocked: isIslandUnlocked(currentIsland?.id) && isIslandUnlocked(nextIsland?.id)
    })
  }
  
  return connections
})

function getIslandPositions() {
  const count = islands.value.length
  const positions = []
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    const radius = 200
    const centerX = 500
    const centerY = 300
    
    positions.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    })
  }
  
  return positions
}

function getIslandPosition(index) {
  const positions = getIslandPositions()
  const pos = positions[index]
  
  return {
    left: `${(pos.x / 1000) * 100}%`,
    top: `${(pos.y / 600) * 100}%`
  }
}

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

.islands-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 600px;
  margin: 0 auto;
}

/* Connection Lines */
.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connection-path {
  fill: none;
  stroke: var(--border, rgba(255, 255, 255, 0.3));
  stroke-width: 3;
  stroke-dasharray: 10 5;
  transition: all 0.5s ease;
}

.connection-path.unlocked {
  stroke: var(--accent, #4ade80);
  stroke-dasharray: none;
  stroke-width: 4;
}

/* Island Nodes */
.island-node {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 200px;
  transition: all 0.4s ease;
}

.island-node.unlocked {
  z-index: 10;
}

.island-node.locked {
  z-index: 5;
  opacity: 0.7;
}

.island-link,
.island-locked {
  display: block;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.island-link:hover {
  transform: scale(1.1);
}

.island-locked:hover {
  transform: scale(1.05);
}

/* Island Visual */
.island-visual {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
}

.island-base {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 40px;
  background: var(--bg-card, rgba(255, 255, 255, 0.9));
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.island-visual .island-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  z-index: 2;
}

.island-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
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
  padding: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.island-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-primary, #166534);
}

.island-description {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  color: var(--text-secondary, #15803d);
  line-height: 1.3;
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
@media (max-width: 1024px) {
  .islands-container {
    height: auto;
    min-height: 800px;
  }
  
  .island-node {
    position: relative;
    left: auto !important;
    top: auto !important;
    transform: none;
    width: 100%;
    margin-bottom: 2rem;
  }
  
  .connection-lines {
    display: none;
  }
  
  .archipelago-title {
    font-size: 2rem;
  }
  
  .title-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .map-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .archipelago-title {
    font-size: 1.75rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .archipelago-description {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .islands-section {
    padding: 1rem;
  }
  
  .island-visual {
    width: 100px;
    height: 100px;
  }
  
  .island-base {
    width: 80px;
    height: 30px;
  }
  
  .island-visual .island-icon {
    font-size: 2.5rem;
  }
  
  .island-pulse {
    width: 60px;
    height: 60px;
  }
  
  .island-info {
    padding: 0.75rem;
  }
  
  .island-name {
    font-size: 1rem;
  }
  
  .island-description {
    font-size: 0.75rem;
  }
  
  .progress-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
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
}
</style>