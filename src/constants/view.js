import { ACTION_TYPE } from './viewModel'

export const PROMPT_MESSAGE = {
  QUESTION_CAR_NAMES:
    '\n경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
  QUESTION_MATCH_LENGTH: '\n시도할 회수는 몇회인가요?\n',
  INFO: `\n시작하려면 ${ACTION_TYPE.START}를, 종료하려면 ${ACTION_TYPE.EXIT}를 입력하세요.`,
  INVALID_SCRIPT: '지원하지 않는 명령어 입니다!'
}
