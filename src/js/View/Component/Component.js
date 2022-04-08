export const Component = {
  fragment: document.createDocumentFragment(),
  create(component) {
    this.fragment.textContent = component;
    return this.fragment.textContent;
  },

  combine(target, componentToMerge) {
    target += componentToMerge;
  },
};

// TODO
// FIXME
export const render = (target, component) => {
  target.innerHTML += component;
};
