import apiClient from './config/axios-config'

function login(userData) {
  return apiClient.post(`/users/login`, userData)
}
function register(userData) {
  return apiClient.post('/users/register', userData)
}

export default {
  login,
  register
}
