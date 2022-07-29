export const displayTemplate = (selector, template) => {
  selector.innerHTML = template;
};

export const removeHiddenClass = (selector) => {
  selector.classList.remove('hidden');
};

export const removeAllSpinners = (cars) => {
  cars.forEach((car) => {
    if (car.hasChildNodes()) {
      car.removeChild(car.lastElementChild);
    }
  });
};
