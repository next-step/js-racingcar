import { MESSAGE } from '../../src/utils/constants.js';

const CAR_NAMES = 'EAST,WEST,SOUTH,NORTH';

describe('racing game', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('자동차 이름은 쉼표를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
    const wrongName = 'abcdef,abc';
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.inputCarNames(wrongName);
    cy.get('#car-name-input')
      .invoke('val')
      .then((value) => {
        value.split(',').forEach((item) => {
          if (item.length > 5) {
            expect(stub.getCall(0)).to.be.calledWith(MESSAGE.NAME_ALERT);
            return;
          }
        });
      });
  });
});
