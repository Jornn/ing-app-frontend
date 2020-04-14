<template>
  <div>
    <v-card class="mx-auto" :width="width">
      <v-card-title>
        <h1 class="mx-auto">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            validate-on-blur
            :rules="[rules.required, rules.minUsername]"
            v-model="emailOrUsername"
            label="Email or Username"
            class="custom-outline"
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
        <v-btn
          :width="width - 15"
          :disabled="!valid"
          @click="authenticate"
          color="success"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
    <ChangeLoginButton v-on="$listeners" width="90" height="30" color="info">
      <span slot="text">Don't have an account?</span>
      <span slot="buttonText">Register</span>
    </ChangeLoginButton>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ChangeLoginButton from '@/components/helpers/ChangeLoginButton.vue'
export default {
  props: {
    width: {
      type: Number,
      required: true
    }
  },
  components: {
    ChangeLoginButton
  },
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

<style lang="scss" scoped>
//
</style>
