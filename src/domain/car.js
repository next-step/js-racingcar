import { MOVE_POSSIBLE_NUMBER, NAME_LENGTH_LIMIT } from '../constants/car';
import { getRandomInt, isMoreThanNumber } from '../utils/common';
import { checkEmptyString, checkOverStringLength } from '../validation';

export default class Car {
    #name;
    #distance = 0;

    constructor(name){
        checkOverStringLength(name, NAME_LENGTH_LIMIT, `자동차 이름은 ${NAME_LENGTH_LIMIT}자리까지 가능합니다.`)
        checkEmptyString(name)
        this.#name = name;
    }

    get name() {
        return this.#name
    }

    get distance() {
        return this.#distance
    }

    runOneLap(){
        const randomInt = getRandomInt(10)
        this.move(randomInt)
    }

    move = (number) => {
        if(!isMoreThanNumber(number, MOVE_POSSIBLE_NUMBER)){
            return
        }

        this.#addDistance()
    }

    #addDistance = () => {
        this.#distance += 1;
    }

   
}