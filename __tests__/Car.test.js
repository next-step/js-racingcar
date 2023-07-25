import { CarRacer } from '../src/CarRacer.js'
import { ERROR, SETTING } from '../src/constants/index.js'
import { randomNumber } from '../src/util/randomNumber.js'

describe('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
    const MAX = 'a'.repeat(SETTING.MAX_NAME_LENGTH + 1)
    const MIN = 'b'.repeat(SETTING.MIN_NAME_LENGTH - 1)

    test('자동차 이름은 쉼표(,)를 기준으로 구분한다.', () => {})
    test(`자동차 이름은 최대 ${SETTING.MAX_NAME_LENGTH}자 이하`, () => {
        function validationMaxLength() {
            const carRacing = new CarRacer()
            carRacing.names = MAX
        }
        expect(validationMaxLength).toThrow(ERROR.MAX_NAME)
    })
    test(`자동차 이름은 최소 ${SETTING.MIN_NAME_LENGTH}자 이상`, () => {
        function validationMinLength() {
            const carRacing = new CarRacer()
            carRacing.names = MIN
        }
        expect(validationMinLength).toThrow(ERROR.MIN_NAME)
    })
})

describe('전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.', () => {
    test('전진하는 조건은 0에서 9 사이에서 무작위 값을 구한다.', () => {
        const randomNum = randomNumber()

        expect(randomNum).toBeGreaterThanOrEqual(0)
        expect(randomNum).toBeLessThanOrEqual(9)
    })
})

describe('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.', () => {
    test('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.', () => {
        function validationInput() {
            const carRacing = new CarRacer()
            carRacing.names = ''
        }
        expect(validationInput).toThrow(ERROR.MIN_NAME)
    })
})

