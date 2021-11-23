import el from '../../util/dom.js'
import { View } from '../../viewConstructor.js'
import Actions from '../../store/action.js'
import { PartialState, State } from '../../store/index.js'
import Player from './player.js'

export default class Playboard extends View {
  static #template = `<div class="mt-4 d-flex">`

  $container

  constructor() {
    super()
    this.$container = el(Playboard.#template)
    el(this, [this.$container])
  }

  watch = ({ cars }: State) => ({ cars })

  onStoreUpdated({ cars }: PartialState) {
    const $entries = cars?.length
      ? (cars.map((name, i) => el(`<car-player name=${name} index=${i} >`)) as Player[])
      : []
    el(this.$container, $entries)
  }
}
