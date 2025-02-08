class Acceleration {
    canAccelerate() {
        throw new Error("canAccelerate() 메서드를 구현해야 합니다.");
    }
}

class RandomAcceleration extends Acceleration {
    static MOVE_THRESHOLD = 4;

    canAccelerate() {
        return Math.floor(Math.random() * 10) >= RandomAcceleration.MOVE_THRESHOLD;
    }
}

export {Acceleration, RandomAcceleration};
