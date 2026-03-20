<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center space-x-4">
      <router-link to="/" class="text-2xl hover:opacity-70 transition-opacity">
        ←
      </router-link>
      <div>
        <h1 class="text-3xl font-bold flex items-center space-x-3">
          <span>{{ archipelagoData.icon }}</span>
          <span>{{ archipelagoData.name }}</span>
        </h1>
        <p class="opacity-70 mt-1">{{ archipelagoData.description }}</p>
      </div>
    </div>

    <!-- Islands Grid -->
    <section>
      <h2 class="text-xl font-semibold mb-6">
        {{ $t('archipelago.islands') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="island in islands"
          :key="island.id"
          :icon="island.icon"
          :title="island.name"
          :description="island.description"
          :count="island.lessonCount"
          :count-label="$t('archipelago.lessons')"
          :locked="!isIslandUnlocked(island.id)"
          :to="isIslandUnlocked(island.id) ? `/island/${island.id}` : ''"
          @click="handleIslandClick(island)"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isIslandUnlocked } from '../../utils/auth.js'
import Card from '../../components/Card.vue'

const route = useRoute()
const router = useRouter()

const archipelagos = {
  programming: {
    id: 'programming',
    icon: '💻',
    name: 'Programming',
    description: 'Learn coding from basics to advanced concepts'
  },
  mathematics: {
    id: 'mathematics',
    icon: '📐',
    name: 'Mathematics',
    description: 'Explore the world of numbers and logic'
  },
  science: {
    id: 'science',
    icon: '🔬',
    name: 'Science',
    description: 'Discover the wonders of the natural world'
  },
  languages: {
    id: 'languages',
    icon: '🌍',
    name: 'Languages',
    description: 'Master new languages and communication'
  },
  arts: {
    id: 'arts',
    icon: '🎨',
    name: 'Arts',
    description: 'Express creativity through various mediums'
  },
  history: {
    id: 'history',
    icon: '📜',
    name: 'History',
    description: 'Journey through time and civilizations'
  }
}

const islandsData = {
  programming: [
    { id: 'minecraft-basics', icon: '⛏️', name: 'Minecraft Basics', description: 'Learn the fundamentals of Minecraft', lessonCount: 15, password: 'minecraft123' },
    { id: 'python-intro', icon: '🐍', name: 'Python Introduction', description: 'Start your Python journey', lessonCount: 12, password: 'python456' },
    { id: 'web-dev', icon: '🌐', name: 'Web Development', description: 'Build websites from scratch', lessonCount: 18, password: 'web789' },
    { id: 'game-dev', icon: '🎮', name: 'Game Development', description: 'Create your own games', lessonCount: 14, password: 'game101' },
    { id: 'data-structures', icon: '📊', name: 'Data Structures', description: 'Master fundamental data structures', lessonCount: 10, password: 'data202' }
  ],
  mathematics: [
    { id: 'algebra', icon: '➕', name: 'Algebra', description: 'Master algebraic concepts', lessonCount: 12, password: 'algebra123' },
    { id: 'geometry', icon: '📐', name: 'Geometry', description: 'Explore shapes and spaces', lessonCount: 10, password: 'geometry456' },
    { id: 'calculus', icon: '📈', name: 'Calculus', description: 'Understand change and motion', lessonCount: 15, password: 'calculus789' },
    { id: 'statistics', icon: '📊', name: 'Statistics', description: 'Analyze data and probability', lessonCount: 8, password: 'stats101' }
  ],
  science: [
    { id: 'physics', icon: '⚛️', name: 'Physics', description: 'Understand the laws of nature', lessonCount: 14, password: 'physics123' },
    { id: 'chemistry', icon: '🧪', name: 'Chemistry', description: 'Explore matter and reactions', lessonCount: 12, password: 'chemistry456' },
    { id: 'biology', icon: '🧬', name: 'Biology', description: 'Study living organisms', lessonCount: 16, password: 'biology789' },
    { id: 'astronomy', icon: '🔭', name: 'Astronomy', description: 'Explore the universe', lessonCount: 10, password: 'astro101' },
    { id: 'earth-science', icon: '🌍', name: 'Earth Science', description: 'Understand our planet', lessonCount: 11, password: 'earth202' },
    { id: 'environmental', icon: '🌱', name: 'Environmental Science', description: 'Study ecosystems', lessonCount: 9, password: 'enviro303' }
  ],
  languages: [
    { id: 'english', icon: '🇬🇧', name: 'English', description: 'Master the English language', lessonCount: 20, password: 'english123' },
    { id: 'mandarin', icon: '🇨🇳', name: 'Mandarin Chinese', description: 'Learn Mandarin Chinese', lessonCount: 18, password: 'mandarin456' },
    { id: 'spanish', icon: '🇪🇸', name: 'Spanish', description: 'Discover Spanish language', lessonCount: 15, password: 'spanish789' }
  ],
  arts: [
    { id: 'drawing', icon: '✏️', name: 'Drawing', description: 'Learn to draw and sketch', lessonCount: 12, password: 'drawing123' },
    { id: 'painting', icon: '🎨', name: 'Painting', description: 'Express through colors', lessonCount: 10, password: 'painting456' },
    { id: 'digital-art', icon: '💻', name: 'Digital Art', description: 'Create digital masterpieces', lessonCount: 14, password: 'digital789' },
    { id: 'music', icon: '🎵', name: 'Music', description: 'Learn music theory and practice', lessonCount: 16, password: 'music101' }
  ],
  history: [
    { id: 'ancient', icon: '🏛️', name: 'Ancient Civilizations', description: 'Explore ancient worlds', lessonCount: 12, password: 'ancient123' },
    { id: 'medieval', icon: '🏰', name: 'Medieval Period', description: 'Journey through the Middle Ages', lessonCount: 10, password: 'medieval456' },
    { id: 'modern', icon: '🏭', name: 'Modern History', description: 'Understand the modern world', lessonCount: 14, password: 'modern789' },
    { id: 'world-wars', icon: '⚔️', name: 'World Wars', description: 'Study the great conflicts', lessonCount: 11, password: 'wars101' },
    { id: 'cultural', icon: '🎭', name: 'Cultural History', description: 'Explore cultural evolution', lessonCount: 9, password: 'cultural202' }
  ]
}

const archipelagoId = computed(() => route.params.id)
const archipelagoData = computed(() => archipelagos[archipelagoId.value] || archipelagos.programming)
const islands = computed(() => islandsData[archipelagoId.value] || [])

function handleIslandClick(island) {
  if (!isIslandUnlocked(island.id)) {
    router.push(`/island/${island.id}`)
  }
}
</script>