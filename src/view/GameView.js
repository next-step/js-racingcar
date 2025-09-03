export class GameView {
  static getRacingStatusText(racingRecords) {
    let statusText = "";

    for (let i = 0; i < racingRecords.length; i += 1) {
      const { name, xPosition } = racingRecords[i];

      statusText += `${name} : ${"-".repeat(xPosition)}\n`;
    }

    return statusText;
  }
}
