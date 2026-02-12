<template>
  <div class="chat-input">
    <div class="chat-input__wrapper">
      <input
        ref="inputRef"
        v-model="inputText"
        type="text"
        class="chat-input__field"
        placeholder="Say something..."
        :disabled="disabled"
        @keydown.enter.prevent="handleSend"
      />
      <div class="chat-input__actions">
        <q-btn
          flat
          round
          dense
          size="sm"
          class="chat-input__attach"
        >
          <q-icon name="fa-solid fa-paperclip" size="16px" color="grey-6" />
        </q-btn>
        <q-btn
          round
          dense
          unelevated
          size="sm"
          class="chat-input__send"
          :disable="!inputText.trim() || disabled"
          @click="handleSend"
        >
          <q-spinner v-if="disabled" size="14px" color="white" />
          <q-icon v-else name="fa-solid fa-chevron-right" size="12px" color="white" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['send'])

const inputText = ref('')
const inputRef = ref(null)

function handleSend() {
  const text = inputText.value.trim()
  if (!text || props.disabled) return
  emit('send', text)
  inputText.value = ''
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function setText(text) {
  inputText.value = text
}

function focus() {
  inputRef.value?.focus()
}

defineExpose({ setText, focus })
</script>

<style lang="scss" scoped>
.chat-input {
  padding: 10px 16px 14px;
  background: white;
  border-top: 1px solid $gray-50;
  border-radius: 0 0 12px 12px;
}

.chat-input__wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid $gray-200;
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
}

.chat-input__field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: $gray-900;
  background: transparent;

  &::placeholder {
    color: $gray-400;
  }

  &:disabled {
    opacity: 0.6;
  }
}

.chat-input__actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.chat-input__attach {
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
}

.chat-input__send {
  width: 32px;
  height: 32px;
  background-color: $teal-700 !important;
  transition: background-color 0.2s;
}
</style>
