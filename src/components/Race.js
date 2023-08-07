import { RACING_CAR_LIST } from '../constants/racingCarList'

export class Race {
  #state

  constructor({ runCondition, participants }) {
    this.#state = {
      runCondition: runCondition || RACING_CAR_LIST.DEFAULT_RUN_CONDITION,
      participants: participants || []
    }
  }

  startRound() {
    this.participants.filter(this.runCondition).forEach(participant => {
      participant.run()
    })
  }

  get runCondition() {
    return this.#state.runCondition
  }
  set runCondition(_) {
    console.log('직접 접근할 수 없습니다.')
  }

  get participants() {
    return this.#state.participants
  }
  set participants(_) {
    console.log('직접 접근할 수 없습니다.')
  }
}
