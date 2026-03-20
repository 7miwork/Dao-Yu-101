<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Title Section -->
    <section class="text-center">
      <h1 class="text-4xl font-bold mb-6">
        {{ $t('about.title') }}
      </h1>
      <p class="text-lg opacity-80 leading-relaxed">
        {{ $t('about.description') }}
      </p>
    </section>

    <!-- Features Section -->
    <section class="card">
      <h2 class="text-2xl font-bold mb-6">
        {{ $t('about.features.title') }}
      </h2>
      <ul class="space-y-4">
        <li 
          v-for="(feature, index) in features" 
          :key="index"
          class="flex items-center space-x-3"
        >
          <span class="text-2xl">{{ feature.icon }}</span>
          <span>{{ feature.name }}</span>
        </li>
      </ul>
    </section>

    <!-- Mission Section -->
    <section class="card">
      <h2 class="text-2xl font-bold mb-4">
        {{ $t('about.mission.title') }}
      </h2>
      <p class="opacity-80 leading-relaxed">
        {{ $t('about.mission.description') }}
      </p>
    </section>

    <!-- Platform Info -->
    <section class="card">
      <h2 class="text-2xl font-bold mb-4">Platform Structure</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-4xl mb-2">🏝️</div>
          <h3 class="font-semibold mb-2">Archipelagos</h3>
          <p class="text-sm opacity-70">School subjects and learning areas</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-2">🌴</div>
          <h3 class="font-semibold mb-2">Islands</h3>
          <p class="text-sm opacity-70">Topics within each subject</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-2">📚</div>
          <h3 class="font-semibold mb-2">Lessons</h3>
          <p class="text-sm opacity-70">Individual learning units</p>
        </div>
      </div>
    </section>

    <!-- Future Features -->
    <section class="card">
      <h2 class="text-2xl font-bold mb-4">Coming Soon</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-center space-x-3">
          <span class="text-2xl">🎮</span>
          <span>Minecraft Education Integration</span>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-2xl">🤖</span>
          <span>AI-Powered Tutoring</span>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-2xl">🎬</span>
          <span>Interactive Video Content</span>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-2xl">🛒</span>
          <span>Learning Materials Shop</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

const features = computed(() => {
  const featureList = tm('about.features.list')
  const icons = ['🌐', '🎨', '📖', '🎮', '🤖']
  return featureList.map((name, index) => ({
    name,
    icon: icons[index] || '✨'
  }))
})
</script>