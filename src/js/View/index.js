export const Component = {
  fragment: document.createDocumentFragment(),
  create(component) {
    this.fragment.textContent = component
    return this.fragment.textContent
  },

  combine(target, componentToMerge) {
    console.log(target, componentToMerge)
    target += componentToMerge
  }
}


export const render = (target, component) => {
  target.innerHTML += component
}



