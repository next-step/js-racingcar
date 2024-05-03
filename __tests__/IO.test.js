import { Car, ERROR_MESSAGE_NAME_LENGTH } from '../src/domain/Car';
import { Race } from '../src/domain/Race';
import {
  CarIO,
  ERROR_MESSAGE_COMMA_SEPARTED,
  ERROR_MESSAGE_NUMERIC,
} from '../src/view/CarIO';

describe('입출력 관련된 것들', () => {
  test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', async () => {
    //Given
    const cario = new CarIO();
    const race = new Race();
    const logSpy = jest.spyOn(global.console, 'log');

    //when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmw,audi,kia');
    race.racingCars = await cario.inputCars();
    const RACING_COUNT = 5;
    const mockRandomValue = jest.fn().mockReturnValue(5);
    race.startRacing(RACING_COUNT, mockRandomValue);
    cario.showProgressResult(race.racingProgress);

    //then
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('bmw : 1\naudi : 1\nkia : 1')
    );

    logSpy.mockRestore();
  });

  test('자동차 이름은 쉼표(,)로 구분하지 않을 경우, 프로그램을 종료한다.', async () => {
    // Given
    const cario = new CarIO();
    cario.readLineAsync = jest.fn().mockResolvedValue('bmw audi kia');

    // then
    await expect(cario.inputCars()).rejects.toThrow(ERROR_MESSAGE_COMMA_SEPARTED);
  });

  test('이름을 5자 초과로 입력했을 경우, 프로그램을 종료한다.', async () => {
    //Given
    const cario = new CarIO();
    const race = new Race();
    // when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmasdasw,audi,kia');

    await expect(cario.inputCars()).rejects.toThrow(ERROR_MESSAGE_NAME_LENGTH);
  });

  test('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', async () => {
    //Given
    const cario = new CarIO();

    //when
    cario.readLineAsync = jest.fn().mockResolvedValue('5');

    //then
    await expect(cario.inputNumberOfRaces()).resolves.toBe('5');
  });

  test('사용자가 숫자 이외 다른값을 입력할 경우 콘솔에 에러가 입력된다.', async () => {
    //Given
    const cario = new CarIO();
    const logSpy = jest.spyOn(global.console, 'log');

    //when
    cario.readLineAsync = jest.fn().mockResolvedValueOnce('asdasdas');
    const result = await cario.inputNumberOfRaces(0);

    //then
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGE_NUMERIC);
  });

  test('잘못 입력한 경우, 다시입력이 가능하나 가능 횟수에 제한을 둔다.', async () => {
    //Given
    const cario = new CarIO();
    const logSpy = jest.spyOn(global.console, 'log');

    //when
    cario.readLineAsync = jest.fn().mockResolvedValueOnce('asdasdas');
    await cario.inputNumberOfRaces(10);

    //then
    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGE_NUMERIC);
  });
});
