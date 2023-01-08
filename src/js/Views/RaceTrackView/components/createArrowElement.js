function createArrowElement() {
  const arrowElement = document.createElement('div');
  arrowElement.classList.add('forward-icon', 'mt-2');
  arrowElement.textContent = '⬇️️';

  return arrowElement;
}

export { createArrowElement };
