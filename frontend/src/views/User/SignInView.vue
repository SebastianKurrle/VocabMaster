<script setup lang="ts">
// components
import UserSignInForm from '@/components/User/UserSignInForm.vue';
</script>

<template>
    <div class="mt-3">
        <h5 class="text-center text-white font-semibold text-xl">Sign In</h5>

        <div class="flex justify-center mt-3">
            <div class="w-1/2">
                <div>
                    <UserSignInForm />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>