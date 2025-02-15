import Race from '../src/domain/race.js';
import Car from '../src/domain/car.js';
import generateRandomNumber from '../src/shared/generateRandomNumber.js';

jest.mock('../src/shared/generateRandomNumber');

describe('자동차 경주', () => {
  let name = null;
  let cars = null;
  let race = null;
  const count = 5;

  beforeEach(() => {
    name = ['to', 'kia', 'jest'];
    cars = name.map((car) => new Car(car));
    race = new Race(cars, count);
  });

  it('Car List 인스턴스를 받아 자동차 경주를 준비 할 수 있다.', () => {
    expect(race.cars).toEqual(cars);
  });

  it('라운드의 궤적 데이터를 저장 하여야 한다.', () => {
    race.startRace();
    expect(race.getResult()).toHaveLength(count);
  });

  describe('랜덤값이 모두 4 이상일 경우', () => {
    beforeAll(() => {
      generateRandomNumber.mockImplementation(() => 4);
    });

    afterAll(() => {
      generateRandomNumber.mockRestore();
    });

    it('startRace()를 호출하면 모든 자동차가 매 라운드 전진하여 결과가 누적된다', () => {
      const trajectory = race.startRace();

      expect(trajectory).toHaveLength(5);

      trajectory.forEach((roundData, index) => {
        const expectedLocation = index + 1;
        roundData.trajectory.forEach((carData) => {
          expect(carData.location).toBe(expectedLocation);
        });
      });
    });

    it('getWinner() 호출 시 모든 자동차가 우승자로 반환된다', () => {
      race.startRace();
      const winners = race.getWinner();

      expect(winners).toStrictEqual(['to', 'kia', 'jest']);
    });
  });

  describe('랜덤값이 자동차별로 다르게 반환되는 경우', () => {
    describe('자동차 하나만 통과한 경우', () => {
      let mockRandomNumbers;
      beforeAll(() => {
        const sequence = [4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2];
        mockRandomNumbers = () => sequence.shift();
        generateRandomNumber.mockImplementation(mockRandomNumbers);
      });

      afterAll(() => {
        generateRandomNumber.mockRestore();
      });

      it('레이스가 종료되면 첫번 째 자동차만 우승한다.', () => {
        race.startRace();
        const winner = race.getWinner();

        expect(winner).toStrictEqual(['to']);
      });
    });

    describe('자동차가 1개 이상 통과한 경우', () => {
      let mockRandomNumbers;
      beforeAll(() => {
        const sequence = [4, 2, 8, 4, 2, 8, 4, 2, 8, 4, 2, 8, 4, 2, 8];
        mockRandomNumbers = () => sequence.shift();

        generateRandomNumber.mockImplementation(mockRandomNumbers);
      });

      afterAll(() => {
        generateRandomNumber.mockRestore();
      });

      it('레이스가 종료되면 첫번 째, 두번 째 자동차만 우승한다.', () => {
        race.startRace();
        const winner = race.getWinner();
        expect(winner).toStrictEqual(['to', 'jest']);
      });
    });
  });
});
