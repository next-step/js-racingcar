import { Component } from './component.js';
import { CarModel } from '../models/car.model.js';
import { $car, $race } from '../views/selector.js';
import { RACETYPE } from "../common/const.js";

export class RaceComponent extends Component {
    constructor(container) {
        super(container);
        this._init();
    }

    _init() {
        super._init();
    }

    _subscribe() {
        this._stateService.observers.push({ renderRace: () => this.#render() });
    }

    #render() {
        const cars = this.#getCars();

        cars.map(({ player, races }) => {
            const $container = this._view.parseStringToHTML($car.container);
            $container.append(this.#renderPlayer(player));
            return this.#renderRaces($container, races);
        }).forEach(car => {
            this._view.append($race.container, car);
        });

    }

    #getCars = () => {
        const { names, round } = this._stateService.race;
        return names.map(name => new CarModel(name, round).getRaces());
    }

    #renderPlayer = (player) => {
        const $player = `<div class="race-player">${ player }</div>`
        return this._view.parseStringToHTML($player);
    }

    #renderRaces = ($container, races) => {
        races.forEach((race, i) => {
            const delay = (i + 1) * 1000;
            const $forward = this._view.parseStringToHTML($car.forward);

            setTimeout(() => {
                if (race === RACETYPE.STOP) return;
                if (race === RACETYPE.FORWARD) return $container.append($forward);
            }, delay);

            this.#renderSpinner($container, i);
        })

        return $container;
    }

    #renderSpinner = ($container, i) => {
        const $spinner = this._view.parseStringToHTML($race.spinner);
        setTimeout(() => $container.append($spinner), i * 1000);
        setTimeout(() => $container.removeChild($spinner), (i + 1) * 1000);
    }
}