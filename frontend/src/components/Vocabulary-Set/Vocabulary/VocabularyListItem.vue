<script setup lang='ts'>
import { useVocabularyStore } from '@/stores/vocabulary';
import { ref, onMounted } from 'vue';

// stores
const vocabularyStore = useVocabularyStore()

const props = defineProps(['vocab', 'index'])

const vocab = ref(props.vocab)

const update = () => {
    vocabularyStore.setVocabulary[props.index - 1].nativeWord = vocab.value.nativeWord
    vocabularyStore.setVocabulary[props.index - 1].foreignWord = vocab.value.foreignWord
}
</script>

<template>
    <tr
        class="border-b transition duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-neutral-600 ">
        <td class="whitespace-nowrap px-6 py-4 font-medium">{{ props.index }}</td>
        <td class="whitespace-nowrap px-6 py-4 text-gray-700"><input type="text" class="rounded-md" 
            v-model="vocab.nativeWord" @change="update"></td>
        <td class="whitespace-nowrap px-6 py-4 text-gray-700"><input type="text" class="rounded-md" v-model="vocab.foreignWord" @change="update"></td>
        <td class="whitespace-nowrap px-6 py-4">
            <button class="bg-red-800 p-3 w-20 rounded-md hover:bg-red-900"><font-awesome-icon icon="fa-solid fa-trash" /></button>
        </td>
    </tr>
</template>
    
<style></style>