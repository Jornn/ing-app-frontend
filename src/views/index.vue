<template>
  <div v-if="!showRegister">
    <sign-in-card @changeRegister="changeRegister" />
  </div>
  <div v-else>
    <register-card @changeRegister="changeRegister" />
  </div>
</template>

<script>
import RegisterCard from '../components/login/RegisterCard'
import SignInCard from '../components/login/SignInCard'
export default {
  components: {
    RegisterCard,
    SignInCard
  },
  data() {
    return {
      showRegister: false,
      show: true
    }
  },
  methods: {
    changeRegister() {
      this.showRegister = !this.showRegister
    }
  }
}
</script>

<style lang="scss" scoped></style>
