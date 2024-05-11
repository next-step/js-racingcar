import View from '../src/view/view.js'
import Car from '../src/domain/Car.js'
import Race from '../src/domain/Race.js'
import { MOVE_THRESHOLD } from '../src/constants'
import { carValidation } from '../src/rules/CarValidation'
import {
  TEST_CARS,
  TEST_DUPLICATED_CARS,
  TEST_NONEXISTENT_CARS,
  TEST_INVALID_LENGTH_CARS,
  TEST_NONEXISTENT_ROUND,
  TEST_STRING_ROUND,
  TEST_WHITESPACE_ROUND,
  TEST_INVALID_RANGE_ROUND,
} from './constants/index.js'
import {
  DUPLICATED_CARS_MSG,
  NONEXISTENT_CARS_MSG,
  INVALID_LENGTH_CARS_MSG,
  NONEXISTENT_ROUND_MSG,
  INVALID_RANGE_ROUND_MSG,
  INVALID_TYPEOF_ROUND_MSG,
} from '../src/constants/error.js'
import { raceValidation } from '../src/rules/raceValidation.js'

let logSpy

beforeEach(() => {
  logSpy = jest.spyOn(console, 'log')
})

describe('입출력 테스트', () => {
  test('쉼표를 기준으로 자동차 이름을 받는다.', async () => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_CARS.join(','))
    const input = await mockReadLineAsync()

    // when
    const carNames = input.split(',')

    // then
    carNames.forEach((car, index) => {
      expect(car).toBe(TEST_CARS[index])
    })
  })

  test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', async () => {
    // given
    const car = new Car('car1')

    // when
    car.moveForward(MOVE_THRESHOLD)
    View.printRaceProgress(car.name, car.position)

    // then
    expect(logSpy).toHaveBeenCalledWith('car1: -')
  })

  test('우승자가 여러명일 경우, 쉼표로 구분하여 출력한다.', async () => {
    // given
    const positionedCars = TEST_CARS.map((car) => new Car(car))
    positionedCars.forEach((car) => car.moveForward(MOVE_THRESHOLD))
    const race = new Race(positionedCars)

    // when
    View.printWinners(race.getWinners())

    // then
    expect(logSpy).toHaveBeenCalledWith(TEST_CARS.join(', ') + '가 최종 우승했습니다.')
  })

  test('입력받은 자동차가 존재하지 않을 경우, 에러 메세지를 보여준다.', async () => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_NONEXISTENT_CARS.join(','))
    const input = await mockReadLineAsync()

    // when
    carValidation.validates(input)

    // then
    expect(logSpy).toHaveBeenCalledWith(NONEXISTENT_CARS_MSG)
  })

  test('동일한 자동차가 존재할 경우, 에러 메세지를 보여준다.', async () => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_DUPLICATED_CARS.join(','))
    const input = await mockReadLineAsync()

    // when
    carValidation.validates(input)

    // then
    expect(logSpy).toHaveBeenCalledWith(DUPLICATED_CARS_MSG)
  })

  test('자동차의 이름이 1자 미만, 5자 초과일 경우, 에러 메시지를 보여준다.', async () => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_INVALID_LENGTH_CARS.join(','))
    const input = await mockReadLineAsync()

    // when
    carValidation.validates(input)

    // then
    expect(logSpy).toHaveBeenCalledWith(INVALID_LENGTH_CARS_MSG)
  })

  test('주어진 횟수를 입력받지 못하면 에러 메시지를 보여준다', async () => {
    //given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_NONEXISTENT_ROUND)
    const input = await mockReadLineAsync()

    //when
    raceValidation.validates(input)

    //then
    expect(logSpy).toHaveBeenCalledWith(NONEXISTENT_ROUND_MSG)
  })

  test('주어진 횟수가 문자열일 경우, 에러 메시지를 보여준다', async () => {
    //given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_STRING_ROUND)
    const input = await mockReadLineAsync()

    //when
    raceValidation.validates(input)

    //then
    expect(logSpy).toHaveBeenCalledWith(INVALID_TYPEOF_ROUND_MSG)
  })

  test('주어진 횟수가 공백일 경우, 에러 메시지를 보여준다', async () => {
    //given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_WHITESPACE_ROUND)
    const input = await mockReadLineAsync()

    //when
    raceValidation.validates(input)

    //then
    expect(logSpy).toHaveBeenCalledWith(INVALID_TYPEOF_ROUND_MSG)
  })

  test('주어진 횟수가 1 미만, 10 초과의 숫자일 경우, 에러 메시지를 보여준다.', async () => {
    //given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_INVALID_RANGE_ROUND)
    const input = await mockReadLineAsync()

    //when
    raceValidation.validates(input)

    //then
    expect(logSpy).toHaveBeenCalledWith(INVALID_RANGE_ROUND_MSG)
  })
})
