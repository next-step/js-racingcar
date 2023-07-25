import Car from '../src/Car';

describe('자동차 class 속성 테스트', () => {
  const carName = '자동차';
  let car = null;

  beforeEach(() => {
    car = new Car(carName);
  });

  test('Car class는 name이 있다.', () => {
    expect(car.getName()).toBe(carName);
  });

  test('자동차의 주행거리의 초기값은 0이다.', () => {
    expect(car.getDistanceDriven()).toBe(0);
  });

  describe('자동차 전진 조건 테스트', () => {
    test('랜덤으로 생성한 숫자가 4이상이면 자동차가 전진할 수 있는 상태이다', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.4);

      expect(car.canMoveForward()).toBe(true);

      jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('랜덤으로 생성한 숫자가 4보다 작으면 자동차가 전진할 수 없는 상태이다.', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.3);

      expect(car.canMoveForward()).toBe(false);

      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });

  describe('자동차 전진 테스트', () => {
    test('조건을 만작하고 자동차가 전진시 주행거리의 값이 1 늘어난다.', () => {
      const prevDistanceDriven = car.getDistanceDriven();
      jest.spyOn(global.Math, 'random').mockReturnValue(0.4);

      car.moveForward();

      expect(car.getDistanceDriven()).toBe(prevDistanceDriven + 1);

      jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('조건을 만족하고 자동차가 두번 전진시 주행거리의 값이 2 늘어난다.', () => {
      const prevDistanceDriven = car.getDistanceDriven();
      jest.spyOn(global.Math, 'random').mockReturnValue(0.4);

      car.moveForward();
      car.moveForward();

      expect(car.getDistanceDriven()).toBe(prevDistanceDriven + 2);

      jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('조건을 만족하지 않으면 자동차는 전진하지 않는다.', () => {
      const prevDistanceDriven = car.getDistanceDriven();
      jest.spyOn(global.Math, 'random').mockReturnValue(0.3);

      car.moveForward();

      expect(car.getDistanceDriven()).toBe(prevDistanceDriven);

      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });

  describe('자동차 정보 출력 테스트', () => {
    test('주행거리가 0일 떄는 주행거리 없이 이름만 출력 된다.', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
      const logSpy = jest.spyOn(console, 'log');

      car.printInfo();

      expect(logSpy).toHaveBeenCalledWith(`${carName} : `);

      jest.spyOn(global.Math, 'random').mockRestore();
    });

    describe('주행거리가 0 이상이면 이름과 주행거리를 같이 출력한다.', () => {
      test('주행거리가 1일 때', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        const logSpy = jest.spyOn(console, 'log');

        car.moveForward();
        car.printInfo();

        expect(logSpy).toHaveBeenCalledWith(`${carName} : -`);

        jest.spyOn(global.Math, 'random').mockRestore();
      });

      test('주행거리가 2일 때', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        const logSpy = jest.spyOn(console, 'log');

        car.moveForward();
        car.moveForward();
        car.printInfo();

        expect(logSpy).toHaveBeenCalledWith(`${carName} : --`);

        jest.spyOn(global.Math, 'random').mockRestore();
      });
    });
  });
});
