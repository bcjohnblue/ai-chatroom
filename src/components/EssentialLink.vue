<template>
  <q-item
    clickable
    tag="a"
    :to="$props.to"
    :href="$props.href"
    :target="$props.target"
  >
    <q-item-section v-if="$props.icon" avatar>
      <q-icon :name="$props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ $props.title }}</q-item-label>
      <q-item-label caption>{{ $props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  caption: String,
  to: String,
  target: String,
  href: String,
  icon: String
})
</script>
