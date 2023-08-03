import { RacingCarGame } from './racingCarGame'
import { gamePrompt } from './gamePrompt'

const racingCarGameApp = new RacingCarGame()

gamePrompt.question(`경주할 자동차 이름을 입력하세요. \n`, carNames => {
  racingCarGameApp.start(carNames)
  gamePrompt.close()
})
