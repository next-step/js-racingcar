import {
  ERROR_MESSAGE,
  REQUIRE_METHODS_KEY,
  DEFAULT_MAX_MATCH_LENGTH
} from './constants'
import { isFunction, isNumber } from './utils'

export class Race {
  #_participants
  #_maxMatchLength

  constructor({ participants, maxMatchLength = DEFAULT_MAX_MATCH_LENGTH }) {
    this.validate(participants, maxMatchLength)

    this.#_participants = participants
    this.#_maxMatchLength = maxMatchLength
    this.init()
  }

  get participants() {
    throw new Error(ERROR_MESSAGE.NOT_ACCESS_PARTICIPANTS)
  }
  set participants(newParticipants) {
    throw new Error(ERROR_MESSAGE.NOT_ASSIGN_PARTICIPANTS)
  }

  init() {
    this.getParticipants().forEach(participant => {
      participant.setPosition(0)
    })
  }

  start() {
    this.getParticipants().forEach(participant =>
      this.runParticipant(participant, this.#_maxMatchLength)
    )
  }

  end() {
    this.init()
  }

  getMaxMatchLength() {
    return this.#_maxMatchLength
  }

  getParticipants() {
    return this.#_participants
  }

  getWinners() {
    const participantsPosition = this.getParticipants().map(participant =>
      participant.getPosition()
    )
    const maxPosition = Math.max(...participantsPosition)
    const winners = this.getParticipants().filter(
      participant => participant.getPosition() === maxPosition
    )

    return winners.map(winner => winner.getName())
  }

  runParticipant(participant, maxMatchLength) {
    let match = 0

    while (match < maxMatchLength) {
      participant.run(5)
      match++
    }
  }

  validate(participants, maxMatchLength) {
    const isIncludeMethods = participants
      .map(this.isIncludeMethods)
      .every(hasMethod => hasMethod === true)

    const isValidMathLength = isNumber(maxMatchLength)

    if (!isIncludeMethods) {
      throw new Error(ERROR_MESSAGE.NOT_INCLUDE_METHOD)
    }

    if (!isValidMathLength) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH)
    }
  }

  isIncludeMethods(participant) {
    return REQUIRE_METHODS_KEY.every(
      method => method in participant && isFunction(participant[method])
    )
  }
}
