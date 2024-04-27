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
});
