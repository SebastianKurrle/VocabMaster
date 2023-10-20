<script setup lang="ts">
import { useUserStore } from '@/stores/user';

// components
import UnauthenticatedInfo from '@/components/Home/UnauthenticatedInfo.vue';
import AuthenticatedInfo from '@/components/Home/AuthenticatedInfo.vue';
import UserPracticeRoomList from '@/components/Home/UserPracticeRoomList.vue';

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

      <div v-else>
        <div class="flex justify-center mt-3">
          <div class="w-full md:w-1/2">
            <AuthenticatedInfo />
          </div>
        </div>

        <div class="mt-3">
          <div>
            <UserPracticeRoomList />
          </div>
        </div>
      </div>
  </div>
</template>
