<template>
  <v-container>
    <v-card class="sign-card mx-auto" :width="width" elevation="8">
      <v-card-title>
        <h2 class="mx-auto">
          Register
        </h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            :rules="[rules.required, rules.email]"
            v-model="email"
            label="Email"
            prepend-icon="mdi-account-circle"
            required
            validate-on-blur
          />
          <v-text-field
            :rules="[rules.required, rules.username]"
            v-model="username"
            label="Username"
            prepend-icon="mdi-account"
            required
            validate-on-blur
          />
          <v-text-field
            :rules="[rules.required, rules.min]"
            v-model="password"
            label="Password"
            type="password"
            prepend-icon="mdi-lock"
            required
            validate-on-blur
          />
          <v-text-field
            :rules="[rules.required, rules.passwordMatch]"
            label="Repeat password"
            v-model="repeatPassword"
            type="password"
            prepend-icon="mdi-lock"
            required
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          class="mr-5"
          :width="width - 15"
          :disabled="!valid"
          @click="submit"
          color="success"
        >
          Create account
        </v-btn>
      </v-card-actions>
    </v-card>
    <ChangeLoginButton v-on="$listeners" width="50" height="30" color="success">
      <span slot="text">Already have an account?</span>
      <span slot="buttonText">Login</span>
    </ChangeLoginButton>
  </v-container>
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
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      rules: {
        required: value => !!value || 'This field is required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match",
        passwordMatch: () =>
          this.password === this.repeatPassword || "Passwords don't match",
        email: email => this.validateEmail(email) || 'Incorrect email',
        username: v => v.length >= 4 || 'Minimum 4 characters'
      },
      valid: false,
      snackbar: {
        show: false,
        text: '',
        error: false
      }
    }
  },
  methods: {
    ...mapActions('authentication', ['register']),
    submit() {
      if (this.$refs.form.validate()) {
        this.register({
          email: this.email,
          username: this.username,
          password: this.password
        }).then(response => {
          if (response && response.data.success) {
            this.$emit('changeRegister')
          }
        })
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
