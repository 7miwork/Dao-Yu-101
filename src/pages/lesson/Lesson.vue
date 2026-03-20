<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center space-x-4">
      <button @click="goBack" class="text-2xl hover:opacity-70 transition-opacity">
        ←
      </button>
      <div>
        <h1 class="text-3xl font-bold">
          {{ lessonData.title }}
        </h1>
        <p class="opacity-70 mt-1">{{ lessonData.description }}</p>
      </div>
    </div>

    <!-- Content Tabs -->
    <div class="flex space-x-4 border-b" style="border-color: var(--border);">
      <button 
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 font-medium transition-colors border-b-2 -mb-px"
        :class="activeTab === tab.id ? 'border-current' : 'border-transparent'"
        :style="{ color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)' }"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <!-- Video Content -->
    <section v-if="activeTab === 'video'" class="card">
      <h2 class="text-xl font-bold mb-4">
        {{ $t('lesson.content.video') }}
      </h2>
      <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <div class="text-center">
          <div class="text-6xl mb-4">🎬</div>
          <p class="text-lg font-medium">Video Content</p>
          <p class="text-sm opacity-70">Coming Soon</p>
        </div>
      </div>
    </section>

    <!-- Text Content -->
    <section v-if="activeTab === 'text'" class="card">
      <h2 class="text-xl font-bold mb-4">
        {{ $t('lesson.content.text') }}
      </h2>
      <div class="prose max-w-none">
        <div v-html="lessonData.content"></div>
      </div>
    </section>

    <!-- AI Tutor -->
    <section v-if="activeTab === 'ai'" class="card">
      <h2 class="text-xl font-bold mb-4">
        {{ $t('lesson.content.aiTutor') }}
      </h2>
      <div class="text-center py-12">
        <div class="text-6xl mb-4">🤖</div>
        <p class="text-lg font-medium">AI Tutor</p>
        <p class="text-sm opacity-70">Coming Soon</p>
        <p class="text-xs opacity-50 mt-2">Get personalized help and explanations</p>
      </div>
    </section>

    <!-- Navigation -->
    <div class="flex justify-between items-center pt-8 border-t" style="border-color: var(--border);">
      <button 
        v-if="prevLesson"
        @click="goToLesson(prevLesson.id)"
        class="btn-primary flex items-center space-x-2"
      >
        <span>←</span>
        <span>{{ $t('lesson.navigation.previous') }}</span>
      </button>
      <div v-else></div>
      
      <button 
        v-if="nextLesson"
        @click="goToLesson(nextLesson.id)"
        class="btn-primary flex items-center space-x-2"
      >
        <span>{{ $t('lesson.navigation.next') }}</span>
        <span>→</span>
      </button>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Static imports for all lesson data
import lesson1 from '@/content/lessons/lesson-1.json'
import lesson2 from '@/content/lessons/lesson-2.json'
import lesson3 from '@/content/lessons/lesson-3.json'
import lesson4 from '@/content/lessons/lesson-4.json'
import lesson5 from '@/content/lessons/lesson-5.json'
import lesson6 from '@/content/lessons/lesson-6.json'
import lesson7 from '@/content/lessons/lesson-7.json'
import lesson8 from '@/content/lessons/lesson-8.json'
import lesson9 from '@/content/lessons/lesson-9.json'
import lesson10 from '@/content/lessons/lesson-10.json'
import lesson11 from '@/content/lessons/lesson-11.json'
import lesson12 from '@/content/lessons/lesson-12.json'
import lesson13 from '@/content/lessons/lesson-13.json'
import lesson14 from '@/content/lessons/lesson-14.json'
import lesson15 from '@/content/lessons/lesson-15.json'
import algLesson1 from '@/content/lessons/alg-lesson-1.json'
import phyLesson1 from '@/content/lessons/phy-lesson-1.json'
import engLesson1 from '@/content/lessons/eng-lesson-1.json'
import drawLesson1 from '@/content/lessons/draw-lesson-1.json'
import ancLesson1 from '@/content/lessons/anc-lesson-1.json'

const route = useRoute()
const router = useRouter()

const activeTab = ref('text')

const tabs = [
  { id: 'video', icon: '🎬', name: 'Video' },
  { id: 'text', icon: '📝', name: 'Text' },
  { id: 'ai', icon: '🤖', name: 'AI Tutor' }
]

// Map lesson data by ID
const lessonMap = {
  'lesson-1': lesson1,
  'lesson-2': lesson2,
  'lesson-3': lesson3,
  'lesson-4': lesson4,
  'lesson-5': lesson5,
  'lesson-6': lesson6,
  'lesson-7': lesson7,
  'lesson-8': lesson8,
  'lesson-9': lesson9,
  'lesson-10': lesson10,
  'lesson-11': lesson11,
  'lesson-12': lesson12,
  'lesson-13': lesson13,
  'lesson-14': lesson14,
  'lesson-15': lesson15,
  'alg-lesson-1': algLesson1,
  'phy-lesson-1': phyLesson1,
  'eng-lesson-1': engLesson1,
  'draw-lesson-1': drawLesson1,
  'anc-lesson-1': ancLesson1
}

const lessonId = computed(() => route.params.id)

// Get lesson data from static imports
const lessonData = computed(() => {
  const data = lessonMap[lessonId.value]
  if (data) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      content: data.content.text,
      prevLesson: data.prevLesson ? { id: data.prevLesson, title: lessonMap[data.prevLesson]?.title || '' } : null,
      nextLesson: data.nextLesson ? { id: data.nextLesson, title: lessonMap[data.nextLesson]?.title || '' } : null
    }
  }
  return {
    title: 'Lesson Not Found',
    description: 'This lesson could not be loaded',
    content: '<p>Lesson content not available.</p>',
    prevLesson: null,
    nextLesson: null
  }
})

const prevLesson = computed(() => lessonData.value.prevLesson)
const nextLesson = computed(() => lessonData.value.nextLesson)

function goBack() {
  router.back()
}

function goToLesson(id) {
  router.push(`/lesson/${id}`)
}
</script>

<style scoped>
.prose h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.prose h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

.prose ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.prose pre {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.prose code {
  font-family: monospace;
  color: var(--accent);
}
</style>