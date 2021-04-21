import {$nameBtn, $numberBtn} from '../../utils/doms.js';
import {onRegisterCar} from './registerCar.js';
import {onRegisterNumber} from './registerNumber.js';

export const initRegister = () => {
    $nameBtn.addEventListener('click', onRegisterCar);
    $numberBtn.addEventListener('click', onRegisterNumber);
};
