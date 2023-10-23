<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { initFlowbite } from 'flowbite';
import type { IPracticeRoom } from '@/assets/Interfaces/IPracticeRomm'
import { usePracticeRoomStore } from '@/stores/practiceRoom'

// stores
const practiceRoomStore = usePracticeRoomStore()

const practiceRoom = ref<IPracticeRoom>({
    id: '',
    name: '',
    language: '',
    description: '',
    owner: ''
})

const otherLangauge = ref(false)
const otherLangaugeName = ref('')

const submitForm = async () => {
    if (otherLangauge.value) {
        practiceRoom.value.language = otherLangaugeName.value
    }

    await practiceRoomStore.createPracticeRoom(practiceRoom.value)

    practiceRoom.value.name = ''
    practiceRoom.value.language = ''
    practiceRoom.value.description = ''
    otherLangaugeName.value = ''
}
</script>

<template>
    <div id="createPracticeRoomModal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="createPracticeRoomModal">
                    <font-awesome-icon icon="fa-solid fa-x" />
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new Langauge Practice Room</h3>
                    <form class="space-y-6" @submit.prevent="submitForm">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="name"
                                v-model="practiceRoom.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="My Practice Room" required>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
                            <select v-if="!otherLangauge"
                            v-model="practiceRoom.language"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                <option value="EN" selected>English</option>
                                <option value="GER">German</option>
                                <option value="ESP">Spanish</option>
                            </select>

                            <input type="text" id="name" v-else
                            v-model="otherLangaugeName"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Langauge">
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" v-model="otherLangauge"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
                                </div>
                                <label for="remember"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">My langauge is not listed</label>
                            </div>
                        </div>
                        <div>
                            <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                            v-model="practiceRoom.description"
                            id="desc"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="This is my Practice room" required>

                            </textarea>
                                
                        </div>
                        <div class="bg-red-800 text-white p-3 rounded-md mb-3" v-if="practiceRoomStore.practcieRoomCreateErrors.length">
                            <p v-for="error in practiceRoomStore.practcieRoomCreateErrors">{{ error }}</p>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style></style>