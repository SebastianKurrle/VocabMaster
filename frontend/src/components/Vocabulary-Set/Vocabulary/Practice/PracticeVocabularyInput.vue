<script setup lang='ts'>
import { usePracticeVocabularySetStore } from '@/stores/practiceVocabularySet';
import { ref, watch, onMounted } from 'vue';

// stores
const practiceVocabularySetStore = usePracticeVocabularySetStore();

const solution = ref('');
const isCheckSuccessful = ref();

watch(isCheckSuccessful, (newValue) => {
  if (newValue !== null) {
    setTimeout(() => {
      isCheckSuccessful.value = null;
    }, 2000);

    solution.value = ''
  }
});

const checkInput = () => {
  isCheckSuccessful.value = practiceVocabularySetStore.checkWordInput(solution.value);
};

</script>

<template>
  <div class="mb-3" v-if="practiceVocabularySetStore.vocabularyListLoaded">
    <h6 class="font-semibold">Word</h6>
    <p class="text-base">Left over: {{ practiceVocabularySetStore.practiceVocabularyList.length }}</p>
    <p class="bg-gray-600 text-white rounded-md p-3">{{ practiceVocabularySetStore.practiceVocabularyList[0].nativeWord }}</p>

    <h6 class="font-semibold mt-3">Your Solution</h6>
    <input type="text" class="w-full rounded-md" v-model="solution">

    <button
      class="bg-gray-600 p-3 w-full mt-3 text-white rounded-md"
      :class="{ 'bg-green-500': isCheckSuccessful === true, 'bg-red-500': isCheckSuccessful === false }"
      @click="checkInput"
    >
      <font-awesome-icon icon="fa-solid fa-check" />
    </button>
  </div>
</template>

<style>
  /* Fügen Sie bei Bedarf benutzerdefinierte Stile hinzu */
</style>
