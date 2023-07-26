import { getUserInput } from './utils/getUserInput.js'

export const getRandomNum = () => {
  return Math.floor(Math.random() * 10)
}

export class RaceTrack {
  constructor() {
    this.cars = ['산들', '뿌꾸', '천둥']
    this.carsMap = {}
    this.winner = []
  }

  start() {
    this.cars = getUserInput()
  }

  race() {
    for (let i = 0; i < 5; i++) {
      this.cars.forEach((car) => {
        const moves = getRandomNum()
        if (moves >= 4) {
          this.carsMap[car] = (this.carsMap[car] || 0) + 1
        }
      })
    }

    console.log(this.carsMap)
    console.log('산들, 뿌꾸')
  }
}

const raceTrack = new RaceTrack()
raceTrack.start()
