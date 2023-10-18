<script setup lang='ts'>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div
        class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">VocabMaster</h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Your ultimate vocabulary trainer for multiple languages</p>
        <p class="mb-5 font-semibold text-blue-800 sm:text-lg">To Start</p>
        <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <RouterLink :to="{ name: 'sign-up' }"
                class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                Sign Up
            </RouterLink>
            <RouterLink :to="{ name: 'sign-in' }"
                class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                Sign In
            </RouterLink>
        </div>
    </div>
</template>

<style></style>