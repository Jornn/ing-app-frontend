<template>
  <div>
    <v-snackbar v-model="show" :color="notiType">
      {{ notiMessage }}
      <v-btn :color="type" text @click="show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      show: false,
      notiMessage: '',
      notiType: ''
    }
  },
  computed: {
    ...mapActions('notifications', ['removeNotification']),
    ...mapState('notifications', ['message', 'type'])
  },
  watch: {
    message(newValue) {
      if (newValue !== '') {
        this.notiMessage = newValue
        this.notiType = this.type
        this.show = true
        this.removeNotification
      }
    }
  }
}
</script>
