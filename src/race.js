import {
  RACE_ERROR_MESSAGE,
  REQUIRE_METHODS_KEY,
  DEFAULT_MAX_MATCH_LENGTH,
  DEFAULT_RUN_CONDITION,
  MIN_PARTICIPANTS_LENGTH
} from './constants'
import { isFunction, isNumber } from './utils'

export class Race {
  #participants
  #match
  #maxMatchLength
  #runCondition

  constructor({
    participants,
    maxMatchLength = DEFAULT_MAX_MATCH_LENGTH,
    runCondition = DEFAULT_RUN_CONDITION
  }) {
    this.validate(participants, maxMatchLength)
    this.init(participants, maxMatchLength, runCondition)
  }

  validate(participants, maxMatchLength) {
    const isIncludeRequiredMethods = participants
      .map(this.isIncludeRequiredMethods)
      .every(hasMethod => hasMethod === true)

    const isEnoughParticipants = participants.length >= MIN_PARTICIPANTS_LENGTH

    const isValidMatchLength = isNumber(maxMatchLength)

    if (!isIncludeRequiredMethods) {
      throw new Error(RACE_ERROR_MESSAGE.NOT_INCLUDE_METHOD)
    }

    if (!isEnoughParticipants) {
      throw new Error(RACE_ERROR_MESSAGE.LACK_PARTICIPANTS)
    }

    if (!isValidMatchLength) {
      throw new Error(RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH)
    }
  }

  init(participants, maxMatchLength, runCondition) {
    this.#match = 0
    this.#participants = participants
    this.#maxMatchLength = maxMatchLength
    this.#runCondition = runCondition

    this.resetParticipantsPosition()
  }

  reset() {
    this.init([], DEFAULT_MAX_MATCH_LENGTH, DEFAULT_RUN_CONDITION)
  }

  startRound() {
    const isOverMaxMatch = this.#match + 1 > this.#maxMatchLength
    if (isOverMaxMatch) {
      throw new Error(RACE_ERROR_MESSAGE.OVER_MATCH_MAX_LENGTH)
    }

    this.#match++
    this.runParticipants()
  }

  runParticipants() {
    if (this.getParticipants().length === 0) {
      throw new Error(RACE_ERROR_MESSAGE.LACK_PARTICIPANTS)
    }

    this.getParticipants()
      .filter(this.#runCondition)
      .forEach(participant => participant.run())
  }

  resetParticipantsPosition() {
    if (this.getParticipants().length === 0) {
      throw new Error(RACE_ERROR_MESSAGE.LACK_PARTICIPANTS)
    }

    this.getParticipants().forEach(participant => {
      participant.setPosition(0)
    })
  }

  isIncludeRequiredMethods(participant) {
    return REQUIRE_METHODS_KEY.every(
      method => method in participant && isFunction(participant[method])
    )
  }

  getMaxMatchLength() {
    return this.#maxMatchLength
  }

  getParticipants() {
    return this.#participants
  }

  getWinners() {
    const highestPosition = Math.max(
      ...this.getParticipants().map(participant => participant.getPosition())
    )
    const winners = this.getParticipants().filter(
      participant => participant.getPosition() === highestPosition
    )

    return this.#match !== this.#maxMatchLength
      ? []
      : winners.map(winner => winner.getName())
  }
}
