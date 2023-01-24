export default function printSpinner() {
  const spinnerTemp = `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>`;
  const carWrappers = document.querySelectorAll('.car-player-wrap');

  carWrappers.forEach((ele) => {
    ele.insertAdjacentHTML('beforeend', spinnerTemp);
  });
}
