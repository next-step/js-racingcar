class RemoveTemplate {
  removeAllSpinners = (cars) => {
    cars.forEach((car) => {
      if (car.hasChildNodes()) {
        car.removeChild(car.lastElementChild);
      }
    });
  };
}

export default RemoveTemplate;
