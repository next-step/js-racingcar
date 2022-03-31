const MIN_LENGTH = 1;
const MAX_LENGTH = 5;
const MESSAGE = {
    OUT_OF_RANGE: `자동차 이름은 ${MIN_LENGTH} ~ ${MAX_LENGTH}자로 입력해야합니다.`,
};
export class CarNames {
    names = "";

    constructor() {}

    set names(names) {
        this.names = names;
    }

    splitCarNames() {
        this.names.split(",");
    }

    getCarNamesState() {
        let resultValue = {
            isComplte: true,
            message: "",
        };

        if (this.names.length < MIN_LENGTH || this.names.length > MAX_LENGTH) {
            resultValue.isComplte = false;
            resultValue.message = MESSAGE.OUT_OF_RANGE;

            return resultValue;
        }

        return resultValue;
    }
}
