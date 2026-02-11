<template>
  <transition name="chat-widget">
    <div v-if="isOpen" class="chat-widget">
      <ChatHeader @close="close" />
      <ChatMessages ref="chatMessagesRef" />

      <!-- Suggested question buttons -->
      <div v-if="showSuggestions" class="chat-widget__suggestions">
        <button
          v-for="q in suggestedQuestions"
          :key="q"
          class="chat-widget__suggestion-btn"
          @click="handleSuggestionClick(q)"
        >
          {{ q }}
        </button>
      </div>

      <ChatInput
        ref="chatInputRef"
        :disabled="isThinking"
        @send="handleSend"
      />
    </div>
  </transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useChat } from 'src/composables/useChat'
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'

const {
  isOpen,
  isThinking,
  hasConversation,
  suggestedQuestions,
  close,
  sendMessage,
} = useChat()

const chatInputRef = ref(null)
const chatMessagesRef = ref(null)

const showSuggestions = computed(() => !hasConversation.value && !isThinking.value)

function handleSend(text) {
  sendMessage(text)
}

function handleSuggestionClick(question) {
  sendMessage(question)
}
</script>

<style lang="scss" scoped>
.chat-widget {
  position: fixed;
  bottom: 80px;
  right: 24px;
  width: 440px;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  overflow: hidden;
}

.chat-widget__suggestions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 16px 8px;
  max-height: 200px;
  overflow-y: auto;
}

.chat-widget__suggestion-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  font-size: 13px;
  color: $teal-700;
  background: $teal-0;
  border: 1px solid $teal-50;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1.4;

  &:hover {
    background: $teal-50;
    border-color: $teal-100;
  }
}

// Transition
.chat-widget-enter-active {
  animation: chatSlideIn 0.25s ease-out;
}

.chat-widget-leave-active {
  animation: chatSlideOut 0.2s ease-in;
}

@keyframes chatSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes chatSlideOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
}

// Responsive for small screens
@media (max-width: 500px) {
  .chat-widget {
    width: calc(100vw - 16px);
    right: 8px;
    bottom: 70px;
    max-height: calc(100vh - 90px);
  }
}
</style>
