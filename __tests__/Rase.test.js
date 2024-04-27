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
    audi.getRandomValue = jest.fn().mockReturnValue(5);
    bmw.getRandomValue = jest.fn().mockReturnValue(5);
    kia.getRandomValue = jest.fn().mockReturnValue(5);
    race.racingStart();

    //then
    expect(race.getWinner()).toBeDefined();
  });

  test('우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.', () => {
    //Given
    const audi = new Car();
    const bmw = new Car();
    const kia = new Car();
    audi.setName('audi');
    bmw.setName('bmw');
    kia.setName('kia');

    audi.getRandomValue = jest.fn().mockReturnValue(5);
    bmw.getRandomValue = jest.fn().mockReturnValue(5);
    kia.getRandomValue = jest.fn().mockReturnValue(5);
    const racingCars = [audi, bmw, kia];
    const race = new Race(racingCars);

    //When
    race.racingStart();

    //then
    expect(race.getWinner()).toEqual('audi,bmw,kia');
  });
});
