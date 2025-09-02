import readline from "readline";

class Car {
  constructor(name) {
    this.name = name;
    this.location = 0;
  }

  move() {
    this.location += 1; // 간단히 1칸 이동
  }

  getPosition() {
    return "-".repeat(this.location);
  }
}

const CAR_NAME_MAX_LENGTH = 5;
const CAR_MOVE_COUNT = 5;

// 자동차 이름 길이 체크
const checkCarNameLength = (carName) => {
  return carName.length <= CAR_NAME_MAX_LENGTH;
};

// 자동차 이름 체크
const checkCarName = (carName) => {
  const carNames = carName.split(",");

  if (Array.isArray(carNames) && carNames.every(checkCarNameLength)) {
    return carNames;
  }

  if (typeof carNames === "string" && checkCarNameLength(carNames)) {
    return carNames;
  }

  return false;
};

// 사용자 입력 비동기 처리 함수
function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      const removeSpacesCarNames = input.replace(/ /g, "");
      const correctCarNames = checkCarName(removeSpacesCarNames);

      if (correctCarNames) {
        resolve(correctCarNames);
      }
    });
  });
}

const catPassedArea = (car) => {
  console.log(car.name);
  console.log();

  console.log("실행 결과");

  for (let i = 0; i < CAR_MOVE_COUNT; i++) {
    car.move();
    console.log(`${car.name} : ${car.getPosition()}`);
    console.log();
  }
  console.log();
  console.log("경주를 완료했습니다.");
};

// 게임 시작
const play = async () => {
  const carNames = await readLineAsync("경주할 자동차 이름을 입력하세요. > ");
  const cars = carNames.map((name) => new Car(name));

  for (let car of cars) {
    catPassedArea(car);
  }
};

play();
