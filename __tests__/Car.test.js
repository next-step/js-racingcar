import { Car } from '../src/model/Car'
import { CarMover } from '../src/model/CarMover'
import { RaceRecord } from '../src/model/RaceRecord'
import { RaceTrack } from '../src/model/RaceTrack'
import { makeRandomNum } from '../src/utils/helperUtils'
import { validateDuplicates, validateName } from '../src/utils/validate'

const CAR_NAME = '산들'
const CAR_NAMES = ['산들', '뿌꾸']

describe('자동차', () => {
  let car

  beforeEach(() => {
    car = new Car(CAR_NAME)
  })
  it('자동차는 이름을 가질 수 있다.', () => {
    expect(car.name).toEqual(CAR_NAME)
  })

  it('자동차는 랜덤 숫자가 4 이상이면 앞으로 전진한다.', () => {
    for (let move = 1; move <= 3; move++) {
      car.move(4)
      expect(car.position).toEqual(move)
    }
  })

  it('자동차는 랜덤숫자가 4 미만이면 정지한다.', () => {
    car.move(3)
    expect(car.position).toEqual(0)
  })
})

describe('자동차 경주', () => {
  let raceTrack

  beforeEach(() => {
    raceTrack = new RaceTrack(CAR_NAMES)
  })

  it('자동차 경주를 5회 진행한다.', () => {
    raceTrack.race()
    expect(raceTrack.turnCount).toBe(5)
  })
  it('자동차 경주를 할 때 0 ~ 9 까지 랜덤 숫자를 부여해 전진 여부를 결정한다.', () => {
    const testCount = 100

    for (let i = 0; i < testCount; i++) {
      const score = makeRandomNum()
      expect(score >= 0 && score <= 9).toBe(true)
    }
  })

  it('자동차 경주 게임 후 우승자를 출력한다.', () => {
    raceTrack.race()
    const winners = raceTrack.winners

    expect(winners).toContain('최종 우승했습니다.')
  })
})

describe('게임 진행', () => {
  let raceTrack

  beforeEach(() => {
    raceTrack = new RaceTrack(CAR_NAMES)
    raceTrack.race()
  })

  it('유저로 부터 입력받은 자동차 이름으로, 경주에 참여할 자동차를 만든다.', () => {
    const raceCars = new CarMover(CAR_NAMES).raceCars

    const carNamesFromRaceTrack = raceCars.map((car) => car.name)
    expect(carNamesFromRaceTrack).toEqual(CAR_NAMES)
  })

  it('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    const raceRecord = new RaceRecord()

    raceRecord.setRecords([{ car: '산들', position: 3 }])
    const result = raceRecord.records

    expect(result).toEqual(`실행 결과\n산들 : ---\n\n`)
  })
})

describe('유효성 검사', () => {
  describe('- 자동차 이름은 1자 이상, 5자 이하만 가능하다.', () => {
    test.each(['', '산들천둥뿌꾸포에버'])('에러O : %s', (name) => {
      expect(() => validateName(name)).toThrow()
    })

    test.each(['산들', '뿌꾸뿌꾸'])('에러X : %s', (name) => {
      expect(() => validateName(name)).not.toThrow()
    })
  })

  describe('- 자동차 이름은 한글, 영문만 가능하다.', () => {
    test.each(['^%$#', 123])('%s', (name) => {
      expect(() => validateName(name)).toThrow()
    })
  })

  it('중복된 자동차 이름은 입력할 수 없다.', () => {
    expect(() => {
      validateDuplicates(['산들', '산들'])
    }).toThrow()
  })
})
