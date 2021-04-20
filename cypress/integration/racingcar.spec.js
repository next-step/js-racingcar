import {
  MSG,
  RACING_TIME_INTERVAL,
  NUMBERIC_CONDITIONS,
} from "./../../src/js/utils/constants.js";
import { randomNumber } from "./../../src/js/utils/randomNumber.js";
import { carsPositioning } from "./../../src/js/srcs/racing.js";

describe("racingcar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  const carNamesABCArr = ["A", "B", "C"];
  const carNamesABC = carNamesABCArr.join();
  const racingTimes3 = 3;

  const inputAndSubmitCarName = (name) => {
    cy.get("#inputCarName").type(name);
    cy.get("#submitCarName").click();
  };

  const inputAndSubmitRaceTimes = (times) => {
    cy.get("#inputRaceTimes").type(times);
    cy.get("#submitRaceTimes").click();
  };

  const alertMessage = (msg) => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(msg);
    });
  };

  it("1. 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.", () => {
    let racingTimes3 = 3;
    let arr = [Array(racingTimes3)].map(() => 0);

    inputAndSubmitCarName(carNamesABC);
    inputAndSubmitRaceTimes(racingTimes3);

    while (racingTimes3 > 0) {
      cy.wait(RACING_TIME_INTERVAL).then(() => {
        cy.get(".mt-4").each((carRace, i) => {
          const forwardIconsLength = carRace.find(".forward-icon").length;

          expect(forwardIconsLength).to.satisfy((forwardIconsLength) => {
            return (
              forwardIconsLength === arr[i] || forwardIconsLength === arr[i] + 1
            );
          });

          arr[i] = forwardIconsLength;
        });
      });
      racingTimes3--;
    }
  });

  context(
    "2. 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.",
    () => {
      it("자동차 이름을 입력하고 확인 버튼을 누르면 시도할 횟수 입력창이 노출된다.", () => {
        inputAndSubmitCarName(carNamesABC);
        cy.get("#inputRaceTimes").should("exist");
      });

      it("자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
        inputAndSubmitCarName(carNamesABC);
        inputAndSubmitRaceTimes(racingTimes3);

        carNamesABCArr.forEach((carName, i) => {
          cy.get(`.mt-4:nth-child(${i + 1}) .car-player`).should(
            "have.text",
            carName
          );
        });
      });
    }
  );

  context(
    "3. 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.",
    () => {
      it("이름이 5자 이상이면 알럿창", () => {
        inputAndSubmitCarName("bb, aaaaaa");
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it("이름이 없는 경우 알럿창", () => {
        cy.get("#submitCarName").click();
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it("공백만 입력하는 경우", () => {
        inputAndSubmitCarName("   ");
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it("콤마만 입력하는 경우", () => {
        inputAndSubmitCarName(",");
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it(", aaa 라고 입력하는 경우", () => {
        inputAndSubmitCarName(", aaa");
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it("이름이 중복되어 있는 경우", () => {
        inputAndSubmitCarName("aa, aa");
        alertMessage(MSG.DUPLICATE_CAR_NAME);
      });

      it("이름 입력 후 확인버튼을 누르면 다시 입력할 수 없다.", () => {
        inputAndSubmitCarName(carNamesABC);
        cy.get("#inputCarName").should("be.disabled");
        cy.get("#submitCarName").should("be.disabled");
      });
    }
  );

  context(
    "4. 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.",
    () => {
      it("몇 번의 이동을 할 것인지를 입력하고 확인 버튼을 누르면 레이싱 노드가 노출된다.", () => {
        inputAndSubmitCarName(carNamesABC);
        inputAndSubmitRaceTimes(racingTimes3);
        cy.get("#carRacingWrap").should("exist");
      });

      context("시도할 횟수는 1 이상이어야 한다.", () => {
        it("아무것도 입력하지 않은 경우", () => {
          inputAndSubmitCarName(carNamesABC);
          cy.get("#submitRaceTimes").click();
          alertMessage(MSG.INVALID_RACING_TIMES);
          cy.get(".mt-4").should("not.exist");
        });

        it("0을 입력한 경우", () => {
          inputAndSubmitCarName(carNamesABC);
          inputAndSubmitRaceTimes("0");
          alertMessage(MSG.INVALID_RACING_TIMES);
          cy.get("#carRacingWrap .mt-4").should("not.exist");
        });

        it("ㅁ을 입력한 경우", () => {
          inputAndSubmitCarName(carNamesABC);
          inputAndSubmitRaceTimes("ㅁ");
          alertMessage(MSG.INVALID_RACING_TIMES);
          cy.get(".mt-4").should("not.exist");
        });

        it("시도할 횟수를 입력 후 확인버튼을 누르면 다시 입력할 수 없다.", () => {
          inputAndSubmitCarName(carNamesABC);
          inputAndSubmitRaceTimes(racingTimes3);
          alertMessage(MSG.INVALID_RACING_TIMES);
          cy.get("#inputRaceTimes").should("be.disabled");
          cy.get("#submitRaceTimes").should("be.disabled");
        });
      });
    }
  );

  context(
    "5. 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.",
    () => {
      it("전진하는 조건은 0에서 9 사이에서 random 값을 구한다.", () => {
        const wrongRandomNumber = [...Array(100)]
          .map(() => randomNumber())
          .filter(
            (number) =>
              number < NUMBERIC_CONDITIONS.MIN ||
              number > NUMBERIC_CONDITIONS.MAX
          );
        expect(wrongRandomNumber.length).to.be.lessThan(1);
      });

      it("random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.", () => {
        const carsState = carNamesABCArr.map((carName) => {
          return { name: carName, position: 0 };
        });

        carsPositioning(carsState);

        carsState.forEach((car) => {
          expect(car.position).to.satisfy((position) =>
            car.number >= 4 ? position === 1 : position === 0
          );
        });
      });
    }
  );

  it("6. 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.", () => {
    inputAndSubmitCarName(carNamesABC);
    inputAndSubmitRaceTimes(racingTimes3);
    cy.wait(RACING_TIME_INTERVAL * racingTimes3);

    cy.get("#winnerWrap span").should("exist");
    cy.get("#winnerWrap span")
      .invoke("text")
      .then((winnerText) => {
        const winnersArr = winnerText.split(",").map((v) => v.trim());
        expect(winnersArr.length).to.be.greaterThan(0);
      });
  });

  it("7. 우승자가 여러명일 경우 ,를 이용하여 구분한다.", () => {
    inputAndSubmitCarName(carNamesABC);
    inputAndSubmitRaceTimes(racingTimes3);
    cy.wait(RACING_TIME_INTERVAL * racingTimes3);

    cy.get(".mt-4").then((playerRace) => {
      const cars = carNamesABCArr.map((carName, i) => {
        return {
          name: carName,
          position: playerRace[i].querySelectorAll(".forward-icon").length,
        };
      });

      const highGrade = Math.max(...cars.map((car) => car.position));
      const winners = cars
        .filter((car) => car.position === highGrade)
        .map((v) => v.name)
        .join(", ");

      cy.get("#winnerWrap span").should("have.text", winners);
    });
  });

  it("8. 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.", () => {
    inputAndSubmitCarName(carNamesABC);
    inputAndSubmitRaceTimes(racingTimes3);
    cy.get(".forward-icon").should("not.exist");
    cy.wait(RACING_TIME_INTERVAL);
    cy.get(".forward-icon").should("exist");
  });

  it("9. 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.", () => {
    inputAndSubmitCarName(carNamesABC);
    inputAndSubmitRaceTimes(racingTimes3);
    cy.get(".forward-icon").should("not.exist");
    cy.wait(RACING_TIME_INTERVAL * racingTimes3);
    cy.get("#winnerWrap span").should("exist");
    cy.wait(2000);
    alertMessage(MSG.CONGRATULATIONS);
  });

  it("다시 시작하기 버튼을 누르면 리셋된다.", () => {
    inputAndSubmitCarName(carNamesABC);
    inputAndSubmitRaceTimes(racingTimes3);
    cy.wait(RACING_TIME_INTERVAL * racingTimes3);
    cy.get("#winnerWrap span").should("exist");
    cy.wait(2000);
    alertMessage(MSG.CONGRATULATIONS);
    cy.get("#retry").click();

    cy.get("#inputCarName").should("be.enabled").and("not.be.disabled");
    cy.get("#inputCarName").should("have.value", "");
    cy.get("#submitCarName").should("be.enabled").and("not.be.disabled");
    cy.get("#inputRaceTimes").should("not.exist");
    cy.get("#carRacingWrap .mt-4").should("not.exist");
    cy.get("#winnerWrap h2").should("not.exist");

    inputAndSubmitCarName(carNamesABC);
    inputAndSubmitRaceTimes(racingTimes3);
    cy.wait(RACING_TIME_INTERVAL * racingTimes3);
    cy.get("#winnerWrap span").should("exist");
    cy.wait(2000);
    alertMessage(MSG.CONGRATULATIONS);
  });
});
