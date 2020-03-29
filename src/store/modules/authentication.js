import AuthenticationService from '@/services/AuthenticationService.js'

export const namespaced = true

export const state = {
  loggedIn: false,
  userId: null
}

export const mutations = {
  SET_LOGGED_IN(state, userId) {
    state.loggedIn = true
    state.userId = userId
  },
  SET_LOGGED_OUT(state) {
    state.loggedIn = false
    state.userId = null
  }
}

export const actions = {
  login({ commit, dispatch }, { emailOrUsername, password }) {
    AuthenticationService.login(emailOrUsername, password).then(response => {
      console.log(response)
      if (response.data.success) {
        commit('SET_LOGGED_IN', response.data.user_id)
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
  }
}

// export const getters = {}
