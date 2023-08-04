import {
  RACING_CAR_LIST,
  RACE_ERROR_MESSAGE
} from '../../src/constants/racingCarList'
import { CAR_ERROR_MESSAGE } from '../../src/constants/car'
import { RacingCarListValidator } from '../../src/components/RacingCarList/RacingCarListValidator'

describe('RacingCarListValidator', () => {
  test.each([['aaaaaa'], ['bbbbbb'], ['ccccccc'], ['dddddd']])(
    '경주의 최대 경기 횟수가 숫자가 아닌 경우, subscriber에 에러 정보를 담아 호출한다.',
    maxMatchLength => {
      const validator = new RacingCarListValidator()
      const errorTracker = jest.fn()
      validator.subscribe(errorTracker)

      // When
      validator.validate({ carNames: 'sonny, son2', maxMatchLength })

      // Then
      expect(errorTracker).toBeCalledWith({
        error: {
          cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
          message: RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH
        }
      })
    }
  )

  test('경주에 참여한 자동차가 한 대인 경우, subscriber에 에러 정보를 담아 호출한다.', () => {
    // Given
    const validator = new RacingCarListValidator()
    const errorTracker = jest.fn()
    validator.subscribe(errorTracker)

    // When
    validator.validate({ carNames: 'sonny' })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(
          RACING_CAR_LIST.MIN_PARTICIPANTS_LENGTH
        )
      }
    })
  })

  test.each([[12345], [null], [undefined], [{}], [[]], [NaN], [undefined]])(
    '자동차의 이름이 문자열이 아닌 경우, subscriber에 에러 정보를 담아 호출한다.',
    name => {
      const validator = new RacingCarListValidator()
      const errorTracker = jest.fn()
      validator.subscribe(errorTracker)

      // When
      validator.validate({ carNames: name })

      // Then
      expect(errorTracker).toBeCalledWith({
        error: {
          cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
          message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
        }
      })
    }
  )
})
