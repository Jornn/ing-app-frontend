<template>
  <div>
    <csv-table :headers="headers" :items="csv" class="csv-table" />
  </div>
</template>

<script>
import CsvTable from '../components/csv/CsvTable'

export default {
  components: {
    CsvTable,
  },
  data() {
    return {
      csv: [],
      headers: [],
      cardWidth: 500
    }
  }
}
</script>

<style>
.csv-table {
  margin-top: 50px;
}
</style>
