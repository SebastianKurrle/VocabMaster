<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps(['vocabSet'])

const vocabSet = ref(props.vocabSet)

</script>

<template>
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10 pt-4">
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ vocabSet.name }}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ vocabSet.description }}</span>
            <div class="flex mt-4 space-x-3 md:mt-6">
                <RouterLink to="#"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Learn <font-awesome-icon icon="fa-solid fa-graduation-cap" class="ml-3"/>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>