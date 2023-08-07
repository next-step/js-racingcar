import { ERROR_MESSAGE } from '../constants/errorMessages.js'

export class RaceWinners {
  #winners

  constructor(records) {
    this.#validateRecords(records)
    this.#winners = this.#findWinners(records)
  }

  #validateRecords(records) {
    if (!this.#isRecordsExist(records) || !this.#isRecordValuesValid(records)) {
      throw new Error(ERROR_MESSAGE.COLLECTIVE_RECORDS_FORMAT)
    }
  }

  #isRecordsExist(records) {
    return records && typeof records === 'object' && !Array.isArray(records)
  }

  #isRecordValuesValid(records) {
    const values = Object.values(records)

    // 빈 value 인지 확인
    if (!values.length) return false

    // 모든 values 의 길이가 동일한지 확인
    const lengths = values.map((value) => value.length)
    const uniqueLengths = [...new Set(lengths)]
    if (uniqueLengths.length !== 1) return false

    // 모든 values 가 배열인지 확인
    if (!values.every((value) => Array.isArray(value))) return false

    // 모든 values 의 value 요소가 0이상의 숫자인지 확인
    if (
      !values
        .flatMap((value) => value)
        .every((value) => typeof value === 'number' && value >= 0)
    )
      return false

    return true
  }

  #findWinners(records) {
    const finalPositions = Object.entries(records).map(([name, positions]) => {
      return {
        name: name,
        finalPosition: positions[positions.length - 1],
      }
    })

    const maxPosition = Math.max(
      ...finalPositions.map((entry) => entry.finalPosition),
    )

    return finalPositions
      .filter((entry) => entry.finalPosition === maxPosition)
      .map((entry) => entry.name)
  }

  get winners() {
    return this.#winners
  }
}
