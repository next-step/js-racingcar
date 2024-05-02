import Car from '../src/domain/Car';

describe('자동차 기능 테스트', () => {
  it('자동차는 이름을 가질 수 있다.', () => {
    // given
    const taxi = new Car('taxi');

    // when
    const name = taxi.carName;

    // then
    expect(name).toBe('taxi');
  });
  it('값이 4이상일 경우 전진할 수 있다.', () => {
    // given
    const taxi = new Car('taxi');

    // when
    const taxiPosition = taxi.forwardOrStop(4).position;

    // then
    expect(taxiPosition).toBe(1);
  });
  it('값이 3이하일 경우 전진할 수 없다.', () => {
    // given
    const taxi = new Car('taxi');

    // when
    const taxiPosition = taxi.forwardOrStop(3).position;

    // then
    expect(taxiPosition).toBe(0);
  });
  it('정지할 수 있다.', () => {
    // given
    const taxi = new Car('taxi');

    // when
    const taxiPosition = taxi.stop().position;

    // then
    expect(taxiPosition).toBe(0);
  });
  it('후진할 수 있다.', () => {
    // given
    const taxi = new Car('taxi');

    // when
    const taxiPosition = taxi.backward().position;

    // then
    expect(taxiPosition).toBe(-1);
  });
});
