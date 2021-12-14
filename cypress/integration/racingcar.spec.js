describe('racingcar', () => {
    beforeEach(() => {
        cy.visit('localhost:8080');
    });

    it('자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
        const carNamesText = 'EAST, WEST, SOUTH, NORTH';
        const numberOfTry = '5';
        cy.typeCarNames(carNamesText);
        cy.typeNumberOfTry(numberOfTry);

        cy.get('.car-player').each($el => {
            expect(carNamesText).to.be.includes($el.text());
        });
    });

    it('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.typeCarNames('다섯글자넘는문자열, 세글자')
            .submit()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('자동차 이름은 최대 5자 입니다.');
            });
    });

    it('시도 횟수는 0보다 커야한다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);

        const carNamesText = 'EAST, WEST, SOUTH, NORTH';
        cy.typeCarNames(carNamesText);


        const numberOfTry = '0';
        cy.typeNumberOfTry(numberOfTry)
          .submit()
          .then(() => {
              expect(stub.getCall(0)).to.be.calledWith('시도횟수는 0보다 커야합니다.');
          });
    });
})
