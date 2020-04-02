import CsvFileService from '@/services/CsvFileService'

export const namespaced = true

export const state = {
  files: []
}
export const mutations = {
  SET_CSV_FILES(state, files) {
    state.files = files
  },
  ADD_CSV_FILE(state, file) {
    state.files.push(file)
  }
}
export const actions = {
  fetchFileNames({ commit, dispatch }) {
    return CsvFileService.fetchFileNames()
      .then(result => {
        commit('SET_CSV_FILES', result.data.files)
        return result.data.files
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch(
            'authentication/logout',
            {
              message: 'Unauthorized access, you are logged out',
              type: 'error'
            },
            { root: true }
          )
        } else {
          dispatch('notifications/addNotification', {}, { root: true })
        }
      })
  },
  uploadFile({ commit, dispatch }, { formData, fileName }) {
    console.log(formData)
    CsvFileService.uploadFile(formData)
      .then(result => {
        commit('ADD_CSV_FILE', fileName)
        dispatch('notifications/addNotification', result.data, { root: true })
      })
      .catch(() => {
        dispatch('notifications/addNotification', {}, { root: true })
      })
  }
}
export const getters = {
  checkFiles(state) {
    return state.files.length >= 1
  }
}
