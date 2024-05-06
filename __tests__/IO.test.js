import { Race } from '../src/domain/Race';
import { Car, ERROR_MESSAGE_NAME_LENGTH } from '../src/domain/Car';
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
    await expect(cario.inputCars()).rejects.toThrow('이름 구분은 쉼표(,)로 가능합니다.');
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
    await expect(cario.RepeatUntilNumber(10)).resolves.toBe(5);
  });

  test('사용자가 숫자 이외 다른값을 입력할 경우 콘솔에 에러가 입력된다.', async () => {
    //Given
    const cario = new CarIO();
    cario.readLineAsync = jest.fn().mockResolvedValue('asdasdas');
    cario.validateCheckNumeric = jest.fn().mockReturnValue(false); // 숫자 유효성 검사 항상 실패로 설정

    //when
    const result = await cario.RepeatUntilNumber(10);

    //Then
    expect(result).toBe(-1);
  });

  test('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.', async () => {
    //Given
    const cario = new CarIO();

    // when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmasdasw,audi,kia');

    await expect(cario.inputCars()).rejects.toThrow(ERROR_MESSAGE_NAME_LENGTH);
  });
});
