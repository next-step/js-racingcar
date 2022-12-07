import { checkIsCanBeAdvanced, progressRace } from './RaceTrackController.js';
import { getState, dispatch as dispatchRaceState } from '../../Model/race.js';
import { dispatch } from '../../Model/global.js';

describe('Race Controller Test', () => {
  describe('랜덤숫자를 뽑고 4이상이면 전진한다.', () => {
    it('4 이상의 숫자는 true이다.', () => {
      expect(checkIsCanBeAdvanced(9)).equal(true);
      expect(checkIsCanBeAdvanced(8)).equal(true);
      expect(checkIsCanBeAdvanced(7)).equal(true);
      expect(checkIsCanBeAdvanced(6)).equal(true);
      expect(checkIsCanBeAdvanced(5)).equal(true);
      expect(checkIsCanBeAdvanced(4)).equal(true);
      expect(checkIsCanBeAdvanced(4.1)).equal(true);
    });

    it('4 이하의 숫자는 false이다.', () => {
      expect(checkIsCanBeAdvanced(1)).equal(false);
      expect(checkIsCanBeAdvanced(2)).equal(false);
      expect(checkIsCanBeAdvanced(3)).equal(false);
      expect(checkIsCanBeAdvanced(3.999)).equal(false);
    });
  });

  describe('경기 진행 기록', () => {
    it('경기 진행 상황이 state에 기록되어야한다.', () => {
      const carDistances = [
        {
          name: 'first',
          distance: 0,
        },
        {
          name: 'second',
          distance: 0,
        }
      ];

      progressRace({ carDistances });
      const { raceCount } = getState();
      expect(raceCount).equal(1);
    });

    it('iterateCount를 3번 입력했으면 raceCount가 3으로 찍혀야 한다.', async () => {
      dispatch('iterationCount', 3);
      dispatchRaceState('ready', ['123', '456']);

      await new Promise((r) => setTimeout(r, 3001));
      const { raceCount } = getState();
      expect(raceCount).equal(3);
    });
  });
});
