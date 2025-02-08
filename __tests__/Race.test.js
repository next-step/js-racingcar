import Race from '../src/race';

import { isValidCarName, formatCarNameInput } from '../src/input';

describe('자동차 이름 입력 테스트', () => {
  it('자동차 이름은 여러 개를 입력 받을 수 있으며 쉼표(,)로 구분한다.', () => {
    expect(formatCarNameInput('캐딜락, 아우디')).toEqual(['캐딜락', ' 아우디']);
    expect(formatCarNameInput('캐딜락,아우디')).toEqual(['캐딜락', '아우디']);
    expect(formatCarNameInput('캐딜락, 아우디')).not.toEqual([
      '캐딜락',
      '아우디',
    ]);
  });

  it('자동차 이름은 5자 이하로 설정해야 한다.', () => {
    expect(isValidCarName(['벤틀리'])).toBe(true);
    expect(isValidCarName(['Audi'])).toBe(true);
    expect(isValidCarName(['Bentley'])).toBe(false);
  });

  it('자동차 이름을 여러개 입력할 경우 각 이름은 모두 5자 이하여야 한다.', () => {
    expect(isValidCarName(['벤틀리', '아우디'])).toBe(true);
    expect(isValidCarName(['Bentley', 'Audi'])).toBe(false);
  });
});

describe('자동차 경주 테스트', () => {
  it('자동차 경주는 5회 진행한다.', () => {
    const race = new Race(['캐딜락', '아우디']);

    const result = race.start();

    const rounds = result.length;
    expect(rounds).toEqual(5);
  });

  it('경주 1회당 자동차는 1칸 전진한다', () => {
    const race = new Race(['캐딜락', '아우디']);

    race.proceed();

    const players = race.players;
    const locations = players.map((player) => player.location);
    expect(locations.every((location) => location === 1)).toBe(true);
  });
});
