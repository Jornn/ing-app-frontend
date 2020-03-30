import AuthenticationService from '@/services/AuthenticationService.js'
import Axios from 'axios'

export const namespaced = true

export const state = {
  user: null
}

export const mutations = {
  SET_LOGGED_IN(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
    Axios.defaults.headers.common['Authorization'] = `Bearer ${user}`
  },
  SET_LOGGED_OUT() {
    location.reload()
    localStorage.removeItem('user')
  }
}

export const actions = {
  login({ commit, dispatch }, userData) {
    AuthenticationService.login(userData).then(response => {
      if (response.data.success) {
        const { user } = response.data
        commit('SET_LOGGED_IN', user)
        dispatch(
          'notifications/addNotification',
          { message: response.data.message, type: response.data.type },
          {
            root: true
          }
        )
      } else {
        commit('SET_LOGGED_OUT')
        dispatch(
          'notifications/addNotification',
          { message: response.data.message, type: response.data.type },
          {
            root: true
          }
        )
      }
    })
  },
  logout({ commit }) {
    commit('SET_LOGGED_OUT')
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
