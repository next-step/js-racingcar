export const Component = {
  fragment: document.createDocumentFragment(),
  create(component) {
    this.fragment.textContent = component
    return this.fragment.textContent
  },
}

export const render = (target, component) => {
  target.innerHTML += component
  return {
    init() {

    }
  }
}



