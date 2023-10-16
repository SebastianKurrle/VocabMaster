<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

// components
import UserAccountInfoTable from '@/components/User/UserAccountInfoTable.vue'

// stores
const userStore = useUserStore()

onMounted(() => {
    userStore.loginRequired()
})
</script>

<template>
    <div class="mt-3">
        <h1 class="text-white text-center font-semibold text-2xl">
            My Account</h1>
        
        <div class="flex justify-center">
            <div class="w-full md:w-1/2">
                <UserAccountInfoTable />
            </div>
        </div>

        <div class="flex justify-center mt-3">
            <button class="bg-red-700 text-white rounded-md p-3 w-full md:w-1/2 hover:bg-red-800"
            @click="userStore.userLogout"
            >
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" /> Loggout</button>
        </div>
    </div>
</template>

<style scoped>
</style>