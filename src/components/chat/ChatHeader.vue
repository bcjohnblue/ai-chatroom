<template>
  <div class="chat-header">
    <div class="chat-header__left">
      <img
        src="~assets/nitra-logo.svg"
        alt="Nitra AI"
        class="chat-header__logo"
      />
      <div class="chat-header__text">
        <div class="chat-header__title">
          Nitra AI
          <q-icon name="fa-solid fa-pen" size="14px" class="chat-header__pen" />
        </div>
        <div class="chat-header__subtitle">Hi there, How can we help?</div>
      </div>
    </div>
    <q-btn
      flat
      round
      dense
      icon="close"
      color="white"
      size="sm"
      class="chat-header__close"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 12px;
  background-color: $teal-700;
  border-radius: 12px 12px 0 0;
  color: white;
}

.chat-header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-header__logo {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.chat-header__title {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.chat-header__pen {
  opacity: 0.8;
}

.chat-header__subtitle {
  font-size: 12px;
  opacity: 0.85;
  margin-top: 2px;
}

.chat-header__close {
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
</style>
