<script setup lang="ts">
import { useUserStore } from '@/stores/user';

// components
import UnauthenticatedInfo from '@/components/Home/UnauthenticatedInfo.vue';

// stores
const userStore = useUserStore()
</script>

<template>
  <div>
      <div class="flex justify-center mt-3" v-if="!userStore.authenticated">
        <div class="w-full md:w-1/2">
          <UnauthenticatedInfo />
        </div>
      </div>
  </div>
</template>
