<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/slide">Slide</RouterLink>
  <RouterView />
</template>

<style scoped>
@media (max-width: 1024px) {}
</style>
