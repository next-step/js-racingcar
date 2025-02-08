import {CarName} from "../../src/domain/Car.js";

describe("자동차 이름은", () => {
    let carName;

    beforeEach(() => {
        carName = new CarName("포르쉐");
    });

    it("생성될 때 전달받은 이름을 가지고 있어야 한다", () => {
        const expectedName = "포르쉐";
        expect(carName.value).toBe(expectedName);
    });

    it("이름이 5자를 초과하면 에러를 던져야 한다", () => {
        const givenCarName = "포르쉐포르쉐";
        expect(() => new CarName(givenCarName)).toThrow(CarName.ERROR_MESSAGES.INVALID_NAME);
    });

    it("이름이 1자 미만이면 에러를 던져야 한다", () => {
        const givenCarName = "";
        expect(() => new CarName(givenCarName)).toThrow(CarName.ERROR_MESSAGES.INVALID_NAME);
    });

    it("이름이 문자열이 아니면 에러를 던져야 한다", () => {
        const givenCarName = 123;
        expect(() => new CarName(givenCarName)).toThrow(CarName.ERROR_MESSAGES.INVALID_NAME);
    });

    it("이름이 null이거나 undefined이면 에러를 던져야 한다", () => {
        expect(() => new CarName(null)).toThrow(CarName.ERROR_MESSAGES.INVALID_NAME);
        expect(() => new CarName(undefined)).toThrow(CarName.ERROR_MESSAGES.INVALID_NAME);
    });
});
