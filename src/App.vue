<template>
  <v-app>
    <div id="app">
      <navDrawer id="navBar" />
      <router-view class="router-view" :key="$route.fullPath" />
      <Snackbar />
    </div>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'
import navDrawer from '@/components/navDrawer.vue'

export default {
  components: {
    Snackbar,
    navDrawer
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  margin-top: 80px;
}
</style>
