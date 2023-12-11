<script setup lang='ts'>
import type { IVocabulary } from '@/assets/Interfaces/IVocabulary';
import { useVocabularyStore } from '@/stores/vocabulary';
import { useVocabularySetStore } from '@/stores/vocabularySet';
import { ref } from 'vue';


// stores
const vocabularyStore = useVocabularyStore()
const vocabularySetStore = useVocabularySetStore()

const vocabularyForm = ref<IVocabulary>({
    id: '',
    nativeWord: '',
    foreignWord: '',
    vocabSet: ''
})

const submitForm = async () => {
    vocabularyForm.value.vocabSet = String(vocabularySetStore.currentVocabularySet?.id)

    await vocabularyStore.createVocabulary(vocabularyForm.value)
    vocabularyStore.getAllVocabularyFromSet()

    vocabularyForm.value.nativeWord = ''
    vocabularyForm.value.foreignWord = ''
    vocabularyForm.value.vocabSet = ''
}
</script>

<template>
    <tr class="border-b transition duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-neutral-600 ">
        <td class="whitespace-nowrap px-6 py-4 font-medium">NEW</td>
        <td class="whitespace-nowrap px-6 py-4 text-gray-700"><input type="text" class="rounded-md"
                v-model="vocabularyForm.nativeWord"></td>
        <td class="whitespace-nowrap px-6 py-4 text-gray-700"><input type="text" class="rounded-md"
            v-model="vocabularyForm.foreignWord"></td>
        <td class="whitespace-nowrap px-6 py-4">
            <button class="bg-gray-600 p-3 w-20 rounded-md hover:bg-gray-700"
            @click="submitForm"
            ><font-awesome-icon icon="fa-solid fa-plus" /></button>
        </td>
    </tr>
</template>
    
<style></style>