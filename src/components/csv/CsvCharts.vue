<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <bar-chart
              :dataCollection="getDataCollectionsPerMonth"
              :options="getOptionsBarChart"
            >
            </bar-chart>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <bar-chart
              :dataCollection="getDataCollectionsPerDay"
              :options="getOptionsBarChart"
            >
            </bar-chart>
          </v-card>
        </v-col>
        <!-- <v-col>
          <v-card width="500" class="mx-auto mt-4 mb-2">
            <v-card title="Info">
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
                <v-date-picker
                  :allowed-dates="getAllowedDates"
                  v-model="date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
              <v-card-text v-if="!!date"
                >Total spent on ({{ date }}): €{{ totalSpentDate }}</v-card-text
              >
              <v-card-text v-if="!!date"
                >Total received on ({{ date }}): €{{
                  totalReceivedDate
                }}</v-card-text
              >
            </v-card>
          </v-card>
        </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import BarChart from '@/components/csv/BarChart.vue'
import { onlyUnique } from '@/mixins/onlyUnique.js'
import { toFixed } from '@/mixins/toFixed.js'
import { months } from '@/assets/staticData/months'
import { barChartOptions } from '@/assets/staticData/barChartOptions'

export default {
  data() {
    return {
      date: '',
      menu: '',
      allowedDates: [],
      availableMonths: [],
      chartLabels: [],
      uniqueDates: []
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
  mixins: [onlyUnique, toFixed],
  components: {
    BarChart
  },
  computed: {
    totalReceivedDate() {
      let totalSpent = this.getAmountPerDate('Bij')
      return totalSpent.toFixed(2)
    },
    totalSpentDate() {
      let totalSpent = this.getAmountPerDate('Af')
      return totalSpent.toFixed(2)
    },
    getDataCollectionsPerMonth() {
      let totalCreditPerMonth = []
      let totalDebetPerMonth = []

      this.file.forEach(row => {
        let monthNumber = this.getMonthNumber(row['Datum'])
        totalCreditPerMonth[Number(monthNumber) - 1] = 0
        totalDebetPerMonth[Number(monthNumber) - 1] = 0
      })

      this.file.forEach(row => {
        let monthNumber = this.getMonthNumber(row['Datum'])
        if (row['Af Bij'] === 'Bij') {
          totalCreditPerMonth[Number(monthNumber) - 1] += parseFloat(
            row['Bedrag (EUR)']
          )
        } else {
          totalDebetPerMonth[Number(monthNumber) - 1] += parseFloat(
            row['Bedrag (EUR)']
          )
        }
      })

      totalCreditPerMonth = this.toFixed(totalCreditPerMonth)
      totalDebetPerMonth = this.toFixed(totalDebetPerMonth)

      totalCreditPerMonth = this.filterEmptyValue(totalCreditPerMonth)
      totalDebetPerMonth = this.filterEmptyValue(totalDebetPerMonth)

      return {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Inkomsten (€)',
            backgroundColor: '#114f17',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: totalCreditPerMonth
          },
          {
            label: 'Uitgaven (€)',
            backgroundColor: '#5c1010',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: totalDebetPerMonth
          }
        ]
      }
    },
    getDataCollectionsPerDay() {
      let totalCreditPerDay = []
      let totalDebetPerDay = []
      let totalPerDay = []

      for (let x = 0; x < this.uniqueDates.length; x++) {
        totalCreditPerDay[x] = 0
        totalDebetPerDay[x] = 0
        totalPerDay[x] = 0
      }

      this.uniqueDates.forEach(date => {
        this.file.forEach(row => {
          if (row['Datum'] === date) {
            if (row['Af Bij'] === 'Bij') {
              totalCreditPerDay[this.uniqueDates.indexOf(date)] += parseFloat(
                row['Bedrag (EUR)']
              )
            } else {
              totalDebetPerDay[this.uniqueDates.indexOf(date)] += parseFloat(
                row['Bedrag (EUR)']
              )
            }
          }
        })
      })

      for (let y = 0; y < totalCreditPerDay.length; y++) {
        totalPerDay[y] = Number(totalCreditPerDay[y] - totalDebetPerDay[y])
      }
      totalPerDay = this.toFixed(totalPerDay)

      let backgroundColors = totalPerDay.map(value =>
        value < 0 ? '#5c1010' : '#114f17'
      )

      return {
        labels: this.uniqueDates,
        datasets: [
          {
            label: 'In / Uit per dag (€)',
            backgroundColor: backgroundColors,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: totalPerDay
          }
        ]
      }
    },
    getOptionsBarChart() {
      return barChartOptions
    }
  },
  created() {
    this.file.forEach(row => {
      if (row['Datum']) {
        this.allowedDates.push(row['Datum'])
      }
    })
    this.date = this.allowedDates[this.allowedDates.length - 1]
    ///////////////////////////////////
    for (let x = 0; x <= 12; x++) {
      this.allowedDates.forEach(el => {
        let monthNumber = this.getMonthNumber(el)
        if (x + 1 == monthNumber) {
          this.chartLabels.push(months[x])
        }
      })
    }
    this.chartLabels = this.chartLabels.filter(this.onlyUnique)
    this.uniqueDates = this.allowedDates.filter(this.onlyUnique)
  },
  methods: {
    getAllowedDates(val) {
      if (this.allowedDates.indexOf(val) !== -1) {
        return true
      } else {
        return false
      }
    },
    filterEmptyValue(arr) {
      return arr.filter(el => {
        return el != null
      })
    },
    getMonthNumber(date) {
      let monthNumber = date.match(/-(\d)(\d)-/)
      let currentMonth
      if (monthNumber[1] >= 1) {
        currentMonth = monthNumber[1] + monthNumber[2]
      } else {
        currentMonth = monthNumber[2]
      }
      return currentMonth
    },
    getAmountPerDate(DebetOrCredit) {
      let total = 0
      this.file.forEach(row => {
        if (row['Af Bij'] === DebetOrCredit) {
          let x = moment(row['Datum']).format('YYYY-MM-DD')
          let y = moment(this.date).format('YYYY-MM-DD')
          if (x === y) {
            total += parseFloat(row['Bedrag (EUR)'])
          }
        }
      })
      return total
    }
  }
}
</script>

<style lang="scss" scoped>
//
</style>
