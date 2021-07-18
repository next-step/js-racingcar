import Events from '../Constants/Events.js'
import { Congratulation } from '../Constants/Message.js'
import Component from '../Core/Component.js'
import { SET_MANUAL } from '../modules/actions.js'
import { displayWinners, moveCars, setManual } from '../modules/creator.js'
import { store } from '../modules/store.js'
import { getRandomInt } from '../utils/random.js'

export default class RacingBoards extends Component {
  constructor(target) {
    super(target)
  }

  setEvent(target) {}

  dispatchMoveCars() {
    setTimeout(() => {
      store.dispatch(moveCars())
    }, 1000)
  }

  template() {
    const { cars, totalAttemps, remainAttemps, manual } = store.getState()

    const gameEnded = remainAttemps === 0

    if (totalAttemps <= 0) return ''

    if (!manual) {
      if (remainAttemps > 0) {
        this.dispatchMoveCars()
      }
    }

    if (gameEnded) {
      const max = Math.max(...cars.map((car) => car.move))
      const gameWinners = cars
        .filter((car) => car.move === max)
        .map((car) => car.name)

      store.dispatch(displayWinners(gameWinners))

      setTimeout(() => {
        alert(Congratulation)
      }, 2000)
    }

    return `
    <div class="mt-4 d-flex" id="board">
        ${cars
          .map(({ name, move }) => {
            const $DOWNS = []
            for (let i = 0; i < move; i++) {
              $DOWNS.push(`<div class="forward-icon mt-2">⬇️️</div>`)
            }

            return `
                <div class="mr-2">
                    <div class="car-player">${name}</div>
                    ${$DOWNS.join('')}
                    ${
                      gameEnded
                        ? ''
                        : `
                          <div class="d-flex justify-center mt-3">
                              <div class="relative spinner-container">
                                  <span class="material spinner"></span>
                              </div>
                          </div>
                        `
                    }
                    
                </div>
                `
          })
          .join('')}
        </div>
    `
  }
}
