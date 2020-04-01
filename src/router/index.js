import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import CsvUpload from '@/views/CsvUpload.vue'
import store from '@/store'
import CsvShow from '@/views/CsvShow.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/upload',
    name: 'upload',
    component: CsvUpload,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      store.dispatch('csvFiles/fetchFileNames').then(() => {
        next()
      })
    }
  },
  {
    path: '/show/:file',
    name: 'show-file',
    component: CsvShow
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    store.commit('authentication/SET_LOGGED_IN', userData)
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next('/')
  } else {
    next()
  }
})

export default router
