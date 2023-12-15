import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/assets/Interfaces/IUser'
import type { IUserSignUp } from '@/assets/Interfaces/IUserSignUp'
import type { IUserSignIn } from '@/assets/Interfaces/IUserSignIn'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import router from '@/router'
import type { IUserUpdate } from '@/assets/Interfaces/IUserUpdate'
import type { IPasswordUpdate } from '@/assets/Interfaces/IPasswordUpdate'

export const useUserStore = defineStore('user', () => {
  const authenticated = ref(false)
  const signUpErrors = reactive(Array())
  const signInErrors = reactive(Array())
  const userUpdateErrors = reactive(Array())
  const passwordUpdateErrors = reactive(Array())

  const user = ref<IUser>({
    id: '',
    email: '',
    name: '',
    token: ''
  })

  /*
 This function checks if the token is valid
 and sets the axios commen headers for authorization and updates the 
 user varibale and the authenticated status
 or deletes the token in the localstorage if the token is invalid
*/
  const checkToken = async (token: string) => {
    if (token) {
      await axios
        .get('/api/user/check-token/', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          localStorage.setItem('token', token)
        })
        .then(async () => {
          await axios
            .get('/api/user/user/')
            .then(response => {
              user.value.id = response.data.id
              user.value.email = response.data.email
              user.value.name = response.data.name
              user.value.token = token

              authenticated.value = true
            })
        })
        .catch(error => {
          toast.error('Authentication Error', { autoClose: 3000 })
          localStorage.removeItem('token')
        })
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  }

  /*
    Sends a signup request to the api to create a new user
    If the server throws an error the error will be pushed in to the signUpErrors list
  */
  const userSignUp = async (signUpUser: IUserSignUp) => {
    signUpErrors.length = 0

    await axios
      .post('/api/user/signup/', signUpUser)
      .then(response => {
        router.push({ name: 'sign-in' })
        toast.success('User Created', { autoClose: 3000 })
      })
      .catch(error => {
        if (error.response) {
          // Loops the server errors and push it in the errors array
          for (const property in error.response.data.status) {
            signUpErrors.push(
              `${property}: ${error.response.data.status[property]}`
            );
          }
        }
      })
  }

  /*
    Sends a signin request to the api to sign in with an existing user
    If the server throws an error the error will be pushed in to the signInErrors list
  */
  const userSignIn = async (logInUser: IUserSignIn) => {
    signInErrors.length = 0

    await axios
      .post('/api/user/login/', logInUser)
      .then(response => {
        user.value.token = response.data.access
        checkToken(user.value.token)
        router.push({ 'name': 'home' })
      })
      .catch(error => {
        if (error.response) {
          // Loops the server errors and push it in the errors array
          for (const property in error.response.data) {
            signInErrors.push(
              `${property}: ${error.response.data[property]}`
            );
          }
        }
      })
  }

  /*
    Logs the user out and delets the jwt token in the localstorage 
  */
  const userLogout = () => {
    localStorage.removeItem('token')
    user.value = {
      id: '',
      email: '',
      name: '',
      token: ''
    }

    authenticated.value = false

    axios.defaults.headers.common['Authorization'] = ''

    router.push({ name: 'sign-in' })
  }

  /*
    Updates the user with an API CALL
  */
  const userUpdate = async (updatedUser: IUserUpdate) => {
    userUpdateErrors.length = 0

    await axios
      .put('/api/user/update/', updatedUser)
      .then(response => {
        checkToken(user.value.token)
        toast.success('Updated!', { autoClose: 3000 })
      })
      .catch(error => {
        if (error.response) {
          // Loops the server errors and push it in the errors array
          for (const property in error.response.data) {
            userUpdateErrors.push(
              `${property}: ${error.response.data[property]}`
            );
          }
        }
      })
  }

   /*
    Updates the users password with an API CALL
  */
  const passwordUpdate = (updatedPassword:IPasswordUpdate) => {
    passwordUpdateErrors.length = 0

    axios
      .put('/api/user/update/password/', updatedPassword)
      .then(response => {
        toast.success('Password changed', { autoClose: 3000 })
      })
      .catch(error => {
        if (error.response) {
          // Loops the server errors and push it in the errors array
          for (const property in error.response.data) {
            passwordUpdateErrors.push(
              `${property}: ${error.response.data[property]}`
            );
          }
        }
      })
  }

  /*
    This function is for views where the user needs to be logged in
    otherwise he get pushed to the login page
  */
  const loginRequired = async (): Promise<boolean> => {
    await checkToken(String(localStorage.getItem('token')))

    if (!authenticated.value) {
      router.push({ name: 'sign-in' })
      return false
    }

    return true
  }

  return {
    // Functions
    checkToken,
    userSignUp,
    userSignIn,
    userLogout,
    userUpdate,
    passwordUpdate,
    loginRequired,

    // Vars
    user,
    authenticated,
    signUpErrors,
    signInErrors,
    userUpdateErrors,
    passwordUpdateErrors
  }
})
