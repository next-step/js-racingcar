import Race from '../src/domain/Race';

/**
 * [x] 5회로 고정하여 진행한다. 
 * [x] 자동차 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4이상일 경우이다.
 */

describe('자동차 레이싱은 ', () => {
  it('5회로 고정하여 진행한다', () => {
    const car_race = new Race();
    car_race.start();
    expect(car_race.current_lab).toBe(5);
  })

  it('무작위값이 0에서 9사이인지 확인한다.', () => {
    const car_race = new Race();
    car_race.randomNum();
    expect(car_race.random_num).toBeGreaterThanOrEqual(0);
    expect(car_race.random_num).toBeLessThanOrEqual(9);
  })

  it('무작위 값이 4이상일 경우 전진한다.', () => {
    const car_race = new Race();
    car_race.conditionsMove(4);
    expect(car_race.move).toBe(true);
  })

  it('4이하일 경우 멈춘다.', () => {
    const car_race = new Race();
    car_race.conditionsMove(3);
    expect(car_race.move).toBe(false);
  })
});

