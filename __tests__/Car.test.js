import Car from '../src/domain/Car';
/**
 * - [x] 자동차에 이름을 부여할 수 있다.
 * - [x] 이름은 5자 이하만 가능하다.
 * - [x] 자동차가 전진 또는 멈출 수 있다.
 */
describe('자동차에 ', () => {
  
  it('자동차 이름을 부여할 수 있다. 자동차 이름 5글자 부여가능한지 확인', () => {
    const car = new Car("다섯글자다"); 
    expect(car.name.length).toBe(5);
  });

  it('자동차 이름은 5자 이하로 입력할수 있다. 자동차 이름 6글자일때 에러 확인', () => {
    expect(() => new Car("여섯글자다1")).toThrow('자동차 이름은 1자 이상 5자 이하로 문자로 입력해주세요.');
  });

  it('자동차가 4이상일 경우 전진 한다. 무작위수 4이상일경우 전진하는지 확인', () => {
    const car = new Car("전진");
    car.conditionsMove(4);
    expect(car.position).toBe(1);
  })

  it('자동차가 3이하일 경우 멈춘다. 무작위수 3을 줘서 멈추는지 확인', () => {
    const car = new Car("스탑");
    car.conditionsMove(3);
    expect(car.position).toBe(0);
  });
})