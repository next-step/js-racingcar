import Events from '../Constants/Events.js'
import KeyBoard from '../Constants/KeyBoard.js'
import {
  CAR_LENGTH_VALIDATION_ERROR,
  GAME_COUNT_VALIDATION_ERROR,
} from '../Constants/Message.js'
import TagName from '../Constants/TagName.js'
import Component from '../Core/Component.js'
import { GET_CARS, SET_GAME_COUNT } from '../modules/actions.js'
import { getCars, setGameCount } from '../modules/creator.js'
import { store } from '../modules/store.js'
import { $ } from '../utils/dom.js'

const actionMap = {
  GET_CARS: (insertedCars) => {
    const cars = insertedCars.split(',')

    for (let i = 0; i < cars.length; i++) {
      if (!cars[i].length || cars[i].length > 5) {
        alert(CAR_LENGTH_VALIDATION_ERROR)
        return
      }
    }

    store.dispatch(getCars(cars))
  },

  SET_GAME_COUNT: (count) => {
    if (count <= 0) {
      alert(GAME_COUNT_VALIDATION_ERROR)
      return
    }

    store.dispatch(setGameCount(count))
  },
}

export default class RacingForm extends Component {
  constructor(target) {
    super(target)
  }

  setEvent(target) {
    this.inputEvent(target)
    this.buttonEvent(target)
  }

  inputEvent(target) {
    target.addEventListener(Events.KEY_DOWN, (event) => {
      if (event.target.tagName !== TagName.INPUT) return

      if (event.key !== KeyBoard.ENTER) return

      const action = event.target.dataset.action

      const value = event.target.value

      actionMap[action](value)

      event.stopImmediatePropagation()
    })
  }

  buttonEvent(target) {
    target.addEventListener(Events.CLICK, (event) => {
      if (event.target.tagName !== TagName.BUTTON) return
      const action = event.target.dataset.action

      const input = action === GET_CARS ? $('#cars') : $('#count')

      actionMap[action](input.value)

      event.stopImmediatePropagation()
    })
  }

  template() {
    const { cars, totalAttemps } = store.getState()

    const isCarSettings = !!cars.length
    const isCountSettings = totalAttemps >= 1

    return `
      <form onSubmit="return false">
        <fieldset>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <div class="d-flex">
            <input type="text" id="cars" class="w-100 mr-2" placeholder="자동차 이름" 
            data-action=${GET_CARS}  ${isCarSettings && 'disabled'} 
            value=${isCarSettings ? cars.join(',') : ''}>
            <button type="button" class="btn btn-cyan" 
            data-action=${GET_CARS} ${isCarSettings && 'disabled'}>확인</button>
          </div>
        </fieldset>
        ${
          isCarSettings
            ? `<fieldset>
              <p>시도할 횟수를 입력해주세요.</p>
              <div class='d-flex'>
                <input
                  type='number'
                  class='w-100 mr-2'
                  placeholder='시도 횟수'
                  data-action=${SET_GAME_COUNT}
                  id="count"
                  value=${isCountSettings ? totalAttemps : ''} ${
                isCountSettings && 'disabled'
              }
                />
                <button type='button' class='btn btn-cyan' data-action=${SET_GAME_COUNT}  ${
                isCountSettings && 'disabled'
              }>
                  확인
                </button>
              </div>
            </fieldset>`
            : ''
        }
      </form>
    `
  }
}
