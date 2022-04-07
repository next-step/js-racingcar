export default class Racing {
    #cars;
    #tryCount;

    static MAX_RANDOM_VALUE = 10;
    static FORWARD_VALUE = 3;

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
