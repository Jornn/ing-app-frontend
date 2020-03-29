import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentals: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  },
  timeout: 10000
})

export default {
  login(username, password) {
    return apiClient
      .post(`/users/login`, {
        emailOrUsername: username,
        password: password
      })
      .catch(error => {
        console.log(error)
        return {
          success: false,
          message: 'Something went wrong. Please contact an admin'
        }
      })
  }
}
