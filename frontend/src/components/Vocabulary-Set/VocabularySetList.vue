<script setup lang='ts'>
import { usePracticeRoomStore } from '@/stores/practiceRoom';
import { useVocabularySetStore } from '@/stores/vocabularySet';
import { ref, onMounted } from 'vue'

// components
import VocabularySetCard from './VocabularySetCard.vue';

// stores
const vocabularySetStore = useVocabularySetStore()
const practiceRoomStore = usePracticeRoomStore()

const loaded = ref(false)

onMounted(async () => {
    await vocabularySetStore.getAllVocaublarySetsFromPracticeRoom(practiceRoomStore.currentPracticeRoom.id)
    loaded.value = true
})
</script>

<template>
    <div>
        <h5 class="text-white text-center font-semibold text-lg md:text-2xl mb-3">Vocabulary Sets</h5>

        <div class="card-grid" v-if="loaded">
            <VocabularySetCard v-for="vocabSet in vocabularySetStore.roomVocaublarySets" :vocab-set="vocabSet"/>
        </div>
    </div>
</template>
    
<style>
.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Immer 3 Karten pro Reihe für größere Bildschirme */
    gap: 20px;
    /* Abstand zwischen den Karten */
    max-width: 900px;
    /* Maximale Breite des Containers */
    margin: 0 auto;
    /* Zentriert den Container horizontal im Elternelement */
}

.card-grid>* {
    width: 100%;
    /* Füllt den verfügbaren Platz in der Kartenreihe */
}

@media (max-width: 750px) {

    /* Wenn die Bildschirmbreite kleiner als 600px ist */
    .card-grid {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }
}</style>