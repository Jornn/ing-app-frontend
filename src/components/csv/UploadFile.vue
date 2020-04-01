<template>
  <div>
    <v-card class="mx-auto mt-5" :width="width">
      <v-card-title>
        <h2>Select a file</h2>
      </v-card-title>
      <v-file-input
        v-model="file"
        class="mr-4 ml-1 file-input"
        outlined
        label="Select file"
        color="blue accent-4"
      >
        <template v-slot:selection="{ text }">
          <v-chip color="blue accent-4" dark label small>
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>

      <v-card-actions>
        <v-btn
          :width="width - 15"
          :disabled="!file"
          @click="uploadFile"
          class="mx-auto"
          color="success"
        >
          Upload file
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    width: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      file: null,
      sortOrders: {},
      sortKey: '',
      parse_csv: [],
      headers: [],
      search: ''
    }
  },
  methods: {
    sortBy(key) {
      const vm = this
      vm.sortKey = key
      vm.sortOrders[key] = vm.sortOrders[key] * -1
    },
    loadCSV() {
      if (window.FileReader) {
        const reader = new FileReader()
        reader.readAsText(this.file)
        reader.onload = event => {
          const csv = event.target.result
          this.parse_csv = this.csvJSON(csv)
          this.$emit('loadCsv', { csv: this.parse_csv, headers: this.headers })
        }
      } else {
        this.$store.dispatch('notifcation/addNotification', {
          message:
            "Your browser doesn't have a filereader, please try another browser",
          type: 'error'
        })
      }
    },

    csvJSON(csv) {
      const lines = csv.split('\n')

      const result = []

      const headers = lines[0]
        .toString()
        .replace(/"/g, '')
        .split(',')
      headers.forEach((header, index) => {
        if (index === 0) {
          this.headers.push({ text: header, value: header, width: '8%' })
        } else {
          this.headers.push({ text: header, value: header })
        }
      })
      // console.log(this.headers)
      this.parse_header = lines[0].split(',')
      lines[0].split(',').forEach(key => {
        this.sortOrders[key] = 1
      })

      lines.map(function(line, indexLine) {
        if (indexLine < 1) {
          return
        } // Jump header line

        const obj = {}
        const currentline = line.substr(1).split('","')

        headers.map(function(header, indexHeader) {
          if (indexHeader === 0) {
            obj[header] = moment(currentline[indexHeader]).format('DD-MM-YYYY')
          } else {
            obj[header] = currentline[indexHeader]
          }
        })

        result.push(obj)
      })

      result.pop() // remove the last item because undefined values
      return result // JavaScript object
    },

    uploadFile() {
      const formData = new FormData()
      formData.append('file', this.file)

      this.$store.dispatch('csvFiles/uploadFile', formData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
