import { makeRandomNumber } from '../../src/utils/random';

describe("랜덤 숫자 생성 테스트", () => {
    describe("함수를 실행하면", () => {
        const min = 0;
        const max = 100;
        const randomNumber = makeRandomNumber(min, max);
        it(`${min}과 ${max} 사이의 숫자를 반환한다`, () => {
            expect(randomNumber).toBeGreaterThanOrEqual(0);
            expect(randomNumber).toBeLessThanOrEqual(100);
        })
    })
})