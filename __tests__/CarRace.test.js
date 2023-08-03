import {
  DEFAULT_MAX_MATCH_LENGTH,
  MIN_PARTICIPANTS_LENGTH,
  RACE_ERROR_MESSAGE
} from '../src/constants/carRace'
import { Car } from '../src/car'
import { CarRace } from '../src/carRace'

describe('CarRace - Feature', () => {
  let car1
  let car2
  let car3

  beforeEach(() => {
    car1 = new Car({ name: 'car1' })
    car2 = new Car({ name: 'car2' })
    car3 = new Car({ name: 'car3' })
  })

  test('경주에 참여한 여러 개의 객체들을 출발선에 놓는다.', () => {
    // Given
    const participants = [car1, car2, car3]
    car1.run()
    car2.run()
    car3.run()

    // When
    new CarRace({ participants })

    expect(car1.getPosition()).toBe(0)
    expect(car2.getPosition()).toBe(0)
    expect(car3.getPosition()).toBe(0)
  })

  test('경주의 최대 경기 횟수를 정할 수 있다.', () => {
    // Given
    const participants = [car1, car2, car3]

    // When
    const carRace = new CarRace({
      participants,
      maxMatchLength: DEFAULT_MAX_MATCH_LENGTH
    })

    // Then
    expect(carRace.getMaxMatchLength()).toBe(DEFAULT_MAX_MATCH_LENGTH)
  })

  test('경주의 최대 경기 횟수가 정의되지 않은 경우, 5회로 지정한다.', () => {
    // Given
    const participants = [car1, car2, car3]

    // When
    const carRace = new CarRace({ participants })

    // Then
    expect(carRace.getMaxMatchLength()).toBe(DEFAULT_MAX_MATCH_LENGTH)
  })

  test('경주가 시작될 때, 경주에 참여한 객체들을 최대 경기 횟수 동안 앞으로 전진시킨다.', () => {
    // Given
    const participants = [car1, car2, car3]
    const carRace = new CarRace({ participants })

    // When
    carRace.startRound()

    // Then
    expect(car1.getPosition()).toBe(1)
    expect(car2.getPosition()).toBe(1)
    expect(car3.getPosition()).toBe(1)
  })

  test('경주의 전진 조건이 있는 경우, 해당 조건이 있는 객체만 앞으로 전진 시킨다.', () => {
    // Given
    const participants = [car1, car2, car3]
    const runCondition = participant => participant.getName() === 'car1'
    const carRace = new CarRace({
      participants,
      runCondition
    })

    // When
    carRace.startRound()

    // Then
    expect(car1.getPosition()).toBe(1)
    expect(car2.getPosition()).toBe(0)
    expect(car3.getPosition()).toBe(0)
  })

  test('경주에 참여한 객체들의 목록을 출력할 수 있다.', () => {
    // Given
    const participants = [car1, car2, car3]
    const carRace = new CarRace({ participants })

    // When, Then
    expect(carRace.getParticipants()).toBe(participants)
  })

  test('경주가 끝난 뒤, 경주의 우승자를 출력할 수 있다.', () => {
    // Given
    const participants = [car1, car2, car3]
    const carRace = new CarRace({ participants, maxMatchLength: 2 })

    // When
    carRace.startRound()
    carRace.startRound()

    // Then
    expect(carRace.getWinners()).toEqual(['car1', 'car2', 'car3'])
  })
})

describe('CarRace - Validate', () => {
  let car1
  let car2
  let car3

  beforeEach(() => {
    car1 = new Car('car1')
    car2 = new Car('car2')
    car3 = new Car('car3')
  })
  test('경주의 최대 경기 횟수가 숫자가 아닌 경우, 에러가 발생한다.', () => {
    // Given
    const participants = [car1, car2, car3]

    // When, Then
    expect(() => {
      new CarRace({
        participants,
        maxMatchLength: null
      })
    }).toThrow(new Error(RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH))
  })

  test('경주의 최대 경기 횟수 이상으로 라운드를 진행시키는 경우, 에러가 발생한다.', () => {
    // Given
    const participants = [car1, car2, car3]
    const carRace = new CarRace({
      participants,
      maxMatchLength: 3
    })

    // When, Then
    expect(() => {
      carRace.startRound()
      carRace.startRound()
      carRace.startRound()
      carRace.startRound()
    }).toThrow(new Error(RACE_ERROR_MESSAGE.OVER_MATCH_MAX_LENGTH))
  })

  test('경주에 참여한 객체에 getName 메서드가 포함되어 있지 않은 경우, 해당 메서드가 없다는 에러가 발생한다.', () => {
    // Given
    const inValidObject = {
      run: () => {},
      getPosition: () => {},
      setPosition: () => {}
    }
    const participants = [inValidObject, car1]

    // When, Then
    expect(() => {
      new CarRace({ participants })
    }).toThrow(new Error(RACE_ERROR_MESSAGE.NOT_INCLUDE_METHOD))
  })

  test('경주에 참여한 객체에 getPosition 메서드가 포함되어 있지 않은 경우, 해당 메서드가 없다는 에러가 발생한다.', () => {
    // Given
    const inValidObject = {
      run: () => {},
      getName: () => {},
      setPosition: () => {}
    }
    const participants = [inValidObject, car1]

    // When, Then
    expect(() => {
      new CarRace({ participants })
    }).toThrow(new Error(RACE_ERROR_MESSAGE.NOT_INCLUDE_METHOD))
  })

  test('경주에 참여한 객체에 setPosition 메서드가 포함되어 있지 않은 경우, 해당 메서드가 없다는 에러가 발생한다.', () => {
    // Given
    const inValidObject = {
      run: () => {},
      getName: () => {},
      getPosition: () => {}
    }
    const participants = [inValidObject, car1]

    // When, Then
    expect(() => {
      new CarRace({ participants })
    }).toThrow(new Error(RACE_ERROR_MESSAGE.NOT_INCLUDE_METHOD))
  })

  test('경주에 참여한 객체에 run 메서드가 포함되어 있지 않은 경우, 해당 메서드가 없다는 에러가 발생한다.', () => {
    // Given
    const inValidObject = {
      getName: () => {},
      getPosition: () => {},
      setPosition: () => {}
    }
    const participants = [inValidObject, car1]

    // When, Then
    expect(() => {
      new CarRace({ participants })
    }).toThrow(new Error(RACE_ERROR_MESSAGE.NOT_INCLUDE_METHOD))
  })

  test('경주에 참여한 객체가 한 개인 경우, 에러가 발생한다.', () => {
    // Given
    const participants = [car1]

    // When, Then
    expect(() => {
      new CarRace({
        participants
      })
    }).toThrow(
      new Error(RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH))
    )
  })
})
