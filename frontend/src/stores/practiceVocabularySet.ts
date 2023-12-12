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

    const currentVocabularyNumber = ref(0)  // Helps to indicate weather the user
    const toatalVocabularyNumber = ref(0)   // is in the first try of practice

    // Lists
    const practiceVocabularyList = reactive(Array<IVocabularyPractice>()) // List with all set vocabulary
    const firstTryVocabularyList = reactive(Array<IVocabularyPractice>()) // List with all vocabulary the user gets correct first try
    const needToLearnVocabularyList = reactive(Array<IVocabularyPractice>()) // List with all vocabulary the user needs to learn better

    // Functions

    // Setsup the vocabulary practice default settings
    const startPractice = async () => {
        await vocabularyStore.getAllVocabularyFromSet()
        practiceIsRunning.value = true
        vocabularyListLoaded.value = true
        currentVocabularyNumber.value = 1

        firstTryVocabularyList.length = 0
        needToLearnVocabularyList.length = 0

        fillPracticeVocabulrayList()

        toatalVocabularyNumber.value = practiceVocabularyList.length

        shuffleVocabList()
    }

    // Ends the practcie session
    const endPractice = () => {
        practiceIsRunning.value = false
        vocabularyListLoaded.value = false
    }

    // Checks it the user typed in the right foreign word for the vocabulary
    // and retunrs the result. If the user types the correct word first try
    // the vocabulary get pushed to the firstTryVocabularyList
    const checkWordInput = (solution:string): boolean => {
        const result = solution.toLowerCase() === practiceVocabularyList[0].foreignWord.toLowerCase()

        const vocab = practiceVocabularyList.splice(0, 1)[0]

        currentVocabularyNumber.value++

        if (!result) {
            practiceVocabularyList.push(vocab)

            if (needToLearnVocabularyList.indexOf(vocab) === -1) {
                needToLearnVocabularyList.push(vocab)
            }

            return result
        }

        // If the currentVocabularyNumber - 1 is smaller then the total amount the user
        // konws the vocabulary on the first try
        if (currentVocabularyNumber.value - 1 <= toatalVocabularyNumber.value) {
            firstTryVocabularyList.push(vocab)   
        }

        return result
    }
    

    const getFirstTryPercent = ():string => {
        return ((firstTryVocabularyList.length * 100) / toatalVocabularyNumber.value).toFixed(2)
    }

    // Helper Functions

    // Fills the practiceVocabularyList with IVocabularyPractice objects
    const fillPracticeVocabulrayList = () => {
        practiceVocabularyList.length = 0

        vocabularyStore.setVocabulary.map(vocab => {
            practiceVocabularyList.push({
                nativeWord: vocab.nativeWord,
                foreignWord: vocab.foreignWord
            })
        })
    }

    // Randomize the vocabulary list that the user has a different order every time
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
        firstTryVocabularyList,
        needToLearnVocabularyList,

        // Functions
        startPractice,
        endPractice,
        checkWordInput,
        getFirstTryPercent
    }
})
