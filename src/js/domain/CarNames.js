import { Car } from "./Car.js";

export class CarNames {
    names = "";
    #cars;

    static NOT_EXIST_NAME = `자동차 이름을 입력해주세요.`;

    constructor(names) {
        console.log(names);
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

    splitCarNames() {
        this.names.split(",");
    }

    static validation(names) {
        if (names.length < 1) {
            alert(CarNames.NOT_EXIST_NAME);
            return false;
        }

        return true;
    }
}
