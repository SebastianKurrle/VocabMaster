<script setup lang='ts'>
import { ref } from 'vue';
import { usePracticeRoomStore } from '@/stores/practiceRoom';

// components
import DeleteLanguagePracticeRoomModal from '@/components/Practice-Room/DeleteLanguagePracticeRoomModal.vue'
import UpdateLanguagePracticeRoomModal from './UpdateLanguagePracticeRoomModal.vue';

// stores
const practiceRoomStore = usePracticeRoomStore()

const optionsActivated = ref(false)
</script>

<template>
    <div
        class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ practiceRoomStore.currentPracticeRoom.name }}</h5>
        <p class="mb-5 text-base text-left text-gray-500 sm:text-lg dark:text-gray-400">{{ practiceRoomStore.currentPracticeRoom.description }}</p>
        <p class="mb-5 text-base text-left text-gray-900 font-semibold sm:text-lg dark:text-gray-400">Language: {{ practiceRoomStore.currentPracticeRoom.language }}</p>
        <p class="mb-5 font-semibold text-blue-800 sm:text-lg">Learn new vocabularys</p>
        <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <button class="bg-gray-700 text-white p-3 rounded-md hover:bg-gray-800 mr-3">
                <font-awesome-icon icon="fa-solid fa-plus" /> New Vocabulary Set
            </button>

            <button @click="optionsActivated = !optionsActivated" 
            data-modal-target="createVocabularySet" data-modal-toggle="createVocabularySet"
                    :class="{'bg-blue-700 text-white p-3 rounded-md hover:bg-blue-800 w-14': optionsActivated, 'bg-blue-700 p-3 rounded-md hover:bg-blue-800 w-14': !optionsActivated}">
                <font-awesome-icon icon="fa-solid fa-gear" />
            </button>
        </div>

        <div class="mt-3" v-if="optionsActivated">
            <button 
                class="bg-gray-800 p-3 w-32 rounded-md text-white hover:bg-gray-900 mr-3"
                data-te-toggle="modal" data-te-target="#updateRoomModal" data-te-ripple-init data-te-ripple-color="dark"
            ><font-awesome-icon icon="fa-solid fa-pen-to-square" /> Edit</button>
            <button 
                class="bg-red-800 p-3 w-32 rounded-md text-white hover:bg-red-900"
                data-te-toggle="modal" data-te-target="#deleteRoomModal" data-te-ripple-init data-te-ripple-color="dark"
            ><font-awesome-icon icon="fa-solid fa-trash" /> Delete</button>
        </div>

        <DeleteLanguagePracticeRoomModal />
        <UpdateLanguagePracticeRoomModal />
    </div>
</template>

    
<style></style>