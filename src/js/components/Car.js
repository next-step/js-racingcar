import { selector } from '../utils/util.js'
import { MOVE_POSSIBLE_NUMBER, TEMPLATE } from '../utils/constant.js'

class Car {
  constructor (name) {
    this.name = name
    this.count = 0
    this.$el = TEMPLATE.CAR_ELEMENT(this.name)
  }

  _makeRandomNum = () => {
    return Math.floor(Math.random() * 10)
  }

  _insertMoveElement = () => {
    selector(`.car-player`, this.$el).insertAdjacentHTML('afterend', TEMPLATE.CAR_MOVE)
  }

  clearSpinner = () => {
    this.$el.removeChild(this.$el.lastElementChild)
  }

  move = () => {
    if (this._makeRandomNum() > MOVE_POSSIBLE_NUMBER) {
      this.count += 1
      this._insertMoveElement()
    }
    return false
  }

}

export default Car
