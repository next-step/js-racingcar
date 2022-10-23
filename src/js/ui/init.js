export default function init() {
  const initHideNodes = document.querySelectorAll('.init-hide');

  initHideNodes.forEach((ele) => (ele.style.display = 'none'));
}
