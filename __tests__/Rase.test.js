import { Car } from '../src/domain/Car';

describe('레이스 관련 내용 ', () => {
  test('자동차 경우 게임이 완료한 후 누가 우승했는지 알려준다.', () => {
    const audi = Car();
    const bmw = Car();
    const kia = Car();

    const racingCars = [audi, bmw, kia];
    const rase = new Race(racingCars);

    rase.racingStart();

    expect(rase.winner()).toHaveReturned();
  });
});
