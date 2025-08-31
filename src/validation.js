import Car from "./car.js";

export function validCarList(carList) {
  if (!Array.isArray(carList) || !carList.every((car) => car instanceof Car)) {
    throw new Error("Car 인스턴스 배열이여야 합니다.");
  }
}
