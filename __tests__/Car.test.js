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

  test('무작위 값이 4 미만일 경우, 위치가 변경되지 않는다.', () => {
    //Given(준비)
    const car = new Car('audi');

    //When(실행)
    const RANDOM_COUNT = 2;
    car.move(RANDOM_COUNT);

    //Then(검증)
    expect(car.position).toBe(0);
  });

  test('자동차이름을 5자 초과시 에러를 발생시킨다.', () => {
    expect(() => {
      const car = new Car('audiiii');
    }).toThrow();
  });

  test('무작위 값이 4 이상일 경우, 위치가 변경된다.', () => {
    //Given(준비)
    const car = new Car('audi');

    //When(실행)
    const RANDOM_COUNT = 5;
    car.move(RANDOM_COUNT);

    //Then(검증)
    expect(car.position).toBe(1);
  });

  test('무작위 값이 4 미만일 경우, 위치가 변경되지 않는다.', () => {
    //Given(준비)
    const car = new Car('audi');

    //When(실행)
    const RANDOM_COUNT = 2;
    car.move(RANDOM_COUNT);

    //Then(검증)
    expect(car.position).toBe(0);
  });

  test('자동차이름을 5자 초과시 에러를 발생시킨다.', () => {
    expect(() => {
      const car = new Car('audiiii');
    }).toThrow();
  });

  test('자동차이름을 5자 초과시 에러를 발생시킨다.', () => {
    expect(() => {
      const car = new Car('audiiii');
    }).toThrow();
  });

  test('무작위 값이 4 이상일 경우, 위치가 변경된다.', () => {
    //Given(준비)
    const car = new Car('audi');

    //When(실행)
    const RANDOM_COUNT = 5;
    car.move(RANDOM_COUNT);

    //Then(검증)
    expect(car.position).toBe(1);
  });

  test('무작위 값이 4 미만일 경우, 위치가 변경되지 않는다.', () => {
    //Given(준비)
    const car = new Car('audi');

    //When(실행)
    const RANDOM_COUNT = 2;
    car.move(RANDOM_COUNT);

    //Then(검증)
    expect(car.position).toBe(0);
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
    expect(car.isValidateName()).toBe(false);
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
