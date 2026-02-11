<template>
  <div class="thinking-row">
    <img
      src="~assets/nitra-logo.svg"
      alt="AI"
      class="thinking-row__avatar"
    />
    <div class="thinking-bubble">
      <span class="thinking-text">Thinking</span>
      <span class="thinking-dots">
        <span class="dot dot--1">.</span>
        <span class="dot dot--2">.</span>
        <span class="dot dot--3">.</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thinking-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0;
}

.thinking-row__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 2px;
}

.thinking-bubble {
  background-color: $gray-0;
  border-radius: 12px;
  padding: 8px 14px;
  font-size: 14px;
  color: $gray-700;
  display: inline-flex;
  align-items: center;
}

.thinking-text {
  margin-right: 1px;
}

.thinking-dots {
  display: inline-flex;
}

.dot {
  animation: dotBounce 1.4s infinite ease-in-out;
  font-weight: 700;
}

.dot--1 {
  animation-delay: 0s;
}

.dot--2 {
  animation-delay: 0.2s;
}

.dot--3 {
  animation-delay: 0.4s;
}

@keyframes dotBounce {
  0%, 80%, 100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
}
</style>
