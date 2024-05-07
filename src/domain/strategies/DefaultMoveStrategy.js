import { MoveStrategy } from "./MoveStrategy";

export class DefaultMoveStrategy extends MoveStrategy {
  shouldMove() {
    return true;
  }
}
