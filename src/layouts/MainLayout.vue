<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="py-6 text-center text-sm opacity-70">
      <p>© 2024 Dao-Yu-101. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
</script>