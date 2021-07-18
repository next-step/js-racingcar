import RacingForm from './Components/RacingForm.js'
import { store } from './modules/store.js'
import { $ } from './utils/dom.js'

class App {
  constructor() {
    const $Form = $('#racing-form')
    console.log('hi')

    store.subscribe(() => {
      console.log('hi')
      new RacingForm($Form)
    })

    this.initStore()
  }

  initStore() {
    store.dispatch('dd')
  }
}

new App()
