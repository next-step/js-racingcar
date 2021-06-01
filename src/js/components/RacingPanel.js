import { selector } from '../utils/util.js'
import { DELAY_TIME, MESSAGE, TEMPLATE } from '../utils/constant.js'
import Car from './Car.js'

class RacingPanel {
  constructor ({ carNames, count }) {
    this.$parent = selector('#game-process-component')
    this.players = carNames
    this.count = count

    this._render()
  }

  _render = () => {
    this.carList = this.players.map(({ name }) => new Car(name))
    this._makeCarStatus()
  }

  _makeTemplate = () => {
    return this.carList.reduce((html, car) => {
      html.appendChild(car.$el)
      return html
    }, TEMPLATE.CAR_BOARD_ELEMENT())
  }

  _makeCarStatus = () => {
    this.$parent.insertAdjacentElement('beforeend', this._makeTemplate())
    this._timer(this.count)
  }

  _showWinnerAlert = () => {
    setTimeout(() => alert(MESSAGE.WINNER_ALERT), DELAY_TIME.WINNER_TIME)
  }

  _handleCarList = (fnc) => {
    this.carList.forEach((car) => car[fnc]())
  }

  _playGame = (count) => {
    let startTime = new Date().getTime()
    const callback = () => {
      const currentTime = new Date().getTime()
      if (currentTime - 1000 > startTime) {
        count -= 1
        this._handleCarList('move')
        this._timer(count)
      } else {
        requestAnimationFrame(callback)
      }
    }
    requestAnimationFrame(callback)
  }

  _endGame = () => {
    this._handleCarList('clearSpinner')
    selector('#game-result-component').innerHTML = TEMPLATE.WINNER(this.carList)
    this._showWinnerAlert()
    return false
  }

  _timer (count) {
    if (count < 1) return this._endGame()

    this._playGame(count)
  }
}

export default RacingPanel
