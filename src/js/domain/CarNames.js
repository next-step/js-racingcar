import CarNameNotExistException from "../exception/CarNameNotExistException.js";
import Car from "./Car.js";

export default class CarNames {
    names = "";
    #cars;

    static NOT_EXIST_NAME = `자동차 이름을 입력해주세요.`;
    

    constructor(names) {
        CarNames.validation(names);
        this.#cars = names.split(",").map((name) => new Car(name.trim()));        
    }

    set names(names) {
        this.names = names;
    }

    get cars() {
        return this.#cars;
    }

    static validation(names) {
        if (names.length < 1) throw new CarNameNotExistException();
    }
}