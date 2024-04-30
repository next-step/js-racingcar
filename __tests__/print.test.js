import Car from '../src/domain/Car';
import Race from '../src/domain/Race';
import { printCarPosition } from '../src/utils/print';

describe('진행 결과 출력 Utils', () => {
  test('자동차의 위치를 출력할 때, 자동차 이름을 같이 출력한다.', () => {
    // given: 임의의 자동차 생성
    const RANDOM_NAME = 'jam';
    const car = new Car(RANDOM_NAME);

    // when: 위치 출력
    const spy = jest.spyOn(console, 'log');
    printCarPosition(car);

    // then: 자동차 이름을 같이 출력하는지 확인
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(car.name));
  });

  test('자동차 경주가 완료되면, 누가 우승했는지를 출력한다.', () => {
    // given: 임의의 자동차 경주 시작
    const race = new Race([
      new Car('pobi'),
      new Car('crong'),
      new Car('honux'),
    ]);
    race.initRace();

    // when: 우승자 출력
    const spy = jest.spyOn(console, 'log');
    printRaceWinners(race);

    // then: 자동차 이름을 같이 출력하는지 확인
    race.winners.forEach(winner => {
      expect(spy).toHaveBeenCalledWith(expect.stringContaining(winner.name));
    });
  });
});
