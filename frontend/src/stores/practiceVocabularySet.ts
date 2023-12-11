import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useVocabularyStore } from "./vocabulary";
import type { IVocabularyPractice } from "@/assets/Interfaces/IVocabularyPractice";


export const usePracticeVocabularySetStore = defineStore('practiceVocabulray', () => {
    // stores
    const vocabularyStore = useVocabularyStore()

    // Vars
    const practiceIsRunning = ref<boolean>(false) // Indicates whether the user is currently practicing vocabulary
    const vocabularyListLoaded = ref(false)
    const currentVocabularyWordIndex = ref(0)

    // Lists
    const practiceVocabularyList = reactive(Array<IVocabularyPractice>())

    // Functions
    const startPractice = async () => {
        await vocabularyStore.getAllVocabularyFromSet()
        practiceIsRunning.value = true
        vocabularyListLoaded.value = true
        currentVocabularyWordIndex.value = 0

        fillPracticeVocabulrayList()
        shuffleVocabList()
    }

    const endPractice = () => {
        practiceIsRunning.value = false
        vocabularyListLoaded.value = false
    }

    const checkWordInput = (solution:string): boolean => {
        const result = solution.toLowerCase() === practiceVocabularyList[currentVocabularyWordIndex.value].foreignWord.toLowerCase()

        return result
    }

    const nextWord = () => {
        if (currentVocabularyWordIndex.value < practiceVocabularyList.length - 1) {
            currentVocabularyWordIndex.value++
        }
    }

    // Helper Functions

    const fillPracticeVocabulrayList = () => {
        practiceVocabularyList.length = 0

        vocabularyStore.setVocabulary.map(vocab => {
            practiceVocabularyList.push({
                nativeWord: vocab.nativeWord,
                foreignWord: vocab.foreignWord
            })
        })
    }

    const shuffleVocabList = () => {
        for (var i = practiceVocabularyList.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = practiceVocabularyList[i];
            practiceVocabularyList[i] = practiceVocabularyList[j];
            practiceVocabularyList[j] = temp;
        }
    }

    return {
        // Vars
        practiceIsRunning,
        vocabularyListLoaded,
        practiceVocabularyList,
        currentVocabularyWordIndex,

        // Functions
        startPractice,
        endPractice,
        checkWordInput,
        nextWord
    }
})
