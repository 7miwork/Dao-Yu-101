<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center space-x-4">
      <button @click="goBack" class="text-2xl hover:opacity-70 transition-opacity">
        ←
      </button>
      <div>
        <h1 class="text-3xl font-bold flex items-center space-x-3">
          <span>{{ islandData.icon }}</span>
          <span>{{ islandData.name }}</span>
        </h1>
        <p class="opacity-70 mt-1">{{ islandData.description }}</p>
      </div>
    </div>

    <!-- Password Protection -->
    <div v-if="!unlocked" class="card max-w-md mx-auto text-center">
      <div class="text-6xl mb-4">🔒</div>
      <h2 class="text-xl font-bold mb-4">
        {{ $t('island.password.title') }}
      </h2>
      <p class="opacity-70 mb-6">
        {{ $t('island.locked') }}
      </p>
      <form @submit.prevent="handleUnlock" class="space-y-4">
        <input 
          v-model="password"
          type="password"
          :placeholder="$t('island.password.placeholder')"
          class="w-full px-4 py-3 rounded-lg border text-center"
          style="background: var(--bg-primary); border-color: var(--border); color: var(--text-primary);"
        />
        <p v-if="error" class="text-red-500 text-sm">
          {{ $t('island.password.error') }}
        </p>
        <button type="submit" class="btn-primary w-full">
          {{ $t('island.password.submit') }}
        </button>
      </form>
    </div>

    <!-- Lessons List -->
    <section v-else>
      <h2 class="text-xl font-semibold mb-6">
        {{ $t('island.lessons') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="lesson in lessons"
          :key="lesson.id"
          icon="📖"
          :title="lesson.title"
          :description="lesson.description"
          :to="`/lesson/${lesson.id}`"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isIslandUnlocked, unlockIsland } from '../../utils/auth.js'
import Card from '../../components/Card.vue'

const route = useRoute()
const router = useRouter()

const password = ref('')
const error = ref(false)
const unlocked = ref(false)

const islandsData = {
  'minecraft-basics': {
    id: 'minecraft-basics',
    icon: '⛏️',
    name: 'Minecraft Basics',
    description: 'Learn the fundamentals of Minecraft',
    password: 'minecraft123',
    lessons: [
      { id: 'mc-lesson-1', title: 'Introduction to Minecraft', description: 'Getting started with Minecraft' },
      { id: 'mc-lesson-2', title: 'Crafting Basics', description: 'Learn essential crafting recipes' },
      { id: 'mc-lesson-3', title: 'Building Your First House', description: 'Create shelter to survive' },
      { id: 'mc-lesson-4', title: 'Mining Techniques', description: 'Efficient resource gathering' },
      { id: 'mc-lesson-5', title: 'Farming Fundamentals', description: 'Grow food and breed animals' }
    ]
  },
  'python-intro': {
    id: 'python-intro',
    icon: '🐍',
    name: 'Python Introduction',
    description: 'Start your Python journey',
    password: 'python456',
    lessons: [
      { id: 'py-lesson-1', title: 'What is Python?', description: 'Introduction to Python programming' },
      { id: 'py-lesson-2', title: 'Variables and Data Types', description: 'Understanding Python data types' },
      { id: 'py-lesson-3', title: 'Control Flow', description: 'If statements and loops' },
      { id: 'py-lesson-4', title: 'Functions', description: 'Creating reusable code' }
    ]
  },
  'algebra': {
    id: 'algebra',
    icon: '➕',
    name: 'Algebra',
    description: 'Master algebraic concepts',
    password: 'algebra123',
    lessons: [
      { id: 'alg-lesson-1', title: 'Introduction to Algebra', description: 'What is algebra?' },
      { id: 'alg-lesson-2', title: 'Solving Equations', description: 'Basic equation solving' },
      { id: 'alg-lesson-3', title: 'Variables and Expressions', description: 'Working with variables' }
    ]
  },
  'physics': {
    id: 'physics',
    icon: '⚛️',
    name: 'Physics',
    description: 'Understand the laws of nature',
    password: 'physics123',
    lessons: [
      { id: 'phy-lesson-1', title: 'Introduction to Physics', description: 'What is physics?' },
      { id: 'phy-lesson-2', title: 'Motion and Forces', description: 'Newton\'s laws of motion' },
      { id: 'phy-lesson-3', title: 'Energy', description: 'Understanding energy' }
    ]
  }
}

const islandId = computed(() => route.params.id)
const islandData = computed(() => islandsData[islandId.value] || {
  icon: '🏝️',
  name: 'Island',
  description: 'A learning island',
  password: 'default123',
  lessons: []
})
const lessons = computed(() => islandData.value.lessons || [])

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
input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}
</style>