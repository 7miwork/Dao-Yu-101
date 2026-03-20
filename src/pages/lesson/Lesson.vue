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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeTab = ref('text')
const lessonData = ref({
  title: 'Lesson',
  description: 'A learning lesson',
  content: '<p>Loading lesson content...</p>',
  prevLesson: null,
  nextLesson: null
})

const tabs = [
  { id: 'video', icon: '🎬', name: 'Video' },
  { id: 'text', icon: '📝', name: 'Text' },
  { id: 'ai', icon: '🤖', name: 'AI Tutor' }
]

const lessonId = computed(() => route.params.id)

// Load lesson data from JSON files
async function loadLessonData() {
  try {
    const response = await fetch(`/src/content/lessons/${lessonId.value}.json`)
    if (response.ok) {
      const data = await response.json()
      lessonData.value = {
        id: data.id,
        title: data.title,
        description: data.description,
        content: data.content.text,
        prevLesson: data.prevLesson ? { id: data.prevLesson, title: '' } : null,
        nextLesson: data.nextLesson ? { id: data.nextLesson, title: '' } : null
      }
      
      // Load previous and next lesson titles
      if (data.prevLesson) {
        const prevResponse = await fetch(`/src/content/lessons/${data.prevLesson}.json`)
        if (prevResponse.ok) {
          const prevData = await prevResponse.json()
          lessonData.value.prevLesson.title = prevData.title
        }
      }
      
      if (data.nextLesson) {
        const nextResponse = await fetch(`/src/content/lessons/${data.nextLesson}.json`)
        if (nextResponse.ok) {
          const nextData = await nextResponse.json()
          lessonData.value.nextLesson.title = nextData.title
        }
      }
    } else {
      lessonData.value = {
        title: 'Lesson Not Found',
        description: 'This lesson could not be loaded',
        content: '<p>Lesson content not available.</p>',
        prevLesson: null,
        nextLesson: null
      }
    }
  } catch (error) {
    console.error('Error loading lesson:', error)
    lessonData.value = {
      title: 'Error Loading Lesson',
      description: 'There was an error loading this lesson',
      content: '<p>Please try again later.</p>',
      prevLesson: null,
      nextLesson: null
    }
  }
}

// Load lesson data when component mounts or lesson ID changes
onMounted(() => {
  loadLessonData()
})

watch(lessonId, () => {
  loadLessonData()
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