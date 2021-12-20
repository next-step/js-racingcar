import { ERROR_MESSAGES, INFO_MESSAGES, CAR_NAME } from '../../src/js/constants/index.js';

describe("자동차 경주 테스트", () => {
  const mockCarNames = {
    errorCase: ['     ', '123456', '  12 34 5   , _', ', a, b , c', 'A , Bbb , Cc c   ,'],
    passCase: ['A, B, C', '  car 1  ', 'car1    , car2', ' 1 2 3 , 4 5 , 67 8    ']
  }
  const passCaseIndex = 0;

  before(() => {
    cy.visit("/");
  });

  context("경주 게임을 시작할 때 필요한 데이터를 입력받고 입력값이 유효한지 확인한다.", () => {
    it(`첫화면에서 자동차 이름 입력 폼이 보인다.`, () => {
      cy.get("#RaceDataForm").should('be.visible');
      cy.get("#inputCarNames").should('be.visible');
      cy.get("#btnCarNames").should('be.visible');

      cy.initialScreen();
    })

    it(`자동차 이름을 입력시 ${CAR_NAME.MIN_LENGTH}자 이상 ${CAR_NAME.MAX_LENGTH}자 이하여야 하고 그렇지 않은 경우 error 메세지를 보여준다.`, () => {
      mockCarNames.errorCase.forEach(carNames => {
        cy.inputCarName(carNames);
        cy.on('window:alert', (txt) => {
          expect(txt).to.contains(ERROR_MESSAGES.INVALID_NAME_LENGTH);
        });
        cy.get("#inputCarNames").clear();
      })
    });

    it(`자동차 이름을 입력하면 시도할 횟수 입력 폼이 보인다.`, () => {
      cy.inputCarName(mockCarNames.passCase[passCaseIndex]);

      cy.get("race-count-form").should("be.visible");
      cy.get("#inputRunCount").should('be.visible');
      cy.get("#btnRunCount").should('be.visible');
    });

    it(`입력할 시도 횟수는 1 이상이여야 하며 그렇지 않은 경우 error 메세지를 보여준다.`, () => {
      cy.inputCount(0);

      cy.on('window:alert', (txt) => {
        expect(txt).to.contains(ERROR_MESSAGES.INVALID_COUNT);
      });
    });
  });

  context("자동차 경주가 진행되고 기대하는 진행 화면과 일치하는지 확인한다.", () => {
    const count = 5;
    
    it(`${mockCarNames.passCase[passCaseIndex]} 자동차 이름 입력값과 경주 화면의 이름, 갯수가 일치해야 한다.`, () => {
      const splittedCarNames = mockCarNames.passCase[passCaseIndex].split(',').map(v => v.trim(""));

      cy.visit("/");
      cy.inputCarName(mockCarNames.passCase[passCaseIndex]);
      cy.inputCount(count);

      cy.get("racing-car").should('have.length', splittedCarNames.length);

      cy.get("racing-car").each(($el, index) => {
        cy.wrap($el).invoke('attr', 'data-name').should('eq',splittedCarNames[index]);
      })
    });

    it(`입력한 시도 횟수(${count})만큼 ${count}초 동안 경주가 진행된 뒤 결과가 보여야 한다.`, () => {
      cy.wait(1000 * count);
      cy.get("race-result-view").invoke('attr', 'class').should('eq', '');
      cy.get("race-result-view").should("be.visible");
    });

    it(`결과가 보여지고 2초 뒤에 축하 메세지를 보여준다.`, () => {
      cy.on('window:alert', (txt) => {
        cy.wait(1000 * 2);
        expect(txt).to.contains(INFO_MESSAGES.CONGRATS);
      });
    });

    it("다시 시작하기 버튼을 클릭하면 초기화면으로 돌아간다.", () => {
      cy.get("race-result-view").find('button').click();
  
      cy.initialScreen();
    });
  });

})
