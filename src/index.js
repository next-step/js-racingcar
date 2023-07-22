import { GameController } from './Controllers/GameController';

const playGame = () => {
  const controller = new GameController();

  controller.play();
};
