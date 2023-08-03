import { CAR, CAR_ERROR_MESSAGE } from '../../src/constants/car'
import { CarValidator } from '../../src/components/Car/CarValidator'

describe('CarValidator', () => {
  test.each([['aaaaaa'], ['bbbbbb'], ['ccccccc'], ['dddddd']])(
    '자동차의 이름이 6자 이상의 문자열인 경우, subscriber에 에러 정보를 담아 호출한다.',
    name => {
      const validator = new CarValidator()
      const errorTracker = jest.fn()
      validator.subscribe(errorTracker)

      // When
      validator.validate({ name })

      // Then
      expect(errorTracker).toBeCalledWith({
        error: {
          cause: CAR.CONSTRUCTOR_NAME,
          message: CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(CAR.MAX_NAME_LENGTH)
        }
      })
    }
  )

  test('자동차의 이름이 빈 문자열인 경우, subscriber에 에러 정보를 담아 호출한다.', () => {
    // Given
    const validator = new CarValidator()
    const errorTracker = jest.fn()
    validator.subscribe(errorTracker)

    // When
    validator.validate({ name: '' })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR.CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(CAR.MIN_NAME_LENGTH)
      }
    })
  })

  test.each([[12345], [null], [undefined], [{}], [[]], [NaN], [undefined]])(
    '자동차의 이름이 문자열이 아닌 경우, subscriber에 에러 정보를 담아 호출한다.',
    name => {
      const validator = new CarValidator()
      const errorTracker = jest.fn()
      validator.subscribe(errorTracker)

      // When
      validator.validate({ name })

      // Then
      expect(errorTracker).toBeCalledWith({
        error: {
          cause: CAR.CONSTRUCTOR_NAME,
          message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
        }
      })
    }
  )
})
