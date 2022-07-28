const math = require('mathjs')

const calc = (formula: string) =>
  math.format(math.evaluate(formula), { precision: 16, upperExp: 16 })

export { calc }
