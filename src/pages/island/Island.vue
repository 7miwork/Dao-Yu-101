<template>
  <div class="lesson-path-container">
    <!-- Ocean Background -->
    <div class="ocean-background">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
    </div>

    <!-- Header -->
    <div class="path-header">
      <button @click="goBack" class="back-button">
        <span class="back-icon">←</span>
        <span class="back-text">{{ $t('common.back') }}</span>
      </button>
      <div class="header-content">
        <h1 class="island-title">
          <span class="title-icon">{{ islandData.icon }}</span>
          <span class="title-text">{{ islandData.name }}</span>
        </h1>
        <p class="island-description">{{ islandData.description }}</p>
      </div>
    </div>

    <!-- Password Protection -->
    <div v-if="!unlocked" class="password-section">
      <div class="password-card">
        <div class="lock-icon">🔒</div>
        <h2 class="password-title">
          {{ $t('island.password.title') }}
        </h2>
        <p class="password-description">
          {{ $t('island.locked') }}
        </p>
        <form @submit.prevent="handleUnlock" class="password-form">
          <input 
            v-model="password"
            type="password"
            :placeholder="$t('island.password.placeholder')"
            class="password-input"
          />
          <p v-if="error" class="error-message">
            {{ $t('island.password.error') }}
          </p>
          <button type="submit" class="btn-primary password-submit">
            {{ $t('island.password.submit') }}
          </button>
        </form>
      </div>
    </div>

    <!-- Lesson Path -->
    <section v-else class="lesson-path-section">
      <h2 class="section-title">
        {{ $t('island.lessons') }}
      </h2>
      
      <div class="path-container">
        <!-- Path Line SVG -->
        <svg class="path-line" viewBox="0 0 100 800" preserveAspectRatio="xMidYMid meet">
          <path 
            d="M 50 0 Q 80 100 50 200 Q 20 300 50 400 Q 80 500 50 600 Q 20 700 50 800"
            class="path-curve"
            fill="none"
            stroke="var(--accent, #4ade80)"
            stroke-width="3"
            stroke-dasharray="10 5"
          />
        </svg>

        <!-- Lessons -->
        <div 
          v-for="(lesson, index) in lessons"
          :key="lesson.id"
          class="lesson-node"
          :class="{ 
            'completed': isLessonCompleted(lesson.id),
            'current': isCurrentLesson(lesson.id),
            'locked': !isLessonAccessible(lesson.id)
          }"
          :style="getLessonPosition(index)"
        >
          <router-link 
            v-if="isLessonAccessible(lesson.id)"
            :to="`/lesson/${lesson.id}`"
            class="lesson-link"
          >
            <div class="lesson-visual">
              <div class="lesson-circle">
                <span class="lesson-number">{{ index + 1 }}</span>
                <div v-if="isLessonCompleted(lesson.id)" class="completion-badge">✓</div>
              </div>
              <div v-if="isCurrentLesson(lesson.id)" class="current-pulse"></div>
            </div>
            <div class="lesson-info">
              <h3 class="lesson-title">{{ lesson.title }}</h3>
              <p class="lesson-description">{{ lesson.description }}</p>
              <div class="lesson-status">
                <span v-if="isLessonCompleted(lesson.id)" class="status completed">
                  {{ $t('lesson.completed') }}
                </span>
                <span v-else-if="isCurrentLesson(lesson.id)" class="status current">
                  {{ $t('lesson.current') }}
                </span>
                <span v-else class="status available">
                  {{ $t('lesson.available') }}
                </span>
              </div>
            </div>
          </router-link>
          
          <div v-else class="lesson-locked">
            <div class="lesson-visual">
              <div class="lesson-circle locked">
                <span class="lock-icon">🔒</span>
              </div>
            </div>
            <div class="lesson-info">
              <h3 class="lesson-title">{{ lesson.title }}</h3>
              <p class="lesson-description">{{ $t('lesson.locked') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Indicator -->
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <p class="progress-text">
          {{ completedCount }} / {{ lessons.length }} {{ $t('island.lessons') }} {{ $t('lesson.completed') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isIslandUnlocked, unlockIsland, isLessonCompleted, markLessonCompleted } from '../../utils/auth.js'

const route = useRoute()
const router = useRouter()

const password = ref('')
const error = ref(false)
const unlocked = ref(false)
const islandData = ref({
  id: '',
  icon: '🏝️',
  name: 'Island',
  description: 'A learning island',
  password: 'default123',
  lessons: []
})
const lessons = ref([])

const islandId = computed(() => route.params.id)

// Load island data from JSON files
async function loadIslandData() {
  try {
    const response = await fetch(`/src/content/islands/${islandId.value}.json`)
    if (response.ok) {
      const data = await response.json()
      islandData.value = {
        id: data.id,
        icon: '⛏️',
        name: data.title,
        description: data.description,
        password: data.password,
        lessons: []
      }
      
      // Load lesson data for each lesson ID
      const lessonPromises = data.lessons.map(async (lessonId) => {
        const lessonResponse = await fetch(`/src/content/lessons/${lessonId}.json`)
        if (lessonResponse.ok) {
          const lessonData = await lessonResponse.json()
          return {
            id: lessonData.id,
            title: lessonData.title,
            description: lessonData.description
          }
        }
        return null
      })
      
      const loadedLessons = await Promise.all(lessonPromises)
      lessons.value = loadedLessons.filter(lesson => lesson !== null)
    } else {
      islandData.value = {
        id: islandId.value,
        icon: '🏝️',
        name: 'Island Not Found',
        description: 'This island could not be loaded',
        password: 'default123',
        lessons: []
      }
      lessons.value = []
    }
  } catch (error) {
    console.error('Error loading island:', error)
    islandData.value = {
      id: islandId.value,
      icon: '🏝️',
      name: 'Error Loading Island',
      description: 'There was an error loading this island',
      password: 'default123',
      lessons: []
    }
    lessons.value = []
  }
}

// Load island data when component mounts or island ID changes
onMounted(() => {
  loadIslandData()
})

watch(islandId, () => {
  loadIslandData()
})

const completedCount = computed(() => {
  return lessons.value.filter(lesson => isLessonCompleted(lesson.id)).length
})

const progressPercentage = computed(() => {
  if (lessons.value.length === 0) return 0
  return (completedCount.value / lessons.value.length) * 100
})

function getLessonPosition(index) {
  const positions = [
    { left: '20%', top: '10%' },
    { left: '70%', top: '25%' },
    { left: '30%', top: '40%' },
    { left: '60%', top: '55%' },
    { left: '25%', top: '70%' },
    { left: '65%', top: '85%' }
  ]
  return positions[index] || positions[0]
}

function isLessonAccessible(lessonId) {
  const lessonIndex = lessons.value.findIndex(l => l.id === lessonId)
  if (lessonIndex === 0) return true
  
  const previousLesson = lessons.value[lessonIndex - 1]
  return isLessonCompleted(previousLesson.id)
}

function isCurrentLesson(lessonId) {
  const lessonIndex = lessons.value.findIndex(l => l.id === lessonId)
  if (lessonIndex === 0) return !isLessonCompleted(lessonId)
  
  const previousLesson = lessons.value[lessonIndex - 1]
  return isLessonCompleted(previousLesson.id) && !isLessonCompleted(lessonId)
}

function handleUnlock() {
  if (password.value === islandData.value.password) {
    unlockIsland(islandId.value)
    unlocked.value = true
    error.value = false
  } else {
    error.value = true
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  unlocked.value = isIslandUnlocked(islandId.value)
})
</script>

<style scoped>
.lesson-path-container {
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
.path-header {
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
  border: none;
  cursor: pointer;
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

.island-title {
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

.island-description {
  font-size: 1.25rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: var(--text-primary, #fff);
}

/* Password Section */
.password-section {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem;
}

.password-card {
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.lock-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.password-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary, #166534);
}

.password-description {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  color: var(--text-secondary, #15803d);
  line-height: 1.5;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.password-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--border, #86efac);
  border-radius: 12px;
  font-size: 1rem;
  text-align: center;
  background: var(--bg-primary, #f0fdf4);
  color: var(--text-primary, #166534);
  transition: all 0.3s ease;
}

.password-input:focus {
  outline: none;
  border-color: var(--accent, #4ade80);
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
}

.password-input::placeholder {
  color: var(--text-secondary, #15803d);
  opacity: 0.6;
}

.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  margin: 0;
}

.password-submit {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Lesson Path Section */
.lesson-path-section {
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

.path-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 800px;
  margin: 0 auto;
}

/* Path Line */
.path-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.path-curve {
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Lesson Nodes */
.lesson-node {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 250px;
  z-index: 10;
  transition: all 0.4s ease;
}

.lesson-node.completed {
  z-index: 15;
}

.lesson-node.current {
  z-index: 20;
}

.lesson-node.locked {
  z-index: 5;
  opacity: 0.6;
}

.lesson-link,
.lesson-locked {
  display: block;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lesson-link:hover {
  transform: scale(1.05);
}

.lesson-locked:hover {
  transform: scale(1.02);
}

/* Lesson Visual */
.lesson-visual {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
}

.lesson-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.3s ease;
}

.lesson-circle.locked {
  background: var(--bg-secondary, rgba(200, 200, 200, 0.9));
}

.lesson-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary, #166534);
}

.completion-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 30px;
  height: 30px;
  background: var(--accent, #4ade80);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(74, 222, 128, 0.4);
}

.current-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--accent, #4ade80);
  opacity: 0;
  animation: pulse 2s infinite;
  z-index: -1;
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

/* Lesson Info */
.lesson-info {
  text-align: center;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.lesson-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-primary, #166534);
}

.lesson-description {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  color: var(--text-secondary, #15803d);
  line-height: 1.3;
}

.lesson-status {
  display: flex;
  justify-content: center;
}

.status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.status.completed {
  background: var(--accent, #4ade80);
  color: white;
}

.status.current {
  background: var(--accent-hover, #22c55e);
  color: white;
  animation: pulse-status 2s infinite;
}

@keyframes pulse-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.status.available {
  background: var(--bg-secondary, rgba(200, 200, 200, 0.5));
  color: var(--text-secondary, #15803d);
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
  .path-container {
    height: auto;
    min-height: 1000px;
  }
  
  .lesson-node {
    position: relative;
    left: auto !important;
    top: auto !important;
    transform: none;
    width: 100%;
    margin-bottom: 2rem;
  }
  
  .path-line {
    display: none;
  }
  
  .island-title {
    font-size: 2rem;
  }
  
  .title-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .path-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .island-title {
    font-size: 1.75rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .island-description {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .lesson-path-section {
    padding: 1rem;
  }
  
  .lesson-visual {
    width: 60px;
    height: 60px;
  }
  
  .lesson-circle {
    width: 60px;
    height: 60px;
  }
  
  .lesson-number {
    font-size: 1.25rem;
  }
  
  .completion-badge {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }
  
  .current-pulse {
    width: 80px;
    height: 80px;
  }
  
  .lesson-info {
    padding: 0.75rem;
  }
  
  .lesson-title {
    font-size: 0.9rem;
  }
  
  .lesson-description {
    font-size: 0.75rem;
  }
  
  .password-card {
    padding: 2rem;
  }
  
  .password-title {
    font-size: 1.5rem;
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
  
  .island-title {
    font-size: 1.5rem;
    flex-direction: column;
    text-align: center;
  }
  
  .title-icon {
    font-size: 2.5rem;
  }
  
  .lesson-visual {
    width: 50px;
    height: 50px;
  }
  
  .lesson-circle {
    width: 50px;
    height: 50px;
  }
  
  .lesson-number {
    font-size: 1rem;
  }
  
  .completion-badge {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
  }
  
  .current-pulse {
    width: 70px;
    height: 70px;
  }
  
  .password-card {
    padding: 1.5rem;
  }
  
  .lock-icon {
    font-size: 3rem;
  }
  
  .password-title {
    font-size: 1.25rem;
  }
}
</style>