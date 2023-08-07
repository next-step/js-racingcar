import { MUTATION_TYPE } from '../constants/viewModel'
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
      case MUTATION_TYPE.CAR_LIST:
        this.consoleView.renderCarList(state)
        break
      case MUTATION_TYPE.WINNER_LIST:
        this.consoleView.renderWinnerList(state)
        break
    }
  }

  destroy() {
    this.promptView.destroy()
  }
}
