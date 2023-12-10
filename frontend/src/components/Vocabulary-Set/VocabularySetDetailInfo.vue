<script setup lang='ts'>
import { useVocabularySetStore } from '@/stores/vocabularySet';
import { usePracticeRoomStore } from '@/stores/practiceRoom';
import { ref } from 'vue';

// components
import BackButton from '../GeneralButtons/BackButton.vue';
import DeleteVocabularySetModal from './DeleteVocabularySetModal.vue';
import UpdateVocabularySetModal from './UpdateVocabularySetModal.vue';
import CreateVocabularyModal from './Vocabulary/CreateVocabularyModal.vue'


// stores
const vocabularySetStore = useVocabularySetStore()
const practiceRoomStore = usePracticeRoomStore()

const optionsActivated = ref(false)
</script>

<template>
    <div
        class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ vocabularySetStore.currentVocabularySet?.name }}
        </h5>

        <div class="flex mb-3">
            <BackButton destination="room-detail" :parm-value="practiceRoomStore.currentPracticeRoom.id" />
        </div>

        <div class="bg-gray-700 rounded-md p-3 mb-3">
            <p class="text-base text-left text-gray-300 sm:text-lg dark:text-gray-400">{{
                vocabularySetStore.currentVocabularySet?.description }}</p>
        </div>
        <p class="mb-5 font-semibold text-blue-800 sm:text-lg">Manage Vocabulary Set</p>
        <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <button class="bg-gray-700 text-white p-3 rounded-md hover:bg-gray-800 mr-3" data-te-toggle="modal"
                data-te-target="#createVocabulary" data-te-ripple-init data-te-ripple-color="dark">
                <font-awesome-icon icon="fa-solid fa-plus" /> Add Vocabulary
            </button>

            <button class="bg-gray-700 text-white p-3 rounded-md hover:bg-gray-800 mr-3" data-te-toggle="modal"
            data-te-target="#createVocabSetModal" data-te-ripple-init data-te-ripple-color="dark">
            <font-awesome-icon icon="fa-solid fa-list" /> Vocabulary List
        </button>

            <button @click="optionsActivated = !optionsActivated" data-modal-target="createVocabularySet"
                data-modal-toggle="createVocabularySet"
                :class="{ 'bg-blue-700 text-white p-3 rounded-md hover:bg-blue-800 w-14': optionsActivated, 'bg-blue-700 p-3 rounded-md hover:bg-blue-800 w-14': !optionsActivated }">
                <font-awesome-icon icon="fa-solid fa-gear" />
            </button>
        </div>

        <div class="mt-3" v-if="optionsActivated">
            <h5 class="text-lg font-semibold text-blue-800 mb-3">Options</h5>
            <button class="bg-gray-800 p-3 w-32 rounded-md text-white hover:bg-gray-900 mr-3" data-te-toggle="modal"
                data-te-target="#updateSetModal" data-te-ripple-init data-te-ripple-color="dark"><font-awesome-icon
                    icon="fa-solid fa-pen-to-square" /> Edit</button>
            <button class="bg-red-800 p-3 w-32 rounded-md text-white hover:bg-red-900" data-te-toggle="modal"
                data-te-target="#deleteSetModal" data-te-ripple-init data-te-ripple-color="dark"><font-awesome-icon
                    icon="fa-solid fa-trash" /> Delete</button>
        </div>

        <CreateVocabularyModal />
        <DeleteVocabularySetModal />
        <UpdateVocabularySetModal />
    </div>
</template>

<style></style>