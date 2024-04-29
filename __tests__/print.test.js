import Car from '../src/domain/Car';
import { printCarPosition } from '../src/utils/print';

describe('진행 결과 출력 Utils', () => {
  let car;

  beforeEach(() => {
    const RANDOM_NAME = 'jam';
    car = new Car(RANDOM_NAME);
  });

  test('자동차의 위치를 출력할 때, 자동차 이름을 같이 출력한다.', () => {
    // when: 위치 출력
    const spy = jest.spyOn(console, 'log');
    printCarPosition(car);

    // then: 자동차 이름을 같이 출력하는지 확인
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(car.name));
  });
});
