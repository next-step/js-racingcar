(() => {
  // src/ts/utils/dom.ts
  var $ = (selector, type = "ID") => {
    if (type === "ID") {
      return document.querySelector("#" + selector);
    }
    if (type === "CLASSNAME") {
      return document.querySelector("." + selector);
    }
    return document.querySelector(selector);
  };

  // src/ts/constants/ErrorMessage.ts
  var NAME_LENGTH_INVALID_ERROR = "\uC790\uB3D9\uCC28\uC758 \uC774\uB984\uC740 5\uC790 \uC774\uD558\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4.";
  var GAME_COUNT_INVALID_ERROR = "\uAC8C\uC784\uD69F\uC218\uB294 1\uC774\uC0C1\uC73C\uB85C \uC785\uB825\uD574\uC8FC\uC138\uC694.";
  var ERROR_MESSAGES = Object.freeze({
    NAME_LENGTH_INVALID_ERROR,
    GAME_COUNT_INVALID_ERROR
  });
  var ErrorMessage_default = ERROR_MESSAGES;

  // src/ts/utils/random.ts
  var getRamdomNumber = ({ min, max }) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // src/ts/model/car.model.ts
  var Car = class {
    name;
    #progressDistance;
    #tryCount;
    constructor(name) {
      this.name = name;
      this.#progressDistance = 0;
      this.#tryCount = 0;
    }
    move() {
      const isProgress = this.getIsProgress();
      if (isProgress) {
        this.#progressDistance += 1;
      }
    }
    getIsStopProgress() {
      return this.#tryCount === this.#progressDistance;
    }
    getIsProgress() {
      return getRamdomNumber({ min: 0, max: 9 }) >= 4;
    }
    set tryCount(count) {
      this.#tryCount = count;
    }
    get moveDistance() {
      return this.#progressDistance;
    }
  };
  var car_model_default = Car;

  // src/ts/view/Racing.state.ts
  var initialState = {
    _t: "idle",
    cars: [],
    gameCount: null
  };
  function splitCarNames(carNames) {
    return carNames.split(",").map((name) => name.trim());
  }
  function getCars(carNames) {
    const cars = [];
    const carNameArray = splitCarNames(carNames);
    for (const carName of carNameArray) {
      if (carName.length > 5) {
        throw new Error(ErrorMessage_default.NAME_LENGTH_INVALID_ERROR);
      }
      cars.push(new car_model_default(carName));
    }
    return cars;
  }
  function isGameCountValid(count) {
    return count > 0;
  }
  function getGameCount(count) {
    if (!isGameCountValid(count)) {
      throw new Error(ErrorMessage_default.GAME_COUNT_INVALID_ERROR);
    }
    return count;
  }
  function reducer(prevState, action) {
    switch (action._t) {
      case "SET_IDLE":
        return {
          ...initialState
        };
      case "INSERT_CARS":
        return {
          ...prevState,
          _t: "insert_cars",
          cars: getCars(action.carNames)
        };
      case "INSERT_GAME_COUNT":
        return {
          _t: "insert_game_count",
          cars: prevState.cars,
          gameCount: getGameCount(action.gameCount)
        };
      case "CHECK_WINNER":
        return {
          ...prevState,
          _t: "check_winner"
        };
    }
  }
  function makeState(initialState2) {
    const state = {
      ...initialState2
    };
    return {
      state,
      dispatch(action) {
        Object.assign(state, reducer(state, action));
      }
    };
  }

  // src/ts/view/Racing.view.ts
  var css = String.raw;
  var setStyle = (state) => {
    const {
      GameCountFieldset,
      RacingRoadSection,
      WinnerSection,
      CarNameButton,
      GameCountInput,
      GameCountButton,
      CarNameInput
    } = ViewComponents;
    switch (state._t) {
      case "idle":
        GameCountFieldset.style.cssText = css`
        display: none;
      `;
        RacingRoadSection.style.cssText = css`
        display: none;
      `;
        WinnerSection.style.cssText = css`
        display: none;
      `;
        CarNameInput.disabled = false;
        CarNameButton.disabled = false;
        GameCountInput.disabled = false;
        GameCountButton.disabled = false;
        return;
      case "insert_cars":
        GameCountFieldset.style.cssText = css`
        display: block;
      `;
        CarNameInput.disabled = true;
        CarNameButton.disabled = true;
        return;
      case "insert_game_count":
        RacingRoadSection.style.cssText = css`
        display: flex;
      `;
        GameCountInput.disabled = true;
        GameCountButton.disabled = true;
        return;
      case "check_winner":
        WinnerSection.style.cssText = css`
        display: block;
      `;
        return;
    }
  };

  // src/ts/controller/racing.controller.ts
  var ViewComponents = {
    GameCountFieldset: $("game-count-fieldset", "CLASSNAME"),
    CarNameFieldset: $("car-name-fieldset", "CLASSNAME"),
    RacingRoadSection: $("racing-road-section", "CLASSNAME"),
    WinnerSection: $("winner-section", "CLASSNAME"),
    CarNameInput: $("car_name_input"),
    CarNameButton: $("car_name_button"),
    GameCountInput: $("game_count_input"),
    GameCountButton: $("game_count_button"),
    ResetButton: $("reset_button")
  };
  var RacingController = class {
    state;
    dispatch;
    constructor() {
      const { state, dispatch } = makeState({
        _t: "idle",
        cars: [],
        gameCount: null
      });
      this.state = state;
      this.dispatch = dispatch;
      setStyle(state);
      this.setEvent();
    }
    setEvent() {
      const {
        CarNameInput,
        CarNameButton,
        GameCountInput,
        GameCountButton,
        WinnerSection
      } = ViewComponents;
      const dispatchInsertCars = () => this.dispatchEvent({
        makeAction: () => {
          return {
            _t: "INSERT_CARS",
            carNames: CarNameInput.value
          };
        },
        onError: () => {
          CarNameInput.value = "";
          CarNameInput.focus();
        },
        onEventEnd: () => {
          GameCountInput.focus();
        }
      });
      const dispatchInsertGameCount = () => this.dispatchEvent({
        makeAction: () => {
          return {
            _t: "INSERT_GAME_COUNT",
            gameCount: Number(GameCountInput.value)
          };
        },
        onError: () => {
          GameCountInput.value = "";
          GameCountInput.focus();
        }
      });
      const dispatchResetGame = () => this.dispatchEvent({
        makeAction: () => {
          return {
            _t: "SET_IDLE"
          };
        }
      });
      const isPressEnter = (event) => event.key === "Enter";
      CarNameButton.addEventListener("click", () => dispatchInsertCars());
      GameCountButton.addEventListener("click", () => dispatchInsertGameCount());
      WinnerSection.addEventListener("click", () => dispatchResetGame());
      CarNameInput.addEventListener("keypress", (event) => {
        if (isPressEnter(event)) {
          dispatchInsertCars();
        }
      });
      GameCountInput.addEventListener("keypress", (event) => {
        if (isPressEnter(event)) {
          dispatchInsertGameCount();
        }
      });
    }
    dispatchEvent({
      makeAction,
      onEventEnd = () => {
      },
      onError = () => {
      }
    }) {
      try {
        this.dispatch(makeAction());
        setStyle(this.state);
        onEventEnd();
      } catch (error) {
        onError();
        alert(error);
      }
    }
    resetGame() {
      this.dispatch({ _t: "SET_IDLE" });
    }
    startGame() {
      this.state.cars.forEach((car) => {
        car.tryCount = this.state.gameCount;
      });
      console.log(this.state);
    }
  };
  var racing_controller_default = RacingController;

  // src/ts/index.ts
  new racing_controller_default();
})();
