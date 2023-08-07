import { ConsoleView } from './ConsoleView'
import { PromptView } from './PromptView'

export class View {
  constructor(gamePrompt, viewModel) {
    this.viewModel = viewModel
    this.consoleView = new ConsoleView()
    this.promptView = new PromptView()

    this.viewModel.subscribe(this.update.bind(this))
    this.promptView.subscribe(viewModel.handleAction.bind(viewModel))

    this.promptView.render(gamePrompt)
  }

  update({ type, ...state }) {
    switch (type) {
      case 'updateCarList':
        this.consoleView.renderCarList(state)
        break
      case 'updateWinnerList':
        this.consoleView.renderWinnerList(state)
        break
    }
  }

  destroy() {
    this.promptView.destroy()
  }
}
