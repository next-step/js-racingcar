import {
  RACE,
  RACE_ERROR_MESSAGE
} from '../../../src/constants/components/race'
import { CAR_ERROR_MESSAGE } from '../../../src/constants/components/car'
import { Validator } from '../../../src/domain/viewModel/Validator'

describe('viewModel/Validator', () => {
  test.each([
    ['aaaaaa'],
    ['bbbbbb'],
    ['ccccccc'],
    ['dddddd'],
    [null],
    [undefined],
    [NaN],
    [Infinity]
  ])(
    '경주의 최대 경기 횟수가 숫자가 아닌 경우, 에러를 발생시킨다.',
    maxMatchLength => {
      // Given
      const validator = new Validator()

      // When, Then
      expect(() => {
        validator.validate({
          carNames: 'sonny, son2',
          maxMatchLength
        })
      }).toThrow(new Error(RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH))
    }
  )

  test('경주에 참여한 자동차가 한 대인 경우, 에러를 발생시킨다.', () => {
    // Given
    const validator = new Validator()

    // When, Then
    expect(() => {
      validator.validate({
        carNames: 'sonny',
        maxMatchLength: 5
      })
    }).toThrow(
      new Error(
        RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(RACE.MIN_PARTICIPANTS_LENGTH)
      )
    )
  })

  test.each([[12345], [null], [undefined], [{}], [[]], [NaN], [undefined]])(
    '자동차의 이름이 문자열이 아닌 경우, 에러를 발생시킨다.',
    name => {
      // Given
      const validator = new Validator()

      // When, Then
      expect(() => {
        validator.validate({
          carNames: name,
          maxMatchLength: 5
        })
      }).toThrow(new Error(CAR_ERROR_MESSAGE.INVALID_NAME_TYPE))
    }
  )
})
