export var Status;
(function (Status) {
    Status["idle"] = "idle";
    Status["playing"] = "playing";
    Status["finished"] = "finished";
})(Status || (Status = {}));
export const Boundaries = {
    ForwardCutOff: 4,
    MaximumNameLength: 5,
};
export const ErrorMsgs = {
    NAME_LENGTH_LIMIT: '이름은 5글자 이하만 가능',
};
//# sourceMappingURL=constants.js.map