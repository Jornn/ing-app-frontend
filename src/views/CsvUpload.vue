<template>
  <div>
    <upload-file :width="cardWidth" @loadCsv="loadCsv" />
    <file-list :width="cardWidth"></file-list>
    <!-- <csv-table :headers="headers" :items="csv" class="csv-table" /> -->
  </div>
</template>

<script>
import UploadFile from '../components/csv/UploadFile'
// import CsvTable from '../components/csv/CsvTable'
import FileList from '@/components/csv/FileList.vue'

export default {
  components: {
    UploadFile,
    // CsvTable,
    FileList
    // Diagram
  },
  data() {
    return {
      csv: [],
      headers: [],
      cardWidth: 500
      // files: []
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
