import { Observable } from '../utils/Observable'
import { PROMPT_MESSAGE } from '../constants/view'
import { ACTION_TYPE } from '../constants/viewModel'

export class PromptView extends Observable {
  constructor() {
    super()
  }

  render(prompt) {
    prompt.question(PROMPT_MESSAGE.QUESTION_CAR_NAMES, carNames => {
      prompt.question(PROMPT_MESSAGE.QUESTION_MATCH_LENGTH, maxMatchLength => {
        this.notify({
          type: ACTION_TYPE.READY,
          state: { carNames, maxMatchLength }
        })

        console.log(PROMPT_MESSAGE.INFO)
        prompt.prompt()

        prompt.on('line', line => {
          switch (line) {
            case ACTION_TYPE.START:
              this.notify({ type: ACTION_TYPE.START })
              prompt.close()
              break
            case ACTION_TYPE.EXIT:
              prompt.close()
              break
            default:
              console.log(PROMPT_MESSAGE.INVALID_SCRIPT)
          }
        })
      })
    })
  }

  destroy() {
    this.unsubscribeAll()
  }
}
