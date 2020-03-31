<template>
  <v-container class="text-center">
    <slot name="text"></slot>
    <v-btn
      @click="$emit('changeRegister')"
      class="btn ml-1"
      :width="width"
      :height="height"
      :color="color"
      ><slot name="buttonText"></slot
    ></v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    color: {
      type: String
    }
  }
}
</script>

<style lang="scss"></style>
