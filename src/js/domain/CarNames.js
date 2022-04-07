<<<<<<< HEAD
const MIN_LENGTH = 1;
const MAX_LENGTH = 5;
const MESSAGE = {
    OUT_OF_RANGE: `자동차 이름은 ${MIN_LENGTH} ~ ${MAX_LENGTH}자로 입력해야합니다.`,
};
export class CarNames {
    names = "";
=======
import Car from "./Car.js";

export default class CarNames {
    names = "";
    #cars;

    static NOT_EXIST_NAME = `자동차 이름을 입력해주세요.`;
    static OUT_OF_NAME_LENGTH = `자동차 이름은 ${Car.CAR_NAME_MIN_LENGTH} ~ ${Car.CAR_NAME_MAX_LENGTH}자로 입력해야합니다.`;
>>>>>>> minsiki

    constructor() {}

    set names(names) {
        this.names = names;
    }

<<<<<<< HEAD
    splitCarNames() {
        this.names.split(",");
    }

    getCarNamesState() {
        let resultValue = {
            isComplte: true,
            message: "",
        };

        if (this.names.length < MIN_LENGTH || this.names.length > MAX_LENGTH) {
            resultValue.isComplte = false;
            resultValue.message = MESSAGE.OUT_OF_RANGE;

            return resultValue;
=======
    get cars() {
        return this.#cars;
    }

    static validation(names) {
        if (names.length < 1) {
            alert(CarNames.NOT_EXIST_NAME);

            return false;
>>>>>>> minsiki
        }

        return resultValue;
    }
}
