<script setup lang='ts'>
import { usePracticeRoomStore } from '@/stores/practiceRoom';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// components
import LanguagePracticeRoomDetailInfo from '@/components/Practice-Room/LanguagePracticeRoomDetailInfo.vue';
import VocabularySetList from '@/components/Vocabulary-Set/VocabularySetList.vue';

// stores
const practiceRoomStore = usePracticeRoomStore()

const route = useRoute()

const room = ref()

const loaded = ref(false)

onMounted(async () => {
    room.value = await practiceRoomStore.getPracticeRoomById(String(route.params.id))
    if (room.value.name) {
        loaded.value = true
    }
})
</script>

<template>
    <div v-if="loaded">
        <div class="flex justify-center mt-3">
            <div class="w-full md:w-1/2">
                <LanguagePracticeRoomDetailInfo />
            </div>
        </div>

        <div class="mt-3">
            <div>
                <VocabularySetList />
            </div>
        </div>
    </div>
</template>

<style>
    
</style>