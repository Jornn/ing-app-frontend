<script>
import { Bar } from 'vue-chartjs'
export default {
  props: {
    dataCollection: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  extends: Bar,
  mounted() {
    this.renderChart(this.dataCollection, this.options)
  }
}
</script>
