const ERROR_MESSAGE = Object.freeze({
    NO_INPUT_STRING: "사용자 입력이 없어 프로그램을 종료합니다.",
});

export const InputCarNames = (nameString) => {
    if (!nameString) return ERROR_MESSAGE.NO_INPUT_STRING;

    const splitedNameArr = nameString.split(",");
    return splitedNameArr;
};
