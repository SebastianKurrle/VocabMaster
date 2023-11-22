<script setup lang='ts'>
import { usePracticeRoomStore } from '@/stores/practiceRoom';
import { useUserStore } from '@/stores/user';
import { useVocabularySetStore } from '@/stores/vocabularySet';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

// stores
const userStore = useUserStore()
const vocabularySetStore = useVocabularySetStore()
const practiceRoomStore = usePracticeRoomStore()

const route = useRoute()

const loaded = ref(false)

onMounted(async () => {
    userStore.loginRequired()

    practiceRoomStore.currentPracticeRoom = JSON.parse(String(localStorage.getItem('currentPracticeRoom')))
    await vocabularySetStore.getVocabularySetById(String(route.params.id))

    loaded.value = true
})
</script>

<template>
    <div>
        <h5 class="text-white">TEST</h5>    
    </div>
</template>
    
<style>
    
</style>