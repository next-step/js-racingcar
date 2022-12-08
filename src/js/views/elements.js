export const createSpinnerElement = () => {
  let spinnerWrapperEl = document.createElement('div');
  spinnerWrapperEl.setAttribute('class', 'spinner d-flex justify-center mt-3');
  let spinnerContainerEl = document.createElement('div');
  spinnerContainerEl.setAttribute('class', 'relative spinner-container');
  let spinnerEl = document.createElement('span');
  spinnerEl.setAttribute('class', 'material spinner');

  spinnerContainerEl.appendChild(spinnerEl);
  spinnerWrapperEl.appendChild(spinnerContainerEl);

  return spinnerWrapperEl;
}

export const createGoElement = () => {
  let goEl = document.createElement('div');
  let goText = document.createTextNode('⬇️️')
  goEl.setAttribute('class', 'forward-icon mt-2');
  goEl.appendChild(goText);

  return goEl;
}
