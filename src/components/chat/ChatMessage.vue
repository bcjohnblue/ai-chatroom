<template>
  <div
    class="chat-message"
    :class="{
      'chat-message--user': message.role === 'user',
      'chat-message--assistant': message.role === 'assistant',
    }"
  >
    <!-- Assistant avatar -->
    <img
      v-if="message.role === 'assistant'"
      src="~assets/nitra-logo.svg"
      alt="AI"
      class="chat-message__avatar"
    />

    <!-- Message bubble -->
    <div class="chat-message__bubble">
      <!-- User message: plain text -->
      <template v-if="message.role === 'user'">
        {{ message.content }}
      </template>

      <!-- Assistant welcome message -->
      <template v-else-if="message.isWelcome">
        {{ message.content }}
      </template>

      <!-- Assistant message with typing effect + markdown -->
      <template v-else>
        <div
          class="chat-message__markdown"
          v-html="renderedHtml"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useTypingEffect } from 'src/composables/useTypingEffect'
import { useChat } from 'src/composables/useChat'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['typing-update', 'typing-complete'])

const { markTypingDone } = useChat()

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

const typingDone = ref(!props.message.needsTyping)

const { displayedText, startTyping } = useTypingEffect({
  speed: 30,
  chunkSize: 1,
  onUpdate: () => {
    emit('typing-update')
  },
  onComplete: () => {
    typingDone.value = true
    // Mark message as typed so re-mount won't re-trigger animation
    props.message.needsTyping = false
    markTypingDone()
    emit('typing-complete')
  },
})

// Compute rendered HTML from the current displayed text
const renderedHtml = computed(() => {
  const text = typingDone.value ? props.message.content : displayedText.value
  if (!text) return ''

  // Convert markdown to HTML
  const rawHtml = marked.parse(text)

  // Sanitize and allow target attribute + opening in new tab
  const clean = DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ['target'],
  })

  // Make links open in new tab
  return clean.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ')
})

onMounted(() => {
  if (props.message.needsTyping && props.message.role === 'assistant' && !props.message.isWelcome) {
    startTyping(props.message.content)
  }
})
</script>

<style lang="scss" scoped>
.chat-message {
  display: flex;
  gap: 8px;
  padding: 4px 0;
}

.chat-message--user {
  justify-content: flex-end;
}

.chat-message--assistant {
  justify-content: flex-start;
  align-items: flex-start;
}

.chat-message__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 2px;
}

.chat-message__bubble {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.chat-message--user .chat-message__bubble {
  max-width: 75%;
  background-color: $teal-100;
  color: $gray-900;
  border-bottom-right-radius: 4px;
}

.chat-message--assistant .chat-message__bubble {
  max-width: 90%;
  background-color: $gray-0;
  color: $gray-900;
  border-bottom-left-radius: 4px;
}

.chat-message__markdown {
  // Cap heading sizes that may appear from partial markdown syntax
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-size: 14px !important;
    font-weight: 600;
    margin: 0 0 4px 0;
    line-height: 1.5;
  }

  :deep(p) {
    margin: 0 0 8px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(ol),
  :deep(ul) {
    margin: 4px 0;
    padding-left: 20px;
  }

  :deep(li) {
    margin-bottom: 8px;

    ul {
      margin-top: 4px;
    }
  }

  :deep(strong) {
    font-size: inherit !important;
    font-weight: 600;
    color: $gray-900;
  }

  :deep(a) {
    color: $orange-500;
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
