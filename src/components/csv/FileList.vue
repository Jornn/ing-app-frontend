<template>
  <div>
    <v-card v-if="checkFiles" :width="width" class="mx-auto mt-4">
      <v-card-title>
        <h1>Uploaded files</h1>
      </v-card-title>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="file in files"
            :key="file._id"
            :to="getPath(file)"
          >
            <!-- <v-list-icon> -->
            <v-icon>description</v-icon>
            <!-- </v-list-icon> -->
            <v-list-item-content>
              <v-list-item-title v-text="file"> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    width: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState('csvFiles', ['files']),
    ...mapGetters('csvFiles', ['checkFiles'])
  },
  methods: {
    getPath(file) {
      return `/show/${file}`
    }
  }
}
</script>

<style lang="scss" scoped>
//
</style>
