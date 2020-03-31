import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Upload from '@/views/upload.vue'
import store from '@/store'
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
    component: Upload,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      store.dispatch('csvFiles/fetchUploadedFiles').then(result => {
        console.log(result)
        to.params.files = result.data.files
        next()
      })
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
