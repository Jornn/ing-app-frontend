export const toFixed = {
  methods: {
    toFixed(array) {
      let fixedArray = []
      array.forEach((el, index) => {
        fixedArray[index] = el.toFixed(2)
      })
      return fixedArray
    }
  }
}
