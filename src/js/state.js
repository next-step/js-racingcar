import render from './render.js'

const state = {
  // * 게임 스탭
  // 1. 자동차 이름 입력 2. 시도할 횟수 입력 3. 게임 진행
  step: 1,
  // * 레이싱 하는 자동차 리스트
  cars: [],
  // * 게임 카운트
  gameCount: 0,
  // * 게임 결과
  gameResult: {},
}

const setState = (newState) => {
  Object.keys(state).forEach(
    (key) => (state[key] = newState[key] ?? state[key])
  )
  render()
}

export { state, setState }
