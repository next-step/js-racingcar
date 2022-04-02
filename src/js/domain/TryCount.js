import { TryCountException } from "../exception/TryCountException.js";

export class TryCount {
    static MIN_COUNT = 1;
    static MAX_COUNT = 20;
    static OUT_OF_TRY_COUNT_RANGE = `시도 횟수는 ${TryCount.MIN_COUNT}~${TryCount.MAX_COUNT}로 입력해야합니다.`;

    #tryCount;
    constructor(count) {
        TryCount.validate(count);
        this.#tryCount = count;
    }

    get value() {
        return this.#tryCount;
    }

    static validate(count) {
        if (+count < TryCount.MIN_COUNT || +count > TryCount.MAX_COUNT) {
            throw new TryCountException();
        }
    }
}
