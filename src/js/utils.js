export const $ = function (selector) {
  return document.querySelector(selector)
}

export const fireError = function (message) {
  console.error(message)
  window.alert(message)
}
