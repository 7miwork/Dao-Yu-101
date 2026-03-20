<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Title Section -->
    <section class="text-center">
      <h1 class="text-4xl font-bold mb-6">
        {{ $t('shop.title') }}
      </h1>
      <div class="inline-block px-6 py-3 rounded-full text-lg font-semibold mb-6" 
           style="background: var(--accent); color: white;">
        {{ $t('shop.comingSoon') }}
      </div>
      <p class="text-lg opacity-80 leading-relaxed max-w-2xl mx-auto">
        {{ $t('shop.description') }}
      </p>
    </section>

    <!-- Preview Section -->
    <section class="card">
      <h2 class="text-2xl font-bold mb-6 text-center">What to Expect</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="text-center p-4">
          <div class="text-5xl mb-4">📚</div>
          <h3 class="font-semibold mb-2">Learning Materials</h3>
          <p class="text-sm opacity-70">Workbooks, guides, and study resources</p>
        </div>
        <div class="text-center p-4">
          <div class="text-5xl mb-4">🎮</div>
          <h3 class="font-semibold mb-2">Minecraft Worlds</h3>
          <p class="text-sm opacity-70">Educational .mcworld files</p>
        </div>
        <div class="text-center p-4">
          <div class="text-5xl mb-4">🎨</div>
          <h3 class="font-semibold mb-2">Digital Assets</h3>
          <p class="text-sm opacity-70">Templates, graphics, and tools</p>
        </div>
        <div class="text-center p-4">
          <div class="text-5xl mb-4">🏆</div>
          <h3 class="font-semibold mb-2">Certificates</h3>
          <p class="text-sm opacity-70">Achievement badges and diplomas</p>
        </div>
        <div class="text-center p-4">
          <div class="text-5xl mb-4">👕</div>
          <h3 class="font-semibold mb-2">Merchandise</h3>
          <p class="text-sm opacity-70">Branded apparel and accessories</p>
        </div>
        <div class="text-center p-4">
          <div class="text-5xl mb-4">🎁</div>
          <h3 class="font-semibold mb-2">Gift Cards</h3>
          <p class="text-sm opacity-70">Share the gift of learning</p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="card text-center">
      <h2 class="text-2xl font-bold mb-4">Stay Updated</h2>
      <p class="opacity-80 mb-6">
        Be the first to know when our shop launches!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="Enter your email"
          class="flex-1 px-4 py-3 rounded-lg border"
          style="background: var(--bg-primary); border-color: var(--border); color: var(--text-primary);"
        />
        <button class="btn-primary whitespace-nowrap">
          Notify Me
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
// Shop page - placeholder for future implementation
</script>

<style scoped>
input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}
</style>