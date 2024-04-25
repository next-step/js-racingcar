export const splitNamesByComma = (names) => {
  return names.split(",");
};

export const joinNamesByComma = (nameArray) => {
  return nameArray.join(", ");
};

export const printCarsStatus = (cars) => {
  cars.forEach((car) => {
    console.log(car.statusToString());
  });
};
