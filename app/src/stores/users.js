import { ref } from 'vue'
import { defineStore } from 'pinia'
import userModel from '@/models/users'

export const useUsersStore = defineStore('users', () => {
  const users = ref(userModel)

  return { users }
})
