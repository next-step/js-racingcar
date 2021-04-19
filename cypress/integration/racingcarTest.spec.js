describe("racingcar test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const inputName = (name) => {
    return new Cypress.Promise((resolve, reject) => {
      cy.get("#wrap-cars-name input")
        .type(name)
        .then(() => {
          cy.get("#wrap-cars-name button")
            .click()
            .then(() => {
              resolve();
            });
        });
    });
  };

  const inputTimes = (times) => {
    return new Cypress.Promise((resolve, reject) => {
      cy.get("#wrap-try-times input")
        .type(times)
        .then(() => {
          cy.get("#wrap-try-times button")
            .click()
            .then(() => {
              resolve();
            });
        });
    });
  };

  it("이름은 5자 이하만 가능하다.", () => {
    inputName("OVERFIVE").then(() => {
      cy.on("window:alert", (message) => {
        expect(message).to.contains(
          "유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다"
        );
      });
    });
  });

  it("쉼표(,)를 기준으로 구분된 이름은 각 자동차의 이름으로 표시된다.", () => {
    inputName("EAST, WEST, SOUTH, NORTH").then(() => {
      inputTimes(4).then(() => {
        cy.get(".car-player")
          .should("have.length", 4)
          .and("contain", "EAST")
          .and("contain", "WEST")
          .and("contain", "SOUTH")
          .and("contain", "NORTH");
      });
    });
  });

  it("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.", () => {
    inputName("EAST, WEST").then(() => {
      inputTimes(5).then(() => {
        cy.get("#winners", { timeout: 5000 })
          .should("be.visible")
          .then(() => {
            const result = [];
            cy.get("#racing-board .mr-2")
              .each((player) => {
                result.push([
                  player.children(".car-player").text(),
                  player.children(".forward-icon").length,
                ]);
              })
              .then(() => {
                if (result[0][1] > result[1][1]) {
                  cy.get("#winners").should("have.text", result[0][0]);
                } else if (result[0][1] < result[1][1]) {
                  cy.get("#winners").should("have.text", result[1][0]);
                } else if (result[0][1] === result[1][1]) {
                  cy.get("#winners").should(
                    "have.text",
                    result[0][0] + " ," + result[1][0]
                  );
                }
              });
          });
      });
    });
  });

  it("정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.", () => {
    inputName("EAST, WEST, SOUTH, NORTH").then(() => {
      inputTimes(4).then(() => {
        cy.get("#winners", { timeout: 5000 })
          .should("be.visible")
          .then(() => {
            cy.clock();
            cy.tick(1000);
            cy.tick(1000);
            cy.on("window:alert", (message) => {
              expect(message).to.contains("🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇");
            });
          });
      });
    });
  });
});
