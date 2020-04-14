<template>
  <div>
    <v-card class="mx-auto mt-5" :width="width">
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

      <v-card-actions>
        <v-btn
          :width="width - 15"
          :disabled="!file"
          @click="uploadFile"
          class="mx-auto"
          color="success"
        >
          Upload file
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      file: null
    }
  },
  methods: {
    uploadFile() {
      const formData = new FormData()
      formData.append('file', this.file)
      this.$store.dispatch('csvFiles/uploadFile', {
        formData,
        fileName: this.file.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//
</style>
