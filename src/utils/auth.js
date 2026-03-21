/**
 * Authentication utilities for island password protection
 */

// Load example passwords as default (safe for build)
import examplePasswords from '@/secure/passwords.example.json'

let passwords = examplePasswords

// In development, try to load local passwords (optional override)
if (import.meta.env.DEV) {
  try {
    const res = await fetch('/src/secure/passwords.local.json')
    if (res.ok) {
      const localPasswords = await res.json()
      passwords = { ...examplePasswords, ...localPasswords }
    }
  } catch (e) {
    // Fallback to example passwords (expected in production)
    console.debug('Local passwords not available, using example passwords')
  }
}

/**
 * Check password for an island
 * @param {string} islandId - The island identifier
 * @param {string} inputPassword - The password entered by user
 * @returns {boolean} - Whether the password is correct
 */
export function checkPassword(islandId, inputPassword) {
  const correctPassword = passwords[islandId]
  if (!correctPassword) {
    return false
  }
  return inputPassword === correctPassword
}

/**
 * Check if an island is unlocked
 * @param {string} islandId - The island identifier
 * @returns {boolean} - Whether the island is unlocked
 */
export function isIslandUnlocked(islandId) {
  return localStorage.getItem(`unlocked_${islandId}`) === 'true'
}

/**
 * Unlock an island
 * @param {string} islandId - The island identifier
 */
export function unlockIsland(islandId) {
  localStorage.setItem(`unlocked_${islandId}`, 'true')
}

/**
 * Lock an island (for testing purposes)
 * @param {string} islandId - The island identifier
 */
export function lockIsland(islandId) {
  localStorage.removeItem(`unlocked_${islandId}`)
}

/**
 * Validate password for an island
 * @param {string} islandId - The island identifier
 * @param {string} password - The password to validate
 * @param {string} correctPassword - The correct password from island data
 * @returns {boolean} - Whether the password is correct
 */
export function validateIslandPassword(islandId, password, correctPassword) {
  if (password === correctPassword) {
    unlockIsland(islandId)
    return true
  }
  return false
}

/**
 * Get all unlocked islands
 * @returns {string[]} - Array of unlocked island IDs
 */
export function getUnlockedIslands() {
  const unlocked = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('unlocked_')) {
      const islandId = key.replace('unlocked_', '')
      unlocked.push(islandId)
    }
  }
  return unlocked
}

/**
 * Clear all unlocked islands (for testing/reset)
 */
export function clearAllUnlocks() {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('unlocked_')) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key))
}

/**
 * Check if a lesson is completed
 * @param {string} lessonId - The lesson identifier
 * @returns {boolean} - Whether the lesson is completed
 */
export function isLessonCompleted(lessonId) {
  return localStorage.getItem(`completed_${lessonId}`) === 'true'
}

/**
 * Mark a lesson as completed
 * @param {string} lessonId - The lesson identifier
 */
export function markLessonCompleted(lessonId) {
  localStorage.setItem(`completed_${lessonId}`, 'true')
}

/**
 * Mark a lesson as incomplete (for testing purposes)
 * @param {string} lessonId - The lesson identifier
 */
export function markLessonIncomplete(lessonId) {
  localStorage.removeItem(`completed_${lessonId}`)
}

/**
 * Get all completed lessons
 * @returns {string[]} - Array of completed lesson IDs
 */
export function getCompletedLessons() {
  const completed = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('completed_')) {
      const lessonId = key.replace('completed_', '')
      completed.push(lessonId)
    }
  }
  return completed
}

/**
 * Clear all completed lessons (for testing/reset)
 */
export function clearAllCompletions() {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('completed_')) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key))
}
