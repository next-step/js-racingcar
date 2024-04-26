import Car from '../src/domain/Car';

describe('Car', () => {
  test('자동차 이름은 5자 이하로만 부여할 수 있다.', () => {
    // given: 5자 이하의 이름 준비
    const RANDOM_NAME = 'jam';

    // when: 5자 이하의 이름을 갖는 자동차 생성 시도
    const car = new Car(RANDOM_NAME);
    const name = car.name;

    // then: 자동차 이름의 길이가 5자 이하인지 확인
    expect(name.length).toBeLessThanOrEqual(5);
  });

  test('자동차 이름은 5자를 초과하여 부여할 수 없다.', () => {
    // given: 5자를 초과하는 이름 준비
    const RANDOM_NAME = 'bottle';

    // when: 5자를 초과하는 이름을 갖는 자동차 생성 시도
    const createCar = () => new Car(RANDOM_NAME);

    // then: 자동차가 정상적으로 생성되었는지 확인
    expect(createCar).toThrow('자동차 이름은 5자 이하로만 부여할 수 있습니다.');
  });
});
