/// <reference types="cypress" />

import { id2Query, class2Query } from "../../src/common/dom";
import { ID, ClassName, AlertMsg } from "../../src/common/constants";

context("RacingCar", () => {
  let alertStub;
  beforeEach(() => {
    alertStub = cy.stub();
    cy.on("window:alert", alertStub);
    cy.visit(Cypress.config().baseUrl);
  });

  const testCarNames = ["a", "b", "c"];

  const inputUserDate = () => {
    cy.get(id2Query(ID.InputCarName)).type(testCarNames.join(","));
    cy.get(id2Query(ID.BtnCarName)).click();
    cy.get(id2Query(ID.BtnCarName)).should("be.disabled");

    cy.get(id2Query(ID.InputRaceTimes)).type(1);
    cy.get(id2Query(ID.BtnRaceTimes)).click();
    cy.get(id2Query(ID.BtnCarName)).should("be.disabled");
  };

  describe("UserInput Component", () => {
    it("should fail if a car name is over 5", async () => {
      cy.get(id2Query(ID.InputCarName)).type("123456");
      cy.get(id2Query(ID.BtnCarName))
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(AlertMsg.InvalidCarName);
          cy.get(id2Query(ID.InputRaceTimes)).should("not.exist");
        });
    });

    it("should fail if a car name is under 1", async () => {
      cy.get(id2Query(ID.InputCarName)).type(", ,");
      cy.get(id2Query(ID.BtnCarName))
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(AlertMsg.InvalidCarName);
          cy.get(id2Query(ID.InputRaceTimes)).should("not.exist");
        });
    });

    it("should fail if race times is under 1", () => {
      cy.get(id2Query(ID.InputCarName)).type(testCarNames.join(","));
      cy.get(id2Query(ID.BtnCarName)).click();
      cy.get(id2Query(ID.BtnCarName)).should("be.disabled");

      cy.get(id2Query(ID.InputRaceTimes)).type(-1);
      cy.get(id2Query(ID.BtnRaceTimes))
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(AlertMsg.InvalidTryCnt);
        });
    });

    it("should input race times", () => {
      inputUserDate();
    });
  });

  describe("GameProcess Component", () => {
    beforeEach(() => inputUserDate());

    it("should display car names", () => {
      cy.get(id2Query(ID.GameProcessComponent))
        .find(class2Query(ClassName.CarPlayer))
        .each(($carPlayer, i) => {
          expect($carPlayer.text()).to.equal(testCarNames[i]);
        });
    });
  });

  describe("GameResult Component", () => {
    beforeEach(() => inputUserDate());
    it("should show winners", () => {
      cy.wait(1000);
      const carProps = [];
      let maxForward = 0;
      cy.get(id2Query(ID.GameProcessComponent))
        .find(class2Query(ClassName.Car))
        .each(($car) => {
          const forward = $car.children(
            class2Query(ClassName.forwardIcon)
          ).length;
          maxForward = Math.max(maxForward, forward);
          const name = $car.children(class2Query(ClassName.CarPlayer)).text();
          carProps.push({ forward, name });
        })
        .then(() => {
          const winnerNames = carProps
            .filter(({ forward }) => forward === maxForward)
            .map(({ name }) => name);

          cy.get(id2Query(ID.GameResultComponent))
            .find("h2")
            .then(($h2) =>
              expect($h2.text()).to.equal(
                `🏆 최종 우승자: ${winnerNames.join(", ")} 🏆`
              )
            );
        });
    });
  });
});
