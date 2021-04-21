import {CAR_NAME_LIST} from './register/registerCar.js';
import {TRY_NUMBER} from './register/registerNumber.js';
import {resultTemplate, moveTemplate, carTemplate} from '../utils/templates.js';
import {$start, $result, $track} from '../utils/doms.js';

export const initRacing = () => {
    $start.addEventListener('click', onRacing);
};

const onRacing = () => {
    if (CAR_NAME_LIST.length == 0) return alert('자동차 이름을 입력해주세요.');

    if (TRY_NUMBER == 0) return alert('시도 횟수를 입력해주세요.');

    if ($start.classList.contains('checked')) {
        $track.innerHTML = '';
        document.querySelector('.winner').innerHTML = '';
        CAR_NAME_LIST.map((carName) => $track.insertAdjacentHTML('beforeend', carTemplate(carName)));
        $start.classList.remove('checked');
    }
    const distance = new Array(CAR_NAME_LIST.length).fill(0);

    let cnt = 0;
    const race = setInterval(() => {
        CAR_NAME_LIST.forEach((carName, index) => {
            const randNum = Math.floor(Math.random() * 9);
            if (randNum >= 4) {
                distance[index] += 1;
                document.getElementById(carName).insertAdjacentHTML('beforeend', moveTemplate(randNum));
            }
        });
        cnt += 1;

        if (cnt == TRY_NUMBER) clearInterval(race);
    }, 1000);

    setTimeout(() => {
        const winnerList = [];
        const maxDist = Math.max.apply(null, distance);

        distance.forEach((dist, i) => {
            if (dist == maxDist) winnerList.push(CAR_NAME_LIST[i]);
        });

        $result.insertAdjacentHTML('afterbegin', resultTemplate(winnerList));
        $start.innerText = '경주 다시 시작하기';
        $start.className += ' checked';

        setTimeout(() => alert(winnerList.join(',') + '님 우승을 축하합니다.'), 1000 * 2);
    }, 1000 * TRY_NUMBER);
};
