import Events from '../Constants/Events.js'
import Component from '../Core/Component.js'
import { RESET_GAME } from '../modules/actions.js'
import { resetGame } from '../modules/creator.js'
import { store } from '../modules/store.js'

export default class RacingResults extends Component {
  constructor(target) {
    super(target)
  }

  setEvent(target) {
    target.addEventListener(Events.CLICK, (event) => {
      const action = event.target.dataset.action

      if (action !== RESET_GAME) return

      store.dispatch(resetGame())
      event.stopImmediatePropagation()
    })
  }

  template() {
    const { winners } = store.getState()

    if (winners.length <= 0) return ''

    return `
        <div>
            <h2>🏆 최종 우승자: ${winners.join(', ')} 🏆</h2>
            <div class="d-flex justify-center">
                <button type="button" class="btn btn-cyan" data-action=${RESET_GAME}>다시 시작하기</button>
            </div>
        </div>
    `
  }
}
