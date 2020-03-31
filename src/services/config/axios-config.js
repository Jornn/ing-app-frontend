import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentals: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  },
  timeout: 10000
})
