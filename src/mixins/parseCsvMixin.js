import moment from 'moment'

export const parseCsvMixin = {
  methods: {
    returnHeaders(file) {
      return file[0]
    },
    loadCSV(file) {
      // if (window.FileReader) {
      //   const reader = new FileReader()
      //   reader.readAsText(file)
      //   reader.onload = event => {
      //     const csv = event.target.result
      return this.csvJSON(file)
      // this.$emit('loadCsv', { csv: this.parse_csv, headers: this.headers })
      //   }
      // } else {
      //   this.$store.dispatch('notifcation/addNotification', {
      //     message:
      //       "Your browser doesn't have a filereader, please try another browser",
      //     type: 'error'
      //   })
      // }
    },
    csvJSON(lines) {
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
      // lines[0].split(',').forEach(key => {
      //   this.sortOrders[key] = 1
      // })

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
    sortBy(key) {
      const vm = this
      vm.sortKey = key
      vm.sortOrders[key] = vm.sortOrders[key] * -1
    }
  }
}
