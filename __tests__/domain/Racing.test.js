import { Racing } from '../../src/domain/Racing';

describe("Racing Test", () => {
    describe("경주를 시작할 때", () => {
            describe("자동차 이름 목록이 주어진다면", () => {
                const carNames = 'pobi,crong,honux';
                const racing = new Racing(carNames);
                it("자동차 목록을 생성할 수 있다.", () => {
                    expect(racing.cars.length).toBe(3);
                });
            })

            describe("car 이름 목록이 빈값이라면", () => {
                const carNames = ''

                it("에러를 반환한다", () => {
                    expect(() => new Racing(carNames)).toThrowError();
                })
            })

            describe("car 이름 목록이 공백이라면", () => {
                const carNames = ' '

                it("에러를 반환한다", () => {
                    expect(() => new Racing(carNames)).toThrowError();
                })
            });

            describe("car 이름에 공백이 포함되어 있다면", () => {
                const carNames = 'pobi, ,crong,honux'

                it("에러를 반환한다", () => {
                    expect(() => new Racing(carNames)).toThrowError();
                })
            });
        })

        describe("경주가 진행되면", () => {
            const carNames = 'pobi,crong,honux';
            const racing = new Racing(carNames);
            racing.race();
            it("현재 라운드가 증가한다.", () => {
                expect(racing.currentRound).toBe(2);
        })
    });
});