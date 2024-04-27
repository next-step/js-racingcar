import View from '../src/View/View';

/* 
입출력
- 자동차는 쉼표를 기준으로 구분하여 입력받는다.
- 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- 우승자는 쉼표를 기준으로 구분하여 출력된다.
- 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
*/

describe('View 테스트', () => {
  test('자동차는 쉼표를 기준으로 구분하여 입력받는다.', () => {
    // given
    jest.mock('../src/utils/readLineAsync', () => {
      return {
        __esModule: true,
        default: jest
          .fn()
          .mockImplementation(() => Promise.resolve('pobi,crong,honux')),
      };
    });

    const view = new View();

    // when
    const cars = view.readCars();

    // then
    expect(cars).toEqual(['pobi', 'crong', 'honux']);
  });
});
