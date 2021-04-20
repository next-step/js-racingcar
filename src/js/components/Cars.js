import { selector } from '../utils/util.js'
import { DELAY_TIME, MESSAGE, TEMPLATE } from '../utils/constant.js'
import Car from './Car.js'

class Cars {
  constructor ({ carNames, count }) {
    this.$parent = selector('#game-process-component')
    this.players = carNames
    this.count = count

    this.render()
  }

  render = () => {
    this.carList = this.players.map(({name}) => new Car(name))
    this.makeCarStatus()
  }

  makeTemplate = () => {
    return this.carList.reduce((html, car) => {
      html.appendChild(car.$el)
      return html
    }, TEMPLATE.CAR_BOARD_ELEMENT())
  }

  makeCarStatus = () => {
    this.$parent.insertAdjacentElement('beforeend',this.makeTemplate())
    this.timer(this.count)
  }

  showWinnerAlert = () => {
    setTimeout(() => alert(MESSAGE.WINNER_ALERT), DELAY_TIME.WINNER_TIME)
  }

  handleCarList = (fnc) => {
    this.carList.forEach((car) => car[fnc]())
  }

  timer (count) {
    if (count < 1) {
      this.handleCarList('clearSpinner')
      selector('#game-result-component').innerHTML = TEMPLATE.WINNER(this.carList)
      this.showWinnerAlert()
      return false
    } else {
      let startTime = new Date().getTime();
      const callback = ()  => {
        const currentTime = new Date().getTime();
        if (currentTime - 1000 > startTime) {
          count -= 1
          this.handleCarList('move')
          this.timer(count)
        } else {
          requestAnimationFrame(callback);
        }
      };
      requestAnimationFrame(callback);
    }
  }

}

export default Cars
