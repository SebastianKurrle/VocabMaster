<script setup lang="ts">
import { RouterView } from 'vue-router'

// components
import Navbar from './components/Navigation/Navbar.vue'
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>
