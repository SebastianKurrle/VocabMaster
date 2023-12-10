<script setup lang='ts'>
// components
import { useVocabularyStore } from '@/stores/vocabulary';
import VocabularyList from './VocabularyList.vue';

// stores
const vocabularyStore = useVocabularyStore()
</script>

<template>
    <div data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="vocabularyList" tabindex="-1" aria-labelledby="exampleModalLgLabel" aria-modal="true" role="dialog">
        <div data-te-modal-dialog-ref
            class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
            <div
                class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-gray-700 bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div
                    class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <!--Modal title-->
                    <h5 class="text-xl font-medium leading-normal text-neutral-200"
                        id="exampleModalLgLabel">
                        Vocabulary Overview
                    </h5>
                    <!--Close button-->
                    <button type="button"
                        class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss aria-label="Close">
                        <font-awesome-icon icon="fa-solid fa-x" />
                    </button>
                </div>

                <!--Modal body-->
                <div class="relative p-4 text-white">
                    <VocabularyList />

                    <button class="bg-green-500 p-3 rounded-md hover:bg-green-600 w-full" @click="console.log(vocabularyStore.setVocabulary)">Save List</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style></style>