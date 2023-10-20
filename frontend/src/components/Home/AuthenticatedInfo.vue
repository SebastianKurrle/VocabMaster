<script setup lang='ts'>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';

// components
import CreateLanguagePracticeRoomModal from '../Practice-Room/CreateLanguagePracticeRoomModal.vue';

// stores
const userStore = useUserStore()

</script>

<template>
    <div
        class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">VocabMaster</h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Welcome back {{ userStore.user.name }}</p>
        <p class="mb-5 font-semibold text-blue-800 sm:text-lg">Improve your language skills</p>
        <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <button class="bg-gray-700 text-white p-3 rounded-md hover:bg-gray-800"
            data-modal-target="createPracticeRoomModal" data-modal-toggle="createPracticeRoomModal"
            >
                <font-awesome-icon icon="fa-solid fa-plus" /> New Language Practice Room
            </button>
        </div>

        <CreateLanguagePracticeRoomModal />
    </div>
</template>
