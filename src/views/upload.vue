<template>
  <div>
    <upload-file :files="files" @loadCsv="loadCsv" />
    <csv-table :headers="headers" :items="csv" class="csv-table" />
    <diagram />
  </div>
</template>

<script>
import UploadFile from '../components/csv/UploadFile'
import CsvTable from '../components/csv/CsvTable'
import Diagram from '../components/csv/Diagram'

export default {
  components: {
    UploadFile,
    CsvTable,
    Diagram
  },
  props: {
    files: {
      type: Array
    }
  },
  data() {
    return {
      csv: [],
      headers: []
    }
  },
  methods: {
    loadCsv(data) {
      this.csv = data.csv
      this.headers = data.headers
    }
  }
}
</script>

<style>
.csv-table {
  margin-top: 50px;
}
</style>
