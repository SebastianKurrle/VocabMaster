<script setup lang="ts">
import { useUserStore } from '@/stores/user';

// components
import UserUpdateModal from './UserUpdateModal.vue';
import UserUpdatePasswordModal from './UserUpdatePasswordModal.vue';

// stores
const userStore = useUserStore()
</script>

<template>
    <div class="relative overflow-x-auto shadow-md rounded-lg mt-3">
        <table class="w-full text-sm text-left text-gray-400">
            <tbody>
                <tr class="border-b bg-gray-800 border-gray-70">
                    <th scope="row" class="px-6 py-4 font-mediumwhitespace-nowrap :text-white">
                        Email
                    </th>
                    <td class="px-6 py-4">
                        {{ userStore.user.email }}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        data-te-toggle="modal"
                        data-te-target="#updateEmail" data-te-ripple-init data-te-ripple-color="dark"
                        >
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </button>
                    </td>
                </tr>
                <tr class="border-b bg-gray-800 border-gray-70">
                    <th scope="row" class="px-6 py-4 font-mediumwhitespace-nowrap :text-white">
                        Name
                    </th>
                    <td class="px-6 py-4">
                        {{ userStore.user.name }}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></a>
                    </td>
                </tr>
                <tr class="border-b bg-gray-800 border-gray-70">
                    <th scope="row" class="px-6 py-4 font-mediumwhitespace-nowrap :text-white">
                        Password
                    </th>
                    <td class="px-6 py-4">
                        <font-awesome-icon icon="fa-solid fa-lock" />
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button 
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        data-te-toggle="modal"
                        data-te-target="#updatePassword" data-te-ripple-init data-te-ripple-color="dark"
                        >
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modals -->
        <UserUpdateModal />
        <UserUpdatePasswordModal />
    </div>
</template>

<style scoped></style>