<template>
  <v-app>
    <div id="app">
      <div id="nav"></div>
      <router-view :key="$route.fullPath" />
      <Snackbar />
    </div>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'

export default {
  components: {
    Snackbar
  }
}
</script>
