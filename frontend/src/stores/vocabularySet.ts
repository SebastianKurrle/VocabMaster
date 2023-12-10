import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import axios from "axios";
import type { IVocabSet } from "@/assets/Interfaces/IVocabSet";
import { toast } from "vue3-toastify";
import { usePracticeRoomStore } from "./practiceRoom";
import router from "@/router";

export const useVocabularySetStore = defineStore('vocabularySet', () => {
    // stores
    const practiceRoomStore = usePracticeRoomStore()

    // Error lists
    const createVocabSetErrors = reactive(Array())
    const updateVocabSetErrors = reactive(Array())

    // lists
    const roomVocaublarySets = reactive<Array<IVocabSet>>(Array<IVocabSet>())

    // VARS
    const currentVocabularySet = ref<IVocabSet>()

    // API Call functions

    /*
        Sends an API request to create a vocabulary set
    */
    const createVocabularySet = async (vocabSetForm: IVocabSet) => {
        createVocabSetErrors.length = 0

        await axios
            .post('/api/set/', vocabSetForm)
            .then(response => {
                toast.success('Vocabulary Set Created!', { autoClose: 3000 })
                getAllVocaublarySetsFromPracticeRoom(practiceRoomStore.currentPracticeRoom.id)
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

    /*
        Gets all Vocabulary Sets from a practice room by the id from the room
        and pushs all sets in the list
    */
    const getAllVocaublarySetsFromPracticeRoom = async (roomId: string) => {
        roomVocaublarySets.length = 0

        await axios
            .get(`/api/set/?roomId=${roomId}`)
            .then(response => {
                const result: Array<any> = response.data
                fillRoomVocabularySetsList(result)
            })
            .catch(error => {
                toast.error('Something went wrong', { autoClose: 3000 })
            })
    }

    const getVocabularySetById = async (vocabSetId: string) => {
        await axios
            .get(`/api/set/${vocabSetId}/`)
            .then(response => {
                currentVocabularySet.value = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    room: response.data.room
                }

                localStorage.setItem('currentVocabularySet', JSON.stringify(currentVocabularySet.value))
            })
            .catch(error => {
                toast.error('Something went wrong!', { autoClose: 3000 })
            })
    }

    const updateVocabularySet = (updatedVocabSet: IVocabSet) => {
        updateVocabSetErrors.length = 0

        axios
            .put(`/api/set/${currentVocabularySet.value?.id}/`, updatedVocabSet)
            .then(response => {
                toast.success('Updated!', { autoClose: 3000 })
                getVocabularySetById(String(updatedVocabSet.id))
            })
            .catch(error => {
                if (error.response) {
                    // Loops the server errors and push it in the errors array
                    for (const property in error.response.data) {
                        updateVocabSetErrors.push(
                            `${property}: ${error.response.data[property]}`
                        );
                    }
                }
            })
    }

    /*
        Calls the API to delete a VocabularySet by the id
    */
    const deleteVocabularySet = () => {
        axios
            .delete(`/api/set/${currentVocabularySet.value?.id}`)
            .then(response => {
                toast.warn('Vocabulary Set deleted', { autoClose: 3000 })
                router.push({ name: 'room-detail', params: { id: practiceRoomStore.currentPracticeRoom.id } })
            })
            .catch(error => {
                toast.error('Something went wrong', { autoClose: 3000 })
            })
    }

    // Helper functions

    /*
        Fills the roomVocaublarySet list with IVocabSet objects from the api response
    */
    const fillRoomVocabularySetsList = (res: Array<any>): void => {
        res.map(set => {
            roomVocaublarySets.push({
                id: set.id,
                name: set.name,
                description: set.description,
                room: set.room
            })
        })
    }

    return {
        // Vars
        createVocabSetErrors,
        updateVocabSetErrors,
        roomVocaublarySets,
        currentVocabularySet,

        // Functions
        createVocabularySet,
        getAllVocaublarySetsFromPracticeRoom,
        getVocabularySetById,
        updateVocabularySet,
        deleteVocabularySet
    }
})
