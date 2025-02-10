import Race from '../src/domain/Race.js';
import Car from '../src/domain/Car.js';

describe('자동차 경주 테스트', () => {
  it('자동차 경주는 기본 5회 진행한다.', () => {
    const race = new Race([new Car('벤틀리'), new Car('캐딜락')]);

    const result = race.start();

    const rounds = result.length;
    expect(rounds).toEqual(5);
  });

  it('자동차 경주 횟수를 변경할 수 있다.', () => {
    const race = new Race([new Car('벤틀리'), new Car('캐딜락')]);

    const result = race.start(3);

    const rounds = result.length;
    expect(rounds).toEqual(3);
  });
});
