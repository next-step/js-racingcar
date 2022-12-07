import { getWinnersName } from './ResultController.js';

describe('경기 결과 뽑아내기', () => {
  it('mock 결과 중에서 가장 거리가 멀리간 이름들만 뽑아와야한다.', () => {
    const mockResult = [
      {
        name: 'a',
        distance: 3,
      },
      {
        name: 'b',
        distance: 6,
      },
      {
        name: 'c',
        distance: 2,
      },
      {
        name: 'd',
        distance: 3,
      },
      {
        name: 'e',
        distance: 5,
      },
      {
        name: 'f',
        distance: 1,
      },
    ];

    const winners = getWinnersName(mockResult);
    expect(winners).equals(['b']);
  });

  it('mock 결과 중에서 가장 거리가 멀리간 거리가 동일하면 그 이름들만 뽑아와야한다.', () => {
    const mockResult = [
      {
        name: 'a',
        distance: 3,
      },
      {
        name: 'b',
        distance: 5,
      },
      {
        name: 'c',
        distance: 2,
      },
      {
        name: 'd',
        distance: 3,
      },
      {
        name: 'e',
        distance: 5,
      },
      {
        name: 'f',
        distance: 1,
      },
    ];

    const winners = getWinnersName(mockResult);
    expect(winners).equals(['b', 'e']);
  });

  it('최고로 멀리간 거리가 0이어도 모두 가져올 수 있다.', () => {
    const mockResult = [
      {
        name: 'a',
        distance: 0,
      },
      {
        name: 'b',
        distance: 0,
      },
      {
        name: 'c',
        distance: 0,
      },
      {
        name: 'd',
        distance: 0,
      },
      {
        name: 'e',
        distance: 0,
      },
      {
        name: 'f',
        distance: 0,
      },
    ];

    const winners = getWinnersName(mockResult);
    expect(winners).equals(['a', 'b', 'c', 'd', 'e', 'f']);
  });
});
