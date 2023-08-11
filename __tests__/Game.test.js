import { Game } from '../src/model/Game'

const CAR_NAMES = ['산들', '뿌꾸', '천둥']
const ROUNDS = 5

describe('Game: 자동차 경주 게임 모델', () => {
  it('input 데이터를 받아와 자동차 이름 묶음을 만든다.', () => {
    const game = new Game(CAR_NAMES, ROUNDS)
    CAR_NAMES.forEach((name, index) => {
      expect(game.entries[index].name).toBe(name)
    })
  })

  it('경주 횟수 데이터를 받아와 라운드를 세팅한다.', () => {
    const game = new Game(CAR_NAMES, 5)
    expect(game.rounds).toBe(5)

    const otherGame = new Game(CAR_NAMES, 3)
    expect(otherGame.rounds).toBe(3)
  })

  it('라운드만큼 게임을 실행한다.', () => {
    const game = new Game(CAR_NAMES, ROUNDS)
    game.run()

    // 게임 종료 후 current round 가 주입한 round 값과 동일한지 확인
    expect(game.currentRound).toBe(ROUNDS)

    // 게임 종료 후 기록된 record의 길이가 round 값과 동일한지 확인
    expect(Object.values(game.records)[0].length).toBe(ROUNDS)
  })

  it('각 라운드에 자동차가 뽑은 숫자가 4 이상일 경우 자동차들을 전진시킨다.', () => {
    const moveCondition = () => {
      const sampleRandomNumber = 4
      return sampleRandomNumber >= 4
    }

    const game = new Game(['산들', '뿌꾸'], 1)
    game.run(moveCondition)
    expect(game.records).toEqual({ 산들: [1], 뿌꾸: [1] })
  })

  it('전체 라운드가 끝난 후 자동차 경주 기록을 반환할 수 있다.', () => {
    const game = new Game(['산들', '뿌꾸'], 2)
    game.run(() => true)

    expect(game.records).toEqual({ 산들: [1, 2], 뿌꾸: [1, 2] })
  })

  it('전체 라운드가 끝난 후 우승자 목록을 반환할 수 있다.', () => {
    const game = new Game(['산들', '뿌꾸'], 2)
    game.run(() => true)

    expect(game.winners).toEqual(['산들', '뿌꾸'])
  })

  describe('validateCarName(): input 은 1개 이상의 이름을 보유해야 한다.', () => {
    test.each([
      null,
      undefined,
      '산들',
      ['산들', ''],
      [''],
      [1, 2, 3],
      ['^', '$', '9'],
    ])('new Game(%s)', (carNames) => {
      expect(() => new Game(carNames)).toThrow()
    })
  })

  describe('validateRounds(): 받아온 경주 횟수가 올바른 숫자가 아닐 경우 에러를 출력한다.', () => {
    test.each([null, undefined, 0, -1, '숫자가 아님'])(
      'new Game(%s)',
      (rounds) => {
        expect(() => new Game(['산들,뿌꾸'], rounds)).toThrow()
      },
    )
  })
})
