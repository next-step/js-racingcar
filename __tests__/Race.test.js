import { Car } from '../src/domain/Car';
import { Race } from '../src/domain/Race';

describe('레이스 관련 내용 ', () => {
  test('경주에 참여하는 차들은 여러대가 가능하다.', () => {
    //Given
    const race = new Race();

    //when
    race.racingCars = [new Car('bmw'), new Car('audi'), new Car('kia')];

    //then
    expect(race.racingCars.length).toBe(3);
  });

  test('자동차 경주는 5회로 고정하여 진행하고, 자동차 경주가 완료된 후에는 누가 우승했는지 알 수 있다.', () => {
    //Given
    const race = new Race();

    //When
    race.racingCars = [new Car('bmw'), new Car('audi'), new Car('kia')];
    const RACING_COUNT = 5;
    const mockRandomValue = jest.fn().mockReturnValue(5);
    race.racingStart(RACING_COUNT, mockRandomValue);

    //then
    expect(race.winners).toBe('bmw,audi,kia');
  });

  test('우승자는 여러명일 수 있고, 여러명일 경우, 쉼표(,)를 이용하여 구분한다.', () => {
    //Given
    const race = new Race([new Car('bmw'), new Car('audi'), new Car('kia')]);

    //When
    race.racingCars = [new Car('bmw'), new Car('audi'), new Car('kia')];
    const RACING_COUNT = 5;
    const mockRandomValue = jest.fn().mockReturnValue(5);
    race.racingStart(RACING_COUNT, mockRandomValue);

    //then
    expect(race.winners).toContain(',');
  });
});
