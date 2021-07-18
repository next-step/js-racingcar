import RacingBoards from './Components/RacingBoards.js'
import RacingForm from './Components/RacingForm.js'
import RacingResults from './Components/RacingResults.js'
import { store } from './modules/store.js'
import { $ } from './utils/dom.js'

class App {
  constructor() {
    const $Form = $('#racing-form')
    const $Boards = $('#racing-boards')
    const $Results = $('#racing-results')

    store.subscribe(() => {
      new RacingForm($Form)
      new RacingBoards($Boards)
      new RacingResults($Results)
    })

    this.initStore()
  }

  initStore() {
    store.dispatch('dd')
  }
}

new App()
