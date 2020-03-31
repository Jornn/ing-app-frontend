import CsvFileService from '@/services/CsvFileService'

export const namespaced = true

export const state = {
  files: []
}
export const mutations = {
  SET_CSV_FILES(state, files) {
    state.files = files
  }
}
export const actions = {
  fetchUploadedFiles({ commit }) {
    console.log("FETCH")
    return CsvFileService.fetchUploadedFiles().then(result => {
      commit('SET_CSV_FILES', result.data.uploadedFiles)
      return result
    })
  }
}
export const getters = {}
