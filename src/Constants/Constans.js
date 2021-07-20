export const EVENT = {
  CLICK: 'click',
};

export const ERROR = {
  INVAILD_CAR_NAME_LENGTH: '자동차 이름은 5자 이하여야 합니다.',
  INVAILD_START_CONDITION:
    '자동차는 2대 이상이이어하고, 시도 횟수는 2 이상 이어야 합니다.',
};

export const MESSAGE = {
  WHO_IS_WINNER: "🏆 우승의 주인공은 누가 될까요! 🏆",
  WINNER: (winner) => `🏆 최종 우승자: ${winner.map((winner) => winner).join(', ')}🏆`,
  CONGRATULATIONS: (winner) => `🏆 축하합니다. ${winner.map((winner) => winner).join(', ')}! 🏆`
}