<script setup lang='ts'>

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 mt-3">
            <thead class="text-xs text-gray-300 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Native Word
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Foreign Word
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>
    
<style></style>