import { Car } from '../src/domain/Car';
import { Race } from '../src/domain/Race';

describe('레이스 관련 내용 ', () => {
  test('자동차 경주 게임이 완료한 후 누가 우승했는지 알려준다.', () => {
    //Given
    const audi = new Car();
    const bmw = new Car();
    const kia = new Car();
    audi.setName('audi');
    bmw.setName('bmw');
    kia.setName('kia');

    const racingCars = [audi, bmw, kia];
    const race = new Race(racingCars);

    //When
    race.racingStart();

    //then

    expect(race.getWinner()).toBeDefined();
  });
});
