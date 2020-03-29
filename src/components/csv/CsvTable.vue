<template>
  <div class="csv-table">
    <v-card>
      <v-card-title>
        Statement
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        class="csv-table"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
