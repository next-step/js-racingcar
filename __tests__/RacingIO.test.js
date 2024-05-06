import {
  readWinners,
  readCarPosition,
  writeRacingCar,
  readCarProgress,
  writeNumber,
} from '../src/domain/RacingIO';
import Car from '../src/domain/Car';

describe('레이싱 입출력 기능 테스트', () => {
  it('자동차 이름은 쉼표(,)를 기준으로 구분한다.', async () => {
    // given
    const input = 'taxi, tesla,ford ';

    // when
    const carName = writeRacingCar(input);

    // then
    expect(carName).toEqual(['taxi', 'tesla', 'ford']);
  });
  it('자동차의 위치는 - 로 표시한다.', () => {
    // given
    const input = 3;

    // when
    const output = readCarPosition(input);

    // then
    expect(output).toBe('---');
  });
  it('레이싱 진행 상황을 표시한다.', () => {
    // given
    const car = new Car('tesla');
    const carName = car.carName;

    // when
    const output = readCarProgress(car);

    // then
    expect(output).toBe(`${carName} : `);
  });
  it('우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.', () => {
    // given
    const winners = ['taxi', 'ford'];
    const [winner] = winners;

    // when
    const winnersOutput = readWinners(winners);
    const winnerOutput = readWinners(winner);

    // then
    expect(winnersOutput).toBe('taxi, ford');
    expect(winnerOutput).toBe('taxi');
  });
  it('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.', () => {
    // given
    const input = '';

    // when
    const userAction = writeRacingCar;

    // then
    expect(() => userAction(input)).toThrow();
  });
  describe('사용자는 경기 진행 횟수를 입력할 수 있다.', () => {
    it('정수만 입력할 수 있다.', () => {
      // given
      const input = 10;
      // when
      const output = writeNumber(input);
      // then
      expect(output).toBe(10);
    });
    it('표현할 수 없는 너무 큰 숫자는 제한한다.', () => {
      const input = Infinity;

      expect(() => writeNumber(input)).toThrow();
    });
    it('숫자가 아닌경우 에러를 발생시킨다.', () => {
      const input = '4078ca';

      expect(() => writeNumber(input)).toThrow();
    });
  });
});
