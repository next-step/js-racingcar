import { Car } from '../src/domain/Car';
import { Race } from '../src/domain/Race';
import { CarIO } from '../src/view/CarIO';

describe('입출력 관련된 것들', () => {
  test('자동차 이름은 쉼표(,)로 구분하지 않을경우, Error가 발생한다.', async () => {
    //Given
    const cario = new CarIO();
    // when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmw audi kia');

    // then
    expect(async () => {
      await cario.inputCars();
    }).toThrow();
  });

  test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    //Given
    const cario = new CarIO();
    const bmw = new Car('bmw');
    const audi = new Car('audi');
    const kia = new Car('kia');

    const logSpy = jest.spyOn(global.console, 'log');
    audi.getRandomValue = jest.fn().mockReturnValue(5);
    bmw.getRandomValue = jest.fn().mockReturnValue(5);
    kia.getRandomValue = jest.fn().mockReturnValue(5);
    const racingCars = [audi, bmw, kia];
    const race = new Race(racingCars);

    //when
    race.racingStart(cario.showRacingResult);

    //then
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(15);
    expect(logSpy).toHaveBeenCalledWith('bmw : 5');
    expect(logSpy.mock.calls).toContainEqual(['audi : 5']);

    logSpy.mockRestore();
  });

  test('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.', async () => {
    //Given
    const cario = new CarIO();

    // when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmw,audi,kia');
    await cario.inputCars(); // 비동기 호출을 기다리기 위해 await 추가
    jest.spyOn(cario, 'checkCarValidate').mockImplementation(() => {
      throw new Error('잘못된 입력 값입니다.');
    });

    expect(() => cario.checkCarValidate()).toThrow('잘못된 입력 값입니다.');
  });
});
