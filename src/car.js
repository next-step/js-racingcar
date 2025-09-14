import { CarError } from './errors/carError.js'

export class Car {
  static INITIAL_POSITION = 0
  static MOVE_DISTANCE = 1
  static NAME_MAX_LENGTH = 5
  static FORWARD_THRESHOLD = 4

  #name
  #position

  get name() {
    return this.#name
  }

  get position() {
    return this.#position
  }

  constructor(name, position) {
    if (!name?.trim().length) {
      throw new CarError.InvalidName()
    }

    if (name.trim().length > Car.NAME_MAX_LENGTH) {
      throw new CarError.NameTooLong()
    }

    this.#name = name.trim()
    this.#position = position || Car.INITIAL_POSITION
  }

  moveForward(randomNumber) {
    if (randomNumber < Car.FORWARD_THRESHOLD) return
    this.#position += Car.MOVE_DISTANCE
  }
}