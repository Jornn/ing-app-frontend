import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Register from '../components/login/RegisterCard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
