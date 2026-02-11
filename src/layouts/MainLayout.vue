<template>
  <q-layout view="hHh lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Chat Widget (floating) -->
    <ChatWidget />

    <!-- Ask Nitra AI FAB Button -->
    <q-btn
      class="nitra-fab"
      unelevated
      no-caps
      rounded
      @click="toggleOpen"
    >
      <q-icon name="fa-solid fa-pen" size="14px" class="q-mr-sm" />
      Ask Nitra AI
    </q-btn>
  </q-layout>
</template>

<script setup>
import ChatWidget from 'components/chat/ChatWidget.vue'
import { useChat } from 'src/composables/useChat'

const { toggleOpen } = useChat()
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

</style>
