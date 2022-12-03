import { arr, getRandom } from "../common/util.js";
import { RACETYPE } from "../common/const.js";

export class CarModel {
    #name;
    #turns;

    constructor(name, turns) {
        this.#name = name;
        this.#turns = arr(turns);
    }

    getRoute() {
        return this.#turns.map(() => this.#setRoute());
    }

    #setRoute = () => {
        const random = getRandom(0, 9);
        return random > 3 ? RACETYPE.GO : RACETYPE.STOP;
    }
}