import { RACING_CAR_LIST } from '../constants/racingCarList'

export class Race {
  #state

  constructor({ maxMatchLength, runCondition, participants }) {
    this.#state = {
      match: 0,
      maxMatchLength:
        maxMatchLength || RACING_CAR_LIST.DEFAULT_MAX_MATCH_LENGTH,
      runCondition: runCondition || RACING_CAR_LIST.DEFAULT_RUN_CONDITION,
      participants: participants || []
    }
  }

  startRound() {
    this.participants.filter(this.runCondition).forEach(participant => {
      participant.run()
    })
  }

  get match() {
    return this.#state.match
  }
  set match(_) {
    console.log('직접 접근할 수 없습니다.')
  }

  get maxMatchLength() {
    return this.#state.maxMatchLength
  }
  set maxMatchLength(_) {
    console.log('직접 접근할 수 없습니다.')
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
