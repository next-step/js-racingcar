import { MoveStrategy } from "./MoveStrategy";

export class DefaultMoveStrategy extends MoveStrategy {
  move(car) {
    car.moveForward();
  }
}
