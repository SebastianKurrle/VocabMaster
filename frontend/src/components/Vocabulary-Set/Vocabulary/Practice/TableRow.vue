<script setup lang='ts'>
const props = defineProps(['vocab'])
</script>

<template>
    <tr class="border-b bg-gray-800  hover:bg-gray-600 text-white">
        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
            {{ props.vocab.nativeWord }}
        </th>
        <td class="px-6 py-4">
            {{ props.vocab.foreignWord }}
        </td>
    </tr>
</template>
    
<style></style>