export const $racingcarNameInput = document.querySelector('input[name=car-name]')
export const $racingcarNameButton = document.querySelector('input[name=car-name] + button');

export const $attemptFieldset = document.querySelector('.attempt');
export const $attemptNumberInput = document.querySelector('input[name=attempt-number]');
export const $attemptNumberButton = document.querySelector('input[name=attempt-number] + button');

export const hideAttemptFieldset = () => {
  $attemptFieldset.classList.add('d-none');
}

export const showAttemptFieldset = () => {
  $attemptFieldset.classList.remove('d-none');
}
