import { Observable } from '../utils/Observable'
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
      case 'ready':
        this.ready(state)
        break
      case 'start':
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
      type: 'ready',
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

      this.handleMutation({ type: 'updateCarList', carList: race.participants })
    }

    const winnerList = generateWinnerList(race.participants)
    this.handleMutation({ type: 'updateWinnerList', winnerList })
  }

  update() {
    this.notify(this.state)
  }

  destroy() {
    this.unsubscribeAll()
  }
}
