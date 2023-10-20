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

    const userPracticeRomms = reactive(Array())
    const registerdLanguages = reactive([
        {
            name: 'EN',
            img: '/flags/gb.png'
        },
        {
            name: 'GER',
            img: '/flags/ger.png'
        },
        {
            name: 'ESP',
            img: '/flags/esp.png'
        }
    ])

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

    /*
        Gets all practice rooms from an user from api and fills the 
        user practice room list
    */
    const getUserPracticeRooms = async () => {
        userPracticeRomms.length = 0

        await axios
                .get('/api/room/')
                .then(response => {
                    const result:Array<any> = response.data
                    fillPracticeRoomList(result)
                })
                .catch(error => {
                    toast.error('Something went wrong', { autoClose: 300 })
                })
    }

    /*
        Fills the user practice room list with IPractieRoom objects
        from the api request result
    */
    const fillPracticeRoomList = (result:Array<any>) => {
        result.map(room => {
            userPracticeRomms.push({
                name: room.name,
                language: room.language,
                description: room.description,
                owner: room.owner,
                url: room.get_absolute_url
            })
        })
    }

    return {
        // functions
        createPracticeRoom,
        getUserPracticeRooms,

        // Vars
        practcieRoomCreateErrors,
        userPracticeRomms,
        registerdLanguages
    }
})
