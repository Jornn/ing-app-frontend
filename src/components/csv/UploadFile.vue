<template>
  <!-- <v-app> -->
  <div>
    <v-card class="mx-auto mt-5" width="500px">
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

      <v-select
        v-if="loggedIn"
        :items="uploadedFiles"
        label="Uploaded files"
        solo
      />

      <v-card-actions>
        <v-btn :disabled="!file" @click="loadCSV" class="mr-auto" color="info">
          Show uploaded CS
        </v-btn>
        <v-btn
          v-if="loggedIn"
          :disabled="!file"
          @click="uploadFile"
          class="ml-auto"
          color="success"
        >
          Upload file
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
  </div>
  <!-- </v-app> -->
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      file: null,
      sortOrders: {},
      sortKey: '',
      parse_csv: [],
      headers: [],
      search: '',
      snackbar: {
        show: false,
        text: '',
        error: false
      },
      uploadedFiles: []
    }
  },
  computed: {
    uploadEnabled() {
      return !this.file || !this.$store.state.users.loggedIn
    },
    loggedIn() {
      return this.$store.state.users.loggedIn
    }
  },
  beforeCreate() {
    if (!this.$store.state.users.loggedIn) {
      // this.$router.push('/signin')
    } else {
      this.$axios
        .get(`${process.env.BASE_URL}/files/get-uploaded-files`, {
          params: {
            userId: this.$store.state.users.userId
          }
        })
        .then(res => {
          console.log(res.data.uploadedFiles)
          this.uploadedFiles = res.data.uploadedFiles
        })
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
        console.log('No file reader')
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

        // console.log(line)
        const obj = {}
        const currentline = line.substr(1).split('","')

        headers.map(function(header, indexHeader) {
          if (indexHeader === 0) {
            // console.log(currentline[indexHeader])
            // eslint-disable-next-line quotes
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

      this.$axios
        .$post(`${process.env.BASE_URL}/files/upload`, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          if (res.success) {
            this.$axios.post(`${process.env.BASE_URL}/files/update-user-info`, {
              userId: this.$store.state.users.userId,
              fileName: this.file.name
            })
            this.snackbar.error = false
          } else {
            this.snackbar.error = true
          }
          this.loadCSV(this.file)
          this.snackbar.text = res.message
          this.snackbar.show = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
