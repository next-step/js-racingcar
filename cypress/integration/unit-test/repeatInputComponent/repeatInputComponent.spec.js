
const inputCar = () => cy.get('#app > section > form > fieldset:nth-child(1) > div > input');
const btnCar = () => cy.get('#app > section > form > fieldset:nth-child(1) > div > button');

const repeatComponent = () => cy.get("#app > section > form > fieldset:nth-child(2)");
const racingComponent = () => cy.get('#game-process-component');

describe('시도 할 횟수 이름을 입력하는 컴포넌트 단위 테스트', () => {
    beforeEach(() => {
        cy.visit('../../../../index.html');
        inputCar().type("1,2,3");
        btnCar().click();
    });

    it('컴포넌트 인풋박스에 입력이 가능하다.', () => {
        //given


        //when
        repeatComponent()
        .find('input')
        .type('1');

        //then
        repeatComponent()
        .find('input')
        .then($input => {
            expect($input).to.value('1');
        });
    });

    it('화살표 위 키로 값을 올릴 수 있다.', () => {
        //when
        repeatComponent().find('input').focus();

        //then
        repeatComponent()
        .find('input')
        .type('{uparrow}')
        .should($ele => {
            expect($ele).to.value('1');
        })
    });


    it('화살표 아래 키로 값을 내릴릴 수 있다.', () => {
        //when
        repeatComponent().find('input').focus();

        //then
        repeatComponent()
        .find('input')
        .type('{downarrow}')
        .should($ele => {
            expect($ele).to.value('-1');
        })
    });

    it('인풋박스에 값이 없는 상태로 확인을 누르면 alert창이 뜬다.', () => {
        //given

        //when
        repeatComponent()
        .find('button')
        .click()

        //then
        .then(() => {
            cy.on('window:alert', txt => {
                expect(txt).eq('입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.');
            });
        })
    });


    it('인풋박스에 값이 0이하인 상태로 확인을 누르면 alert창이 뜬다.', () => {
        //given
        repeatComponent()
        .find('input')
        .type('0');

        //when
        repeatComponent()
        .find('button')
        .click()

        //then
        .then(() => {
            cy.on('window:alert', txt => {
                expect(txt).eq('입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.');
            });
        })
    });

    it('레이싱이 시작되면 racing 컴포넌트가 활성화 된다.', () => {
        //given
        repeatComponent()
        .find('input')
        .type('3');

        //when
        repeatComponent()
        .find('button')
        .click();

        //then
        racingComponent()
        .should($ele => {
            expect($ele.css('display') !== 'none').to.true;
        });


    });
});
