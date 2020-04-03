<template>
  <div>
    <csv-table :headers="headers" :items="file" class="csv-table" />
    <csv-charts :file="file" :headers="headers"></csv-charts>
  </div>
</template>

<script>
import CsvTable from '../components/csv/CsvTable'
import { parseCsvMixin } from '@/mixins/parseCsvMixin'
import CsvCharts from '@/components/csv/CsvCharts.vue'
export default {
  components: {
    CsvTable,
    CsvCharts
  },
  mixins: [parseCsvMixin],
  created() {
    this.file = this.loadCSV(this.csv)
  },
  props: {
    csv: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [],
      cardWidth: 500,
      file: []
    }
  }
}
</script>

<style>
.csv-table {
  margin-top: 50px;
}
</style>
