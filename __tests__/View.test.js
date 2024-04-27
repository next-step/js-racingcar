import { readLineAsync } from "../src/utils/index.js";
import { TEST_CARS } from "../src/const"


/**
 * 
## 입출력
- [x] 쉼표를 기준으로 자동차 이름을 받는다.
- [ ] 우승자가 여러명일 경우, 쉼표로 구분하여 출력한다.
- [ ] 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
 */

describe("입출력 테스트", () => {
  test("쉼표를 기준으로 자동차 이름을 받는다.", async() => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_CARS.join(","));
    const input = await mockReadLineAsync();
    
    // when
    const carNames = input.split(",");
    
    // then
    carNames.forEach((car, index) => {
      expect(car).toBe(TEST_CARS[index]);
    });
  })
})