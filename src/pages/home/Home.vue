<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-16">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        {{ $t('home.hero.title') }}
      </h1>
      <p class="text-xl md:text-2xl opacity-80 mb-8">
        {{ $t('home.hero.subtitle') }}
      </p>
      <router-link 
        to="/archipelago/programming" 
        class="btn-primary inline-block text-lg"
      >
        {{ $t('home.hero.cta') }}
      </router-link>
    </section>

    <!-- Intro Section -->
    <section class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">
        {{ $t('home.intro.title') }}
      </h2>
      <p class="text-lg opacity-80 leading-relaxed">
        {{ $t('home.intro.description') }}
      </p>
    </section>

    <!-- Archipelagos Section -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">
          {{ $t('home.archipelagos.title') }}
        </h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="archipelago in archipelagos"
          :key="archipelago.id"
          :icon="archipelago.icon"
          :title="archipelago.name"
          :description="archipelago.description"
          :count="archipelago.islandCount"
          :count-label="$t('archipelago.islands')"
          :to="`/archipelago/${archipelago.id}`"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../../components/Card.vue'

const archipelagos = ref([
  {
    id: 'programming',
    icon: '💻',
    name: 'Programming',
    description: 'Learn coding from basics to advanced concepts',
    islandCount: 5
  },
  {
    id: 'mathematics',
    icon: '📐',
    name: 'Mathematics',
    description: 'Explore the world of numbers and logic',
    islandCount: 4
  },
  {
    id: 'science',
    icon: '🔬',
    name: 'Science',
    description: 'Discover the wonders of the natural world',
    islandCount: 6
  },
  {
    id: 'languages',
    icon: '🌍',
    name: 'Languages',
    description: 'Master new languages and communication',
    islandCount: 3
  },
  {
    id: 'arts',
    icon: '🎨',
    name: 'Arts',
    description: 'Express creativity through various mediums',
    islandCount: 4
  },
  {
    id: 'history',
    icon: '📜',
    name: 'History',
    description: 'Journey through time and civilizations',
    islandCount: 5
  }
])
</script>