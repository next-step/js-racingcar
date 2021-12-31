import {ErrorMessage} from "../../../src/js/constants";

describe('입력값 검증', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('자동차 이름은 쉼표(,)를 기준으로 구분한다', () => {
    const namesString = '1,2,3,4,5';
    cy.startRacing(namesString, 1);
    cy.get('.car-player').its('length').should('eq', 5);
  });

  it('자동차 이름의 앞,뒤 공백은 제거된다', () => {
    const namesString = '정상, 앞공백,뒷공백 ,정상';
    cy.startRacing(namesString, 1);
    cy.get('.car-player').eq(0).should('have.text', '정상');
    cy.get('.car-player').eq(1).should('have.text', '앞공백');
    cy.get('.car-player').eq(2).should('have.text', '뒷공백');
    cy.get('.car-player').eq(3).should('have.text', '정상');
  });

  it('자동차 이름은 5자 이하만 가능하다. -> 5자가 넘을 경우 에러발생', () => {
    const validNamesString = '1,12,123,1234,12345,123456';
    cy.startRacing(validNamesString, 1);
    cy.on('window:alert', message => expect(message).to.eq(ErrorMessage.OUT_OF_LENGTH_NAME));
  });

  it('입력가능한 이름의 갯수는 10명까지로 제한한다. -> 10명을 넘을 경우 에러발생', () => {
    const validNamesString = '1,2,3,4,5,6,7,8,9,10,11';
    cy.startRacing(validNamesString, 1);
    cy.on('window:alert', message => expect(message).to.eq(ErrorMessage.OUT_OF_BOUNDS_NAMES_SIZE));
  });

  it('이동횟수는 1부터 10까지로 제한한다 -> 10번 초과일 경우 에러발생', () => {
    cy.startRacing('자동차', 11);
    cy.on('window:alert', message => expect(message).to.eq(ErrorMessage.MORE_THAN_MAXIMUM_INPUT_AMOUNT));
  });

  it('이동횟수는 1부터 10까지로 제한한다 -> 1번 미만일 경우 에러발생 (0번)', () => {
    cy.startRacing('자동차', 0);
    cy.on('window:alert', message => expect(message).to.eq(ErrorMessage.LESS_THAN_MINIMUM_INPUT_AMOUNT));
  });

  it('이동횟수는 1부터 10까지로 제한한다 -> 1번 미만일 경우 에러발생 (마이너스)', () => {
    cy.startRacing('자동차', -100);
    cy.on('window:alert', message => expect(message).to.eq(ErrorMessage.LESS_THAN_MINIMUM_INPUT_AMOUNT));
  });
});