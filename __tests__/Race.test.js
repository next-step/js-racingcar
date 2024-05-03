import Race from '../src/domain/Race';
import InputOutput from '../src/domain/InputOutput';
import {getRandomNum} from '../src/common';

/**
 * [x] 5회로 고정하여 진행한다. 
 * [x] 자동차 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4이상일 경우이다.
 */

describe('자동차 레이싱은 ', () => {
  it('lab은 랩은 숫자만 가능합니다. 랩이 문자일때 에러 확인', () => {
    const input = new InputOutput('pobi,crong,honux');
    const lab = '5';
    expect(() => new Race(input, lab)).toThrow('랩은 숫자이거나 0보다 커야 합니다.');
  })

  it('lab은 랩은 0보다 커야 합니다. 랩이 0일때 에러 확인', () => {
    const input = new InputOutput('pobi,crong,honux');
    expect(() => new Race(input, 0)).toThrow('랩은 숫자이거나 0보다 커야 합니다.');
  })


  it('5회로 고정하여 진행한다 레이싱이 5회다 되었는지 현재랩 5확인', async() => {
    const input = new InputOutput('pobi,crong,honux');
    const carRace = new Race(input);
    await carRace.start();
    const currentLab = carRace.currentLab;
    expect(currentLab).toBe(5);
  })
  
  it('무작위값이 0에서 9사이인지 확인한다.', async() => {
    const number = await getRandomNum();
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(9);
  })
});

