import { Car } from '../components/Car'
import { Race } from '../components/Race'

export const generateCarList = carNames => {
  return carNames.split(',').map(name => new Car(name.trim()))
}

export const generateRace = ({ carList, runCondition }) => {
  return new Race({
    runCondition,
    participants: carList
  })
}

export const generateWinnerList = participants => {
  const highestPosition = Math.max(...participants.map(car => car.position))

  const winnerList = participants.filter(
    car => car.position === highestPosition
  )

  return highestPosition === 0 ? [] : winnerList.map(winner => winner.name)
}
