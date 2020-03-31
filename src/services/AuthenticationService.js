import { apiClient } from './config/axios-config'

export default {
  login(userData) {
    return apiClient.post(`/users/login`, userData)
  },
  register(userData) {
    return apiClient.post('/users/register', userData)
  }
}
