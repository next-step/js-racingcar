// util
import { instanceCheck } from '../utils/typeCheck.js';

// components
import UserRacingInputComponent from '../components/UserRacingInputComponent.js';
import GameProcessComponent from '../components/GameProcessComponent.js';

// models
import GameProcessModel from '../model/GameProcessModel.js';
import UserRacingInputModel from '../model/UserRacingInputModel.js';

export default class MainController {
  constructor() {}

  initFirstView() {
    UserRacingInputComponent({
      userRacingInputState: new UserRacingInputModel(),
      startGame: this.startGameAndShow,
    });
  }

  startGameAndShow(
    gameConfigurationData,
    _ = instanceCheck(gameConfigurationData, GameProcessModel)
  ) {
    GameProcessComponent({
      gameProcessState: new GameProcessModel(data),
    });
  }
}
