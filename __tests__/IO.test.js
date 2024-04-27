import { Car } from '../src/domain/Car';
import { Race } from '../src/domain/Race';
import { CarIO } from '../src/view/CarIO';

describe('입출력 관련된 것들', () => {
  test('자동차 이름은 쉼표(,)를 기준으로 구분하여 입력받는다.', async () => {
    // 비동기 테스트를 위해 async 추가
    //Given
    const cario = new CarIO();

    // when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmw,audi,kia');
    await cario.inputCars(); // 비동기 호출을 기다리기 위해 await 추가

    // then
    expect(cario.getCars()).toBe('bmw,audi,kia');
  });

  test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    //Given

    const cario = new CarIO();

    const bmw = new Car();
    const audi = new Car();
    const kia = new Car();

    bmw.setName('bmw');
    audi.setName('audi');
    kia.setName('kia');

    audi.getRandomValue = jest.fn().mockReturnValue(5);
    bmw.getRandomValue = jest.fn().mockReturnValue(5);
    kia.getRandomValue = jest.fn().mockReturnValue(5);
    const racingCars = [audi, bmw, kia];
    const race = new Race(racingCars);

    //when
    race.racingStart(cario.showRacingResult);
    const logSpy = jest.spyOn(global.console, 'log');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalled(15);
    expect(logSpy).toHaveBeenCalledWith('bmw : 5');
    expect(logSpy.mock.Calls).toContainEqual(['audi : 5']);
  });
});
