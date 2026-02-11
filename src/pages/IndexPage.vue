<template>
  <q-page class="index-page">
    <div class="index-page__content">
      <div class="index-page__placeholder">
        <q-icon name="fa-solid fa-lock" size="48px" color="grey-4" />
        <div class="text-grey-6 q-mt-md font-lg">app.nitra.com</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
//
</script>

<style lang="scss" scoped>
.index-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.index-page__content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.index-page__placeholder {
  text-align: center;
  opacity: 0.6;
}
</style>
