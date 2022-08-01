export const racingLineEl = () => {
  const el = document.createElement('div');
  el.setAttribute('class', 'mr-2');
  return el;
};

export const carNameEl = (name) => {
  const el = document.createElement('div');
  el.setAttribute('class', 'car-player');
  el.append(name);
  return el;
};

export const loadingEl = () => {
  const el = document.createElement('div');
  el.setAttribute('class', 'loading d-flex justify-center mt-3');

  const el2 = document.createElement('div');
  el2.setAttribute('class', 'relative spinner-container');

  const el3 = document.createElement('div');
  el3.setAttribute('class', 'material spinner');

  el.append(el2);
  el2.append(el3);

  return el;
};

export const downArrowEl = () => {
  const el = document.createElement('div');
  el.setAttribute('class', 'forward-icon mt-2');
  el.append('\u2B07');
  return el;
};
