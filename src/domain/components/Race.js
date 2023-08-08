import { RACE, RACE_ERROR_MESSAGE } from '../../constants/components/race'

export class Race {
  #state

  constructor({ runCondition, participants }) {
    this.#state = {
      runCondition: runCondition || RACE.DEFAULT_RUN_CONDITION,
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
    console.log(RACE_ERROR_MESSAGE.NOT_ASSIGN_RUN_CONDITION)
  }

  get participants() {
    return this.#state.participants
  }
  set participants(_) {
    console.log(RACE_ERROR_MESSAGE.NOT_ASSIGN_PARTICIPANTS)
  }
}
