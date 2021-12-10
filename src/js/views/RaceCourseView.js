import { $ } from '../utils/index.js';
import View from './View.js';
import RacingCar from "./RacingCar.js";

class RaceCourseView extends View {
  tag = "[RaceCourseView]";

  init() {
    // console.log(`${this.tag}: init`)
    this.on("start-racing", this.onStart);
  }

  onStart = ({ detail: { runCount, carNames } }) => {
    this.renderCars(carNames);

    let cars = $("racing-car");
    if (!Array.isArray(cars)) {
      cars = [cars];
    }

    this.goToTheFinishLine(cars, runCount)
      .then(() => {
        this.emit("finish-racing", {
          result: cars.map(car => ({
            name: car.name,
            totalDistance: car.getTotalDistance()
          }))
        });
      });
  }

  goToTheFinishLine(cars, runCount) {
    return new Promise((resolve) => {
      let start = null;
      
      const callback = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        if (progress >= 1000) {
          runCount--;
          cars.forEach(car => { car.setRunCount(runCount).run() });
          start = timestamp;
          if (runCount === 0) {
            resolve();
            return;
          }
        }
        requestAnimationFrame(callback);
      };
      requestAnimationFrame(callback);
    });
  }

  renderCars(carNames = []) {
    // console.log(`${this.tag}: ${carNames}`);
    
    this.replaceChildren();
    /* html */
    const html = `
    <section class="d-flex justify-center mt-5">
      <div class="mt-4 d-flex">
      ${carNames.map(carName => `<racing-car name="${carName}"></racing-car>`).join("")}
      </div>
    </section>
    `;
    this.insertAdjacentHTML("afterbegin", html);

    return this;
  }
}

customElements.define("race-course-view", RaceCourseView);

export default RaceCourseView;
