import { ref, onUnmounted } from 'vue'

/**
 * Composable for typing effect animation.
 * Reveals text character-by-character to simulate AI typing.
 *
 * @param {Object} options
 * @param {number} options.speed - Milliseconds per character (default: 15)
 * @param {number} options.chunkSize - Characters to reveal per tick (default: 2)
 * @param {Function} options.onUpdate - Callback on each tick (for scrolling)
 * @param {Function} options.onComplete - Callback when typing finishes
 */
export function useTypingEffect(options = {}) {
  const {
    speed = 15,
    chunkSize = 2,
    onUpdate = null,
    onComplete = null,
  } = options

  const displayedText = ref('')
  const isTyping = ref(false)

  let fullText = ''
  let currentIndex = 0
  let timerId = null

  function startTyping(text) {
    stop()
    fullText = text
    currentIndex = 0
    displayedText.value = ''
    isTyping.value = true

    timerId = setInterval(() => {
      // Advance by chunkSize, then extend to the next word boundary
      // to avoid splitting in the middle of markdown syntax like ** or []
      let nextIndex = Math.min(currentIndex + chunkSize, fullText.length)
      while (nextIndex < fullText.length && !/\s/.test(fullText[nextIndex])) {
        nextIndex++
      }
      nextIndex = Math.min(nextIndex, fullText.length)

      displayedText.value = fullText.slice(0, nextIndex)
      currentIndex = nextIndex

      if (onUpdate) onUpdate(displayedText.value)

      if (currentIndex >= fullText.length) {
        stop()
        if (onComplete) onComplete(displayedText.value)
      }
    }, speed)
  }

  function stop() {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
    isTyping.value = false
  }

  function skipToEnd() {
    stop()
    displayedText.value = fullText
    if (onComplete) onComplete(displayedText.value)
  }

  onUnmounted(() => {
    stop()
  })

  return {
    displayedText,
    isTyping,
    startTyping,
    stop,
    skipToEnd,
  }
}
