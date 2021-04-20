export const carTemplate = (carName) => {
    return `<div class="mr-2" id="${carName}">
                <div class="car-player ${carName}">${carName}</div>
            </div>`;
};

export const resultTemplate = (winnerList) => {
    return `<div class="winner"><h2>🏆 최종 우승자: ${winnerList.join(',')}🏆</h2></div>`;
};

export const moveTemplate = (randNum) => {
    return `<div class="forward-icon mt-2 num-${randNum}">⬇️️</div>`;
};

export const startBtnTemplate = () => {
    return `<div class="d-flex justify-center">
                <button type="button" class="btn btn-cyan start" id="start">경주 시작하기</button>
            </div>`;
};

export const tryNumberTemplate = (tryNumber) => {
    return `<h2>시도 횟수 : ${tryNumber}</h2>`;
};
