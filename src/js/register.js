import {carTemplate, tryNumberTemplate} from '../utils/templates.js';
import {$inputCarName, $inputNumber, $track, $number} from '../utils/doms.js';

export const CAR_NAME_LIST = [];
export let TRY_NUMBER = 0;

export const initRegister = () => {
    const $nameBtn = document.getElementById('btn-name');
    const $numberBtn = document.getElementById('btn-number');

    $nameBtn.addEventListener('click', onRegisterCar);
    $numberBtn.addEventListener('click', onRegisterNumber);
};

const onRegisterCar = () => {
    let flag = true;
    const carNameList = $inputCarName.value.split(',');

    carNameList.map((carName) => {
        if (carName.trim().length > 5) {
            alert('이름은 5자 이하만 가능합니다.');
            flag = false;
            return;
        }
    });

    if (flag) {
        carNameList.map((carName) => {
            carName = carName.trim();
            CAR_NAME_LIST.push(carName);
            $track.insertAdjacentHTML('beforeend', carTemplate(carName));
        });
        $inputCarName.value = '';
    }
};

const onRegisterNumber = () => {
    TRY_NUMBER = $inputNumber.value;
    $number.insertAdjacentHTML('afterbegin', tryNumberTemplate(TRY_NUMBER));
    $inputNumber.value = '';
};
