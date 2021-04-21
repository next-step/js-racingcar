const SETTINGS = {
  rule: {
    minName: 1,
    maxName: 5,
    minTotalRound: 1,
    minBenchmark: 0,
    maxBenchmark: 9,
    movingBenchmark: 4,
  },
  defaultVal: {
    laps: 0,
    round: 0,
    raceTerm: 1000,
    celebrationTerm: 2000,
  },
  stage: {
    entry: 0,
    round: 1,
    race: 2,
    award: 3,
  },
  id: {
    app: 'app',
    userInputComp: 'user-input-component',
    inputCarName: 'input-car-name',
    submitCarName: 'submit-car-name',
    raceTimesComp: 'race-times-component',
    inputRaceTimes: 'input-race-times',
    submitRaceTimes: 'submit-race-times',
    gameProcessComp: 'game-process-component',
    gameResultComp: 'game-result-component',
    infoGameResult: 'info-game-result',
    submitGameResult: 'submit-game-result',
  },
  klass: {
    hidden: 'hidden',
  },
  event: {
    click: 'click',
    keyup: 'keyup',
    race: 'race',
    award: 'award',
  },
  keyCode: {
    enter: 'Enter',
  },
  string: {
    comma: ',',
    empty: '',
    winnerDelimiter: ',&nbsp;',
  },
  msg: {
    invalidName:
      '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
    invalidRound:
      '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
    celebration: '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇',
    finishedYet: 'race not finished.',
    noOverriding: 'no overriding.',
  },
};

export default SETTINGS;
