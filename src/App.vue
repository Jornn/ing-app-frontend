<template>
  <v-app>
    <div id="app">
      <navBar id="navBar" />
      <v-content class="mt-8">
        <router-view :key="$route.fullPath" />
      </v-content>

      <Snackbar />
    </div>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    Snackbar,
    NavBar
  }
}
</script>

<style lang="scss" scoped></style>
