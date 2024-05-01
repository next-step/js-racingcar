import { Car } from '../src/domain/Car';

describe('자동차 관련 내용', () => {
  test('자동차이름는 5자 이하만 가능하다..', () => {
    //Given(준비)
    const car = new Car('audi');

    expect(car.name).toBe('audi');
  });

  test('자동차이름을 5자 초과시 에러를 발생시킨다.', () => {
    expect(() => {
      const car = new Car('audiiii');
    }).toThrow();
  });

  test('전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우 통과', () => {
    //Given(준비)
    const car = new Car();

    //When(실행)
    car.getRandomValue = jest.fn().mockReturnValue(5); // 항상 이동 조건 충족

    car.move();

    //Then(검증)
    expect(car.getPosition()).toBe(1);
  });
});
