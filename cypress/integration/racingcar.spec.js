import { carNamePattern } from '../../src/verification/regex.js';

describe('자동차 경주 게임', () => {
  describe('스텝 1 : ', () => {
    describe('자동차 이름을 입력할 수 있다.', () => {
      before(() => {
        cy.visit('http://127.0.0.1:5500/index.html');
      });
      beforeEach(() => {
        cy.get('.js-car-form')?.find('.js-car-name').clear();
      });
      it('이름은 "한글, 영문, 콤마, 공백" 만 입력할 수 있다.', () => {
        const word = '봄봄  ,  123';

        const verification = word
          .split(',')
          .map((w) => w.trim().replace(carNamePattern, '').substring(0, 5))
          .join(', ');

        cy.submitCarName(word);

        cy.getCarName().should('eq', verification);
      });

      it('5자 이하 이름을 입력할 수 있다.', () => {
        const word = '나누야봄봄';

        cy.submitCarName(word);

        cy.getCarName().should('eq', word);
      });

      it('5자 이상 이름을 입력하면, 경고창이 뜬다.', () => {
        const word = '나누야봄봄봄';

        const alertStub = cy.stub();

        cy.on('window:alert', alertStub);

        cy.submitCarName(word).then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            '5자이하로 입력하세요.'
          );
        });
      });

      it('이름이 정상적으로 입력되면, 게임진행 횟수 입력창이 보인다.', () => {
        const carName = 'EAST, WEST, SOUTH';

        cy.submitCarName(carName).then(() => {
          cy.get('.js-play-time-container').should('be.visible');
        });
      });

      it(',로 자동차 이름을 구분할 수 있다.', () => {
        const carName = 'EAST, WEST, SOUTH';
        const length = carName.split(',').length;

        cy.submitCarName(carName);
        cy.submitPlayTimes(2);

        cy.get('.js-car-list').children().should('have.length', length);
      });
    });

    describe('게임진행 횟수를 입력할 수 있다.', () => {
      it('입력한 횟수만큼 난수를 생성한다.', () => {});
      it('난수는 0 - 9 사이 값이다.', () => {});
      it('난수가 4이상이면 자동차가 전진한다.', () => {});
      it('난수가 3이하이면 자동차가 멈춘다.', () => {});
    });
  });
});
