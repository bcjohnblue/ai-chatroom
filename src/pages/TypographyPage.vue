<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">Typography</div>

    <div class="text-body1 q-mb-md text-grey-7">
      This is the typography system for the app.
    </div>

    <div v-for="size in fontSizes" :key="size.size">
      <div :class="`font-${size.size}`">{{ size.name }}</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const fontSizes = ref([
  { size: 'xss', name: 'XSS' },
  { size: 'xs', name: 'XS' },
  { size: 'sm', name: 'SM' },
  { size: 'md', name: 'MD' },
  { size: 'lg', name: 'LG' },
  { size: 'xl', name: 'XL' },
  { size: '2xl', name: '2XL' },
  { size: '3xl', name: '3XL' },
  { size: '4xl', name: '4XL' },
  { size: '5xl', name: '5XL' },
  { size: '6xl', name: '6XL' },
  { size: '7xl', name: '7XL' },
  { size: '8xl', name: '8XL' },
  { size: '9xl', name: '9XL' },
])
</script>
