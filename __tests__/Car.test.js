import Car from '../src/domain/Car';

describe('자동차 기능 테스트', () => {
  it('자동차는 이름을 가질 수 있다.', () => {
    // given
    const car = new Car('taxi');

    // when
    const name = car.getName();

    // then
    expect(name).toBe('taxi');
  });
  it('자동차는 이동(전진, 후진, 정지)할 수 있다.', () => {
    // given
    const [taxi, tesla, ford] = [
      new Car('taxi'),
      new Car('tesla'),
      new Car('ford'),
    ];

    // when
    const taxiPosition = taxi.forward().getPosition();
    const teslaPosition = tesla.stop().getPosition();
    const fordPosition = ford.backward().getPosition();

    // then
    expect(taxiPosition).toBe(1);
    expect(teslaPosition).toBe(0);
    expect(fordPosition).toBe(-1);
  });
});
