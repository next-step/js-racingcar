export class ConsoleView {
  renderCarList({ carList }) {
    const currentTrack = car => `${car.name} : ${'-'.repeat(car.position)}`

    const result = carList.map(currentTrack).join('\n')
    console.log(`\n${result}`)
  }

  renderWinnerList({ winnerList }) {
    if (winnerList.length === 0) {
      console.log('\n우승자가 없습니다!')
      return
    }

    console.log(`\n${winnerList.join(', ')}(이)가 최종 우승했습니다.`)
  }

  renderError({ error }) {
    console.log(`\n ⚠️ ${error} ⚠️\n`)
  }

  update(state) {
    this.renderCarList(state)
    this.renderWinnerList(state)
  }
}
