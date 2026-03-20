<template>
  <div class="world-map-container">
    <!-- Ocean Background -->
    <div class="ocean-background">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          {{ $t('home.hero.title') }}
        </h1>
        <p class="hero-subtitle">
          {{ $t('home.hero.subtitle') }}
        </p>
        <router-link 
          to="/archipelago/programming" 
          class="btn-primary hero-cta"
        >
          {{ $t('home.hero.cta') }}
        </router-link>
      </div>
    </section>

    <!-- Archipelagos as Floating Islands -->
    <section class="archipelagos-section">
      <h2 class="section-title">
        {{ $t('home.archipelagos.title') }}
      </h2>
      
      <div class="islands-map">
        <div 
          v-for="(archipelago, index) in archipelagos"
          :key="archipelago.id"
          class="floating-island"
          :class="`island-${index + 1}`"
          :style="getIslandStyle(index)"
        >
          <router-link 
            :to="`/archipelago/${archipelago.id}`"
            class="island-link"
          >
            <div class="island-content">
              <div class="island-icon">{{ archipelago.icon }}</div>
              <h3 class="island-name">{{ archipelago.name }}</h3>
              <p class="island-description">{{ archipelago.description }}</p>
              <div class="island-stats">
                <span class="stat">
                  <span class="stat-icon">🏝️</span>
                  {{ archipelago.islandCount }} {{ $t('archipelago.islands') }}
                </span>
              </div>
            </div>
            <div class="island-glow"></div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section">
      <div class="intro-content">
        <h2 class="intro-title">
          {{ $t('home.intro.title') }}
        </h2>
        <p class="intro-description">
          {{ $t('home.intro.description') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const archipelagos = ref([])

// Load archipelago data from JSON files
async function loadArchipelagos() {
  try {
    // Load all archipelago files
    const archipelagoFiles = ['programming', 'mathematics', 'science', 'languages', 'arts', 'history']
    
    const archipelagoPromises = archipelagoFiles.map(async (id) => {
      const response = await fetch(`/src/content/archipelagos/${id}.json`)
      if (response.ok) {
        const data = await response.json()
        return {
          id: data.id,
          icon: '💻',
          name: data.title,
          description: data.description,
          islandCount: data.islands ? data.islands.length : 0
        }
      }
      return null
    })
    
    const loadedArchipelagos = await Promise.all(archipelagoPromises)
    archipelagos.value = loadedArchipelagos.filter(archipelago => archipelago !== null)
  } catch (error) {
    console.error('Error loading archipelagos:', error)
    // Fallback to default data if loading fails
    archipelagos.value = [
      {
        id: 'programming',
        icon: '💻',
        name: 'Programming',
        description: 'Learn coding from basics to advanced concepts',
        islandCount: 1
      }
    ]
  }
}

// Load archipelagos when component mounts
onMounted(() => {
  loadArchipelagos()
})

function getIslandStyle(index) {
  const positions = [
    { top: '10%', left: '15%' },
    { top: '25%', left: '60%' },
    { top: '45%', left: '25%' },
    { top: '35%', left: '75%' },
    { top: '60%', left: '50%' },
    { top: '70%', left: '20%' }
  ]
  return positions[index] || positions[0]
}
</script>

<style scoped>
.world-map-container {
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
  animation: wave 20s infinite linear;
}

.wave-1 {
  top: -150%;
  left: -50%;
  background: rgba(255, 255, 255, 0.1);
  animation-duration: 20s;
}

.wave-2 {
  top: -140%;
  left: -40%;
  background: rgba(255, 255, 255, 0.08);
  animation-duration: 25s;
  animation-direction: reverse;
}

.wave-3 {
  top: -145%;
  left: -45%;
  background: rgba(255, 255, 255, 0.05);
  animation-duration: 30s;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Hero Section */
.hero-section {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 4rem 2rem;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--text-primary, #fff);
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: var(--text-primary, #fff);
}

.hero-cta {
  display: inline-block;
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.hero-cta:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
}

/* Archipelagos Section */
.archipelagos-section {
  position: relative;
  z-index: 1;
  padding: 2rem;
  min-height: 80vh;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--text-primary, #fff);
}

.islands-map {
  position: relative;
  width: 100%;
  height: 600px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Floating Islands */
.floating-island {
  position: absolute;
  width: 280px;
  animation: float 6s ease-in-out infinite;
}

.floating-island:nth-child(odd) {
  animation-delay: -3s;
}

.floating-island:nth-child(even) {
  animation-delay: -1.5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.island-link {
  display: block;
  text-decoration: none;
  position: relative;
  transition: all 0.4s ease;
}

.island-link:hover {
  transform: scale(1.1);
}

.island-link:hover .island-glow {
  opacity: 1;
  transform: scale(1.2);
}

.island-content {
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid var(--border, rgba(255, 255, 255, 0.3));
  transition: all 0.3s ease;
}

.island-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, var(--accent, #4ade80) 0%, transparent 70%);
  opacity: 0;
  transition: all 0.4s ease;
  z-index: -1;
  border-radius: 50%;
}

.island-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: block;
}

.island-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary, #166534);
}

.island-description {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  color: var(--text-secondary, #15803d);
  line-height: 1.4;
}

.island-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  opacity: 0.7;
  color: var(--text-secondary, #15803d);
}

.stat-icon {
  font-size: 1rem;
}

/* Intro Section */
.intro-section {
  position: relative;
  z-index: 1;
  padding: 4rem 2rem;
  text-align: center;
}

.intro-content {
  max-width: 700px;
  margin: 0 auto;
  background: var(--bg-card, rgba(255, 255, 255, 0.9));
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.intro-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary, #166534);
}

.intro-description {
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.9;
  color: var(--text-secondary, #15803d);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .islands-map {
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 1rem;
  }
  
  .floating-island {
    position: relative;
    top: auto !important;
    left: auto !important;
    width: 100%;
    animation: none;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .islands-map {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .island-content {
    padding: 1.5rem;
  }
  
  .island-icon {
    font-size: 3rem;
  }
  
  .island-name {
    font-size: 1.25rem;
  }
  
  .intro-content {
    padding: 2rem;
  }
  
  .intro-title {
    font-size: 1.5rem;
  }
  
  .intro-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .archipelagos-section {
    padding: 1rem;
  }
  
  .intro-section {
    padding: 2rem 1rem;
  }
  
  .hero-cta {
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }
}
</style>