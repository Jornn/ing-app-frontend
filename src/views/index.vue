<template>
  <div>
    <template v-if="!loggedIn">
      <div v-if="!showRegister">
        <sign-in-card :width="cardWidth" @changeRegister="changeRegister" />
      </div>
      <div v-else>
        <register-card :width="cardWidth" @changeRegister="changeRegister" />
      </div>
    </template>
    <template v-else>
      <v-card :width="cardWidth" height="200" class="mx-auto">
        <v-card-title>
          <h2 class="mx-auto">Welcome</h2>
        </v-card-title>
        <v-card-text>
          <router-link :to="{ name: 'upload' }">
            To upload a csv, click here
          </router-link>
        </v-card-text>
        <v-card-text>
          <router-link :to="{ name: 'files' }">
            To check uploaded files, click here
          </router-link>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import RegisterCard from '../components/login/RegisterCard'
import SignInCard from '../components/login/SignInCard'
import { mapGetters } from 'vuex'

export default {
  components: {
    RegisterCard,
    SignInCard
  },
  data() {
    return {
      cardWidth: 350,
      showRegister: false,
      show: true
    }
  },
  methods: {
    changeRegister() {
      this.showRegister = !this.showRegister
    }
  },
  computed: {
    ...mapGetters('authentication', ['loggedIn'])
  }
}
</script>

<style lang="scss" scoped></style>
