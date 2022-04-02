export class Racing {
    #cars;
    #tryCount;

    constructor() {}

    get cars() {
        return this.#cars;
    }

    set cars(cars) {
        this.#cars = cars;
    }

    get length() {
        return this.#cars.length;
    }

    get tryCount() {
        return this.#tryCount;
    }

    set tryCount(tryCount) {
        this.#tryCount = tryCount;
    }
}
