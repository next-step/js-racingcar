/**
 * [x] 전진하는 자동차는 이름을 같이 출력
 * [x] 자동차 이름은 쉼표(,)를 기준으로 구분
 * [x] 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
 * [x] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
 */
import InputOutput from '../src/domain/InputOutput';

describe('입출력에 ', () => {
  
  it('자동차 이름은 쉼표(,)를 기준으로 구분', () => {
    // given
    const input = new InputOutput("제발,그만,해주세요");
    // when
    const car_names = input.car_names;
    // then 
    expect(car_names).toBe("제발,그만,해주세요");
  });

  it('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다', () => {
    // given
    const car_names = "잘못,입력,";
    // when
    
    // then 
    expect(() => new InputOutput(car_names)).toThrow('잘못된 입력 값입니다.');
  });

  it('전진하는 자동차는 이름을 같이 출력', () => {
    // given
    const input = new InputOutput("제발,그만,해주세요");
    const cars = input.cars;
    cars[0].conditionsMove(5);
    cars[0].conditionsMove(5);
    // when
    const race_output = input.race_output;

    // then 
    expect(race_output).toBe("제발 : --\n그만 : \n해주세요 : \n");
  });

  it('자동차 경주 완료한후 누가 우승했는지 알려준다 우승자가 한명일경우', () => {
    // given
    const input = new InputOutput("제발,그만,해주세요");
    const cars = input.cars;
    cars[0].conditionsMove(5);
    cars[0].conditionsMove(5);
    // when
    const race_winner = input.winner;
    // then 
    expect(race_winner).toBe("제발가 최종 우승했습니다.");
  });

  it('자동차 경주 완료한후 누가 우승했는지 알려준다 우승자가 두명일경우', () => {
    // given
    const input = new InputOutput("제발,그만,해주세요");
    const cars = input.cars;
    cars[0].conditionsMove(5);
    cars[0].conditionsMove(5);
    cars[1].conditionsMove(5);
    cars[1].conditionsMove(5);
    // when
    const race_winner = input.winner;
    // then 
    expect(race_winner).toBe("제발,그만가 최종 우승했습니다.");
  });
});