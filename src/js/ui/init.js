import hide from './hide.js';

export default function init() {
  const initHideNodes = document.querySelectorAll('.init-hide');

  initHideNodes.forEach(hide);
}
