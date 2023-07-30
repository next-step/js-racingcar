import {
  RACE_ERROR_MESSAGE,
  REQUIRE_METHODS_KEY,
  DEFAULT_MAX_MATCH_LENGTH
} from './constants'
import { isFunction, isNumber } from './utils'

export class Race {
  #_participants
  #_match
  #_maxMatchLength
  #_runCondition

  constructor({
    participants,
    maxMatchLength = DEFAULT_MAX_MATCH_LENGTH,
    runCondition = () => true
  }) {
    this.validate(participants, maxMatchLength)
    this.init(participants, maxMatchLength, runCondition)
  }

  get participants() {
    throw new Error(RACE_ERROR_MESSAGE.NOT_ACCESS_PARTICIPANTS)
  }
  set participants(_) {
    throw new Error(RACE_ERROR_MESSAGE.NOT_ASSIGN_PARTICIPANTS)
  }

  init(participants, maxMatchLength, runCondition) {
    this.#_match = 0
    this.#_participants = participants
    this.#_maxMatchLength = maxMatchLength
    this.#_runCondition = runCondition

    this.getParticipants().forEach(participant => {
      participant.setPosition(0)
    })
  }

  reset() {
    this.init(this.getParticipants(), this.getMaxMatchLength())
  }

  startRound() {
    const isOverMaxMatch = this.#_match + 1 > this.#_maxMatchLength
    if (isOverMaxMatch) {
      throw new Error(RACE_ERROR_MESSAGE.OVER_MATCH_MAX_LENGTH)
    }

    this.#_match++
    this.runParticipants()
  }

  runParticipants() {
    this.getParticipants()
      .filter(this.#_runCondition)
      .forEach(participant => participant.run())
  }

  getMaxMatchLength() {
    return this.#_maxMatchLength
  }

  getParticipants() {
    return this.#_participants
  }

  getWinners() {
    const highestPosition = Math.max(
      ...this.getParticipants().map(participant => participant.getPosition())
    )
    const winners = this.getParticipants().filter(
      participant => participant.getPosition() === highestPosition
    )

    return winners.map(winner => winner.getName())
  }

  validate(participants, maxMatchLength) {
    const isIncludeMethods = participants
      .map(this.isIncludeMethods)
      .every(hasMethod => hasMethod === true)

    const isEnoughParticipants = participants.length >= 2

    const isValidMatchLength = isNumber(maxMatchLength)

    if (!isIncludeMethods) {
      throw new Error(RACE_ERROR_MESSAGE.NOT_INCLUDE_METHOD)
    }

    if (!isEnoughParticipants) {
      throw new Error(RACE_ERROR_MESSAGE.LACK_PARTICIPANTS)
    }

    if (!isValidMatchLength) {
      throw new Error(RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH)
    }
  }

  isIncludeMethods(participant) {
    return REQUIRE_METHODS_KEY.every(
      method => method in participant && isFunction(participant[method])
    )
  }
}
