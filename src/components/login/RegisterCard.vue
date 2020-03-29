<template>
  <v-app>
    <v-card class="sign-card mx-auto" elevation="8">
      <v-card-title>
        <h2 class="text-center">
          Register
        </h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            :rules="[rules.email]"
            v-model="form.email"
            label="Email"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            :rules="[rules.required, rules.username]"
            v-model="form.username"
            label="Username"
            prepend-icon="mdi-account"
          />
          <v-text-field
            :rules="[rules.min]"
            v-model="form.password"
            label="Password"
            type="password"
            prepend-icon="mdi-lock"
          />
          <v-text-field
            :rules="[rules.min, rules.passwordMatch]"
            v-model="form.repeatPassword"
            label="Repeat password"
            type="password"
            prepend-icon="mdi-lock"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <a @click="$emit('changeRegister')">Already got an account?</a>
        <v-spacer />
        <v-btn :disabled="!valid" @click="registerAccount" color="success">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.error ? 'error' : 'success'"
    >
      {{ snackbar.text }}
      <v-btn @click="snackbar.show = false" color="blue" text>
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match",
        passwordMatch: () =>
          this.form.password === this.form.repeatPassword ||
          "Passwords don't match",
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
  computed: {
    disableButton() {
      // console.log(this.rules)
      return false
    }
  },
  methods: {
    registerAccount() {
      this.$axios
        .$post(`${process.env.BASE_URL}/users/register`, {
          email: this.form.email,
          username: this.form.username,
          password: this.form.password
        })
        .then(res => {
          console.log(res.message)
          res.userExists
            ? (this.snackbar.error = true)
            : (this.snackbar.error = false)
          this.snackbar.text = res.message
          this.snackbar.show = true
        })
        .catch(err => {
          console.log(err)
        })
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
