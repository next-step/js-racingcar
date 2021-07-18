import { Congratulation } from '../Constants/Message.js'
import Component from '../Core/Component.js'
import { displayWinners, moveCars } from '../modules/creator.js'
import { store } from '../modules/store.js'

export default class RacingBoards extends Component {
  constructor(target) {
    super(target)
  }

  setEvent(target) {}

  template() {
    const { cars, totalAttemps, remainAttemps, winners } = store.getState()

    const gameEnded = remainAttemps === 0

    if (totalAttemps <= 0) return ''

    if (remainAttemps > 0) {
      setTimeout(() => {
        store.dispatch(moveCars())
      }, 1000)
    }

    if (gameEnded) {
      console.log(cars.map((car) => car.move))
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
        <div class="mt-4 d-flex">
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
