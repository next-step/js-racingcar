import $ from './util.js';

const $submitCarNameBtn = $('#submit-cars-name');
const $inputCarName = $('#input-cars-name');
const $carNameContainer = $('#car-name-container');

$submitCarNameBtn.addEventListener('click', () => {
  const names = $inputCarName.value.split(',');
  let isValid = true;

  names.forEach(name => {
    if(name.length < 1 || name.length > 5) {
      isValid = false
      return;
    }
  })

  const $trialCountContainer = `<fieldset id="trial-count-container">
  <p>시도할 횟수를 입력해주세요.</p>
  <div class="d-flex">
    <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
    <button type="button" class="btn btn-cyan">확인</button>
  </div>
</fieldset>`

  if (isValid) {
    $carNameContainer.insertAdjacentHTML('afterend', $trialCountContainer);
  }
})




