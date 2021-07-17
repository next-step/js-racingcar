
const inputCar = () => cy.get('#app > section > form > fieldset:nth-child(1) > div > input');
const btnCar = () => cy.get('#app > section > form > fieldset:nth-child(1) > div > button');

const repeatComponent = () => cy.get("#app > section > form > fieldset:nth-child(2)");


describe('자동차 이름을 입력하는 컴포넌트 단위 테스트', () => {
    beforeEach(() => {
        cy.visit('../../../../index.html');
    });

    it('컴포넌트 인풋박스에 입력이 가능하다.', () => {
        //given
        const inputStr = "1,2,3";

        //when
        inputCar()
        .type(inputStr)
        //then
        .then($input => {
            expect($input).to.have.value("1,2,3");
        });
    });

    it('차 이름 없이 버튼을 클릭하면 alert창이 뜬다.', () => {
        //given

        //when
        btnCar()
        .click()
        //then
        .then(() => {
            cy.on('window:alert', txt => {
                expect(txt).to.eq('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
            });
        });

    });

    it('컴포넌트 버튼을 누르면 시도할 횟수 컴포넌트가 등장한다.', () => {
        //given
        inputCar().type("1,2,3");

        //when
        btnCar().click();

        //then
        repeatComponent()
        .should($ele => {
            expect($ele.css('display') !== 'none').to.true;
        });

    });
});
