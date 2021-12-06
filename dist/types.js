export var Actions;
(function (Actions) {
    Actions["init"] = "init";
    Actions["reset"] = "reset";
    Actions["setCarNames"] = "setCarNames";
    Actions["setTotalAttempts"] = "setTotalAttempts";
    Actions["race"] = "race";
    Actions["raceFinished"] = "raceFinished";
    Actions["notifyWinner"] = "notifyWinner";
})(Actions || (Actions = {}));
export var Status;
(function (Status) {
    Status["idle"] = "idle";
    Status["playing"] = "playing";
    Status["finished"] = "finished";
})(Status || (Status = {}));
export var StateKeys;
(function (StateKeys) {
    StateKeys["cars"] = "cars";
    StateKeys["totalAttempts"] = "totalAttempts";
    StateKeys["trial"] = "trial";
    StateKeys["scores"] = "scores";
    StateKeys["processing"] = "processing";
    StateKeys["winners"] = "winners";
    StateKeys["status"] = "status";
})(StateKeys || (StateKeys = {}));
//# sourceMappingURL=types.js.map