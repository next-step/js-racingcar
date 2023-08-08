import { Observable } from '../utils/Observable'
import { PROMPT_MESSAGE } from '../constants/view'
import { ACTION_TYPE } from '../constants/viewModel'

export class PromptView extends Observable {
  constructor(prompt, viewModel) {
    super()
    this.prompt = prompt
    this.step = viewModel.getState().step
  }

  update({ step }) {
    switch (step) {
      case 1:
        this.renderStep1(this.prompt)
        break
      case 2:
        this.renderStep2(this.prompt)
        break
      case 3:
        this.renderStep3(this.prompt)
    }
  }

  renderStep1(prompt) {
    prompt.question(PROMPT_MESSAGE.QUESTION_CAR_NAMES, carNames => {
      this.notify({
        type: ACTION_TYPE.CHANGE_STEP,
        payload: { carNames, step: 2 }
      })
    })
  }

  renderStep2(prompt) {
    prompt.question(PROMPT_MESSAGE.QUESTION_MATCH_LENGTH, maxMatchLength => {
      this.notify({
        type: ACTION_TYPE.CHANGE_STEP,
        payload: { maxMatchLength, step: 3 }
      })
    })
  }

  renderStep3(prompt) {
    console.log(PROMPT_MESSAGE.INFO)
    prompt.prompt()

    prompt.on('line', line => {
      switch (line) {
        case ACTION_TYPE.START:
          this.notify({
            type: ACTION_TYPE.START
          })
          prompt.close()
          break
        case ACTION_TYPE.EXIT:
          prompt.close()
          break
        default:
          console.log(PROMPT_MESSAGE.INVALID_SCRIPT)
      }
    })
  }

  destroy() {
    this.unsubscribeAll()
  }
}
