import { move } from '../utils/move.js'
import addEvent from '../utils/addEvent.js'
import { setState, state } from './state.js'

const handleCarListButtonClick = () => {
  const $carListInput = document.querySelector('#carListForm input')
  const carList = $carListInput.value

  if (!carList) {
    alert(
      '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
    )
    return
  }

  setState({
    step: 2,
    cars: carList
      .split(',')
      .reduce((p, v) => ((p = [...p, { name: v, position: 0 }]), p), []),
  })
}

const handleGameCountFormButton = () => {
  const $gameCountInput = document.querySelector('#gameCountForm input')
  const gameCount = $gameCountInput.value

  if (!gameCount) {
    alert(
      '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.'
    )
    return
  }

  setState({
    step: 3,
    gameCount: Number(gameCount),
  })

  move()
}

const handlers = () => {
  addEvent('click', '#carListForm button', handleCarListButtonClick)
  addEvent('click', '#gameCountForm button', handleGameCountFormButton)
}

const init = () => {
  handlers()
}

init()
