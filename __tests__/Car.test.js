import Car from '../src/Car';

/* 
- 자동차에 5자 이하의 이름을 부여할 수 있다.
- 자동차는 전진하거나 멈출 수 있다.
- 전진하는 경우는 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
*/

describe('자동차 테스트', () => {
  test('자동차 이름은 5자 이하여야 한다.', () => {
    // given
    const car = new Car('pobi');

    // when
    const { name } = car;

    // then
    expect(name.length <= 5).toBeTruthy();
  });
});
