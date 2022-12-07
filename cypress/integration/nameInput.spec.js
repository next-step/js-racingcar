/// <reference types="cypress" />

const alertMessage = '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.';

describe('Car Name Input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
  });

  it('5글자 이상의 이름들이 주어지면, alert을 띄운다.', () => {
    const carNameInput = cy.get('#car-name-input-set').find('input');
    carNameInput.type('abcdef');

    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage);
    });
  });

  it('input이 비어있으면 alert을 띄운다.', () => {
    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage);
    });
  });

  it('comma로 나누어진 문자열에 문자가 없으면 alert을 띄운다.', () => {
    const carNameInput = cy.get('#car-name-input-set').find('input');
    carNameInput.type('abcde,,qwert');

    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage);
    });
  });

  it('5글자 이하의 이름들이 주어지면 자기 fieldset을 disable하고 다음 fieldset을 켠다.', () => {
    const carNameInput = cy.get('#car-name-input-set').find('input');
    carNameInput.type('adfg,qwt,zxcvb');

    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();

    cy.get('#car-name-input-set').should('be.disabled');
    cy.get('#count-input-set').should('be.visible');
  });
});
