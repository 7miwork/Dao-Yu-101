<template>
  <div 
    class="card cursor-pointer"
    :class="{ 'opacity-60': locked }"
    @click="handleClick"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="text-4xl">{{ icon }}</div>
      <div v-if="locked" class="text-2xl">🔒</div>
    </div>
    
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    
    <p v-if="description" class="text-sm opacity-80 mb-4">
      {{ description }}
    </p>
    
    <div v-if="meta" class="flex items-center justify-between text-sm opacity-70">
      <span>{{ meta }}</span>
      <span v-if="count !== undefined">
        {{ count }} {{ countLabel }}
      </span>
    </div>
    
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-opacity-20">
      <slot name="footer" />
    </div>
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
    default: 'items'
  },
  locked: {
    type: Boolean,
    default: false
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
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover:not(.opacity-60) {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px var(--shadow);
}

.card h3 {
  color: var(--text-primary);
}

.card p {
  color: var(--text-secondary);
}

.border-t {
  border-color: var(--border);
}
</style>