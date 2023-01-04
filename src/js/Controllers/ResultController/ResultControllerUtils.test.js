import { getWinnersName } from './ResultControllerUtils.js';

describe('ResultController test', () => {
  it('결과에 따른 승자 이름을 정확하게 뽑아내야한다.', () => {
    const carStates = [
      {
        name: '1',
        distance: 3,
      },
      {
        name: '2',
        distance: 2,
      },
      {
        name: '3',
        distance: 6,
      },
      {
        name: '4',
        distance: 4,
      },
    ];

    const winnerName = getWinnersName(carStates);
    console.log(winnerName);
  });
});
