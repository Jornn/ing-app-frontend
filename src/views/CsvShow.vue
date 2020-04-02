<template>
  <div>
    <csv-table :headers="headers" :items="file" class="csv-table" />
  </div>
</template>

<script>
import CsvTable from '../components/csv/CsvTable'
import { parseCsvMixin } from '@/mixins/parseCsvMixin'
export default {
  components: {
    CsvTable
  },
  mixins: [parseCsvMixin],
  beforeRouteEnter(to, from, next) {
    next()
  },
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
