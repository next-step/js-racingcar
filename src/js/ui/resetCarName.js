export default function resetCarName() {
  const carName = document.querySelector('.car-name');
  const carNameButton = document.querySelector('.btn-car-name');

  carName.value = null;
  carName.removeAttribute('disabled')
  carNameButton.removeAttribute('disabled')
  carName.focus();
}