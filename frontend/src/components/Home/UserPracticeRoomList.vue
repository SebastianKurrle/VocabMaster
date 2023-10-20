<script setup lang='ts'>
import { usePracticeRoomStore } from '@/stores/practiceRoom';
import { onMounted, ref } from 'vue'

// components
import UserPracticeRoomCard from './UserPracticeRoomCard.vue';

// stores
const practiceRoomStore = usePracticeRoomStore()

const loaded = ref(false)

onMounted(async () => {
    await practiceRoomStore.getUserPracticeRooms()
    loaded.value = true
})
</script>

<template>
    <div v-if="loaded" class="card-grid">
       <UserPracticeRoomCard v-for="room in practiceRoomStore.userPracticeRomms" :room="room"/>
    </div>        
</template>
    
<style>
.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Immer 3 Karten pro Reihe für größere Bildschirme */
    gap: 20px; /* Abstand zwischen den Karten */
    max-width: 900px; /* Maximale Breite des Containers */
    margin: 0 auto; /* Zentriert den Container horizontal im Elternelement */
}

.card-grid > * {
    width: 100%; /* Füllt den verfügbaren Platz in der Kartenreihe */
}

@media (max-width: 750px) { /* Wenn die Bildschirmbreite kleiner als 600px ist */
    .card-grid {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }
}

</style>