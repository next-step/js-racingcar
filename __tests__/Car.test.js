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
    expect([0, 1]).toContain(taxiPosition);
    expect(teslaPosition).toBe(0);
    expect(fordPosition).toBe(-1);
  });
  it('전진하는 조건은 0~9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.', () => {
    // given
    const car = new Car('taxi');

    // when
    const carPosition = car.forward().getPosition();

    // then
    expect([0, 1]).toContain(carPosition);
  });
});
