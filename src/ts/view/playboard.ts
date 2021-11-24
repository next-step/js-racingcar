import el from '../util/dom.js'
import View from './constructor.js'
import { State } from '../store/index.js'
import Player from './player/index.js'

type WatchState = Pick<State, 'cars'>

export default class Playboard extends View {
  constructor() {
    super()
    this.className = 'mt-4 d-flex'
  }

  watch = ({ cars }: State): WatchState => ({ cars })

  onStoreUpdated({ cars }: WatchState) {
    if (!cars.length) this.hide()
    else {
      const $entries = cars.length
        ? (cars.map((name, i) => el(`<racingcar-player name=${name} index=${i}>`)) as Player[])
        : []
      el(this, $entries)
      this.show()
    }
  }
}
