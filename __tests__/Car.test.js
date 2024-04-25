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
});
