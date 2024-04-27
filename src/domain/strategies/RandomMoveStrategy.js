import { getRandom } from "../../utils";
import { MoveStrategy } from "./MoveStrategy";

export class RandomMoveStrategy extends MoveStrategy {
  static MOVE_FORWARD_CAR = 4;
  static MOVE_MIN = 0;
  static MOVE_MAX = 9;

  move(car) {
    if (
      getRandom(RandomMoveStrategy.MOVE_MIN, RandomMoveStrategy.MOVE_MAX) >=
      RandomMoveStrategy.MOVE_FORWARD_CAR
    ) {
      car.moveForward();
    }
  }
}
