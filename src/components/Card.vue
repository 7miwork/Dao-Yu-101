<template>
  <div 
    class="card"
    :class="{ 
      'locked': locked,
      'completed': completed,
      'current': current
    }"
    @click="handleClick"
  >
    <!-- Glow Effect -->
    <div class="card-glow"></div>
    
    <!-- Card Content -->
    <div class="card-inner">
      <!-- Header -->
      <div class="card-header">
        <div class="icon-container">
          <div class="icon">{{ icon }}</div>
          <div v-if="locked" class="lock-badge">🔒</div>
          <div v-if="completed" class="completion-badge">✓</div>
          <div v-if="current" class="current-badge">▶</div>
        </div>
        <div v-if="count !== undefined" class="count-badge">
          {{ count }}
        </div>
      </div>
      
      <!-- Body -->
      <div class="card-body">
        <h3 class="card-title">{{ title }}</h3>
        
        <p v-if="description" class="card-description">
          {{ description }}
        </p>
        
        <div v-if="meta" class="card-meta">
          <span class="meta-text">{{ meta }}</span>
        </div>
      </div>
      
      <!-- Footer -->
      <div v-if="countLabel || $slots.footer" class="card-footer">
        <div v-if="countLabel" class="count-info">
          <span class="count-number">{{ count }}</span>
          <span class="count-label">{{ countLabel }}</span>
        </div>
        <slot name="footer" />
      </div>
      
      <!-- Progress Bar (optional) -->
      <div v-if="progress !== undefined" class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="progress-text">{{ progress }}%</span>
      </div>
    </div>
    
    <!-- Hover Overlay -->
    <div class="hover-overlay"></div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: {
    type: String,
    default: '📚'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  meta: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: undefined
  },
  countLabel: {
    type: String,
    default: ''
  },
  locked: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  current: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: undefined
  },
  to: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])
const router = useRouter()

function handleClick() {
  if (props.locked) return
  
  emit('click')
  
  if (props.to) {
    router.push(props.to)
  }
}
</script>

<style scoped>
.card {
  position: relative;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 2px solid var(--border, rgba(255, 255, 255, 0.3));
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
}

.card:hover:not(.locked) {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.5);
}

.card:hover:not(.locked) .card-glow {
  opacity: 1;
  transform: scale(1.1);
}

.card:hover:not(.locked) .hover-overlay {
  opacity: 1;
}

.card.locked {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(30%);
}

.card.completed {
  border-color: var(--accent, #4ade80);
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
}

.card.current {
  border-color: var(--accent-hover, #22c55e);
  box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
  animation: pulse-card 2s infinite;
}

@keyframes pulse-card {
  0%, 100% { 
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
  }
  50% { 
    box-shadow: 0 0 35px rgba(34, 197, 94, 0.6);
  }
}

/* Glow Effect */
.card-glow {
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
  pointer-events: none;
}

/* Card Inner */
.card-inner {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.icon-container {
  position: relative;
}

.icon {
  font-size: 3rem;
  line-height: 1;
  transition: transform 0.3s ease;
}

.card:hover:not(.locked) .icon {
  transform: scale(1.1) rotate(5deg);
}

.lock-badge,
.completion-badge,
.current-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.lock-badge {
  background: #f59e0b;
  color: white;
}

.completion-badge {
  background: var(--accent, #4ade80);
  color: white;
}

.current-badge {
  background: var(--accent-hover, #22c55e);
  color: white;
  animation: pulse-badge 1.5s infinite;
}

@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.count-badge {
  background: var(--accent, #4ade80);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(74, 222, 128, 0.3);
}

/* Body */
.card-body {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary, #166534);
  line-height: 1.3;
}

.card-description {
  font-size: 0.9rem;
  color: var(--text-secondary, #15803d);
  line-height: 1.5;
  opacity: 0.9;
}

.card-meta {
  margin-top: 0.75rem;
}

.meta-text {
  font-size: 0.8rem;
  color: var(--text-secondary, #15803d);
  opacity: 0.7;
  font-style: italic;
}

/* Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.2));
}

.count-info {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.count-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent, #4ade80);
}

.count-label {
  font-size: 0.85rem;
  color: var(--text-secondary, #15803d);
  opacity: 0.8;
}

/* Progress Bar */
.progress-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.2));
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--bg-secondary, rgba(200, 200, 200, 0.3));
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent, #4ade80), var(--accent-hover, #22c55e));
  border-radius: 4px;
  transition: width 0.5s ease;
  box-shadow: 0 0 8px var(--accent, #4ade80);
}

.progress-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent, #4ade80);
  min-width: 35px;
  text-align: right;
}

/* Hover Overlay */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-inner {
    padding: 1.25rem;
  }
  
  .icon {
    font-size: 2.5rem;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
  
  .card-description {
    font-size: 0.85rem;
  }
  
  .count-number {
    font-size: 1.25rem;
  }
  
  .count-label {
    font-size: 0.8rem;
  }
  
  .lock-badge,
  .completion-badge,
  .current-badge {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .card-inner {
    padding: 1rem;
  }
  
  .icon {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-description {
    font-size: 0.8rem;
  }
  
  .card-header {
    margin-bottom: 0.75rem;
  }
  
  .card-body {
    margin-bottom: 0.75rem;
  }
  
  .card-footer {
    padding-top: 0.75rem;
  }
  
  .progress-container {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
  }
}

/* Theme-specific styles */
.theme-island .card {
  background: rgba(255, 255, 255, 0.95);
  border-color: #86efac;
}

.theme-island .card:hover:not(.locked) {
  box-shadow: 
    0 20px 40px rgba(74, 222, 128, 0.2),
    0 0 0 1px rgba(134, 239, 172, 0.5);
}

.theme-minecraft .card {
  background: #f5deb3;
  border: 4px solid #228b22;
  border-radius: 0;
  box-shadow: 8px 8px 0 rgba(139, 69, 19, 0.3);
}

.theme-minecraft .card:hover:not(.locked) {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 rgba(139, 69, 19, 0.4);
}

.theme-minecraft .card-title {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
}

.theme-minecraft .icon {
  image-rendering: pixelated;
}

.theme-modern .card {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.1);
}

.theme-modern .card:hover:not(.locked) {
  box-shadow: 
    0 25px 50px rgba(59, 130, 246, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.3);
}

.theme-modern .card-glow {
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
}

.theme-modern .count-badge {
  background: #3b82f6;
}

.theme-modern .completion-badge,
.theme-modern .current-badge {
  background: #3b82f6;
}

.theme-modern .progress-fill {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.theme-modern .count-number {
  color: #3b82f6;
}

.theme-modern .progress-text {
  color: #3b82f6;
}
</style>