import { CountInputModel } from './CountInputModel.js';
import { NameInputModel } from './NameInputModel.js';
import { ProcessModel } from './ProcessModel.js';
import { ResultModel } from './ResultModel.js';

export class GameModel {
  constructor() {
    this.nameInputModel = new NameInputModel(this.onCompleteNameInput.bind(this));
    this.countInputModel = new CountInputModel(this.onCompleteCountInput.bind(this));
    this.processModel = new ProcessModel(this.onCompleteRacing.bind(this));
    this.resultModel = new ResultModel();

    // View에서 이벤트 구독을 한 후에 상태를 변경하기 위해 setTimeout 활용
    setTimeout(() => {
      this.countInputModel.state.isVisible = false;
      this.processModel.state.isVisible = false;
      this.resultModel.state.isVisible = false;
    }, 0);
  }

  onCompleteNameInput(names) {
    this.countInputModel.state.isVisible = true;
    this.names = names;
  }

  onCompleteCountInput(count) {
    this.processModel.state.isVisible = true;
    this.processModel.state.names = this.names;
    this.processModel.state.count = count;
    this.processModel.startRacing();
  }

  onCompleteRacing(winners) {
    this.resultModel.state.isVisible = true;
    this.resultModel.state.winners = winners;
    this.resultModel.showAlert();
  }
}
