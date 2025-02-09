import ValidationError from './shared/validationError';
import Car from './main';

describe('자동차 경주 테스트', () => {
  const CAR_NAME = 'toyota';

  describe('자동차 경주 테스트 - 에러 처리', () => {
    it('Car에 String이 아닌 다른 타입의 데이터가 들어오면 에러를 뱉어야 한다.', () => {
      try {
        // eslint-disable-next-line no-new
        new Car(123);
        throw new Error('테스트 작동하지 않음');
      } catch (err) {
        expect(err).toBeInstanceOf(ValidationError);
        expect(err.message).toBe('자동차의 이름은 문자열만 입력 가능합니다.');
      }
    });

    it('Car에 빈 문자열이 들어오면 에러를 뱉어야 한다.', () => {
      try {
        // eslint-disable-next-line no-new
        new Car('');
        throw new Error('테스트 작동하지 않음');
      } catch (err) {
        expect(err).toBeInstanceOf(ValidationError);
        expect(err.message).toBe('자동차의 이름은 1글자 이상 입력하셔야 합니다.');
      }
    });
  });

  it('자동차는 이름을 상태로 가질 수 있다.', () => {
    const car = new Car(CAR_NAME);
    expect(car.getName()).toBe(CAR_NAME);
  });

  it('자동차는 위치 값을 가지며, 초기 상태는 0이다.', () => {
    const car = new Car(CAR_NAME);
    expect(car.getLocation()).toBe(0);
  });

  it('자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.', () => {
    const car = new Car(CAR_NAME);
    car.moveForward();
    expect(car.getLocation()).toBe(1);
    car.moveForward();
    expect(car.getLocation()).toBe(2);
  });
});
