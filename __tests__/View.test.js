import View from '../src/View/View';

/* 
입출력
- 자동차는 쉼표를 기준으로 구분하여 입력받는다.
- 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- 우승자는 쉼표를 기준으로 구분하여 출력된다.
- 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
*/

jest.mock('../src/utils/readLineAsync', () => {
  return jest
    .fn()
    .mockImplementation(() => Promise.resolve('pobi,crong,honux'));
});

describe('View 테스트', () => {
  let view;

  beforeEach(() => {
    view = new View();
  });

  describe('정상 케이스 테스트', () => {
    test('자동차는 쉼표를 기준으로 구분하여 입력받는다.', async () => {
      // when
      const cars = await view.readCars();

      // then
      expect(cars).toEqual(['pobi', 'crong', 'honux']);
    });

    test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
      // given
      const logSpy = jest.spyOn(console, 'log');
      const input = [
        { name: 'pobi', position: 2 },
        { name: 'crong', position: 4 },
        { name: 'honux', position: 0 },
      ];
      const expected = 'pobi : --\ncrong : ----\nhonux : \n';

      // when
      view.printRoundState(input);

      // then
      expect(logSpy).toHaveBeenCalledWith(expected);
    });

    test.each([
      [['pobi'], 'pobi가 최종 우승했습니다.'],
      [['pobi', 'honux'], 'pobi, honux가 최종 우승했습니다.'],
    ])('우승자는 쉼표를 기준으로 구분하여 출력된다.', (input, expected) => {
      // given
      const logSpy = jest.spyOn(console, 'log');

      // when
      view.printWinners(input);

      // then
      expect(logSpy).toHaveBeenCalledWith(expected);
    });

    describe('예외 케이스 테스트', () => {
      // ...
    });
  });
});
