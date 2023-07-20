import { Car } from '../src/Models';
// 1단계

/*
- [ ] 자동차 이름을 입력받는다.
- [ ] 입력받은 횟수만큼 경기를 진행한다.
- [ ] 매 경주마다 모두 1칸씩 전진한다.
- [ ] 게임의 우승자를 출력한다. 여러명일 경우 쉼표로 구분한다.
  - [ ] 자동차 경주 게임을 완료한 후, 한 명 이상의 우승자를 출력한다.
  - [ ] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
 */

describe('Views', () => {
  describe('InputView', () => {
    const inputValue = 'Boong Boong Car';
    const car = new Car(inputValue);

    test('자동차 이름을 입력받는다.', () => {
      const carName = car.getName(); // 과연 getter가 바람직한가? 고민해보자.

      expect(carName).toBe(inputValue);
    });
  });
});
