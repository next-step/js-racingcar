import Car from '../src/domain/Car';

describe('자동차 이름은', () => {
  test('5자 이하로만 부여할 수 있다.', () => {
    // given: 5자 이하의 이름 준비
    const RANDOM_NAME = 'jam';

    // when: 5자 이하의 이름을 갖는 자동차 생성 시도
    const car = new Car(RANDOM_NAME);
    const name = car.name;

    // then: 자동차 이름의 길이가 5자 이하인지 확인
    expect(name.length).toBeLessThanOrEqual(Car.MAX_NAME_LENGTH);
  });

  test('5자를 초과하여 부여할 수 없다.', () => {
    // given: 5자를 초과하는 이름 준비
    const RANDOM_NAME = 'bottle';

    // when: 5자를 초과하는 이름을 갖는 자동차 생성 시도
    const createCar = () => new Car(RANDOM_NAME);

    // then: 자동차가 정상적으로 생성되었는지 확인
    expect(createCar).toThrow('자동차 이름은 5자 이하로만 부여할 수 있습니다.');
  });

  test('빈 문자열일 수 없다.', () => {
    // given: 빈 문자열을 이름으로 준비
    const EMPTY_NAME = '';

    // when: 빈 문자열을 이름으로 갖는 자동차 생성 시도
    const createCar = () => new Car(EMPTY_NAME);

    // then: 자동차가 정상적으로 생성되었는지 확인
    expect(createCar).toThrow('자동차 이름은 빈 문자열일 수 없습니다.');
  });
});

describe('자동차 위치는', () => {
  let car;

  beforeEach(() => {
    const RANDOM_NAME = 'jam';
    car = new Car(RANDOM_NAME);
  });

  test('자동차가 전진을 시도하기 전인 경우, 0에서 시작한다.', () => {
    // then: 자동차의 최초 위치가 0인지 확인
    expect(car.position).toBe(0);
  });

  test('0~9 사이의 무작위 값이 4 이상인 경우, 전진할 수 있다.', () => {
    // given: 무작위 값이 4 이상인 경우를 가정
    const RANDOM_VALUE = 4;

    // when: 전진 시도
    car.move(RANDOM_VALUE);

    // then: 자동차가 전진에 성공했는지 확인
    expect(car.position).toBe(1);
  });

  test('0~9 사이의 무작위 값이 4 미만인 경우, 전진할 수 없다.', () => {
    // given: 무작위 값이 4 미만인 경우를 가정
    const RANDOM_VALUE = 2;

    // when: 전진 시도
    car.move(RANDOM_VALUE);

    // then: 자동차가 전진에 성공했는지 확인
    expect(car.position).toBe(0);
  });
});
