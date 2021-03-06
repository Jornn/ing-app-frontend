export const namespaced = true

export const state = {
  message: '',
  type: ''
}

export const mutations = {
  SET_NOTIFICATION(state, { message, type }) {
    state.message = message || 'Something went wrong, contact an admin'
    state.type = type || 'error'
  },

  REMOVE_NOTIFICATION(state) {
    state.message = ''
    state.type = ''
  }
}

export const actions = {
  addNotification({ commit }, notification) {
    commit('SET_NOTIFICATION', notification)
  },

  removeNotification({ commit }) {
    commit('REMOVE_NOTIFICATION')
  }
}

export const getters = {}
