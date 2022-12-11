import { Component } from './component.js';
import { CarModel } from '../models/car.model.js';

import { RACETYPE } from "../common/const.js";
import { $car, $race } from '../views/selector.js';
import { appendElement, parseStringToHTML } from "../common/util.js";

export class RaceComponent extends Component {
    constructor(stateService) {
        super(stateService);
        this._init();
    }

    _init() {
        super._init();
    }

    _subscribe() {
        this._stateService.renderState.observers.push({ renderRace: () => this.#render() });
    }

    #render() {
        const cars = this.#getCars();

        cars.map(({ player, races }) => {
            const $container = parseStringToHTML($car.container);
            appendElement($container, this.#renderPlayer(player));
            return this.#renderRaces($container, races);
        }).forEach(car => {
            appendElement($race.container, car);
        });

    }

    #getCars = () => {
        const { names, round } = this._stateService.raceState;
        return names.map(name => new CarModel(name, round).getRaces());
    }

    #renderPlayer = (player) => {
         const $player = `<div class="race-player">${ player }</div>`;
         return parseStringToHTML($player);

    }

    #renderRaces = ($container, races) => {
        races.forEach((race, i) => {
            const delay = (i + 1) * 1000;
            const $forward = parseStringToHTML($car.forward);

            setTimeout(() => {
                if (race === RACETYPE.STOP) return;
                if (race === RACETYPE.FORWARD) return $container.append($forward);
            }, delay);

            this.#renderSpinner($container, i);
        })

        return $container;
    }

    #renderSpinner = ($container, i) => {
        const $spinner = parseStringToHTML($race.spinner);
        setTimeout(() => $container.append($spinner), i * 1000);
        setTimeout(() => $container.removeChild($spinner), (i + 1) * 1000);
    }
}