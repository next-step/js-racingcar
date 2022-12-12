import { Component } from './component.js';
import { CarModel } from '../models/car.model.js';

import { MESSAGE_FOR_CELEBRATION, RACETYPE } from "../common/const.js";
import { $car, $race, $reset, $round, $winner } from '../views/selector.js';
import {
    appendElement,
    displayFlex,
    displayNone,
    parseStringToHTML, removeChildNodes,
    renderInnerHtml, renderInputValue
} from "../common/util.js";

export class RaceComponent extends Component {
    constructor(stateService) {
        super(stateService);
        this._init();
        this._subscribe();
    }

    _init() {
        super._init();
        displayNone([$winner.container, $race.container]);
        renderInputValue($round.input);
    }

    _setEventListeners() {
        $reset.button.addEventListener('click', () => this.#reset());
    }

    _subscribe() {
        this._stateService.renderState.observers.push({ renderRace: () => this.#render() });
        this._stateService.resetState.observers.push({ reset: () => this.#reset() });
    }

    async #render() {
        displayFlex([$race.container]);
        const cars = this.#getCars();

        const delay = this._stateService.raceState.round * 1000;
        await this.#renderRace(cars);
        setTimeout(() => this.#renderWinners(cars), delay);
    }

    #getCars = () => {
        const { names, round } = this._stateService.raceState;
        return names.map(name => new CarModel(name, round).getRaces());
    }

    #getWinners = (cars) => {
        const playerScore = cars.reduce((scores, car) => {
            return [...scores, {
                name: car.player,
                score: this.#getMaxScore(car.races)
            }]
        }, []);

        const winnerScore = Math.max(...playerScore.map(winner => winner.score));
        return playerScore
            .filter(player => player.score === winnerScore)
            .map(player => player.name).join(', ');
    }

    #getMaxScore = (races) => {
        return races.reduce((score, step) => {
            if (step === RACETYPE.FORWARD) score++;
            return score;
        }, 0);
    }

    #renderRace(cars) {
        return new Promise((resolve) => {
            cars.map(({ player, races }) => {
                const $container = parseStringToHTML($car.container);
                appendElement($container, this.#renderPlayer(player));
                return this.#renderRaces($container, races);
            }).forEach(car => {
                appendElement($race.container, car);
            })
            resolve();
        });
    }

    #renderPlayer = (player) => {
        const $player = `<div class="race-player">${player}</div>`;
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

    #renderWinners(cars) {
        const winners = this.#getWinners(cars);

        displayFlex([$winner.container]);
        renderInnerHtml($winner.player, `🏆 최종 우승자: ${winners} 🏆`);
        setTimeout(() => alert(MESSAGE_FOR_CELEBRATION), 2000);
    }

    #reset() {
        this._stateService.resetState.reset = true;
        this._stateService.refreshState();
        removeChildNodes($race.container);
        this._init();
    }
}