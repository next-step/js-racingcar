import { RaceWinners } from '../src/domain/RaceWinners'

describe('RaceWinners: 자동차 경주 우승자', () => {
  describe('new RaceWinners(records)', () => {
    it('자동차 경주 기록을 입력받아 우승자를 선출한다.', () => {
      const records = { 산들: [0, 1, 2], 뿌꾸: [1, 2, 3] }
      const raceWinners = new RaceWinners(records)

      expect(raceWinners.value).toEqual(['뿌꾸'])
    })
  })

  describe('raceWinners.value: 최종 우승 자동차의 갯수는 1개 이상이다.', () => {
    test.each([
      [{ 산들: [0, 1, 2], 뿌꾸: [1, 2, 3] }, ['뿌꾸']],
      [{ 산들: [0, 0, 1], 뿌꾸: [0, 0, 0] }, ['산들']],
      [{ 산들: [1, 2, 3, 4, 5], 뿌꾸: [0, 1, 2, 3, 3] }, ['산들']],
    ])('new RaceWinners(%o) => 우승자 : %s', (records, expected) => {
      const raceWinners = new RaceWinners(records)
      expect(raceWinners.value).toEqual(expected)
    })
  })

  describe('validateRecords: 전달받은 records 의 유효성을 검증한다.', () => {
    describe('포맷이 유효하지 않은 경우 에러를 출력한다.', () => {
      test.each([
        null,
        undefined,
        ['산들', '뿌꾸'],
        '산들',
        123,
        -1,
        { 산들: [], 뿌꾸: [1, 2, 3] },
        { 산들: {} },
        { 산들: '11' },
        { 산들: [-1, -2, -3], 뿌꾸: [1, 2, 3] },
        { 산들: [1, 2, 3, 4, -5], 뿌꾸: [0, 1, 2, 3, 3] },
      ])('%o', (inValidRecords) => {
        expect(() => new RaceWinners(inValidRecords)).toThrow()
      })
    })
  })
})
