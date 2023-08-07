import { Observable } from '../utils/Observable'
import { ACTION_TYPE, MUTATION_TYPE } from '../constants/viewModel'
import { generateCarList, generateWinnerList, generateRace } from './getters'

export class ViewModel extends Observable {
  constructor(model) {
    super()

    this.model = model
    this.model.subscribe(this.update.bind(this))

    this.state = {
      type: '',
      ...model.getState()
    }
  }

  handleAction({ type, state }) {
    switch (type) {
      case ACTION_TYPE.READY:
        this.ready(state)
        break
      case ACTION_TYPE.START:
        this.start()
        break
    }
  }

  handleMutation({ type, ...state }) {
    this.state = {
      type,
      ...this.model.getState(),
      ...state
    }

    const { carList, winnerList, maxMatchLength, runCondition } = this.state
    this.model.setState({ carList, winnerList, maxMatchLength, runCondition })
  }

  ready({ carNames, maxMatchLength }) {
    const carList = generateCarList(carNames)

    this.handleMutation({
      type: MUTATION_TYPE.READY,
      carList,
      maxMatchLength,
      winnerList: []
    })
  }

  start() {
    let match = 0
    const race = generateRace(this.state)

    while (match < this.state.maxMatchLength) {
      match++
      race.startRound()

      this.handleMutation({
        type: MUTATION_TYPE.CAR_LIST,
        carList: race.participants
      })
    }

    const winnerList = generateWinnerList(race.participants)
    this.handleMutation({ type: MUTATION_TYPE.WINNER_LIST, winnerList })
  }

  update() {
    this.notify(this.state)
  }

  destroy() {
    this.unsubscribeAll()
  }
}
