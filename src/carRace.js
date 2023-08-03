import {
  REQUIRE_METHODS_KEY,
  DEFAULT_MAX_MATCH_LENGTH,
  DEFAULT_RUN_CONDITION,
  MIN_PARTICIPANTS_LENGTH,
  RACE_ERROR_MESSAGE
} from './constants/carRace'
import { isFunction, isNumber } from './utils/validator'
import { CustomError } from './utils/customError'

export class CarRace {
  #participants
  #match
  #maxMatchLength
  #runCondition

  constructor({
    participants,
    maxMatchLength = DEFAULT_MAX_MATCH_LENGTH,
    runCondition = DEFAULT_RUN_CONDITION
  }) {
    this.#validate(participants, maxMatchLength)
    this.#init(participants, maxMatchLength, runCondition)
  }

  #validate(participants, maxMatchLength) {
    this.#validateRequiredMethods(participants)
    this.#validateEnoughParticipants(participants)
    this.#validateMatchLength(maxMatchLength)
  }

  #init(participants, maxMatchLength, runCondition) {
    this.#match = 0
    this.#participants = participants
    this.#maxMatchLength = maxMatchLength
    this.#runCondition = runCondition

    this.#resetParticipantsPosition()
  }

  startRound() {
    const isOverMaxMatch = this.#match + 1 > this.#maxMatchLength
    if (isOverMaxMatch) {
      throw new CustomError({
        cause: this,
        message: RACE_ERROR_MESSAGE.OVER_MATCH_MAX_LENGTH
      })
    }

    this.#match++
    this.runParticipants()
  }

  runParticipants() {
    if (this.getParticipants().length === 0) {
      throw new CustomError({
        cause: this,
        message: RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH)
      })
    }

    this.getParticipants()
      .filter(this.#runCondition)
      .forEach(participant => participant.run())
  }

  #resetParticipantsPosition() {
    if (this.getParticipants().length === 0) {
      throw new CustomError({
        cause: this,
        message: RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH)
      })
    }

    this.getParticipants().forEach(participant => {
      participant.setPosition(0)
    })
  }

  #isIncludeRequiredMethods(participant) {
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

  #validateRequiredMethods(participants) {
    const isIncludeRequiredMethods = participants
      .map(this.#isIncludeRequiredMethods)
      .every(hasMethod => hasMethod === true)

    if (!isIncludeRequiredMethods) {
      throw new CustomError({
        cause: this,
        message: RACE_ERROR_MESSAGE.NOT_INCLUDE_METHOD
      })
    }
  }

  #validateEnoughParticipants(participants) {
    const isEnoughParticipants = participants.length >= MIN_PARTICIPANTS_LENGTH

    if (!isEnoughParticipants) {
      throw new CustomError({
        cause: this,
        message: RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH)
      })
    }
  }

  #validateMatchLength(maxMatchLength) {
    const isValidMatchLength = isNumber(maxMatchLength)

    if (!isValidMatchLength) {
      throw new CustomError({
        cause: this,
        message: RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH
      })
    }
  }
}
