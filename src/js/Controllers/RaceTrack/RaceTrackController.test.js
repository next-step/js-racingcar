/**
 * @jest-environment jsdom
 */
const { checkIsCanBeAdvanced, attachNextRaceState } = require('./RaceTrackController.js');
const { getState, dispatch: dispatchRaceState } = require('../../Models/race.js');
const { dispatch } = require('../../Models/global.js');

describe('Race Controller Test', () => {
  describe('랜덤숫자를 뽑고 4이상이면 전진한다.', () => {
    it('4 이상의 숫자는 true이다.', () => {
      expect(checkIsCanBeAdvanced(9)).toBe(true);
      expect(checkIsCanBeAdvanced(8)).toBe(true);
      expect(checkIsCanBeAdvanced(7)).toBe(true);
      expect(checkIsCanBeAdvanced(6)).toBe(true);
      expect(checkIsCanBeAdvanced(5)).toBe(true);
      expect(checkIsCanBeAdvanced(4)).toBe(true);
      expect(checkIsCanBeAdvanced(4.1)).toBe(true);
    });

    it('4 이하의 숫자는 false이다.', () => {
      expect(checkIsCanBeAdvanced(1)).toBe(false);
      expect(checkIsCanBeAdvanced(2)).toBe(false);
      expect(checkIsCanBeAdvanced(3)).toBe(false);
      expect(checkIsCanBeAdvanced(3.999)).toBe(false);
    });
  });

  describe('레이스 진행 테스트', () => {
    it('레이스를 진행하면 기존 race State의 distance가 변화되고 변화 내용은 진행판단 boolean과 일치해야한다.', () => {
      const mockRaceState = [
        {
          name: 'car1',
          distance: 0,
        },
        {
          name: 'car2',
          distance: 0,
        },
        {
          name: 'car3',
          distance: 0,
        }
      ];

      const [carShouldAdvanceResults, newRaceState] = attachNextRaceState(mockRaceState);
      newRaceState.forEach(({ distance }, i) => {
        expect(!!distance).toBe(carShouldAdvanceResults[i]);
      });
    });
  });
});
