/**
 * [x] 전진하는 자동차는 이름을 같이 출력
 * [x] 자동차 이름은 쉼표(,)를 기준으로 구분
 * [x] 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
 * [x] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
 */
import InputOutput from '../src/domain/InputOutput';

describe('입출력에 ', () => {
  
  it('자동차 이름은 쉼표(,)를 기준으로 구분 a,b,c구분 되는지 확인', () => {
    // given
    const input = new InputOutput("a,b,c");
    // when
    const carNames = input.carNames;
    // then 
    expect(carNames).toBe("a,b,c");
  });

  it('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다 자동차이름a,b,를 줘서 오류나는지 확인', () => {
    // given
    const carNames = "a,b,";
    // when
    
    // then 
    expect(() => new InputOutput(carNames)).toThrow('자동차 이름은 1자 이상 5자 이하로 문자로 입력해주세요.');
  });

  it('전진하는 자동차는 이름을 같이 출력 자동차 전진할때 이름 같이 출력되는지 확인', () => {
    // given
    const input = new InputOutput("a,b,c");
    const [firstCar] = input.cars;
    firstCar.conditionsMove(5);
    firstCar.conditionsMove(5);
    // when
    const raceOutput = input.raceOutput;

    // then 
    expect(raceOutput).toBe("a : --\nb : \nc : \n");
  });

  it('자동차 경주 완료한후 누가 우승했는지 알려준다 우승자가 한명일경우 우승자 a가 잘나오는지 확인', () => {
    // given
    const input = new InputOutput("a,b,c");
    const [firstCar] = input.cars;
    firstCar.conditionsMove(5);
    firstCar.conditionsMove(5);
    // when
    const raceWinner = input.winner;
    // then 
    expect(raceWinner).toBe("a가 최종 우승했습니다.");
  });

  it('자동차 경주 완료한후 누가 우승했는지 알려준다 우승자가 두명일경우 우승자 a,b가 잘나오는지 확인', () => {
    // given
    const input = new InputOutput("a,b,c");
    const [firstCar, secondCar] = input.cars;
    firstCar.conditionsMove(5);
    firstCar.conditionsMove(5);
    secondCar.conditionsMove(5);
    secondCar.conditionsMove(5);
    // when
    const raceWinner = input.winner;
    // then 
    expect(raceWinner).toBe("a,b가 최종 우승했습니다.");
  });
});