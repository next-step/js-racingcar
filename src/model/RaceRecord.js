export class RaceRecord {
  #records

  constructor() {
    this.#records = `실행 결과\n`
  }

  setRecords(carPositions) {
    let result = ``

    for (const { car, position } of carPositions) {
      result += `${car} : ${'-'.repeat(position)}\n`
    }

    this.#records += result + `\n`
  }

  get records() {
    return this.#records
  }
}
