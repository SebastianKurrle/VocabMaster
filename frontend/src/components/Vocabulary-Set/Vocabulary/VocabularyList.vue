<script setup lang='ts'>
import { useVocabularyStore } from '@/stores/vocabulary';
import VocabularyListItem from './VocabularyListItem.vue';


// stores
const vocabularyStore = useVocabularyStore()
</script>

<template>
    <div>
        <div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-left text-sm font-light">
                                <thead class="border-b font-medium dark:border-neutral-500 text-center">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">Nr.</th>
                                        <th scope="col" class="px-6 py-4">Native Word</th>
                                        <th scope="col" class="px-6 py-4">Foreign Word</th>
                                        <th scope="col" class="px-6 py-4">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <VocabularyListItem v-for="(vocab, index) in vocabularyStore.setVocabulary" :vocab="vocab" :index="index+1"/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style></style>