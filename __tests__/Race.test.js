import { Car } from '../src/domain/Car';
import { Race } from '../src/domain/Race';

describe('레이스 관련 내용 ', () => {
  test('경주에 참여하는 차들은 여러대가 가능하다.', () => {
    //Given
    const race = new Race([new Car('bmw'), new Car('audi'), new Car('kia')]);

    //then
    expect(race.racingCars.length).toBe(3);
  });

  test('우승자가 여러명일 경우 (,) 쉼표를 이용해서 구분한다.', () => {
    const race = new Race([new Car('bmw'), new Car('audi'), new Car('kia')]);

    expect(race.winners).toBe('bmw,audi,kia');
  });
});
