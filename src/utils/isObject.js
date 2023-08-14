export const isObject = (object) => {
  if (typeof object !== 'object' || object === null) return false
  if (Array.isArray(object)) return false

  return true
}
