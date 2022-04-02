import { TryCount } from "../domain/TryCount.js";

export class TryCountException extends Error {
    constructor() {
        super(TryCount.OUT_OF_TRY_COUNT_RANGE);
    }
}
