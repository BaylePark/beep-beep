import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => ({ current: null }),
  getters: {
    currentUser: (state) => state.current
  },
  actions: {
    login(user) {
      this.current = user
      console.log('logined')
      console.log(this.current)
    },
    logout() {
      this.current = null
    }
  }
})
