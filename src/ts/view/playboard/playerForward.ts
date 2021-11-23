import { View } from '../../viewConstructor.js'
import el from '../../util/dom.js'

export default class PlayerForward extends View {
  static #template = `<div class="forward-icon mt-2">⬇️️</div>`

  constructor() {
    super()
    el(this, [PlayerForward.#template])
  }
}
