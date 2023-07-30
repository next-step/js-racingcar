export const isString = str =>
  Object.prototype.toString.call(str) === '[object String]'

export const isFunction = fn =>
  Object.prototype.toString.call(fn) === '[object Function]'

export const isNumber = num =>
  Object.prototype.toString.call(num) === '[object Number]'
