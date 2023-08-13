import { Car, InputCarNames } from "../src/index";

describe("자동차 이름을 입력받기", () => {
    test("사용자로부터 자동차 이름을 입력받는다.", () => {
        expect(InputCarNames("jy")).toBe(["jy"]);
    });

    test("여러 개의 이름은 쉼표(,)로 구분 후 분리한다.", () => {
        expect(InputCarNames("jy,jylee")).toBe(["jy", "jylee"]);
    });

    test("사용자 입력이 없을 경우, 프로그램을 종료하고 에러 메시지 출력한다", () => {
        expect(InputCarNames()).toBe("사용자 입력이 없어 프로그램을 종료합니다.");
    });

    test("입력받은 이름으로 자동차 객체를 만든다.", () => {
        const carObject = new Car("jy");
        const spyFn = jest.spyOn(carObject, "getName");

        const result = carObject.getName();

        expect(spyFn).toBeCalledTimes(1);
        expect(result).toBe("jy");

        spyFn.mockRestore();
    });
});
