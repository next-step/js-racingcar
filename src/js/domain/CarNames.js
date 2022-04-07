import Car from "./Car.js";

export default class CarNames {
    names = "";
    #cars;

    static NOT_EXIST_NAME = `자동차 이름을 입력해주세요.`;
    static OUT_OF_NAME_LENGTH = `자동차 이름은 ${Car.CAR_NAME_MIN_LENGTH} ~ ${Car.CAR_NAME_MAX_LENGTH}자로 입력해야합니다.`;

    constructor(names) {
        if (CarNames.validation(names)) {
            this.#cars = names.split(",").map((name) => new Car(name.trim()));
        }
    }

    set names(names) {
        this.names = names;
    }

    get cars() {
        return this.#cars;
    }

    static validation(names) {
        if (names.length < 1) {
            alert(CarNames.NOT_EXIST_NAME);

            return false;
        }

        return true;
    }
}