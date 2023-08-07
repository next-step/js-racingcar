import { Observable } from '../utils/Observable'

export class PromptView extends Observable {
  constructor() {
    super()
  }

  render(prompt) {
    prompt.question(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      carNames => {
        prompt.question('시도할 회수는 몇회인가요?\n', maxMatchLength => {
          this.notify({ type: 'ready', state: { carNames, maxMatchLength } })

          console.log('시작하려면 start를, 종료하려면 exit를 입력하세요.')
          prompt.prompt()

          prompt.on('line', line => {
            switch (line) {
              case 'start':
                this.notify({ type: 'start' })
                break
              case 'exit':
                prompt.close()
                break
              default:
                console.log('지원하지 않는 명령어 입니다!')
            }

            prompt.close()
          })
        })
      }
    )
  }

  destroy() {
    this.unsubscribeAll()
  }
}
