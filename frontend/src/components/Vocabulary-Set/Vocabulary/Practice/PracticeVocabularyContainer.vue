<script setup lang='ts'>
import { usePracticeVocabularySetStore } from '@/stores/practiceVocabularySet'
import { onMounted } from 'vue';

// components
import PracticeVocabularyInput from './PracticeVocabularyInput.vue';

// stores
const practiceVocabularyStore = usePracticeVocabularySetStore()
</script>

<template>
    <div
        class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-3">
        <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Practice</h5>

        <div v-if="!practiceVocabularyStore.practiceIsRunning">
            <button class="bg-green-500 hover:bg-green-600 p-3 w-full rounded-md text-white"
                @click="practiceVocabularyStore.startPractice">
                Start Practice <font-awesome-icon icon="fa-solid fa-dumbbell" />
            </button>
        </div>

        <div v-else>
            <PracticeVocabularyInput />

            <button class="bg-red-600 hover:bg-red-700 p-3 w-full rounded-md text-white"
                @click="practiceVocabularyStore.endPractice">
                End Practice <font-awesome-icon icon="fa-solid fa-dumbbell" />
            </button>
        </div>
    </div>
</template>
    
<style></style>