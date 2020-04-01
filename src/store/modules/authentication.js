import apiClient from '@/services/config/axios-config'
import AuthenticationService from '@/services/AuthenticationService.js'

export const namespaced = true

export const state = {
  user: null
}

export const mutations = {
  SET_LOGGED_IN(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  },
  SET_LOGGED_OUT() {
    location.reload()
    localStorage.removeItem('user')
  }
}

export const actions = {
  login({ commit, dispatch }, userData) {
    AuthenticationService.login(userData)
      .then(response => {
        if (response.data.success) {
          const { user } = response.data
          commit('SET_LOGGED_IN', user)
        }
        const { message, type } = response.data
        dispatch(
          'notifications/addNotification',
          { message, type },
          { root: true }
        )
      })
      .catch(error => {
        console.log(error)
      })
  },
  logout({ commit, dispatch }, notification) {
    commit('SET_LOGGED_OUT')
    if (notification.message) {
      dispatch('notifications/addNotification', notification, { root: true })
    } else {
      dispatch(
        'notifications/addNotification',
        {
          message: 'Logged out successfully',
          type: 'success'
        },
        { root: true }
      )
    }
  },
  register({ dispatch }, userData) {
    return AuthenticationService.register(userData)
      .then(response => {
        dispatch('notifications/addNotification', response.data, { root: true })
        return response
      })
      .catch(() => {
        dispatch('notifications/addNotification', {}, { root: true })
      })
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
