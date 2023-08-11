import { ERROR_MESSAGE } from '../constants/errorMessages.js'

export class RaceRecords {
  #records

  constructor() {
    this.#records = {}
  }

  add(records) {
    this.#validateRecords(records)

    Object.entries(records).forEach(([name, position]) => {
      this.#records[name] = this.#records[name] || []
      this.#records[name].push(position)
    })
  }

  #validateRecords(records) {
    if (
      !records ||
      typeof records !== 'object' ||
      Array.isArray(records) ||
      Object.keys(records).length === 0
    ) {
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

  get records() {
    return this.#records
  }
}
