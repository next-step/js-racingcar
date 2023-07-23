import { NAME_LENGTH_LIMIT } from '../constants/car';
import { checkEmptyString, checkOverStringLength } from '../validation';

export default class Car {
    #name;

    constructor(name){
        checkOverStringLength(name, NAME_LENGTH_LIMIT, `자동차 이름은 ${NAME_LENGTH_LIMIT}자리까지 가능합니다.`)
        checkEmptyString(name)
        this.#name = name;
    }

    get name(){
        return this.#name
    }
}