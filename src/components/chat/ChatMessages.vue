<template>
  <div ref="scrollContainer" class="chat-messages">
    <!-- Messages list -->
    <ChatMessage
      v-for="msg in messages"
      :key="msg.id"
      :message="msg"
      @typing-update="scrollToBottom"
      @typing-complete="scrollToBottom"
    />

    <!-- Thinking indicator -->
    <ThinkingIndicator v-if="isThinking" />

    <!-- Upload supplier list (shown only on initial state) -->
    <div v-if="messages.length <= 1 && !isThinking" class="chat-messages__suggestions">
      <div class="chat-messages__upload">
        <q-icon name="fa-solid fa-file-upload" size="16px" color="blue-6" />
        <span>Upload your supplier list</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useChat } from 'src/composables/useChat'
import ChatMessage from './ChatMessage.vue'
import ThinkingIndicator from './ThinkingIndicator.vue'

const { messages, isThinking } = useChat()

const scrollContainer = ref(null)
const userScrolledUp = ref(false)
let lastScrollTop = 0
let programmaticScroll = false

function onScroll() {
  const el = scrollContainer.value
  if (!el) return

  // Ignore scroll events caused by our own scrollToBottom
  if (programmaticScroll) return

  const currentScrollTop = el.scrollTop
  // User scrolled back to bottom → resume auto-scroll
  if (el.scrollHeight - currentScrollTop - el.clientHeight < 30) {
    userScrolledUp.value = false
  }
  // User scrolled up → stop auto-scroll immediately
  if (currentScrollTop < lastScrollTop) {
    userScrolledUp.value = true
  }
  
  lastScrollTop = currentScrollTop
}

function scrollToBottom(force = false) {
  if (!force && userScrolledUp.value) return
  nextTick(() => {
    if (scrollContainer.value) {
      programmaticScroll = true
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
      lastScrollTop = scrollContainer.value.scrollTop
      // Reset flag after browser processes the scroll
      requestAnimationFrame(() => {
        programmaticScroll = false
      })
    }
  })
}

// New messages always scroll to bottom
watch(
  () => messages.value.length,
  () => {
    scrollToBottom(true)
  }
)

watch(isThinking, () => {
  scrollToBottom(true)
})

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', onScroll)
  scrollToBottom(true)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', onScroll)
})

defineExpose({ scrollToBottom })
</script>

<style lang="scss" scoped>
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: $gray-200;
    border-radius: 2px;
  }
}

.chat-messages__suggestions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-messages__upload {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: $gray-700;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: $gray-0;
  }
}
</style>
