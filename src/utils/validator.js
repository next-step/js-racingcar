export const isString = str => typeof str === 'string'

export const isFunction = fn => typeof fn === 'function'

export const isNumber = num =>
  !isNaN(num) && isFinite(num) && typeof num === 'number'
