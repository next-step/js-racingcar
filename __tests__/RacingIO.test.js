import RacingIO from '../src/domain/RacingIO';

describe('레이싱 입출력 기능 테스트', () => {
  it('자동차 이름은 쉼표(,)를 기준으로 구분한다.', async () => {
    // given
    const racingIO = new RacingIO();
    const input = 'taxi, tesla,ford ';

    // when
    const carName = racingIO.racingCarInput(input);

    // then
    expect(carName).toEqual(['taxi', 'tesla', 'ford']);
  });
  it('자동차의 위치는 - 로 표시한다.', () => {
    // given
    const racingIO = new RacingIO();
    const input = 3;

    // when
    const output = racingIO.positionToString(input);

    // then
    expect(output).toBe('---');
  });
});
