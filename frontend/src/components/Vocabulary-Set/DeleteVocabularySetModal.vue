<script setup lang='ts'>
import { useVocabularySetStore } from '@/stores/vocabularySet';


// stores
const vocabularySetStore = useVocabularySetStore()
</script>

<template>
    <!-- Modal -->
    <div data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="deleteSetModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div data-te-modal-dialog-ref
            class="text-white pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
            <div
                class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none  bg-gray-700 bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div
                    class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <!--Modal title-->
                    <h5 class="text-xl font-medium leading-normal text-white" id="exampleModalLabel">
                        Delete Vocabulary Set
                    </h5>
                    <!--Close button-->
                    <button type="button"
                        class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss aria-label="Close">
                        <font-awesome-icon icon="fa-solid fa-x" />
                    </button>
                </div>

                <!--Modal body-->
                <div class="relative flex-auto p-4 font-semibold text-red-600" data-te-modal-body-ref>
                    <font-awesome-icon icon="fa-solid fa-circle-exclamation" /> <br />
                    Are you sure you want to delete <span class="text-white">{{ vocabularySetStore.currentVocabularySet?.name }}</span>
                </div>

                <!--Modal footer-->
                <div
                    class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <button type="button" data-te-modal-dismiss
                        class="bg-gray-500 p-3 rounded-md hover:bg-gray-600 w-36 mr-3">
                        Cancle
                    </button>
                    <button type="button" data-te-modal-dismiss @click="vocabularySetStore.deleteVocabularySet"
                        class="bg-red-700 p-3 rounded-md hover:bg-red-800 w-36">
                        Yes i`m sure
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style></style>