import { InputCarNames, Car } from "../src";

describe("자동차 이름을 입력받기", () => {
    test("사용자로부터 자동차 이름을 입력받는다.", () => {
        expect(InputCarNames("jy")).toStrictEqual(["jy"]);
    });

    test("여러 개의 이름은 쉼표(,)로 구분 후 분리한다.", () => {
        expect(InputCarNames("jy,jylee")).toStrictEqual(["jy", "jylee"]);
    });

    test("사용자 입력이 없을 경우, 프로그램을 종료하고 에러 메시지 출력한다", () => {
        expect(InputCarNames()).toBe("사용자 입력이 없어 프로그램을 종료합니다.");
    });

    test("입력받은 이름으로 자동차 객체를 만든다.", () => {
        const nameArray = InputCarNames("jy");

        for (const name of nameArray) {
            const carObject = new Car(name);
            const spyFn = jest.spyOn(carObject, "getName");

            const result = carObject.getName();

            expect(spyFn).toBeCalledTimes(1);
            expect(result).toBe(name);

            spyFn.mockRestore();
        }
    });
});

describe("자동차 이름 유효성 검사", () => {
    test("자동차 이름으로 한글, 영어, 숫자 조합이 가능하다.", () => {
        expect(InputCarNames("자동차,씽씽이,따릉이")).toStrictEqual(["자동차", "씽씽이", "따릉이"]);
        expect(InputCarNames("자동차C1,씽씽이S1,따릉이T1")).toStrictEqual(["자동차C1", "씽씽이S1", "따릉이T1"]);
    });

    test("이름의 공백, 특수문자는 제거한다.", () => {
        expect(InputCarNames("j   y, jy lee, j@#, jj  *")).toStrictEqual(["jy", "jylee", "j", "jj"]);
    });

    test("각 이름의 길이가 5자 이하인지 확인한다.", () => {
        expect(InputCarNames("jy,jylee,jjl,jjh,jjjjjj")).toBe("5자가 넘는 이름이 있어 프로그램을 종료합니다.");
        expect(InputCarNames("jyy   y yy")).toBe("5자가 넘는 이름이 있어 프로그램을 종료합니다.");
    });

    test("동일한 이름이 있을 경우 구분을 위해 이름 뒤에 숫자를 붙인다.", () => {
        expect(InputCarNames("jy,jy,jy")).toStrictEqual(["jy1", "jy2", "jy3"]);
        expect(InputCarNames("nfive,nfive,nfive")).toStrictEqual(["nfive1", "nfive2", "nfive3"]);
    });

    test("유효하지 않은 이름이 입력되었을 경우, 프로그램을 종료하고 에러 메시지 출력", () => {
        expect(InputCarNames("ㄱㄴ,ㄷㄹ,자동차")).toBe(
            "유효하지 않은 이름: ㄱㄴ,ㄷㄹ\n유효하지 않은 이름이 입력되어 프로그램을 종료합니다."
        );
    });
});
