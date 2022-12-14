/// <reference types="cypress" />

const alertMessage = '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.';

describe('Car Name Input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
  });

  function testNameInput(input, isClick, resultCallback) {
    const carNameInput = cy.get('#car-name-input-set').find('input');
    if (input) { carNameInput.type(input); }

    if (isClick) {
      const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
      carNameSubmitButton.click();
    } else {
      const carNameInput = cy.get('#car-name-input-set').find('input');
      carNameInput.type('{enter}');
    }

    resultCallback();
  }

  it('5글자 이상의 이름들이 주어지면, alert을 띄운다.', () => {
    testNameInput('abcdef', true, () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage);
      });
    });

    testNameInput('abcdef', false, () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage);
      });
    });
  });

  it('5글자 이상의 이름들을 입력하고 엔터를 하면, alert을 띄운다.', () => {
    testNameInput('abcdef', false, () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage);
      });
    });
  });

  it('input이 비어있으면 alert을 띄운다.', () => {
    testNameInput('', true, () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage);
      });
    });
  });

  it('input이 비어있는 상태로 엔터를 누르면 alert을 띄운다.', () => {
    testNameInput('', false, () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage);
      });
    });
  });

  it('comma로 나누어진 문자열에 문자가 없으면 alert을 띄운다.', () => {
    testNameInput('abcde,,qwert', true, () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage);
      });
    });
  });

  it('comma로 나누어진 문자열에 문자가 없는데 엔터를 눌렀을 경우, alert을 띄운다.', () => {
    testNameInput('abcde,,qwert', false, () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage);
      });
    });
  });

  it('5글자 이하의 이름들이 주어지면 자기 fieldset을 disable하고 다음 fieldset을 켠다.', () => {
    testNameInput('adfg,qwt,zxcvb', true, () => {
      cy.get('#car-name-input-set').should('be.disabled');
      cy.get('#count-input-set').should('be.visible');
    });
  });

  it('5글자 이하의 이름들을 입력하고 엔터를 누르면 자기 fieldset을 disable하고 다음 fieldset을 켠다.', () => {
    testNameInput('adfg,qwt,zxcvb', false, () => {
      cy.get('#car-name-input-set').should('be.disabled');
      cy.get('#count-input-set').should('be.visible');
    });
  });
});
