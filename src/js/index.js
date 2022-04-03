const $ = (el) => document.querySelector(el);

const $carNamesInput = $('#car-names-input');
const $carNamesSubmit = $('#car-names-submit');
const $carTryBlock = $('#car-try-block');
const $carTrySubmit = $('#car-try-submit');
const $carRacingBlock = $('#car-racing-block');

function isCheckCarNameLength(carName) {
	return carName.split(', ').every((item) => item.length < 6);
}

$carNamesSubmit.addEventListener('click', () => {
	if (!$carNamesInput.value) {
		// TODO: 에러 메세지를 상수화한다.
		alert('자동차의 이름을 입력해주세요.');
		return;
	}

	// TODO: 5라는 값을 상수화한다.
	if (!isCheckCarNameLength($carNamesInput.value)) {
		alert('자동차의 이름은 최대 5글자까지 입력 가능합니다.');
		return;
	}

	$carNamesInput.disabled = true;
	$carTryBlock.style.display = 'block';
});

$carTrySubmit.addEventListener('click', () => {
	const $carTryInput = $('#car-try-input');

	if (!$carTryInput.value) {
		alert('시도할 횟수를 입력해주세요.');
		return;
	}

	$carTryInput.disabled = true;
	$carRacingBlock.style.display = 'flex';
	$carRacingBlock.children[0].innerHTML = `
		${$carNamesInput.value
			.split(', ')
			.map(
				(name) =>
					`<div class="mr-2">
					<div class="car-player">${name}</div>
					<div class="forward-icon mt-2">⬇️️</div>
					<div class="forward-icon mt-2">⬇️️</div>
				</div>`
			)
			.join('')}
		`;
});
