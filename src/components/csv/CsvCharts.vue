<template>
  <div>
    <v-card width="500" class="mx-auto mt-4">
      <v-card title="Info">
        <v-card-text>Total spent: {{ totalSpentFixed }}</v-card-text>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
        <v-card-text v-if="!!date"
          >Total spent on ({{ date }}): {{ totalSpentDate }}</v-card-text
        >
        <v-card-text v-if="!!date"
          >Total received on ({{ date }}): {{ totalReceivedDate }}</v-card-text
        >
      </v-card>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      date: '',
      menu: ''
    }
  },
  props: {
    file: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalSpentDate() {
      let totalSpent = 0
      this.file.forEach(row => {
        if (row['Af Bij'] === 'Af') {
          let x = moment(row['Datum']).format('YYYY-MM-DD')
          let y = moment(this.date).format('YYYY-MM-DD')
          if (x === y) {
            totalSpent += parseFloat(row['Bedrag (EUR)'])
          }
        }
      })
      return totalSpent.toFixed(2)
    },
    totalReceivedDate() {
      let totalSpent = 0
      this.file.forEach(row => {
        if (row['Af Bij'] === 'Bij') {
          let x = moment(row['Datum']).format('YYYY-MM-DD')
          let y = moment(this.date).format('YYYY-MM-DD')
          if (x === y) {
            totalSpent += parseFloat(row['Bedrag (EUR)'])
          }
        }
      })
      return totalSpent.toFixed(2)
    },
    totalSpentFixed() {
      let totalSpent = 0
      this.file.forEach(row => {
        if (row['Af Bij'] === 'Af') {
          totalSpent += parseFloat(row['Bedrag (EUR)'])
        }
      })
      return totalSpent.toFixed(2)
    }
  },
  methods: {
    test() {
      console.log(this.headers)
      this.file.forEach(row => {
        if (row[''])
          if (row['Af Bij'] === 'Af') {
            this.totalSpent += parseFloat(row['Bedrag (EUR)'])
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
