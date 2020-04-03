<template>
  <div>
    <upload-file :width="cardWidth" />
    <file-list :width="cardWidth"></file-list>
  </div>
</template>

<script>
import UploadFile from '../components/csv/UploadFile'
import FileList from '@/components/csv/FileList.vue'

export default {
  components: {
    UploadFile,
    FileList
  },
  data() {
    return {
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
