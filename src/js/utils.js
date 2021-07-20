export const $ = {
  get: (selector) => document.querySelector(selector),
  getAll: (selector) => document.querySelectorAll(selector),
};

export const helper = {
  isForward: () => {
    return Math.random() * 10 > 3;
  },
  getWinner: (cars) => {
    let max = 0;
    let winner = [];

    cars.forEach((car) => {
      const value = car.el.children.length;
      if (value > max) {
        max = value;
        winner = [car.name];
      } else if (value === max) {
        winner.push(car.name);
      }
    });

    return winner;
  },
};

export const validator = {
  carsName: (cars) => {
    let check = true;
    cars.forEach((car) => {
      const length = car.name.length;
      if (length > 5 || length < 1) {
        check = false;
      }
    });
    return check;
  },
  turns: (turns) => {
    return turns > 0;
  },
};

export const createEl = {
  stadium: () => {
    const el = document.createElement("div");
    el.className = "mt-4 d-flex";

    return el;
  },
  car: (name) => {
    const playerName = document.createElement("div");
    playerName.className = "car-player";
    playerName.textContent = name;

    const wrapper = document.createElement("div");
    wrapper.className = "mr-2 d-flex f-column items-center";
    wrapper.appendChild(playerName);
    wrapper.appendChild(createEl.spinner());

    return wrapper;
  },
  forwardIcon: () => {
    const el = document.createElement("div");
    el.className = "forward-icon mt-2";
    el.textContent = "⬇️️";

    return el;
  },
  spinner: () => {
    const spinnerEl = document.createElement("span");
    spinnerEl.className = "material spinner";

    const wrapper = document.createElement("div");
    wrapper.className = "relative spinner-container";
    wrapper.appendChild(spinnerEl);

    return wrapper;
  },
};
