import { MUTATION_TYPE } from '../constants/viewModel'
import { ConsoleView } from './ConsoleView'
import { PromptView } from './PromptView'

export class View {
  constructor(gamePrompt, viewModel) {
    this.viewModel = viewModel
    this.gamePrompt = gamePrompt

    this.consoleView = new ConsoleView()
    this.promptView = new PromptView(gamePrompt, viewModel)

    this.viewModel.subscribe(this.update.bind(this))
    this.promptView.subscribe(viewModel.handleAction.bind(viewModel))

    this.update(viewModel.getState())
  }

  update({ type, ...state }) {
    switch (type) {
      case MUTATION_TYPE.CAR_LIST:
        this.consoleView.renderCarList(state)
        break
      case MUTATION_TYPE.WINNER_LIST:
        this.consoleView.renderWinnerList(state)
        break
      case MUTATION_TYPE.ERROR:
        this.consoleView.renderError(state)
        this.promptView.update(state)
        break
      default:
        this.promptView.update(state)
        break
    }
  }

  destroy() {
    this.promptView.destroy()
  }
}
