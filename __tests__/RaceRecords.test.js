import { RaceRecords } from '../src/domain/model/RaceRecords'

describe('RaceRecords: 자동차 경주 기록', () => {
  it('RaceRecords.value: 각 라운드별로 진행된 자동차 경주의 기록 컬렉션을 보유한다.', () => {
    const raceRecords = new RaceRecords()
    raceRecords.add({ 산들: 0, 뿌꾸: 0 })

    expect(raceRecords.value).toEqual({ 산들: [0], 뿌꾸: [0] })
  })

  describe('RaceRecords.add: 새로운 경주 기록이 추가되면, 기존 기록에 누적한다.', () => {
    let raceRecords

    beforeEach(() => {
      raceRecords = new RaceRecords()
    })

    it('기록을 추가하면 해당 기록이 누적된다.', () => {
      raceRecords.add({ 산들: 0, 뿌꾸: 0 })
      expect(raceRecords.value).toEqual({ 산들: [0], 뿌꾸: [0] })
      raceRecords.add({ 산들: 1, 뿌꾸: 0 })
      expect(raceRecords.value).toEqual({ 산들: [0, 1], 뿌꾸: [0, 0] })
    })
  })

  describe('RaceRecords.value: 매 라운드마다 추가되는 경주 기록 컬렉션은 자동차 이름, 자동차가 전진한 위치값을 갖는다.', () => {
    const raceRecords = new RaceRecords()
    test.each([
      [{ 산들: 0, 뿌꾸: 1 }, 1],
      [{ 산들: 1, 뿌꾸: 2 }, 2],
      [{ 산들: 1, 뿌꾸: 2 }, 3],
    ])('raceRecords.add(%s) => records.length: %s', (record, expected) => {
      raceRecords.add(record)
      expect(raceRecords.value['산들'].length).toEqual(expected)
    })
  })

  describe('validateRecord: 전달받은 record 의 유효성을 검증한다.', () => {
    describe('포맷이 유효하지 않은 경우 에러를 출력한다.', () => {
      const raceRecords = new RaceRecords()
      test.each([
        1,
        -1,
        '산들',
        undefined,
        null,
        {},
        [],
        ['name', '산들', 'position', 1],
        ['산들', 1],
      ])('%s', (invalidRecord) => {
        expect(() => raceRecords.add(invalidRecord)).toThrow()
      })
    })
  })
})
