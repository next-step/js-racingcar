import Events from '../Constants/Events.js'
import Component from '../Core/Component.js'
import { MOVE_CARS, SET_MANUAL } from '../modules/actions.js'
import { moveCars, setManual } from '../modules/creator.js'
import { store } from '../modules/store.js'

export default class RacingManual extends Component {
  constructor(target) {
    super(target)
  }

  setEvent(target) {
    target.addEventListener(Events.CLICK, (event) => {
      const action = event.target.dataset.action

      if (action === SET_MANUAL) {
        this.dispatchManual()
      }

      if (action === MOVE_CARS) {
        const value = document.getElementById('random').value || 0

        this.dispatchMoveCars(value)
      }

      event.stopImmediatePropagation()
    })
  }

  dispatchMoveCars(random) {
    store.dispatch(moveCars(random))
  }

  dispatchManual() {
    store.dispatch(setManual())
  }

  template() {
    return `
      <div class="d-flex">
        <button type="button" class="btn btn-cyan p-110 mr-2" id="manual" data-action=${SET_MANUAL}>메뉴얼</button>
            <input type="text" id="random" class="w-100 mr-2" placeholder="랜덤값"  
            value=''>
            <button type="button" class="btn btn-cyan p-110" data-action=${MOVE_CARS} id="random_move" >확인</button>
        </div>
    `
  }
}
