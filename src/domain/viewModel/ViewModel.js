import { Observable } from '../../utils/Observable'
import { ACTION_TYPE, MUTATION_TYPE } from '../../constants/viewModel'
import { generateCarList, generateWinnerList, generateRace } from './getters'
import { Validator } from './Validator'

export class ViewModel extends Observable {
  #state

  constructor(model) {
    super()

    this.model = model
    this.model.subscribe(this.update.bind(this))

    const initialState = {
      step: 1,
      type: '',
      error: '',
      carNames: '',
      ...model.getState()
    }
    this.#state = initialState
  }

  handleMutation({ type, state }) {
    this.#state = {
      ...this.model.getState(),
      ...state,
      type
    }

    const { carList, winnerList, maxMatchLength, runCondition } = this.#state
    this.model.setState({ carList, winnerList, maxMatchLength, runCondition })
  }

  handleAction({ type, payload }) {
    const newState = { ...this.#state, ...payload }
    const validator = new Validator()

    try {
      validator.validate({
        maxMatchLength: Number(newState.maxMatchLength),
        carNames: newState.carNames
      })

      switch (type) {
        case ACTION_TYPE.START:
          this.start()
          break
        case ACTION_TYPE.CHANGE_STEP:
          this.handleMutation({
            type: MUTATION_TYPE.SET_STEP,
            state: {
              ...newState,
              maxMatchLength: Number(newState.maxMatchLength),
              carList: generateCarList(newState.carNames)
            }
          })
          break
      }
    } catch (error) {
      const { step, carNames } = this.#state

      this.handleMutation({
        type: MUTATION_TYPE.SET_ERROR,
        state: { error, carNames, step }
      })
    }
  }

  start() {
    let match = 0
    const race = generateRace(this.#state)

    while (match < this.#state.maxMatchLength) {
      match++
      race.startRound()

      this.handleMutation({
        type: MUTATION_TYPE.SET_CAR_LIST,
        state: { carList: race.participants }
      })
    }

    const winnerList = generateWinnerList(race.participants)
    this.handleMutation({
      type: MUTATION_TYPE.SET_WINNER_LIST,
      state: { winnerList }
    })
  }

  update() {
    this.notify(this.#state)
  }

  destroy() {
    this.unsubscribeAll()
  }

  getState() {
    return this.#state
  }
}
