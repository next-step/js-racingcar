import { $ } from '../utils/index.js';
import View from './View.js';
import RacingCar from "./RacingCar.js";

class RaceCourseView extends View {
  tag = "[RaceCourseView]";

  init() {
    // console.log(`${this.tag}: init`)
    this.on("start-racing", ({ detail: { runCount, cars } }) => {
      
      this.renderCars(cars);

      cars = $("racing-car");
      if (!Array.isArray(cars)) {
        cars = [cars];
      }
      
      while (runCount--) {
        console.log(cars);
        cars.forEach(car => console.log(car) || car.run(runCount));
      }
      
      this.emit("finish-racing", {
        result: cars.map(car => ({
          name: car.name,
          totalDistance: car.getTotalDistance()
        }))
      });
    })
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