module.exports = {
  transpileDependencies: ['vuetify'],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.sass"` // empty file
      },
      scss: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  }
}
