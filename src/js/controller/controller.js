// util
import { instanceCheck } from '../utils/typeCheck.js';

// components
import UserRacingInputComponent from '../components/UserRacingInputComponent.js';
import GameProcessComponent from '../components/GameProcessComponent.js';

// models
import GameProcessModel from '../model/GameProcessModel.js';
import UserRacingInputModel from '../model/UserRacingInputModel.js';

export default class MainController {
  constructor() {
    this.userRacingInputModel = UserRacingInputModel.getInstance();
    this.gameProcessModel = GameProcessModel.getInstance();
  }

  initFirstView = () => {
    UserRacingInputComponent({
      userRacingInputState: this.userRacingInputModel,
      startGame: this.setGameConfigurationAndStart,
    });
  };

  setGameConfigurationAndStart = (
    gameConfigurationData,
    _ = instanceCheck(gameConfigurationData, UserRacingInputModel)
  ) => {
    this.gameProcessModel.setGameConfigurationData(gameConfigurationData);
    GameProcessComponent({
      gameProcessState: this.gameProcessModel,
    });
  };
}
