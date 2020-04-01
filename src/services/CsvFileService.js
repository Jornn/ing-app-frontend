import apiClient from './config/axios-config'

function fetchFileNames() {
  return apiClient.get('/files/get-uploaded-files')
}

function uploadFile(formData) {
  return apiClient.post('/files/upload-file', formData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

function fetchFile(fileName) {
  return apiClient.get('/files/fetch/' + fileName)
}

export default {
  fetchFileNames,
  uploadFile,
  fetchFile
}
