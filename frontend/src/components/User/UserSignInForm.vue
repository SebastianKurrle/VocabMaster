<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import type { IUserSignIn } from '@/assets/Interfaces/IUserSignIn';

// stores
const userStore = useUserStore()

const signInUser = ref<IUserSignIn>({
    email: '',
    password: ''
})

const submitForm = async () => {
    await userStore.userSignIn(signInUser.value)

    signInUser.value.email = ''
    signInUser.value.password = ''
}
</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="relative z-0 w-full mb-6 group">
            <input type="email" name="floating_email" id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required v-model="signInUser.email"/>
            <label for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                address</label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input type="password" name="floating_password" id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required v-model="signInUser.password"/>
            <label for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        
        <div class="bg-red-800 text-white p-3 rounded-md mb-3" v-if="userStore.signInErrors.length">
            <p v-for="error in userStore.signInErrors">{{ error }}</p>
        </div>

        <button type="submit"
            class="text-white mb-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Sign In</button>

        <small class="text-sm text-white md:ml-3">
            <font-awesome-icon icon="fa-solid fa-circle-info" /> Don`t have an account <RouterLink :to="{ name: 'sign-up' }"
                class="font-semibold text-blue-500 hover:text-blue-700 hover:underline">
                Sign Up</RouterLink>
        </small>
    </form>
</template>

<style scoped></style>