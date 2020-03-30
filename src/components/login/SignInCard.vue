<template>
  <v-app>
    <v-card class="mx-auto mt-8" width="350" color="blue-grey lighten-4">
      <v-card-title>
        <h2 class="mx-auto">Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            validate-on-blur
            :rules="[rules.required, rules.minUsername]"
            v-model="emailOrUsername"
            label="Email or Username"
            prepend-icon="mdi-at"
          />
          <v-text-field
            :rules="[rules.required, rules.minPassword]"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            label="Password"
            prepend-icon="mdi-lock"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn @click="$emit('changeRegister')" color="info">
          Register
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="!valid"
          @click="authenticate"
          color="success"
          elevation="5"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      showPassword: false,
      valid: false,
      emailOrUsername: '',
      password: '',
      rules: {
        required: value => !!value || 'This field is required',
        minPassword: v => v.length >= 8 || 'Minimum 8 characters',
        minUsername: v => v.length >= 1 || 'Minimum 4 characters'
      },
      snackbar: {
        error: false,
        show: true,
        text: ''
      }
    }
  },
  methods: {
    ...mapActions('authentication', ['login']),
    authenticate() {
      this.login({
        emailOrUsername: this.emailOrUsername,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
