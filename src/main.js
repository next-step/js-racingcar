export default class Car {
    #name = "";
    #location = 0;

    constructor({ name }) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    moveForward() {
        this.#location++;
    }
}