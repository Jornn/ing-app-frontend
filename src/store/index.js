import Vue from 'vue'
import Vuex from 'vuex'
import * as authentication from '@/store/modules/authentication'
import * as notifications from '@/store/modules/notifications'
import * as csvFiles from '@/store/modules/csv-files'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    notifications,
    csvFiles
  }
})
