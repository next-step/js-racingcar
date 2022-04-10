import CarNameLengthException from "../exception/CarNameLengthException.js";
import { getUUID } from "../utils/index.js";

export default class Car {
    #id;
    #name;
    #forwardCount = 0;
    
    static CAR_NAME_MIN_LENGTH = 1;
    static CAR_NAME_MAX_LENGTH = 5;
    static MAX_RANDOM_VALUE = 10;
    static FORWARD_VALUE = 4;
    static OUT_OF_NAME_LENGTH = `자동차 이름은 ${Car.CAR_NAME_MIN_LENGTH} ~ ${Car.CAR_NAME_MAX_LENGTH}자로 입력해야합니다.`;

    constructor(name) {
        Car.validate(name);
        this.#name = name;
        this.#id = getUUID();
    }

    get value() {
        return this.#name;
    }

    get forwardCount() {
        return this.#forwardCount;
    }

    get id() {
        return this.#id;
    }

    static validate(name) {
        if (name.length < Car.CAR_NAME_MIN_LENGTH || name.length > Car.CAR_NAME_MAX_LENGTH) {
            throw new CarNameLengthException();
        }
    }

    setForwardCount() {
        this.#forwardCount++;
    }
}
