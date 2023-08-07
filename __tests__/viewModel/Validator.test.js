import {
  RACING_CAR_LIST,
  RACE_ERROR_MESSAGE,
  CAR_ERROR_MESSAGE
} from '../../src/constants/model'
import { Validator } from '../../src/viewModel/Validator'

describe('viewModel/Validator', () => {
  test.each([['aaaaaa'], ['bbbbbb'], ['ccccccc'], ['dddddd']])(
    '경주의 최대 경기 횟수가 숫자가 아닌 경우, 유효성 여부와 에러 메시지를 확인할 수 있다.',
    maxMatchLength => {
      // Given, When
      const { isValid, error } = new Validator({
        carNames: 'sonny, son2',
        maxMatchLength
      })

      // Then
      expect(isValid).toBeFalsy()
      expect(error).toBe(RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH)
    }
  )

  test('경주에 참여한 자동차가 한 대인 경우, 유효성 여부와 에러 메시지를 확인할 수 있다.', () => {
    // Given, When
    const { isValid, error } = new Validator({
      carNames: 'sonny',
      maxMatchLength: 5
    })

    // Then
    expect(isValid).toBeFalsy()
    expect(error).toBe(
      RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(
        RACING_CAR_LIST.MIN_PARTICIPANTS_LENGTH
      )
    )
  })

  test.each([[12345], [null], [undefined], [{}], [[]], [NaN], [undefined]])(
    '자동차의 이름이 문자열이 아닌 경우, 유효성 여부와 에러 메시지를 확인할 수 있다.',
    name => {
      // Given, When
      const { isValid, error } = new Validator({
        carNames: name,
        maxMatchLength: 5
      })

      // Then
      expect(isValid).toBeFalsy()
      expect(error).toBe(CAR_ERROR_MESSAGE.INVALID_NAME_TYPE)
    }
  )
})
