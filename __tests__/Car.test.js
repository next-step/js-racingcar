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

  test('이름은 5자 이하만 가능하다', () => {
    //Given(준비)

    const car = new Car();

    //When(실행)
    car.setName('audi');

    //Then(검증)
    expect(car.getName()).toBe('audi');
  });

  test('이름은 5자 이상이면 생성이 안된다.', () => {
    //Given(준비)
    const car = new Car();

    //When(실행)
    car.setName('audiii');

    //Then(검증)
    expect(car.getName()).toBe('');
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
