export class GameController {
  constructor(view, model) {
    this.view = view
    this.model = model
  }

  runGame() {
    const userInput = this.view.getUserInput()
    const result = this.model.run(userInput)
    this.view.printResult(result)
  }
}
