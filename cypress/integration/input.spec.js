import { ERROR } from "../../src/Constants/Constans";
import { determineWinner } from "../../src/util/carUtil";

const setAlias = () => {
  cy.get('input[type=text]').as("nameInput");
  cy.get("#car-name_btn").as("nameBtn");
  cy.get('input[type=number]').as("tryInput");
  cy.get("#try_btn").as("tryBtn");
  cy.get("#start-btn").as("startBtn");
}

const NAMES = ["EAST", "WEST", "SOUTH", "NORTH"];
const LONG_NAMES = ["NORTH","SEOOOOOO", "SOUTH", "NORTH"];

describe('레이싱 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    setAlias();
  });

  it('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
      cy.get("@nameInput").type(LONG_NAMES.join(","));
      cy.get("@nameBtn").click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR.INVAILD_CAR_NAME_LENGTH);
      })
  });

/*   it('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    
  }); */
  it('자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    cy.get("@nameInput").type(NAMES.join(","));
    cy.get("@nameBtn").click();
    cy.get(".car-player").each(($div, idx) => {
      cy.get($div).should("have.text", NAMES[idx])
    })
      
  });
  /* it('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {
    cy.get("@nameInput").type(NAMES.join(","));
    cy.get("@nameBtn").click();
    cy.get("@tryInput").type('2');
    cy.get("@tryBtn").click();
    cy.get("@startBtn").click();
    cy.wait(3000);

  }); */
  it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.', () => {
    const cars = [];

    cy.get("@nameInput").type(NAMES.join(","));
    cy.get("@nameBtn").click();
    cy.get("@tryInput").type('5');
    cy.get("@tryBtn").click();
    cy.get("@startBtn").click();
    cy.wait(6000);
    cy.get("#racing-container").children().each((track, idx) => {
      const temp = Array(track.children().length).fill("forward")
      cars.push({carName:NAMES[idx], carStates: temp})
    });
    cy.wrap(cars).then((cars) => {
      const winners = determineWinner(cars);
      cy.get('h2').contains(
        `🏆 최종 우승자: ${winners.join(', ')}🏆`
      );
    })
    
  });
  /*
  it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.', () => {

  });
  */

  it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.', () => {
    const cars = [];

    cy.get("@nameInput").type(NAMES.join(","));
    cy.get("@nameBtn").click();
    cy.get("@tryInput").type('4');
    cy.get("@tryBtn").click();
    cy.get("@startBtn").click();
    cy.wait(5000);
    cy.get("#racing-container").children().each((track, idx) => {
      const temp = Array(track.children().length).fill("forward")
      cars.push({carName:NAMES[idx], carStates: temp})
    });
    cy.wrap(cars).then((cars) => {
      const winners = determineWinner(cars);
      cy.wait(2000);
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains(`🏆 축하합니다. ${winners.map((winner) => winner).join(', ')}! 🏆`)
      })

    })
  });
});
