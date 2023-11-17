import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import axios from "axios";
import type { IVocabSet } from "@/assets/Interfaces/IVocabSet";
import { toast } from "vue3-toastify";

export const useVocabularySetStore = defineStore('vocabularySet', () => {
    // Error lists
    const createVocabSetErrors = reactive(Array())

    // API Call functions

    const createVocabularySet = async (vocabSetForm:IVocabSet) => {
        createVocabSetErrors.length = 0

        await axios
                .post('/api/set/', vocabSetForm)
                .then(response => {
                    toast.success('Vocabulary Set Created!', { autoClose: 3000 })
                })
                .catch(error => {
                    if (error.response) {
                        // Loops the server errors and push it in the errors array
                        for (const property in error.response.data.status) {
                            createVocabSetErrors.push(
                                `${property}: ${error.response.data.status[property]}`
                            );
                        }
                      }
                })
    }

    return {
        // Vars
            createVocabSetErrors,

        // Functions
            createVocabularySet
    }
})
