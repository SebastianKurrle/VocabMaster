<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useUserStore } from './stores/user';

// components
import Navbar from './components/Navigation/Navbar.vue'

// stores
const userStore = useUserStore()

const loaded = ref(false)

const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token') ?? ''
    await userStore.checkToken(String(token))
    loaded.value = true
}

onMounted(async () => {
  checkUserLoggedIn()
})
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
