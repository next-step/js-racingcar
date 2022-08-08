const addEvent = (type, selector, handler) => {
  const $el = document.querySelectorAll(selector)
  Array.from($el).forEach((el) => el.addEventListener(type, handler))
}

export default addEvent
