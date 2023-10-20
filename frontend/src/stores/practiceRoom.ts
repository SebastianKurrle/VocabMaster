import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import type { IPracticeRoom } from "@/assets/Interfaces/IPracticeRomm";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useUserStore } from "./user";

export const usePracticeRoomStore = defineStore('practiceRoom', () => {
    // stores
    const userStore = useUserStore()
    
    const practcieRoomCreateErrors = reactive(Array())

    /*
        Sends an API request to create a langauge practice room
    */
    const createPracticeRoom = async (practiceRoom:IPracticeRoom):Promise<void> => {
        practcieRoomCreateErrors.length = 0

        practiceRoom.owner = userStore.user.id

        await axios
                .post('/api/room/', practiceRoom)
                .then(response => {
                    toast.success('Practice Room Created!', { autoClose: 3000 })
                })
                .catch(error => {
                    if (error.response) {
                        // Loops the server errors and push it in the errors array
                        for (const property in error.response.data) {
                            practcieRoomCreateErrors.push(
                                `${property}: ${error.response.data[property]}`
                            );
                        }
                      }
                })
    }

    return {
        // functions
        createPracticeRoom,

        // Vars
        practcieRoomCreateErrors
    }
})
