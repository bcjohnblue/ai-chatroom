import { ref, computed } from 'vue'
import { MESSAGE_MOCK_MAP } from 'src/mock/messages'

const messages = ref([
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Welcome to Nitra AI',
    timestamp: new Date().toISOString(),
    isWelcome: true,
  },
])

const isOpen = ref(false)
const isThinking = ref(false)
const isTypingResponse = ref(false)

const suggestedQuestions = computed(() => Object.keys(MESSAGE_MOCK_MAP))

let messageIdCounter = 0
function generateId() {
  return `msg-${Date.now()}-${++messageIdCounter}`
}

/**
 * Composable for chat state management.
 * Shared across components via module-level state.
 */
export function useChat() {
  function toggleOpen() {
    isOpen.value = !isOpen.value
  }

  function close() {
    isOpen.value = false
  }

  function markTypingDone() {
    isTypingResponse.value = false
  }

  function sendMessage(text) {
    if (!text.trim() || isThinking.value) return

    // Add user message
    messages.value.push({
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    })

    // Look up mock response
    const mockEntry = MESSAGE_MOCK_MAP[text.trim()]

    if (mockEntry) {
      isThinking.value = true

      // Simulate network delay before AI responds
      setTimeout(() => {
        isThinking.value = false
        isTypingResponse.value = true
        messages.value.push({
          id: generateId(),
          role: 'assistant',
          content: mockEntry.message.content,
          timestamp: mockEntry.message.timestamp,
          needsTyping: true,
        })
      }, 1500)
    } else {
      // No matching mock data
      isThinking.value = true
      setTimeout(() => {
        isThinking.value = false
        isTypingResponse.value = true
        messages.value.push({
          id: generateId(),
          role: 'assistant',
          content:
            "I'm sorry, I don't have information about that topic yet. Please try one of the suggested questions below.",
          timestamp: new Date().toISOString(),
          needsTyping: true,
        })
      }, 1000)
    }
  }

  return {
    messages,
    isOpen,
    isThinking,
    isTypingResponse,
    suggestedQuestions,
    toggleOpen,
    close,
    sendMessage,
    markTypingDone,
  }
}
