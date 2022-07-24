const racingProcessWrapperTemplate = /* html */ `
    <section class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
        </div>
    </section>
`;

const carInfoTempalte = (carName) => /* html */ `
    <div class="mr-2">
        <div class="car-player">${cartName}</div>
    </div>
`;

const moveArrowTemplate = /* html */ `
    <div class="forward-icon mt-2">⬇️️</div>
`;

class RacingProcessView {
  $app;

  constructor() {
    this.$app = $("#app");
  }
}
