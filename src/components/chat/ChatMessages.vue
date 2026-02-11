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

    <!-- Suggested questions (shown when no real conversation yet) -->
    <div v-if="!hasConversation && !isThinking" class="chat-messages__suggestions">
      <div class="chat-messages__upload" v-if="messages.length <= 1">
        <q-icon name="fa-solid fa-file-upload" size="16px" color="blue-6" />
        <span>Upload your supplier list</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useChat } from 'src/composables/useChat'
import ChatMessage from './ChatMessage.vue'
import ThinkingIndicator from './ThinkingIndicator.vue'

const { messages, isThinking, hasConversation } = useChat()

const scrollContainer = ref(null)

function scrollToBottom() {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }
  })
}

// Watch for new messages and auto-scroll
watch(
  () => messages.value.length,
  () => {
    scrollToBottom()
  }
)

watch(isThinking, () => {
  scrollToBottom()
})

onMounted(() => {
  scrollToBottom()
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
