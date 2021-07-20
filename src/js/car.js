export default class Car {
  constructor(name, times) {
    this.name = name;
    this.times = times;
    this.moved = 0;
    this.km = undefined;
    this.carNames = [];
    this.nameCardComponents = undefined;

    this.names = document.querySelector("#names");
    this.namesInput = document.querySelector("#names input");
    this.nameCards = document.querySelector("#nameCards");
    this.nameSubmitBtn = this.names.querySelector("button");
    this.gameWinner = document.querySelector("#winner");
    this.nameCard = document.createElement("div");
  }

  init() {
    this.nameCard.setAttribute("class", "mt-4 d-flex");
    this.nameCardComponents = this.carNames
      .map(
        name => `
        <div class="mr-2">
          <div class="car-player">${name}</div>
          <div class="forward-icon mt-2">⬇️️</div>
          <div class="forward-icon mt-2">⬇️️</div>
        </div>`
      )
      .join("");
    this.nameCard.innerHTML = `
    ${this.nameCardComponents}
    `;
    this.nameCards.appendChild(this.nameCard);
    showWinner();
  }

  run() {
    this.km = Math.floor(Math.random() * 10);
    this.km >= 4 ? (this.moved += this.km) : moved;
    console.log(this.km + "km이동 (총" + this.moved + "km)");
  }
}
