import Car from '../src/domains/car/service';

describe('자동차 클래스 테스트', () => {
  const DEFAULT_CAR_NAME = '아반떼';
  const DEFAULT_CAR_LOCATION = 0;

  let car = null;

  beforeEach(() => (car = new Car({ name: DEFAULT_CAR_NAME })));

  test('자동차를 생성할 때 name에 "아반떼"을 넣으면 "아반떼"라는 이름을 가진 자동차가 생성된다.', () => {
    const name = car.getName();

    expect(name).toBe(DEFAULT_CAR_NAME);
  });

  test('자동차는 위치 값을 가지며, 초기 상태는 0이다.', () => {
    const location = car.getLocation();

    expect(location).toBe(DEFAULT_CAR_LOCATION);
  });

  test('자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.', () => {
    const movedLocation = car.moveForward();

    expect(movedLocation).toBe(DEFAULT_CAR_LOCATION + 1);
  });
});
