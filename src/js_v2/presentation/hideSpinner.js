export default function hideSpinner(ele) {
  const carWrappers = document.querySelectorAll('.car-player-wrap');

  carWrappers.forEach((ele) => {
    ele.removeChild(ele.lastChild);
  });
}
