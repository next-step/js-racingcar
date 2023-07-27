// import ValidateInput from "./ValidateInput.js";
// import Car from "./Car.js";
// import CarRacingGame from "./CarRacingGame.js";

// console.log("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)");

// const validateInput = new ValidateInput();

// // 1. 자동차 이름 입력 받기
// const TEMP_INPUT = "pobi,crong,honux";

// try {
// 	validateInput.isValidInput(TEMP_INPUT);
// } catch (e) {
// 	console.log(e.message);
// }

// // 2. 차량 이름을 입력받아 게임을 진행하는 객체 생성

// const cars = TEMP_INPUT.split(",").map((carName) => new Car(carName));
// const carRacingGame = new CarRacingGame(cars);
// // 3. 게임 진행

// console.log("실행 결과");
// while (carRacingGame.gameCount < 5) {
// 	carRacingGame.increaseGame();
// 	cars.forEach((car) => car.move(carRacingGame.getRandomValue));
// 	console.log(carRacingGame.getCarsStatus);
// }

// // 4. 우승자 출력
// console.log(carRacingGame.getWinner);

// // 5. 게임 종료
// carRacingGame.endGame();

import App from "./app.js";
console.log("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)");

const app = new App();
app.startGame();
