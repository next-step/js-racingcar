import { carNamePattern } from '../../src/verification/regex.js';

before(() => cy.visit('http://127.0.0.1:5500/index.html'));

describe('자동차 경주 게임', () => {
  describe('스텝 1 : ', () => {
    describe('자동차 이름을 입력할 수 있다.', () => {
      beforeEach(() => {
        cy.get('.js-car-form')?.find('.js-car-name').clear();
      });
      it('이름은 "한글, 영문, 콤마, 공백" 만 입력할 수 있다.', () => {
        const word = '봄봄  ,  123';
        const verification = word
          .split(',')
          .map((w) => w.trim())
          .map((w) => w.replace(carNamePattern, '').substring(0, 5))
          .join(', ');

        cy.get('.js-car-form').find('.js-car-name').type(word);
        cy.get('.js-car-form').submit();
        cy.get('.js-car-form')
          .find('.js-car-name')
          .invoke('val')
          .should('eq', verification);
      });

      it('5자 이하 이름을 입력할 수 있다.', () => {
        const word = '나누야봄봄';
        cy.get('.js-car-form').find('.js-car-name').type(word);
        cy.get('.js-car-form')
          .find('.js-car-name')
          .invoke('val')
          .should('eq', word);
      });
      it('5자 이상 이름을 입력하면, 경고창이 뜬다.', () => {
        const word = '나누야봄봄봄';

        const stub = cy.stub();

        cy.on('window:alert', stub);

        cy.get('.js-car-form').find('.js-car-name').type(word);
        cy.get('.js-car-form')
          .submit()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith('5자이하로 입력하세요.');
          });
        // .then(() => {
        //   cy.on('window:alert', (msg) =>
        //     expect(msg).to.equal('5자이하로 입력하세요.')
        //   );
        // });

        cy.on('window:alert', (msg) =>
          expect(msg).to.equal('5자이하로 입력하세요.')
        );
      });
      it('이름이 정상적으로 입력되면, 게임진행 횟수 입력창이 보인다.', () => {
        const carNames = ['EAST', 'WEST', 'SOUTH'];
        cy.get('.js-play-time-container').should('not.be.visible');
        cy.get('.js-car-form').find('.js-car-name').type(carNames.join(', '));
        cy.get('.js-car-form')
          .submit()
          .then((event) => {
            cy.log(event);
          });

        // @TODO 실제로는 입력창이 노출되는데 테스트는 실패하고 있음
        cy.get('.js-play-time-container').should('be.visible');
      });
      it(',로 자동차 이름을 구분할 수 있다.', () => {
        const carNames = ['EAST', 'WEST', 'SOUTH'];
        cy.get('.js-car-form').find('.js-car-name').type(carNames.join(', '));
        cy.get('.js-car-form')
          .submit()
          .then(() => {
            cy.get('.js-car-list')
              .children()
              .should('have.length', carNames.length);
          });
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
