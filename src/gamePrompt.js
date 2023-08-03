import { createInterface } from 'readline'

export const gamePrompt = createInterface({
  input: process.stdin,
  output: process.stdout
})

export const gameStart = async () => {
  return new Promise(res => {
    gamePrompt.question(`경주할 자동차 이름을 입력하세요. \n`, carNames => {
      res(carNames)
    })
  })
}

export const gameEnd = () => {
  gamePrompt.close()
}
