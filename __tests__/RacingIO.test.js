import RacingIO from '../src/domain/RacingIO';

describe('레이싱 입출력 기능 테스트', () => {
  it('자동차 이름은 쉼표(,)를 기준으로 구분한다.', async () => {
    // given
    const racingIO = new RacingIO();
    const input = 'taxi, tesla,ford ';

    // when
    const carName = racingIO.writeRacingCar(input);

    // then
    expect(carName).toEqual(['taxi', 'tesla', 'ford']);
  });
  it('자동차의 위치는 - 로 표시한다.', () => {
    // given
    const racingIO = new RacingIO();
    const input = 3;

    // when
    const output = racingIO.readCarPosition(input);

    // then
    expect(output).toBe('---');
  });
  it('우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.', () => {
    // given
    const racingIO = new RacingIO();
    const winners = ['taxi', 'ford'];
    const [winner] = winners;

    // when
    const winnersOutput = racingIO.readWinners(winners);
    const winnerOutput = racingIO.readWinners(winner);

    // then
    expect(winnersOutput).toBe('taxi, ford');
    expect(winnerOutput).toBe('taxi');
  });
});
