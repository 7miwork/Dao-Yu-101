/**
 * Authentication utilities for island password protection
 */

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