import { RaceTrack, getRandomNum } from '../src'
import { getUserInput } from '../src/utils/getUserInput'

const CAR_NAMES = '산들, 뿌꾸, 천둥'

// 터미널 입력을 위한 readline 모킹
jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockResolvedValue(CAR_NAMES),
    close: jest.fn(),
  }),
}))

describe('자동차 이름을 입력받는 기능', () => {
  let raceTrack = new RaceTrack()

  it('getUserInput() : 입력받은 자동차를 터미널에 출력한다.', async () => {
    const carNames = await getUserInput()
    expect(carNames).toEqual(CAR_NAMES)
  })

  it('입력한 자동차가 경주에 참여하는 자동차가 된다.', () => {
    raceTrack.start()
    expect(raceTrack.cars).toEqual(CAR_NAMES)
  })
})

describe('자동차 이름의 길이를 검사하는 기능', () => {})

describe('자동차 경주를 진행하는 기능', () => {})

describe('우승 자동차를 판별하는 기능', () => {})

describe('프로그램 종료 기능', () => {})
