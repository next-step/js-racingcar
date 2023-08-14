const Message = require('../constants/message.js')

const winnerView = (cars) => {
    const maxPosition = Math.max(...cars.map(({ position }) => position));
    // 우승자 선정하기
    const winners = cars.filter(({ position }) => position === maxPosition).map(({ name }) => name);
    console.log(Message.WINNER(winners, maxPosition));
}
module.exports = winnerView;