import { ERROR_TEXT, CLASS_TYPE, INTERVAL_TIME } from "./constants.js";
import { validator, createEl, helper } from "./utils.js";

const racing = (() => {
  let cars = [];
  let turns = 0;
  let stadium;

  return {
    clear: (inputs, sections) => {
      cars = [];
      turns = 0;
      stadium.remove();
      inputs.forEach((el) => {
        el.value = "";
        el.disabled = false;
      });
      sections.forEach((el) => el.classList.add(CLASS_TYPE.DISPLAY_NONE));
    },

    setCars: (str, next) => {
      cars = str.split(",").map((name) => ({ name: name.trim(), value: 0 }));
      if (validator.carsName(cars)) {
        next.classList.remove(CLASS_TYPE.DISPLAY_NONE);

        return true;
      } else {
        alert(ERROR_TEXT.CARS_NAME_LENGTH);

        return false;
      }
    },

    setTurns: async (value) => {
      if (validator.turns(value)) {
        turns = value;

        return true;
      } else {
        alert(ERROR_TEXT.ZERO_TURNS_INPUT);

        return false;
      }
    },

    play: (stadiumSection) =>
      new Promise((resolve) => {
        stadiumSection.classList.remove(CLASS_TYPE.DISPLAY_NONE);
        stadium = stadiumSection.appendChild(createEl.stadium());

        cars.forEach((car) => {
          const carEl = createEl.car(car.name);
          car.el = carEl;
          stadium.appendChild(carEl);
        });

        const interval = setInterval(() => {
          cars.forEach((car) => {
            const lastEl = car.el.lastChild;
            if (helper.isForward()) {
              car.el.insertBefore(createEl.forwardIcon(), lastEl);
            }
          });

          if (--turns < 0) {
            clearInterval(interval);
            resolve();
          }
        }, INTERVAL_TIME);
      }),

    printResult: (resultSection) => {
      // 스피너 삭제
      cars.forEach((car) => {
        car.el.lastChild.remove();
      });

      resultSection.classList.remove(CLASS_TYPE.DISPLAY_NONE);

      const result = resultSection.querySelector("h2");
      result.textContent = `🏆 최종 우승자: ${helper
        .getWinner(cars)
        .join(", ")} 🏆`;
    },
  };
})();

export default racing;
