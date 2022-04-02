export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

export const [COMMAND_GO, COMMAND_STOP] = ["go", "stop"];
export const getCommand = (number) => (number >= 4 ? COMMAND_GO : COMMAND_STOP);

export function getCarsNames(str) {
    const carsNames = str.split(",");
    if (
        carsNames.length === 0 ||
        carsNames.some((name) => name.trim() === "")
    ) {
        throw new Error("자동차 이름을 입력해주세요.");
    }
    return carsNames;
}

export function getTryCount(str) {
    const count = parseInt(str);
    if (!count) {
        throw new Error("0이 아닌 숫자를 입력해주세요.");
    }
    return count;
}
