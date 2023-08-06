const Message = require('../constants/message.js');

const utils = {
    isAlphabet(str) {
        const regex = /^[a-zA-Z]*$/;
        return regex.test(str);
    },
    randomNumber() {
        return Math.floor(Math.random() * 10);
    },
    validateName(name) {
        if (name.length > Message.CAR_NAME_MAX_LENGTH) {
            throw new Error(Message.ERROR.CAR_MAX_LENGTH);
        }

        if (name.length < Message.CAR_NAME_MIN_LENGTH) {
            throw new Error(Message.ERROR.CAR_MIN_LENGTH);
        }

        if (!this.isAlphabet(name)) {
            throw new Error(Message.ERROR.CAR_NAME_ALPHABET);
        }
    },
    validateCount(count) {
        if (isNaN(count)) {
            count = Message.RACE_COUNT;
        }

        if (count > 100) {
            throw new Error(Message.ERROR.COUNT_MAX);
        }

        if (count < 1) {
            throw new Error(Message.ERROR.COUNT_MIN);
        }

        return count;
    }
}
module.exports = utils;
