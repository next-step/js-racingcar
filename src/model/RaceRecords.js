import { ERROR_MESSAGE } from '../constants/errorMessages'

export class RaceRecords {
  #records

  constructor() {
    this.#records = new Map()
  }

  #validateRecord(record) {
    if (
      !record ||
      !record.name ||
      !record.position ||
      typeof record.name !== 'string' ||
      typeof record.position !== 'number'
    ) {
      throw new Error(ERROR_MESSAGE.RECORD_FORMAT)
    }
  }

  add(record) {
    this.#validateRecord(record)

    const positions = this.#records.get(record.name) || []
    this.#records.set(record.name, [...positions, record.position])
  }

  get records() {
    const recordsObj = {}
    this.#records.forEach((value, key) => {
      recordsObj[key] = value
    })
    return recordsObj
  }
}
