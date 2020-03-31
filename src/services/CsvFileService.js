import { apiClient } from './config/axios-config'

export default {
  fetchUploadedFiles() {
    return apiClient.get('/files/get-uploaded-files')
  }
}
