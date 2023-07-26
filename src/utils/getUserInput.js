import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export async function getUserInput() {
  const rl = readline.createInterface({ input, output })

  const userInput = await rl.question(
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
  )
  rl.close()
  return userInput
}
