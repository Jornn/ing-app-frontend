<template>
  <div id="nav">
    <v-app-bar app class="hidden-xs-and-down bg--blue-dark">
      <v-toolbar-items>
        <v-btn
          v-for="item in protectedButtons"
          color="fourth"
          :key="item.icon"
          :to="item.path"
          :title="item.to"
          text
          >{{ item.text }}</v-btn
        >
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn v-if="loggedIn" @click="logoutUser" color="error">Logout</v-btn>
      <!-- <v-btn v-else :to="{ name: 'index' }" color="success">Login</v-btn> -->
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      navItems: [
        {
          icon: 'home',
          text: 'Home',
          title: 'Back to Home page',
          active: true,
          path: '/',
          protected: false
        },
        {
          icon: 'upload',
          text: 'Csv info',
          title: 'Upload a CSV',
          active: false,
          path: '/upload',
          protected: true
        }
        // {
        //   icon: 'Csv',
        //   text: 'Show CSV',
        //   title: 'Some stuff that needs doing',
        //   active: false,
        //   protected: true
        // }
      ]
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapGetters('authentication', ['loggedIn']),
    ...mapActions('authentication', ['logout']),
    protectedButtons() {
      if (this.loggedIn) {
        return this.navItems
      } else {
        return this.navItems.filter(item => {
          return !item.protected
        })
      }
    }
  },
  methods: {
    logoutUser() {
      this.logout
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '@/styles/_variables.scss';
</style>
