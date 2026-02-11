<template>
  <q-layout view="hHh lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Chat Widget (floating) -->
    <ChatWidget />

    <!-- Ask Nitra AI FAB Button -->
    <transition name="fab">
      <q-btn
        v-if="!isOpen"
        class="nitra-fab"
        unelevated
        no-caps
        rounded
        @click="open"
      >
        <q-icon name="fa-solid fa-pen" size="14px" class="q-mr-sm" />
        Ask Nitra AI
      </q-btn>
    </transition>
  </q-layout>
</template>

<script setup>
import ChatWidget from 'components/chat/ChatWidget.vue'
import { useChat } from 'src/composables/useChat'

const { isOpen, open } = useChat()
</script>

<style lang="scss" scoped>
.nitra-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9998;
  background-color: $orange-400 !important;
  color: white !important;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  box-shadow: 0 4px 16px rgba($orange-400, 0.4);
  transition: all 0.2s;

  &:hover {
    background-color: $orange-500 !important;
    box-shadow: 0 6px 20px rgba($orange-400, 0.5);
    transform: translateY(-1px);
  }
}

.fab-enter-active {
  animation: fabIn 0.2s ease-out;
}

.fab-leave-active {
  animation: fabOut 0.15s ease-in;
}

@keyframes fabIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fabOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
