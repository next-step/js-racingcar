import { checkCanMoveForward } from '../../src/GameSimulator/utils';
import * as getRandomInRangeModule from '../../src/utils/getRandomInRange';

describe('자동차 전진 조건 테스트', () => {
  test.each([4, 5, 6, 7, 8, 9])(
    '랜덤으로 생성한 숫자가 %i이면 자동차가 전진할 수 있는 상태이다',
    (randomNumber) => {
      const getRandomInRangeSpy = jest
        .spyOn(getRandomInRangeModule, 'getRandomInRange')
        .mockReturnValue(randomNumber);

      expect(checkCanMoveForward()).toBe(true);

      getRandomInRangeSpy.mockRestore();
    }
  );

  test.each([1, 2, 3])(
    '랜덤으로 생성한 숫자가 %i이면 자동차가 전진할 수 없는 상태이다',
    (randomNumber) => {
      const getRandomInRangeSpy = jest
        .spyOn(getRandomInRangeModule, 'getRandomInRange')
        .mockReturnValue(randomNumber);

      expect(checkCanMoveForward()).toBe(false);

      getRandomInRangeSpy.mockRestore();
    }
  );
});
