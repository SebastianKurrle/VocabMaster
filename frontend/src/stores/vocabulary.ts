import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import axios from "axios";
import type { IVocabulary } from "@/assets/Interfaces/IVocabulary";
import { toast } from "vue3-toastify";

export const useVocabularyStore = defineStore('vocabulary', () => {
    // Error lists
    const createVocabularyErrors = reactive(Array())

    // API Calls

    const createVocabulary = async (vocabularyForm: IVocabulary) => {
        await axios
            .post('/api/vocabulary/', vocabularyForm)
            .then(response => {
                toast.success('Added Vocabulary', { autoClose: 3000 })
            })
            .catch(error => {
                if (error.response) {
                    // Loops the server errors and push it in the errors array
                    for (const property in error.response.data.status) {
                        createVocabularyErrors.push(
                            `${property}: ${error.response.data.status[property]}`
                        );
                    }
                }
            })
    }

    return {
        // Vars
        createVocabularyErrors,

        // Functions
        createVocabulary
    }
})
