import Car from "../src/main";

const NAME = "boky";

describe("콘솔에서 동작하는 자동차 경주 게임을 구현한다.", () => {
  it("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car(NAME);

    expect(car.name).toEqual(NAME);
  });

  it("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    const car = new Car(NAME);

    // 초기 상태
    expect(car.getStatus()).toEqual(`${NAME} : `);

    // 전진
    car.move();
    expect(car.getStatus()).toEqual(`${NAME} : -`);
  });
});
