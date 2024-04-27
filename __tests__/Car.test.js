import { Car } from '../src/domain/Car';

describe('자동차 관련 내용', () => {
  test('자동차에 이름을 부여할 수 있다.', () => {
    //Given(준비)
    const car = new Car();

    //When(실행)
    car.setName('audi');

    //Then(검증)
    expect(car.getName()).toBe('audi');
  });
});
