const CarListItem = (name) => `
  <div class="mr-2">
    <div class="car-player">${name}</div>
  </div>
`;

export default function CarList() {
  const carList = document.querySelector(".car-list");

  const render = (carNames) => {
    carList.innerHTML = carNames.map(CarListItem).join("");
  };

  return {
    render,
  };
}
