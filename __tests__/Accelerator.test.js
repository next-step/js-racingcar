import { Accelerator } from '../src/domain/models/Accelerator/index.js';

describe('엑셀은 accelerate 메서드 호출시', () => {
  it('lowerBound 이상 upperBound 미만의 랜덤값이 threshold 이상이면 true를 반환한다.', () => {
    const accelerator = new Accelerator({
      lowerBound: 4,
      upperBound: 10,
      threshold: 4,
    });

    expect(accelerator.accelerate()).toBe(true);
  });

  it('lowerBound 이상 upperBound 미만의 랜덤값이 threshold 미만이면 false를 반환한다.', () => {
    const accelerator = new Accelerator({
      lowerBound: 5,
      upperBound: 5,
      threshold: 8,
    });

    expect(accelerator.accelerate()).toBe(false);
  });
});
