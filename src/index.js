import Car from './domain/Car.js'
import Race from './domain/Race.js'
import View from './view/view.js'

const carNames = (await View.getCarNames()).split(',')
const race = new Race(carNames.map((car) => new Car(car)))
race.start()
