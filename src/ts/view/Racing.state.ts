import ERROR_MESSAGES from "../constants/ErrorMessage";
import Car from "../model/car.model";

export type State = {
  cars: Car[];
  gameCount: number | null;
} & (
  | {
      _t: "idle";
    }
  | {
      _t: "insert_cars";
    }
  | {
      _t: "insert_game_count";
    }
  | {
      _t: "set_winner";
      winners: string[];
    }
);

export type Action =
  | {
      _t: "INSERT_CARS";
      carNames: string;
    }
  | {
      _t: "INSERT_GAME_COUNT";
      gameCount: number;
    }
  | {
      _t: "SET_WINNER";
      winners: string[];
    }
  | {
      _t: "SET_IDLE";
    };

const initialState: State = {
  _t: "idle",
  cars: [],
  gameCount: null,
};

function splitCarNames(carNames: string) {
  return carNames.split(",").map((name) => name.trim());
}

function getCars(carNames: string) {
  const cars: Car[] = [];
  const carNameArray = splitCarNames(carNames);

  for (const carName of carNameArray) {
    if (carName.length > 5 || !carName.length) {
      throw new Error(ERROR_MESSAGES.NAME_LENGTH_INVALID_ERROR);
    }

    cars.push(new Car(carName));
  }

  return cars;
}

function isGameCountValid(count: number) {
  return count > 0;
}

function getGameCount(count: number) {
  if (!isGameCountValid(count)) {
    throw new Error(ERROR_MESSAGES.GAME_COUNT_INVALID_ERROR);
  }

  return count;
}

function reducer(prevState: State, action: Action): State {
  switch (action._t) {
    case "SET_IDLE":
      return {
        ...initialState,
      };

    case "INSERT_CARS":
      return {
        ...prevState,
        _t: "insert_cars",
        cars: getCars(action.carNames),
      };

    case "INSERT_GAME_COUNT":
      return {
        _t: "insert_game_count",
        cars: prevState.cars,
        gameCount: getGameCount(action.gameCount),
      };

    case "SET_WINNER":
      return {
        ...prevState,
        _t: "set_winner",
        winners: action.winners,
      };
  }
}

export function makeState(initialState: State) {
  const state: State = {
    ...initialState,
  };

  return {
    state,
    dispatch(action: Action) {
      Object.assign(state, reducer(state, action));
    },
  };
}
