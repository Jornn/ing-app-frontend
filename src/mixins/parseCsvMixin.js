import moment from 'moment'

export const parseCsvMixin = {
  methods: {
    loadCSV(file) {
      return this.csvJSON(file)
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

      this.formatData(result)

      return result // JavaScript object
    },
    formatData(data) {
      data.forEach(row => {
        row['Bedrag (EUR)'] = row['Bedrag (EUR)'].replace(',', '.')
        row['Datum'] = moment(row['Datum'], 'DD-MM-YYYY').format('YYYY-MM-DD')
      })
    }
  }
}
