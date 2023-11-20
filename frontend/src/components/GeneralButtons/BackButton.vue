<script setup lang='ts'>
import router from '@/router';


const props = defineProps(['destination', 'parmValue'])

const destination = props.destination
const parmValue = props.parmValue

const routerQuery = {
    name: destination,
    params: { id: parmValue }
}

const directRoute = () => {
    router.push(routerQuery)
}

</script>

<template>
    <div>
        <button
        @click="directRoute"
        class="bg-red-800 rounded-md p-3 text-white w-28 hover:bg-red-900">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </button>
    </div>
</template>
    
<style>
    
</style>