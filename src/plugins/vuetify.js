import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#204051',
        secondary: '#3b6978',
        third: '#3b6978',
        fourth: '#cae8d5'
      }
    }
  }
})
