<template>
  <div class="color-card">
    <div class="color-preview" :style="{ backgroundColor: props.color.hex }"></div>
    <div class="color-info">
      <div class="color-name">{{ props.color.name }}</div>
      <div class="color-hex">{{ props.color.hex }}</div>
      <div class="utility-classes">
        <q-btn
          flat
          dense
          size="sm"
          label="text"
          @click="copyToClipboard('text-' + props.color.class)"
          class="q-mr-xs"
        />
        <q-btn
          flat
          dense
          size="sm"
          label="bg"
          @click="copyToClipboard('bg-' + props.color.class)"
          class="q-mr-xs"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { copyToClipboard as quasarCopy, useQuasar } from 'quasar'
const props = defineProps({
    color: {
      type: Object,
      required: true,
      validator(value) {
        return value &&
               typeof value.name === 'string' &&
               typeof value.hex === 'string' &&
               typeof value.class === 'string'
    }
  }
})

const $q = useQuasar()
async function copyToClipboard(text) {
  await quasarCopy(text)
  $q.notify({
    message: 'Copied to clipboard',
    color: 'white',
    textColor: 'primary',
    icon: 'check'
  })
}

</script>

<style scoped>
.color-card {
  width: 200px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.color-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.color-preview {
  height: 80px;
  width: 100%;
}

.color-info {
  padding: 12px;
}

.color-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  color: #333;
}

.color-hex {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.utility-classes {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.utility-classes .q-btn {
  font-size: 11px;
  padding: 2px 6px;
  min-height: 24px;
  border-radius: 4px;
  transition: all 0.2s;
}

.utility-classes .q-btn:hover {
  background-color: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}
</style>
