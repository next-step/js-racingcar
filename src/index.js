import Race from './domain/Race.js'
import View from './view/view.js'

const { cars, round } = await View.getSettings()

const race = new Race(cars, round)
race.start()
