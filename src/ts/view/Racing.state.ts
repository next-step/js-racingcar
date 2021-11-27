import ERROR_MESSAGES from '../constants/ErrorMessage'
import Car from '../model/car.model'

type ErrorMessageType = keyof typeof ERROR_MESSAGES
type CarReducerInnerFuncResponse =
  | {
      success: true
      cars: Car[]
    }
  | {
      success: false
      message: ErrorMessageType
    }

export type State = {
  cars: Car[]
  gameCount: number | null
} & (
  | {
      _t: 'idle'
    }
  | {
      _t: 'idle'
      error: ErrorMessageType
    }
  | {
      _t: 'insert_cars'
    }
  | {
      _t: 'insert_cars'
      error?: ErrorMessageType
    }
  | {
      _t: 'insert_game_count'
      error?: string
    }
  | {
      _t: 'check_winner'
    }
)

export type Action =
  | {
      _t: 'INSERT_CARS'
      carNames: string
    }
  | {
      _t: 'INSERT_GAME_COUNT'
      gameCount: number
    }
  | {
      _t: 'CHECK_WINNER'
    }
  | {
      _t: 'SET_IDLE'
    }

const initialState: State = {
  _t: 'idle',
  cars: [],
  gameCount: null,
}

function splitCarNames(carNames: string) {
  return carNames.split(',').map((name) => name.trim())
}

function getCars(carNames: string): CarReducerInnerFuncResponse {
  const cars: Car[] = []
  const carNameArray = splitCarNames(carNames)

  for (const carName of carNameArray) {
    if (carName.length > 5) {
      return { success: false, message: 'NAME_LENGTH_INVALID_ERROR' }
    }

    cars.push(new Car(carName))
  }

  return { success: true, cars }
}
function reducer(prevState: State, action: Action): State {
  switch (action._t) {
    case 'SET_IDLE':
      return {
        ...initialState,
      }

    case 'INSERT_CARS':
      const getCarResponse = getCars(action.carNames)

      if (!getCarResponse.success) {
        return {
          ...prevState,
          error: getCarResponse.message,
        }
      }

      return {
        ...prevState,
        _t: 'insert_cars',
        cars: getCarResponse.cars,
      }

    case 'INSERT_GAME_COUNT':
      return {
        _t: 'insert_cars',
        cars: prevState.cars,
        gameCount: action.gameCount,
      }

    case 'CHECK_WINNER':
      return {
        ...prevState,
        _t: 'check_winner',
      }
  }
}

export function makeState(initialState: State) {
  const state: State = {
    ...initialState,
  }

  return {
    state,
    dispatch(action: Action) {
      Object.assign(state, reducer(state, action))
    },
  }
}
