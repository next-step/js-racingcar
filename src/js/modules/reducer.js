const initialState = {
  cars: [],
  carReady: false,
  numberOfAttempts: 0,
  useAttemptsCount: 0,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return {
        ...state,
      }
  }
}

export default reducer
