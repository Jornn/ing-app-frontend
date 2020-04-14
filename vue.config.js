module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'test') {
      const sassRule = config.module.rule('sass')
      sassRule.uses.clear()
      sassRule.use('null-loader').loader('null-loader')
    }
  },
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
