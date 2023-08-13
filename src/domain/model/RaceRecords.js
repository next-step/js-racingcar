import { ERROR_MESSAGE } from '../../constants/errorMessages.js'
import { isObject } from '../utils/isObject.js'

export class RaceRecords {
  #value

  constructor() {
    this.#value = {}
  }

  add(records) {
    this.#validateRecords(records)

    Object.entries(records).forEach(([name, position]) => {
      this.#value[name] = this.#value[name] || []
      this.#value[name].push(position)
    })
  }

  #validateRecords(records) {
    if (!records || !isObject(records) || Object.keys(records).length === 0) {
      throw new Error(ERROR_MESSAGE.RECORDS_FORMAT)
    }

    for (const name in records) {
      if (
        typeof name !== 'string' ||
        typeof records[name] !== 'number' ||
        records[name] < 0
      ) {
        throw new Error(ERROR_MESSAGE.SINGLE_RECORD_FORMAT)
      }
    }
  }

  get value() {
    return this.#value
  }
}
