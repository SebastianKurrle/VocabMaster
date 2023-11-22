import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/User/SignUpView.vue'
import SignInView from '../views/User/SignInView.vue'
import AccountView from '@/views/User/AccountView.vue'
import PracticeRoomDetailView from '@/views/PracticeRoom/PracticeRoomDetailView.vue'
import VocabularySetDetailView from '@/views/Vocabulary-Set/VocabularySetDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/room/:id',
      name: 'room-detail',
      component: PracticeRoomDetailView
    },
    {
      path: '/room/vocabulary-set/:id',
      name: 'set-detail',
      component: VocabularySetDetailView
    },
  ]
})

export default router
