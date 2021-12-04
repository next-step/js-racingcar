type ElementTypes = HTMLInputElement | HTMLButtonElement | HTMLElement

interface ViewProps<T extends ElementTypes> {
  root: T
}

export class View<T extends ElementTypes> {
  root: T

  constructor({ root }: ViewProps<T>) {
    this.root = root
  }

  reset() {}
}
