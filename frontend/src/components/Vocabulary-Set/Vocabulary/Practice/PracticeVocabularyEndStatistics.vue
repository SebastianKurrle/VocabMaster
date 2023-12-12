<script setup lang='ts'>
import { usePracticeVocabularySetStore } from '@/stores/practiceVocabularySet';

// components
import StatisticTable from './StatisticTable.vue';
import TableRow from './TableRow.vue';

// stores
const practiceVocabularySetStore = usePracticeVocabularySetStore()
</script>

<template>
    <div>
        <h4 class="text-2xl font-bold bg-green-400 text-white rounded-md mb-3 p-3">
            Congratulations
        </h4>

        <div>
            <span class="font-semibold">First Try:</span>
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress" :style="{ width: practiceVocabularySetStore.getFirstTryPercent() + '%' }"></div>
                    <span class="label">
                        {{ practiceVocabularySetStore.getFirstTryPercent() }}%
                    </span>
                </div>
            </div>
        </div>

        <h5 class="bg-green-500 text-white p-3 rounded-md font-semibold" style="margin-bottom: 20px;">
            Vocabulary that you knew well
        </h5>

        <StatisticTable>
            <TableRow v-for="vocab in practiceVocabularySetStore.firstTryVocabularyList" :vocab="vocab" />
        </StatisticTable>

        <h5 class="bg-red-500 text-white p-3 rounded-md font-semibold mt-3" style="margin-bottom: 20px;">
            Vocabulary you still need to practice
        </h5>

        <StatisticTable>
            <TableRow v-for="vocab in practiceVocabularySetStore.needToLearnVocabularyList" :vocab="vocab" />
        </StatisticTable>
    </div>
</template>
  
<style>
.progress-bar-container {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
}

.progress-bar {
    background-color: #ccc;
    height: 30px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
}

.progress {
    background-color: #4caf50;
    height: 100%;
    width: 0;
    position: absolute;
    animation: progressBarAnimation 1s ease-in-out;
}

.label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
}

@keyframes progressBarAnimation {
    from {
        width: 0;
    }
}
</style>
  
  
