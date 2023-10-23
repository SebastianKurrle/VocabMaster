<script setup lang='ts'>
import { onMounted, ref, onBeforeMount } from 'vue';
import { initFlowbite } from 'flowbite';
import { usePracticeRoomStore } from '@/stores/practiceRoom';
import { RouterLink } from 'vue-router';

const props = defineProps(['room'])

// stores
const practiceRoomStore = usePracticeRoomStore()
const img = ref('/flags/unkown.png')

const room = ref()

const getImg = () => {
    const res = practiceRoomStore.registerdLanguages.filter(r => r.name == room.value.language)

    if (res.length == 1) {
        img.value = res[0].img
    }
}

onBeforeMount(() => {
    room.value = props.room
})

onMounted(() => {
    getImg()
    initFlowbite()
})
</script>

<template>
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10 pt-4">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="img"
                alt="Bonnie image" />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ room.name }}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ room.description }}</span>
            <div class="flex mt-4 space-x-3 md:mt-6">
                <RouterLink :to="{ name: 'room-detail', params: { id: room.id } }"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Start to learn
                </RouterLink>
            </div>
        </div>
    </div>
</template>
    
<style></style>