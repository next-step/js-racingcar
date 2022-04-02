const $ = (el) => document.querySelector(el);

const $button = $('#car-names-submit');
$button.addEventListener('click', () => {
	const $input = $('#car-names-input');
	if (!$input.value) {
		// TODO: 에러 메세지를 상수화한다.
		alert('자동차의 이름을 입력해주세요.');
	}
});
