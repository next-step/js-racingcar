import { ERROR, SETTING } from './constants/index.js'

export class CarRacer { 
  #names = new Map()

  constructor() {}

  validation(name) {
    if(name.length > SETTING.MAX_NAME_LENGTH) {
      throw new Error(ERROR.MAX_NAME)
    }

    if(name.length < SETTING.MIN_NAME_LENGTH) {
      throw new Error(ERROR.MIN_NAME)
    }
    return name
  }

  set names (input) {
    const names = input.split(',')
    names.forEach(name => this.#names.set(this.validation(name.trim()), 0))
  }

  get names () {
    return Array.from(this.#names, ([key, value]) => key);
  }
}