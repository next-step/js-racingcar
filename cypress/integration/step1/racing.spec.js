import {getRandomIntInclusive} from "../../../src/js/components/utils";

describe('기능 검증', () => {
  beforeEach(() => {
    cy.visit('index.html');
    const namesString = '자동차1,자동차2,자동차3';
    cy.startRacing(namesString, 1);
  });

  it('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    cy.get('.car-player').should('contain.text', '자동차1');
    cy.get('.car-player').should('contain.text', '자동차2');
    cy.get('.car-player').should('contain.text', '자동차3');
  });

  describe('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {
    const tryAmount = 5;

    beforeEach(() => {
      cy.visit('index.html');
      cy.clearLocalStorage()

      const namesString = new Array(10).fill().map((ele, i) => i+1).join(',');
      cy.startRacing(namesString, tryAmount);
    });

    it('random 값은 0과 9 사이의 값이다.', () => {
      for (let i = 0; i < 100; i++) {
        expect(getRandomIntInclusive()).within(0, 9);
      }
    });

    it('4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다 -> 전진한 횟수 === (4이상인 갯수와 3이하인 갯수) / 시도한 횟수', () => {
      cy.wait(tryAmount * 1000)
        .then(() => {
          const cars = JSON.parse(localStorage.getItem('cars'));
          const fourOrMoreCount = cars.map(car => car.records).flat().filter(record => record >= 4);
          const lessThanFourCount = cars.map(car => car.records).flat().filter(record => record < 4);
          cy.get('.forward-icon').should('have.length', fourOrMoreCount.length);
          cy.get('.car-player').should('have.length', (fourOrMoreCount.length + lessThanFourCount.length)/tryAmount);
        });

    });
  });
});

