import Car from '../src/main';

describe('자동차 클래스 테스트', () => {
  let car = null;

  beforeEach(() => (car = new Car({ name: '자동차이름' })));

  test('자동차는 이름을 상태로 가질 수 있다.', () => {
    const name = car.getName();

    expect(name).toEqual('자동차이름');
  });

  test('자동차는 위치 값을 가지며, 초기 상태는 0이다.', () => {
    const location = car.getLocation();

    expect(location).toEqual(0);
  });

  test('자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.', () => {
    const movedLocation = car.moveForward();

    expect(movedLocation).toEqual(1);
  });
});
