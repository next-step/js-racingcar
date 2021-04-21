import {carTemplate} from '../../utils/templates.js';
import {$inputCarName, $track} from '../../utils/doms.js';

export let CAR_NAME_LIST = [];

export const onRegisterCar = () => {
    let flag = true;
    const carNameList = $inputCarName.value.split(',');

    carNameList.map((carName) => {
        const nameLen = carName.trim().length;
        if (nameLen < 1 || nameLen > 5) {
            alert('이름은 1자 이상 5자 이하만 가능합니다.');
            flag = false;
            return;
        }
    });

    if (flag) {
        $track.innerText = '';
        CAR_NAME_LIST = [];

        carNameList.map((carName) => {
            carName = carName.trim();
            CAR_NAME_LIST.push(carName);
            $track.insertAdjacentHTML('beforeend', carTemplate(carName));
        });
        $inputCarName.value = '';
    }
};
