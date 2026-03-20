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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeTab = ref('text')

const tabs = [
  { id: 'video', icon: '🎬', name: 'Video' },
  { id: 'text', icon: '📝', name: 'Text' },
  { id: 'ai', icon: '🤖', name: 'AI Tutor' }
]

const lessonsData = {
  'mc-lesson-1': {
    id: 'mc-lesson-1',
    title: 'Introduction to Minecraft',
    description: 'Getting started with Minecraft',
    content: `
      <h3>Welcome to Minecraft!</h3>
      <p>Minecraft is a sandbox video game where players can build, explore, and survive in a blocky, procedurally-generated 3D world.</p>
      
      <h4>What You'll Learn:</h4>
      <ul>
        <li>Basic game controls and movement</li>
        <li>Understanding the Minecraft world</li>
        <li>Day and night cycle</li>
        <li>Basic survival skills</li>
      </ul>
      
      <h4>Getting Started:</h4>
      <p>When you first spawn in Minecraft, you'll appear in a random location in the world. Your first task is to gather basic resources and find shelter before nightfall.</p>
      
      <h4>Key Controls:</h4>
      <ul>
        <li><strong>WASD</strong> - Move</li>
        <li><strong>Space</strong> - Jump</li>
        <li><strong>Left Click</strong> - Break blocks</li>
        <li><strong>Right Click</strong> - Place blocks</li>
        <li><strong>E</strong> - Open inventory</li>
      </ul>
    `,
    prevLesson: null,
    nextLesson: { id: 'mc-lesson-2', title: 'Crafting Basics' }
  },
  'mc-lesson-2': {
    id: 'mc-lesson-2',
    title: 'Crafting Basics',
    description: 'Learn essential crafting recipes',
    content: `
      <h3>Crafting in Minecraft</h3>
      <p>Crafting is one of the most important mechanics in Minecraft. It allows you to create tools, weapons, armor, and many other items.</p>
      
      <h4>The Crafting Grid:</h4>
      <p>The basic crafting grid is 2x2, accessible from your inventory. For more complex recipes, you'll need a Crafting Table (3x3 grid).</p>
      
      <h4>Essential First Recipes:</h4>
      <ul>
        <li><strong>Crafting Table</strong> - 4 wooden planks</li>
        <li><strong>Sticks</strong> - 2 wooden planks (vertical)</li>
        <li><strong>Wooden Pickaxe</strong> - 3 planks + 2 sticks</li>
        <li><strong>Wooden Sword</strong> - 2 planks + 1 stick</li>
      </ul>
      
      <h4>Tips:</h4>
      <p>Always craft a Crafting Table first! It opens up many more crafting possibilities.</p>
    `,
    prevLesson: { id: 'mc-lesson-1', title: 'Introduction to Minecraft' },
    nextLesson: { id: 'mc-lesson-3', title: 'Building Your First House' }
  },
  'py-lesson-1': {
    id: 'py-lesson-1',
    title: 'What is Python?',
    description: 'Introduction to Python programming',
    content: `
      <h3>Introduction to Python</h3>
      <p>Python is a high-level, interpreted programming language known for its simplicity and readability. It's one of the most popular programming languages in the world.</p>
      
      <h4>Why Learn Python?</h4>
      <ul>
        <li>Easy to learn and read</li>
        <li>Versatile - used in web development, data science, AI, automation</li>
        <li>Large community and extensive libraries</li>
        <li>High demand in the job market</li>
      </ul>
      
      <h4>Your First Python Program:</h4>
      <pre><code>print("Hello, World!")</code></pre>
      
      <p>This simple line of code will output: <strong>Hello, World!</strong></p>
      
      <h4>Python Features:</h4>
      <ul>
        <li>No semicolons needed</li>
        <li>Uses indentation for code blocks</li>
        <li>Dynamically typed</li>
        <li>Object-oriented</li>
      </ul>
    `,
    prevLesson: null,
    nextLesson: { id: 'py-lesson-2', title: 'Variables and Data Types' }
  }
}

const lessonId = computed(() => route.params.id)
const lessonData = computed(() => lessonsData[lessonId.value] || {
  title: 'Lesson',
  description: 'A learning lesson',
  content: '<p>Lesson content coming soon...</p>',
  prevLesson: null,
  nextLesson: null
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