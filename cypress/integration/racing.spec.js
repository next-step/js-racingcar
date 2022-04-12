const MIN_LENGTH = 1;
const MAX_LENGTH = 5;
const MESSAGE = {
    OUT_OF_RANGE: `자동차 이름은 ${MIN_LENGTH} ~ ${MAX_LENGTH}자로 입력해야합니다.`,
};
describe("Racing Test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5500/");
    });

    it("자동차 이름은 1~5자내로 입력해야한다.", () => {
        cy.get("#car-names-input").type("pony");
        cy.get("#car-names-submit").click();
    });

    it("자동차 이름을 6자 이상으로 입력시 경고창을 띄운다.", () => {
        cy.get("#car-names-input").type("avanteaaaaaa");
        cy.get("#car-names-submit").click();

        cy.on("window:alert", (text) => {
            expect(text).to.contains(MESSAGE.OUT_OF_RANGE);
        });
    });
    // it("자동차 이름은 ',' 로 구분한다", () => {});
    // it("구분한 후 자동차 이름의 길이는 1~5자이다", () => {});
    // it("지동차의 이동 횟수는 1~10로 입력한다.", () => {});
    // it("0~9사이의 랜덤한 값을 추출한다.", () => {});
    // it("0~3일때는 멈추고 4~9일 때는 전진한다.", () => {});
});
