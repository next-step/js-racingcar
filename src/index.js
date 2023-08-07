import { Model } from './domain/model/Model'
import { ViewModel } from './domain/viewModel/ViewModel'
import { View } from './view/View'
import { gamePrompt } from './utils/gamePrompt'

class App {
  constructor() {
    this.model = new Model()
    this.viewModel = new ViewModel(this.model)
    this.view = new View(gamePrompt, this.viewModel)

    gamePrompt.on('close', () => {
      this.destroy()
      process.exit()
    })
  }

  destroy() {
    this.viewModel.destroy()
    this.model.destroy()
    this.view.destroy()
  }
}

new App()
